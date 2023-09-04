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
    text: "95% program develop and maintenance, 80% writing, 100% drawing"
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
>
> Overall, our findings resonate with classic urban design theory and existing literature, and the proposed analytical workflow can further support more evidence-based and data-informed planning decisions and design actions for promoting physical activity and active living.



Keywords: Running activity, urban informatics, urban planning, public health



> 基于对来自KEEP软件的运动轨迹分析，该项目在校园范围内研究了潜在的慢跑时空规律。同时在COVID19的背景下，我们还揭示了在地活动对空间隔离的适应和恢复现象。
>
> 总体而言，我们的发现与经典的城市设计理论和现有文献产生了共鸣，拟议的分析工作流程可以进一步支持更多基于证据和数据知情的规划决策和设计行动，以促进体育活动和积极生活。



# Background 

Outdoor running is one of the most popular physical activities, with numerous health benefits and minimal cost. Despite such importance, limited scientific understanding of collective behavioral patterns of running activity constraints more evidence-based spatial planning and urban design for promoting an active lifestyle. 



This study investigates the underlying spatial, temporal, and typological patterns of running activities within a university campus by analyzing a large number of running trajectory data (n = 11088) at high spatial-temporal resolution. Based on classification and pattern identification, the results reveal three major running activity types on streets, tracks, and mixed spatial conditions. This study further investigates data during a specific period when the campus experienced public space regulation as a part of the COVID-19 prevention protocol. Results reveal the disruption, change, and recovery of running activity, revealing local behavioral adaptation and resilience towards spatial intervention. Overall, our findings resonate with classic urban design theory and existing literature, and the proposed analytical workflow can further support more evidence-based and data-informed planning decisions and design actions for promoting physical activity and active living.



# Study area and observation period

In this study, we focus on a specific university campus in Beijing, China as the study area. The campus covers roughly 317 ha with approximately 53,300 individuals, including students, faculty, and staff.



Since the COVID-19 pandemic in 2020, the campus has been closed to the public to stop the viral spread. Therefore, this type of setting presents a one-of-a-kind opportunity for research on jogging activity due to the relatively consistent population and surroundings.



Due to the local pandemic regulations, the school remained closed to the public from late April to July 2022. Within this period, the campus further enforced a public space regulation from May 6 to June 26 by separating the southwest zone from others,2 which is identified as “campus zone isolation” in this paper. Throughout the observation period, people were restricted from entering or leaving the campus or specific zone (from May 6 through June 26 in the Southwest District). 



<img src="/assets/images/portfolio/figure1-studyarea.jpeg" alt="figure4-trajectoryviz4" style="zoom:50%;" />



Nevertheless, people’s access to buildings and public spaces remained unaffected. The entire observation period includes three phases depending on the temporary isolation of the particular zone. Because of these public health measures within the campus, its local population was relatively fixed without a significant in-and-out flux during the observation period. Such settings create a relatively constant population group throughout the observation period, providing the basis for control variables to investigate the effects of public space restriction on jogging behavior. We can assume that all movement paths on the campus are from the internal population considering the university usually does not allow visitors since COVID-19. This policy prevents data noises from complex external population groups and many tourists before this pandemic.

# Data and methods

We collect data from multiple sources to quantify the research site’s jogging activity and spatial characteristics.  For jogging activity, we collect trajectory data from KEEP, one of China’s most popular fitness smartphone applications. For privacy protection, Keep’s visualization platform only shares trajectories without revealing personal-identifiable or sensitive information. Thus, we cannot comprehend the jogging movement since the raw data can only depict the shape of the jogging trajectory and not the time when the trajectory occurred. This circumstance prompts us to optimize the crawling procedure for the raw data mining process.



<img src="/assets/images/portfolio/figure3-attributeDiagram.jpeg" alt="figure4-trajectoryviz4" style="zoom: 33%;" />



Figure 3 illustrates the workflow for interpreting one raw trajectory and quantifying the runner’s behavioral characteristics. We quantify each jogging trajectory as a list of tuples fli, i ¼ 1; 2, /, ng, where li denotes the location in geographical coordinates (latitude and longitude) to distinguish each trajectory based on its unique sequence of geo-referenced points (Figure 3(a)). While such data reflect changing spatial location in each jogging trajectory, directly analyzing locational differences is problematic since such information only indicates locational rather than behavioral patterns. For instance, people who jog on tracks share similar behavioral patterns (i.e., jogging in loops) even though they may jog on separate tracks based on different sites far from each other.



The spatial and temporal changes of coordinates reflect the runner’s speed or movement velocity (Figure 3(b)) and changing places through jogging (Figure 3(c)). A runner’s origin depends on the starting location of the trajectory denoted as l_0, which can be associated with a particular campus zone by a spatial join. Each trajectory reflects the runner’s activity characteristics with three attributes: its origin, the sum of turning angles (Sa), and the radius of gyration (Rg).



# Result

## Jogging trajectory types

The raw data report 11,080 jogging trajectories within the campus during the observation period. Among these, 93.0% of the trajectories (n = 10,305) were of a distance longer than 5 km, implying that people mainly use this app for mid-long jogging activity. The average speed and duration of jogging trajectories were similar across regions, indicating to some extent that runners in each region exercised with similar intensity. The statistical distributions for both jogging speed and duration are bimodal. Specifically, the two peaks for speed are 5.0 and 9.5 min per km, and the peaks for duration are 39 and 70 min. Regarding daily exercise time, the most popular jogging time slots are 10 a.m. and 7 p.m. The Southwest, Northwest, and West zones tend to jog during the daytime, while the North and East zones have a more pronounced tendency to exercise at night.



![figure4-trajectoryviz4](/assets/images/portfolio/figure4-trajectoryviz4.jpeg)



## Temporal changes of local jogging activity

Our time-series analysis of temporal patterns of local jogging trajectories further explains how local activity changes between different periods. Overall, public space reconfiguration due to public health restrictions has affected the composition of jogging types, as indicated by the results of the t-test. 



<img src="/assets/images/portfolio/figure6-timeSeries2.jpeg" alt="figure4-trajectoryviz4" style="zoom:50%;" />



In summary, our analysis reveals two major findings. First, the statistical tests indicate significant changes in the local composition of jogging types to adapt to the space reconfiguration during the public health restriction period. Specifically, we observe a decreased proportion of “Streets” jogging and an increasing proportion of the other two types in the Southwest Zone. We interpret such results as a dramatic reduction in the space accessible to runners from this region under the influence of controls (-82%, from 317 ha to 57 ha, compared to only -18% in the other regions). In other words, the Southwest zone did not provide preferred conditions for jogging activity during this period. In addition, the proportion of the “Tracks” type significantly increased during the isolation time in the Northwest Zone. After observing the trajectory data, we found heavy use of a wrap-around route around the building in the northwest area. We assume this is due to the rising demand for track use during the restriction period, leading to the emergence of new informal tracks. Additionally, we found that certain areas, such as the North and East Zones, were less affected and exhibited relatively stable jogging patterns throughout the public health restriction period. Moreover, our analysis revealed that the compositions of jogging types in these areas remained consistent before and after the blockade, despite significant changes in the Southwest Zone due to the restriction.



## Speculations in campus jogging

![figure7-numtimeseries](/assets/images/portfolio/figure7-numtimeseries.jpeg)

This study uses a crowdsourced survey-supported web-based questionnaire to collect public cognitive evaluations of the streetscape and to sort out the association mechanism between streetscape elements and streetscape cognitive evaluations. There are three main steps in our study. First, we build an interactive streetscape evaluation website to collect public perceptions of the streetscape, and then we build a machine learning model with the semantic segmentation results of the streetscape and the website evaluation results as x and y. Lastly, we tried to develop a navigation system optimized for the demand and deployed it on a website accessible through the Internet.



# Discussion

Although our study sheds light on the research site’s specific demographic groups and daily activities, there are still several limitations that need to be addressed in future research. 

One of the main limitations is that the study site, a university campus, has limited physical, environmental, and socio-economic interactions compared to urban environments. Therefore, future investigations should expand the study to include a more extensive urban context, such as a residential neighborhood or commercial district, to provide a more comprehensive understanding of the phenomenon under investigation. 

In addition, the GPS data used for this study do not contain any socio-economic information of joggers due to the privacy protection and a lack of such user information when joggers register for this App. Thus, we plan to integrate data from multiple sources in our future research to enhance the study’s scope and depth. 

Currently, our data mainly reports on long-distance jogs above 4500 m, but we aim to incorporate additional data sources to capture a more diverse range of physical activities and provide a more nuanced analysis. 

Within the current research scope, we did not investigate how people interact with the physical environment for route selection. Preliminary results from our exploratory data analysis indicate that different jogging trajectories have specific tendencies in route selection. Also, the influence of road conditions or built environment factors on the jogging fever of road sections may also have an impact, and some inter-building paths have more jogging trajectories than pre-designed jogging sections. 

We conjecture that this is due to the choice of road network, which should be further investigated in future studies. In addition, the jogging trajectories in this paper are generalized, including long, slow walking behavior and relatively short and fast jogging behavior. In addition, we can further decompose two sub-clusters in the overall dataset, that is, walking trajectory and long-distance jogging trajectory, and observe the characteristics of the population represented by these two trajectories separately in more specific studies in the future. 

Our research provides unique contributions despite the above limitations. First, we created an analytical pipeline for objectively quantifying jogging activity patterns, including trajectory mining, data integration, behavior measures quantification, activity pattern classification, and spatial-temporal analysis. This analytical method is generalizable for extending to a large research site beyond the campus. From a sports science perspective, our study provides an in-depth understanding of the regularity and typology of jogging activity, especially the routines and habits of jogging exercise. From a public health perspective, analyzing how jogging activity changes during the pandemic restriction may provide empirical evidence on behavioral adaption and recovery of outdoor physical activity due to public space restriction. 

As one of few studies utilizing data from a smartphone application specific to jogging activity, our research provides critical insights into outdoor physical activity. With this novel data source and analytical methods, our study supports data-driven and evidence-based decisions for public space management by utilizing a much larger sample size and finer spatial-temporal resolution than conventional surveys. Such an approach may offer a more dynamic and timely understanding of public space usage compared to conventional public surveys or behavior logs that rely on recruited volunteers. While this data does not provide real-time location information, our analysis reveals hourly jogging patterns that offer valuable evidence for understanding human activity, particularly during public health crises like COVID-19. Furthermore, such an activity-based analysis can support the university’s future planning and public space design to promote a safer and more pedestrian-friendly campus. For example, the campus can identify informal jogging spaces and improve the road surface, signage, and public amenities (e.g., benches, drinking fountains, restrooms) according to people’s jogging activity. Finally, the results provide some foundation for a future digital platform that engages more with local communities through participatory planning, crowd-sourcing, or citizen science.
