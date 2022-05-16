---
title: ポッドキャスト
layout: default
---

<ul>
{% for episode in site.episodes -%}
  {% assign today_second = 'now' | date: "%s" %}
  {% assign episode_second = episode.date | date: "%s" %}
  {% if today_second >= episode_second %}
  <li class="text-left mb-2">
    <header>
      <h2 class="inline"><a class="font-bold text-lg underline" href='{{ episode.url }}'>{{ episode.title }}</a></h2>
      <time class="opacity-80" datetime="{{ episode.date }}">{{ episode.date | date: "%Y-%m-%d" }}</time>
    </header>
    <p>{{ episode.description }}</p>
  </li>
  {% endif %}
{% endfor %}
</ul>
