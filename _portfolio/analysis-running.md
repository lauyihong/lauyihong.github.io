---

title: "Jogging analysis"
excerpt: "Analyzing jogging activity patterns and adaptation to public health regulation."
date: 2023-08-05T11:48:41-04:00
tags:
  - spatial analysis
header:
  image: /assets/images/portfolio/Raw Portfolio - Yifeng LIU-10.png
  teaser: /assets/images/portfolio/figure4-trajectoryviz4.jpeg
sidebar:
  - title: "Cooperators"
    text: "Yuan Lai*"
  - title: "Role"
    text: "First Author, Front-End Developer"
  - title: "Responsibilities"
    text: "95% program develop and mantance, 80% writing, 100% drawing"
  - title: "Developed Skills"
    text: "Python(geopandas,statsmodels), PostgreSQL(pgGIS)"
typora-root-url: ./..
---

<style>
    body {
        font-size: 90%; 
    }
</style>


> Based on jogging trajectories data from a mobile running app KEEP, this study investigates the underlying spatial-temporal and typological patterns of jogging activities within a university campus. We also revealed local behavioral adaptation and resilience towards spatial intervention. 



# Background 

Outdoor running is one of the most popular physical activities, with numerous health benefits and minimal cost. Despite such importance, limited scientific understanding of collective behavioral patterns of running activity constraints more evidence-based spatial planning and urban design for promoting an active lifestyle. This study investigates the underlying spatial, temporal, and typological patterns of running activities within a university campus by analyzing a large number of running trajectory data (n = 11088) at high spatial-temporal resolution. Based on classification and pattern identification, the results reveal three major running activity types on streets, tracks, and mixed spatial conditions. This study further investigates data during a specific period when the campus experienced public space regulation as a part of the COVID-19 prevention protocol. Results reveal the disruption, change, and recovery of running activity, revealing local behavioral adaptation and resilience towards spatial intervention. Overall, our findings resonate with classic urban design theory and existing literature, and the proposed analytical workflow can further support more evidence-based and data-informed planning decisions and design actions for promoting physical activity and active living.



# Study area and observation period

In this study, we focus on a specific university campus in Beijing, China as the study area. The campus covers roughly 317 ha with approximately 53,300 individuals, including students, faculty, and staff.



Since the COVID-19 pandemic in 2020, the campus has been closed to the public to stop the viral spread. Therefore, this type of setting presents a one-of-a-kind opportunity for research on jogging activity due to the relatively consistent population and surroundings.



Due to the local pandemic regulations, the school remained closed to the public from late April to July 2022. And within this period, the campus further enforced a public space regulation from May 6 to June 26 by separating the southwest zone from others,2 which is identified as “campus zone isolation” in this paper. Throughout the observation period, people were restricted from entering or leaving the campus or specific zone (from May 6 through June 26 in the Southwest District). Nevertheless, people’s access to buildings and public spaces remained unaffected. The entire observation period includes three phases depending on the temporary isolation of the particular zone. Because of these public health measures within the campus, its local population was relatively fixed without a significant in-and-out flux during the observation period. Such settings create a relatively constant population group throughout the observation period, providing the basis for control variables to investigate the effects of public space restriction on jogging behavior. We can assume that all movement paths on the campus are from the internal population considering the university usually does not allow visitors since COVID-19. This policy prevents data noises from complex external population groups and many tourists before this pandemic.



<img src="/assets/images/portfolio/figure1-studyarea.jpeg" alt="figure4-trajectoryviz4" style="zoom:50%;" />{: .align-right}



# Data and methods

We collect data from multiple sources to quantify the research site’s jogging activity and spatial characteristics. Figure 2 illustrates the framework of the data mining and analysis process. For jogging activity, we collect trajectory data from KEEP,3 one of China’s most popular fitness smartphone applications. For privacy protection, Keep’s visualization platform only shares trajectories without revealing personal-identifiable or sensitive information. Thus, we cannot comprehend the jogging movement since the raw data can only depict the shape of the jogging trajectory and not the time when the trajectory occurred. This circumstance prompts us to optimize the crawling procedure for the raw data mining process.



Figure 3 illustrates the workflow for interpreting one raw trajectory and quantifying the runner’s behavioral characteristics. We quantify each jogging trajectory as a list of tuples fli, i ¼ 1; 2, /, ng, where li denotes the location in geographical coordinates (latitude and longitude) to distinguish each trajectory based on its unique sequence of geo-referenced points (Figure 3(a)). While such data reflect changing spatial location in each jogging trajectory, directly analyzing locational differences is problematic since such information only indicates locational rather than behavioral patterns. For instance, people who jog on tracks share similar behavioral patterns (i.e., jogging in loops) even though they may jog on separate tracks based on different sites far from each other.

<img src="/assets/images/portfolio/figure3-attributeDiagram.jpeg" alt="figure4-trajectoryviz4" style="zoom: 33%;" />{: .align-left}





The spatial and temporal changes of coordinates reflect the runner’s speed or movement velocity (Figure 3(b)) and changing places through jogging (Figure 3(c)). A runner’s origin depends on the starting location of the trajectory denoted as l0, which can be associated with a particular campus zone by a spatial join. Each trajectory reflects the runner’s activity characteristics with three attributes: its origin, the sum of turning angles (Sa), and the radius of gyration (Rg).



![figure4-trajectoryviz4](/assets/images/portfolio/figure4-trajectoryviz4.jpeg)

# Result



<img src="/assets/images/portfolio/figure6-timeSeries2.jpeg" alt="figure4-trajectoryviz4" style="zoom:50%;" />



The continuous development of technology provides new perspectives and tools for people to recognize and analyze the city. The research team hopes to conduct research on the basic elements of 

![figure7-numtimeseries](/assets/images/portfolio/figure7-numtimeseries.jpeg)

This study uses a crowdsourced survey-supported web-based questionnaire to collect public cognitive evaluations of the streetscape and to sort out the association mechanism between streetscape elements and streetscape cognitive evaluations. There are three main steps in our study. First, we build an interactive streetscape evaluation website to collect public perceptions of the streetscape, and then we build a machine learning model with the semantic segmentation results of the streetscape and the website evaluation results as x and y. Lastly, we tried to develop a navigation system optimized for the demand and deployed it on a website accessible through the Internet.