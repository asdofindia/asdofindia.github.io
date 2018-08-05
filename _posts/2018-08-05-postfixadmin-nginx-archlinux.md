---
layout: post
title: "Installing postfixadmin on archlinux with nginx"
tags: ["devops"]
---

##### Archlinux can make anything possible, even postfixadmin and nginx #####


Thing to note is that most of the tutorials online are for Ubuntu, centOS, etc. So we should go through the source rather than random blog posts.

First things first. What do we want to install? PostfixAdmin.

Official website: [postfixadmin](http://postfixadmin.sourceforge.net/)

Official installation method: [INSTALL](https://github.com/postfixadmin/postfixadmin/blob/master/INSTALL.TXT)

Of course you can also follow the [archwiki](https://wiki.archlinux.org/index.php/Postfix#PostfixAdmin), but note that this is designed for Apache.

### NGINX configuration ###

First, enabling PHP on nginx. It's neatly documented on the [official documentation](https://www.nginx.com/resources/wiki/start/topics/examples/phpfcgi/).

```
location ~ [^/]\.php(/|$) {
    fastcgi_split_path_info ^(.+?\.php)(/.*)$;
    if (!-f $document_root$fastcgi_script_name) {
        return 404;
    }

    # Mitigate https://httpoxy.org/ vulnerabilities
    fastcgi_param HTTP_PROXY "";

    fastcgi_pass unix:/run/php-fpm/php-fpm.sock;
    fastcgi_index index.php;

    # include the fastcgi_param setting
    include fastcgi_params;

    # SCRIPT_FILENAME parameter is used for PHP FPM determining
    #  the script name. If it is not set in fastcgi_params file,
    # i.e. /etc/nginx/fastcgi_params or in the parent contexts,
    # please comment off following line:
    fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
}
```

We can use sleight of hand to `sudo ln -s /usr/share/webapps/postfixAdmin/p
ublic /srv/http/mail.domain.tld/postfixadmin` to avoid all messy nested location blocks.

If everything is right (do you have php-fpm service started?), you should be able to travel to mail.domain.tld/postfixadmin/setup.php and continue setup.