---
layout: default
title: Recommendations
permalink: /recommendations/
---

<h1 class="h1">Recommendations</h1>
<div class="hr"></div>

{% for rec in site.data.recommendations %}
<div class="card">
  <p><strong>{% if rec.url %}<a href="{{ rec.url }}">{{ rec.author }}</a>{% else %}{{ rec.author }}{% endif %}</strong> &mdash; {{ rec.role }}</p>
  {% if rec.date %}<p class="mono">{{ rec.date }}</p>{% endif %}
  <p>{{ rec.text }}</p>
</div>
{% endfor %}

<p><a href="https://www.linkedin.com/in/bavalpreet-singh/details/recommendations/">See more on LinkedIn</a></p>
