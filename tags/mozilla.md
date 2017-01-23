---
layout: default
title: Mozilla
---
## Mozilla

Posts tagged under mozilla

{% assign category = 'mozilla' %}
{% for post in site.posts %}
{% if post.categories contains category %}
{{ post.date | date: "%d %b '%y" }} >> <a href="{{post.url}}">{{ post.title }}</a>
{% endif %}
{% endfor %}
