---
layout: default
title: Publications
permalink: /publications/
---
{% assign p = site.data.profile %}
<h1 class="h1">Publications & Recognition</h1>
<div class="hr"></div>

<h2 class="h2">Publications</h2>
<ul>
  {% for pub in p.publications %}
    <li><a href="{{ pub.link }}">{{ pub.title }}</a></li>
  {% endfor %}
</ul>

<h2 class="h2">Certifications</h2>
<ul>
  {% for c in p.certifications %}<li>{{ c }}</li>{% endfor %}
</ul>

<h2 class="h2">Awards</h2>
<ul>
  {% for a in p.awards %}<li>{{ a }}</li>{% endfor %}
</ul>