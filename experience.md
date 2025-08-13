---
layout: default
title: Experience
permalink: /experience/
---
{% assign p = site.data.profile %}

<h1 class="h1">Experience</h1>
<div class="hr"></div>

{% for job in p.experience %}
<div class="card">
  <h3 class="h2">{{ job.role }} — {{ job.company }}</h3>
  <p class="mono">{{ job.date }}{% if job.location %} · {{ job.location }}{% endif %}</p>
  <ul>
    {% for b in job.bullets %}<li>{{ b }}</li>{% endfor %}
  </ul>
</div>
{% endfor %}

<h2 class="h2">Education</h2>
{% for e in p.education %}
<div class="card">
  <p><strong>{{ e.school }}</strong> — {{ e.program }}</p>
  <p class="mono">{{ e.date }}</p>
</div>
{% endfor %}