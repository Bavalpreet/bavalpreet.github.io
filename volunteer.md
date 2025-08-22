---
layout: default
title: Volunteer & Mentorship
permalink: /volunteer/
---
{% assign p = site.data.profile %}

<h1 class="h1">Volunteer & Mentorship</h1>
<div class="hr"></div>

{% for v in p.volunteer %}
<div class="card">
  <h3 class="h2">{{ v.role }} — {{ v.company }}</h3>
  <p class="mono">{{ v.date }}{% if v.location %} · {{ v.location }}{% endif %}</p>
  <ul>
  {% for b in v.bullets %}<li>{{ b }}</li>{% endfor %}
  </ul>
</div>
{% endfor %}
