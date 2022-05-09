---
title: メンバー紹介
layout: default
---

<h3 class="mt-5 font-bold text-xl mb-2">メンバー</h3>

<ul class="flex">
{% for member in site.members -%}
  <li class="mb-2 bg-white w-1/2 mx-2 p-3 rounded-lg">
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
