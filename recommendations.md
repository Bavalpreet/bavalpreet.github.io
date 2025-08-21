---
layout: default
title: Recommendations
permalink: /recommendations/
---

<h1 class="h1">Recommendations</h1>
<div class="hr"></div>

{% for rec in site.data.recommendations %}
<div class="card">
  <p><strong>{{ rec.author }}</strong> — {{ rec.role }}</p>
  <p class="mono">{{ rec.date }}</p>
  <p>{{ rec.text }}</p>
</div>
{% endfor %}

<p><a href="https://www.linkedin.com/in/bavalpreet-singh/details/recommendations/">See more on LinkedIn</a></p>
