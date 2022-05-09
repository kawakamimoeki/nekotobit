---
title: Podcast by YHMK
layout: default
---

<ul class="mb-10">
  {% for subscription in site.data.subscriptions %}
    <li><a target="_blank" href="{{ subscription.url }}"><img width="60%" src="{{ subscription.badge }}" class="mx-auto my-3" /></a></li>
  {% endfor %}
</ul>

<ul class="mb-10 flex">
{% for member in site.members -%}
  <li class="bg-white w-1/2 mx-2 p-3 rounded-lg">
    <h4 class="font-bold text-lg mb-2">
      <a href="{{ member.url }}">
        {{ member.name }}
      </a>
    </h4>
    <img src="/img/{{ member.avater }}" alt="{{ member.name }}" class="w-2/3 mx-auto mb-5 rounded-full">
    <div class="article">
      {{ member.content }}
    </div>
  </li>
{% endfor %}
</ul>

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
