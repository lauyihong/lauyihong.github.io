---
classes: wide
title: "Jogging trajectories analyais for discover spatial-temporal patterns."
excerpt: "Analyzing jogging activity patterns and adaptation to public health regulation."
date: 2024-03-18T11:48:41-04:00
tags:
  - spatial analysis
  - machine learning
  - urban informatics
  - physical activity
header:
  image: /assets/images/portfolio/Raw Portfolio - Yifeng LIU-10.png
  teaser: /assets/images/portfolio/figure4-trajectoryviz4.jpeg
typora-root-url: ./..

gallery:
  - url: /assets/images/portfolio/figure1-studyarea.jpeg
    image_path: /assets/images/portfolio/figure1-studyarea.jpeg
    alt: "placeholder image 1"
    title: "Study area and background"
  - url: /assets/images/portfolio/figure4-trajectoryviz4.jpeg
    image_path: /assets/images/portfolio/figure4-trajectoryviz4.jpeg
    alt : "placeholder image 3"
    title: "Jogging trajectories and patterns" 
  - url: /assets/images/portfolio/figure7-numtimeseries.jpeg
    image_path: /assets/images/portfolio/figure7-numtimeseries.jpeg
    alt: "placeholder image 4"
    title: "Pattern and timing changes"
---

{% assign stylesheet = page.skin | default: 'light' | prepend: '/assets/css/' | append: '.css' %}
<link rel="stylesheet" href="{{ stylesheet | relative_url }}">

<style>
    body {
        font-size: 90%; 
    }
</style>

This is the class project proposal for 6.s952 , Spring 2024. the project's background is related from my previous undergrad years' research work, which is published in *Environment and Planning B: Urban Analytics and City Science*. 

[further information link](https://lauyihong.github.io/portfolio/analysis-running/)

*Liu, Y., & Lai, Y. (2023). Analyzing jogging activity patterns and adaptation to public health regulation. Environment and Planning B: Urban Analytics and City Science, 0(0).
[link](https://doi.org/10.1177/23998083231193484)*

Keywords: Running activity, urban informatics, urban planning, public health


> Based on jogging trajectories data from a mobile running app KEEP, this study investigates the underlying spatial-temporal and typological patterns of jogging activities within a university campus. We also revealed local behavioral adaptation and resilience towards spatial intervention. 
>
> Overall, our findings resonate with classic urban design theory and existing literature, and the proposed analytical workflow can further support more evidence-based and data-informed planning decisions and design actions for promoting physical activity and active living.

{% include gallery caption="Article illustration" %}

# Background 

Outdoor running is one of the most popular physical activities, with numerous health benefits and minimal cost. Despite such importance, limited scientific understanding of collective behavioral patterns of running activity constraints more evidence-based spatial planning and urban design for promoting an active lifestyle. 

This study investigates the underlying spatial, temporal, and typological patterns of running activities within a university campus by analyzing a large number of running trajectory data (n = 11088) at high spatial-temporal resolution. Based on classification and pattern identification, the results reveal three major running activity types on streets, tracks, and mixed spatial conditions. This study further investigates data during a specific period when the campus experienced public space regulation as a part of the COVID-19 prevention protocol. Results reveal the disruption, change, and recovery of running activity, revealing local behavioral adaptation and resilience towards spatial intervention. Overall, our findings resonate with classic urban design theory and existing literature, and the proposed analytical workflow can further support more evidence-based and data-informed planning decisions and design actions for promoting physical activity and active living.
