---
classes: wide
hidden: true
title: "ALLOCATING COVID TESTING STATIONS"
excerpt: "Covid testing stations allocating optimization and decomposition in 2022 Lockdown Shanghai."
date: 2023-12-15T11:48:41-04:00
tags:
  - spatial analysis
  - optimization
header:
  image: /assets/images/portfolio/Covid_site_keplar.png
  teaser: /assets/images/portfolio/figure4-trajectoryviz4.jpeg
sidebar:
  - title: "Cooperators"
    text: "Liu Liu*"
  - title: "Role"
    text: "Decompozition, Integer Solution, Spatial Analysis"
  - title: "Developed Skills"
    text: "Julia(Gurobi), Python(geopandas)"
typora-root-url: ./..

gallery:
  - url: /assets/images/portfolio/covid-diagram-1.png
    image_path: /assets/images/portfolio/covid-diagram-1.png
    alt: "placeholder image 1"
    title: "the distribution of the MIP data from China Unicom "
  - url: /assets/images/portfolio/covid-diagram-3.png
    image_path: /assets/images/portfolio/covid-diagram-3.png
    alt: "placeholder image 2"
    title: "Linear solution with "
  - url: /assets/images/portfolio/covid-diagram-2.png
    image_path: /assets/images/portfolio/covid-diagram-2.png
    alt : "placeholder image 3"
    title: "Utilization Rate Spatial Distribution with grid method" 
---

<!-- {% assign stylesheet = page.skin | default: 'light' | prepend: '/assets/css/' | append: '.css' %}
<link rel="stylesheet" href="{{ stylesheet | relative_url }}"> -->

<style>
    body {
        font-size: 90%; 
    }
</style>

The project is a course project for Optimization Methods, the final report is not published yet. You can access to the drafet version of the report and slides here:
[Final Report](https://www.dropbox.com/scl/fi/seiiocy8pxdmda0twj7n6/final_report.pdf?rlkey=ww04k6r0jslevjuz2772zldti&dl=0) 
[Final Slides](https://www.dropbox.com/scl/fi/seiiocy8pxdmda0twj7n6/final_report.pdf?rlkey=ww04k6r0jslevjuz2772zldti&dl=0)

Keywords: COVID, Mixed Integer Optimization, Infrastructure and System Management, Spatial Analysis


> This project, undertaken in the 6.7201 Optimization Methods course in collaboration with DUSP PhD student Liu Liu, addresses the strategic allocation of COVID-19 testing facilities in Shanghai during the 2022 lockdown. Our objective was to optimize the distribution of testing sites to ensure pedestrian accessibility within 10-15 minutes, while minimizing operational costs and adhering to site capacity constraints. Employing mixed integer optimization, our model, though simple in formulation, presented complexities when scaled to large city data. 
>
> Key challenges included the sparse population distribution in suburban areas and the need to balance between integer and linear solutions. Leveraging my experience in city information management, we utilized the grid method in urban spatial analysis to segment the dataset into regions, achieving an integer feasible optimal solution.

{% include gallery caption="Article illustration" %}

We are still optimizing the algorithm and plan to submit a paper in early 2024. Please follow this page for the latest developments.

<!-- # Background 

Outdoor running is one of the most popular physical activities, with numerous health benefits and minimal cost. Despite such importance, limited scientific understanding of collective behavioral patterns of running activity constraints more evidence-based spatial planning and urban design for promoting an active lifestyle. 

This study investigates the underlying spatial, temporal, and typological patterns of running activities within a university campus by analyzing a large number of running trajectory data (n = 11088) at high spatial-temporal resolution. Based on classification and pattern identification, the results reveal three major running activity types on streets, tracks, and mixed spatial conditions. This study further investigates data during a specific period when the campus experienced public space regulation as a part of the COVID-19 prevention protocol. Results reveal the disruption, change, and recovery of running activity, revealing local behavioral adaptation and resilience towards spatial intervention. Overall, our findings resonate with classic urban design theory and existing literature, and the proposed analytical workflow can further support more evidence-based and data-informed planning decisions and design actions for promoting physical activity and active living. -->
