---
title: ポッドキャスト
layout: default
---

<ul style="border-width: 1px 0px 0px 0px;" class="border-gray-200">
{% assign episodes = site.episodes | reverse %}
{% for episode in episodes -%}
  {% assign today_second = 'now' | date: "%s" %}
  {% assign episode_second = episode.date | date: "%s" %}
  {% if today_second >= episode_second %}
  <a class="" href='{{ episode.url }}'>
    <li style="border-width: 0px 0px 1px 0px;" class="text-left py-3 border-gray-200">
      <p><time class="text-sm opacity-50" datetime="{{ episode.date }}">{{ episode.date | date: "%Y-%m-%d" }}</time></p>
      <h2 class="inline text-lg">{{ episode.title }}</h2>
      <p class="opacity-40 text-sm">{{ episode.description }}</p>
    </li>
  </a>
  {% endif %}
{% endfor %}
</ul>
