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
  <div class="volunteer-header">
    {% if v.logo %}<img src="{{ v.logo }}" alt="{{ v.company }} logo" class="volunteer-logo">{% endif %}
    <h3 class="h2">{{ v.role }} — {{ v.company }}</h3>
  </div>
  <p class="mono">{{ v.date }}{% if v.location %} · {{ v.location }}{% endif %}</p>
  {% if v.bullets and v.bullets != empty %}
  <ul>
  {% for b in v.bullets %}<li>{{ b }}</li>{% endfor %}
  </ul>
  {% endif %}
</div>
{% endfor %}
