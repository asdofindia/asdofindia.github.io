---
layout: post
title: Script to Check Domain Expiry and Alert
tags: script, devops
---

##### What if there are domains you care about but the expiry alerts don't necessarily come to your email address? #####

**Update on 2025-05-26**: There's a bug in this code that causes lines to disappear. Read more at the end of the post.

I've had it before. There are people who start websites. And they forget to renew their domain. And then they ask me whether I can recover the domain somehow. Often after the grace period for domain recovery.

So, I decided to write (with ChatGPT) a script that'll check domain expiry using `whois` (which has to be installed locally for this to work) and use `notify-send` to send me an alert if necessary. I then automated running this using systemd. The whole thing is attached.

### Script

```bash
#!/bin/bash

CSV_FILE="domain_expiry.csv"
TEMP_FILE=$(mktemp)
TODAY=$(date +%s)
WARNING_DAYS=14
SKIP_IF_MORE_THAN_DAYS=90

# Ensure CSV exists
if [[ ! -f "$CSV_FILE" ]]; then
  echo "date,domain" > "$CSV_FILE"
fi

# Read current CSV (excluding header)
tail -n +2 "$CSV_FILE" | while IFS=',' read -r expiry domain; do
  # Check if date is valid (YYYY-MM-DD)
  if [[ "$expiry" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
    expiry_ts=$(date -d "$expiry" +%s 2>/dev/null)
    if [[ -n "$expiry_ts" ]]; then
      days_remaining=$(( (expiry_ts - TODAY) / 86400 ))

      # Skip domain if expiry is > 90 days from now
      if (( days_remaining > SKIP_IF_MORE_THAN_DAYS )); then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Skipping $domain — expires in $days_remaining days ($expiry)"
        echo "$expiry,$domain" >> "$TEMP_FILE"
        continue
      fi
    fi
  fi

  echo -n "[$(date '+%Y-%m-%d %H:%M:%S')] Checking $domain... "

  expiry_line=$(whois "$domain" 2>/dev/null | grep -iE "Expiry Date|Expiration Date|renewal date" | head -n 1)
  new_expiry=$(echo "$expiry_line" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')

  if [[ -n "$new_expiry" ]]; then
    echo "$new_expiry,$domain" >> "$TEMP_FILE"
    echo "$new_expiry"

    # Notify if it's within warning window
    new_expiry_ts=$(date -d "$new_expiry" +%s 2>/dev/null)
    if [[ -n "$new_expiry_ts" && $(( (new_expiry_ts - TODAY)/86400 )) -le $WARNING_DAYS && $new_expiry_ts -ge $TODAY ]]; then
      notify-send "Domain Expiry Warning" "$domain expires on $new_expiry"
      echo "⚠️  $domain expires within $WARNING_DAYS days!"
    fi
  else
    echo "Could not find expiry date"
  fi
done

# Sort by expiry date (oldest first), deduplicate by domain
sort -t',' -k1,1 "$TEMP_FILE" | uniq > "$TEMP_FILE.sorted"

# Write updated CSV
echo "date,domain" > "$CSV_FILE"
cat "$TEMP_FILE.sorted" >> "$CSV_FILE"

# Cleanup
rm "$TEMP_FILE" "$TEMP_FILE.sorted"

```


Save this in some file named `update.sh` or so, perhaps in ``/home/asd/.local/bin` and don't forget to do `chmod +x update.sh`.

Do note the settings like:
* WARNING_DAYS: The notification alert on expiry will only happen if expiry is in less than these days (14 by default)
* SKIP_IF_MORE_THAN_DAYS: This is relevant for subsequent runs of the script. If a domain has an expiry date in say 2030, there's no point checking it again and again. So, it'll run only if a previous known expiry date is less than these number of days away. (90 by default)

### Input/Output file

The input and output are the same file, a CSV file that looks like

```
date,domain
,example.com
,example.org
```

This should be named `domain_expiry.csv` and kept in the same folder as the script (as you can see in the script). Once the script runs, it'll update the date column and sort it such that the earliest expiring domain will be at the top.

### systemd service


```bash
$ cat ~/.config/systemd/user/domain-expiry.service 
[Unit]
Description=Check if domains are expiring

[Service]
Type=oneshot
WorkingDirectory=/home/asd/.local/bin
ExecStart=/home/asd/.local/bin/update.sh
````

### systemd timer

```bash
$ cat ~/.config/systemd/user/domain-expiry.timer 
[Unit]
Description=Run checkspace every day

[Timer]
OnCalendar=daily

[Install]
WantedBy=timers.target
```


So I just have to remember to `systemctl --user daemon-reload` `systemctl --user enable domain-expiry.timer`

### Erratum

**Update on 2025-05-26**: As promised, LLM code can't be trusted. In the above, the else clause of `if [[ -n "$new_expiry" ]]; then` will simply output "Could not find expiry date" and skip inserting that domain into the output. Thus, if some domain expiry couldn't be discovered, it'll drop that domain!

To fix this, just add `echo "$expiry,$domain" >> "$TEMP_FILE"` after the line `echo "Could not find expiry date"`

