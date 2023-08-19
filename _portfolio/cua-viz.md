---
title: "Activity and Prices"
excerpt: "Do Vibrant Places Promote Active Living? Analyzing Local Vibrancy, Running Activity, and Real Estate Prices in Beijing"
date: 2022-09-13T11:48:41-04:00
tags:
  - spatial analysis
  - representation
header:
  image: /assets/images/portfolio/Screenshot 2023-08-11 at 10.34.37.jpg
  teaser: /assets/images/portfolio/Screenshot 2023-08-18 at 12.38.15.jpg
sidebar:
  - title: "Role"
    text: "Designer, Front-End Developer"
  - title: "Responsibilities"
    text: "Questionnaire website maintenance 50%, model training 100%, navigation website development 50%"
  - title: "Developed Skills"
    text: "JavaScript, Mapbox "
typora-root-url: ./..
---

Although extensive research has investigated urban vibrancy as a critical indicator for spatial planning, urban design, and economic development, the unclear relationship between local vibrancy and active living needs to be clarified and requires more in-depth analysis. This study localizes urban vibrancy at both hyper-local and neighborhood scales by integrating high-resolution, large-scale, and heterogeneous urban datasets and analyzing interactions among variables representing vibrancy’s environmental, economic, and social aspects. We utilize publicly available urban open data, Points of Interest requested from API, and leisure running trajectories acquired through data mining to investigate the spatial distribution of various vibrancy indicators and how they interact with physical activity at the local scale. Based on these variables, we then construct linear regression models and Geographically Weighted Regression (GWR) models to test and estimate how local vibrancy and physical activity relate to residential real estate characteristics. The results reveal the strong impact of urban form on local vibrancy but not physical activeness. At the neighborhood level, all vibrancy factors are statistically significant to local residential real estate prices but with different interactions based on location. Our study highlights the importance of accounting for locality and different physical, environmental, social, and economic factors when analyzing and interpreting urban vibrancy at a granular scale within a city.


![figure1](https://mmbiz.qpic.cn/mmbiz_png/lmnCZsz6KzFRRPZAErjUD5RZILZSDpHiatfJ9K9mHDPvjEak02r9zVMSMU3OBRFk6oSnlNia1OuvtAUxKtaMmGLQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

# Findings

Spatial distribution of vitality: After measuring the vitality indicators at two scales, it is found that the spatial distribution of the vitality indicators shows a clear monocentric pattern, with positive correlation coefficients between most of the indicators, suggesting that they have stronger synergistic rather than conflicting effects in promoting urban vitality.

![figure3](https://mmbiz.qpic.cn/mmbiz_png/lmnCZsz6KzFRRPZAErjUD5RZILZSDpHiaibAZllnQONy3fhet2dg5SUtgmLvjv9dlyIrqVialmw75nKMzPdicuvODQ/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

# Contributions

This study investigated the spatial–temporal dynamics of urban vibrancy in Beijing and how various factors correlate with neighborhood vibrancy at a hyper-local scale. The research findings prove the strong spatial autocorrelation of vibrancy measures that resonate with the planning theory of urban form and the First Law of Geography, but not all vibrancy measures are positively correlated. Although physical activity is related to the local population, residential percentage, business, and public facilities, it does not show a strong spatial gradient that matches the monocentric urban form as vibrancy. GWR models perform better than regular regression models for both hyper-local and neighborhood (sub-district) scales, indicating the importance of locality for analyzing vibrancy. For real estate analysis, the GWR model explains about 82% of the local vibrancy variation and reveals different interactions among vibrancy factors according to the spatial distribution of coefficients at the sub-district level. In conclusion, such integrated high-resolution data reveal local variations of urban vibrancy and provide more actionable insights for future neighborhood development involving spatial planning, human mobility, facility allocation, and many other factors related to urban vibrancy.

# related publiction

Lai Y, Li J, Zhang J, Yan L, Liu Y. Do Vibrant Places Promote Active Living? Analyzing Local Vibrancy, Running Activity, and Real Estate Prices in Beijing. International Journal of Environmental Research and Public Health. 2022; 19(24):16382. https://doi.org/10.3390/ijerph192416382

# Representation Demo(processing)

[link](https://lauyihong.github.io/CUAviz)