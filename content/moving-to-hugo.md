+++
date = '2025-06-19T23:11:20+05:30'
title = 'Moving From Jekyll to Hugo'
type = 'post'
tags = ['meta']
+++

After years of struggling with jekyll's limitations and idiosyncracies, today I moved to hugo.

It took several hours.

### Importing content

The [Migrate to Hugo](https://gohugo.io/tools/migrations/) page suggests a few tools.

First I tried the jekyll import command built-in. It moved the posts correctly. But the filename retained the date prefix as in jekyll. And I wasn't sure if the date was correctly captured in frontmatter.

Then I looked at the [JekyllToHugo](https://github.com/fredrikloch/JekyllToHugo/) tool. It was just a simple python file. I liked this because I could change the behaviour to my liking. In fact, I did change a lot. I'm attaching the modified version of this at the end of this post.

Anyhow, with that I was able to get all the pages moved with dates removed from filename, and the frontmatter to my liking.

### Changing theme

Instead of importing the theme, I just decided to start from a minimal theme. I copy pasted the content of [nostyleplease](https://github.com/hanwenguo/hugo-theme-nostyleplease) theme into my themes/asd folder and started using that. I plan to add features as I like later. I've already added hugo's internal partials for opengraph, etc.

### Feed

To get [atom feed](https://asd.learnlearn.in/feed.atom), I used the file from [kaushalmodi/hugo-atom-feed](https://github.com/kaushalmodi/hugo-atom-feed).

### Tag URL

There was one small snag. On jekyll, my tags were coming in a URL like `/tag/devops`. But on hugo it was at `/tags/devops`.

The documentation about this is confusing. There a [couple of](https://discourse.gohugo.io/t/change-the-url-for-categories-and-tags/1110) [discourse threads](https://discourse.gohugo.io/t/changing-taxonomy-urls/6023) and a [github issue](https://github.com/gohugoio/hugo/issues/1208) for this. But no solution seemed to work. Eventually I looked into the test case added via the [commit](https://github.com/gohugoio/hugo/commit/d9a78b61adefe8e1803529f4774185874af85148) that closed that github issue. And doing the following in `hugo.toml` worked

```toml
[taxonomies]
  tag = 'tags'

[permalinks]
  tags = "/tag/:slug"
```

You can see the whole diff [here](https://gitlab.com/asdofindia/asdofindia.gitlab.io/-/commit/9d5db14384647fd7408eb76242adde49a1b8f0cc)

## Archetypes

I created an archetype called post.md and used this command to create this post: `hugo new content --kind post moving-to-hugo.md`


### Appendix

#### Modified jekyllToHugo.py

```python
#!/usr/bin/env python

# Copyright (C) Fredrik Loch 2015  Jekyll-Hugo
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License along
# with this program; if not, write to the Free Software Foundation, Inc.,
# 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

__author__ = "Fredrik Loch"
__copyright__ = "Copyright 2015, Jekyll-Hugo"
__license__ = "GPL"
__version__ = "1"
__maintainer__ = "Fredrik Loch"
__email__ = "mail@fredrikloch.me"
__status__ = "Development"

import argparse
import re
import os
import sys
import logging
import yaml

def parseCLI():
    command_line = argparse.ArgumentParser(description='Options')
    command_line.add_argument("-o", "--output", type=str,
        help="Path to output folder, will be created if it does not exist. Defaults to content",
        default="content")
    command_line.add_argument("-v", "--verbose", action="store_true",
        help="Print extra logging output",
        default=False)
    command_line.add_argument("source", type=str,  help="Path to folder containing jekyll posts")

    args = command_line.parse_args()
    return args

def printLog(level,message):
    if verbose:
        if level == 1:
            logger.info(message)
        elif level == 2:
            logger.warning(message)

    if level == 3:
        logger.error(message)

def handlePost(source_file):
    filename = os.path.basename(source_file)
    printLog(1, "Trying to convert: " + filename)

    date_in_filename_match = re.search(r"^\d{4}\-\d{1,2}\-\d{1,2}", filename)
    if not date_in_filename_match:
        printLog(2, "Unable to parse date from filename")


    with open(source_file) as f:
        printLog(1, "Parsing front matter")

        # Fixed Regex when content contains --- other than the frontmatter sepator
        frontmatter_regex = re.compile(r"---\n([\s\S]*?)---\n([\s\S]*)")
        date_regex = re.compile(r"^.*(\d{4}\-\d{2}\-\d{2}).*")

        content = f.read()

        frontmatter_regex_search_result = frontmatter_regex.search(content)
        # Expected to have a frontmatter for further processing
        if not frontmatter_regex_search_result:
            printLog(3, "Unable to read Frontmatter in "+filename)
            f.close()
            return

        frontmatter_yaml = yaml.safe_load(frontmatter_regex_search_result.group(1))

        output_path = arguments.output
        if frontmatter_yaml.get("layout"):
            output_path = os.path.join(arguments.output, frontmatter_yaml["layout"])
            if not os.path.exists(output_path): 
                printLog(1, "Creating folder for " + frontmatter_yaml["layout"] + " layout")
                os.makedirs(output_path)

        new_filename = filename
        if date_in_filename_match:
            new_filename = filename[len("2024-01-01-"):]
        output_filename = os.path.join(output_path, new_filename)
        with open(output_filename, 'w') as nf:
            nf.write("+++" + os.linesep)

            for key in frontmatter_yaml:
                if not frontmatter_yaml[key] is None:
                    if key == 'date':
                        # Hugo expects to have only YYYY-MM-DD but Jekyll can have time as well 
                        date_regex_search_result = re.search(date_regex, str(frontmatter_yaml[key]))
                        if date_regex_search_result:
                            printLog(1, "Date found in Frontmatter: {}".format(date_regex_search_result.group(1)))
                            nf.write(f"date = '{date_regex_search_result.group(1)}'{os.linesep}")
                    elif key in ["tags","categories"]:
                        value = frontmatter_yaml[key]
                        # Hugo expects a Go list for tags and categories
                        if isinstance(value, str):
                            if "," in value:
                                value = [v.strip() for v in value.split(',')]
                            else:
                                value = [value]
                        if isinstance(value, list):
                            value = [f"'{v}'" for v in value]
                            nf.write('{} = [{}]{}'.format(key, ', '.join(value), os.linesep))
                        printLog("Strange item", value)
                        #nf.write('{}: "{}"{}'.format(key, str(value.split(" ") if isinstance(value, str) else (value if isinstance(value, list) else [])), os.linesep))
                    elif key == "status":
                        if frontmatter_yaml[key] == "draft":
                            nf.write('draft = true{}'.format(os.linesep))
                    elif  key in ["summary", "excerpt"]:
                        nf.write('description = "{}"{}'.format(str(frontmatter_yaml[key]), os.linesep))
                    elif  key == "permalink":
                        nf.write('url = "{}"{}'.format(str(frontmatter_yaml[key]), os.linesep))
                    elif  key == "layout":
                        nf.write("type = '{}'{}".format(str(frontmatter_yaml[key]), os.linesep))
                    elif key == "title":
                        title = frontmatter_yaml[key]
                        if "'" in title:
                            nf.write(f"title = '''{title}'''{os.linesep}")
                        else:
                            nf.write(f"title = '{frontmatter_yaml[key]}'{os.linesep}")
                    elif key == "link":
                        nf.write(f"param.link = '{frontmatter_yaml[key]}'{os.linesep}")
                    else:
                        nf.write(yaml.dump({key: frontmatter_yaml[key]}, default_flow_style=False))
            
            if not "date" in frontmatter_yaml and date_in_filename_match:
                printLog(1, "Unable to find date from Frontmatter, using date from filename")
                nf.write("date = '{}'{}".format(date_in_filename_match.group(0), os.linesep))

            nf.write("+++" + os.linesep)

            # Ugly fix for syntax highlighting.
            text = frontmatter_regex_search_result.group(2).replace(
                "{% highlight", 
                "{{< highlight").replace("%}", ">}}").replace("{% endhighlight",
                "{{< /highlight"
            )
            nf.write(text)
            printLog(1, "Converted file: {}".format(output_filename))


if __name__ == '__main__':
    logger = logging.getLogger("standard logger")
    logger.setLevel(logging.INFO)
    format = '%(asctime)s - %(levelname)s - %(message)s'
    logging.basicConfig(format=format)

    arguments = parseCLI()
    arguments.source = os.path.abspath(arguments.source)
    arguments.output = os.path.abspath(arguments.output)
    verbose = arguments.verbose

    if os.path.exists(arguments.source):
        printLog(1, "Creating folder: {} for output".format(arguments.output))

        if not os.path.exists(arguments.output):
            os.makedirs(arguments.output)

        for r, d, f in os.walk(arguments.source):
                for f1 in f:
                    if re.match(r".*\.md$", f1):
                        handlePost(os.path.join(r, f1))
    else:
        printLog(3, "Source folder not found, make sure that the folder {} exists.".format(arguments.source))
        sys.exit(-1)
```