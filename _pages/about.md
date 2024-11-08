---
classes: wide
permalink: /about/
feature_row:
  - image_path: assets/images/portfolio/allocation-head.png
    alt: "placeholder image 1"
    title: <a href="portfolio/covid-allocation/">Allocating Covid Testing Stations in large-scale </a>
    excerpt: "Covid testing stations allocating optimization and decomposition in 2022 Lockdown Shanghai."
  - image_path: assets/images/portfolio/running-head.png
    alt: "placeholder image 1"
    title: <a href="portfolio/analysis-running/">Jogging Analysis</a>
    excerpt: "Analyzing jogging activity patterns and adaptation to public health regulation."
  - image_path: assets/images/portfolio/bjmap-head.png
    alt: "placeholder image 2"
    title: <a href="portfolio/cua-viz/">Beijing Infrastructure</a>
    excerpt: "Analyzing local virbrancy, running activity, and real estate prices in Beijing."
  - image_path: assets/images/portfolio/shanghai-head.png
    alt: "placeholder image 1"
    title: <a href="portfolio/quantify-street/">Streets and Real Estate</a>
    excerpt: "Investigating the impact of perceived micro-level neighborhood characteristics on housing prices in Shanghai"
  - image_path: assets/images/portfolio/map-head.png
    alt: "placeholder image 1"
    title: <a href="portfolio/perception-map/">Street Computer Vision</a>
    excerpt: "Research on citizen streetscape evaluation based on crowd sourcing survey and the application of navigation optimization."
  - image_path: assets/images/portfolio/informal-head.png
    alt: "placeholder image 1"
    title: <a href="portfolio/informal-map/">Informal-Mapping</a>
    excerpt: "Computing places and human activity in data-absent informal urban settlements."
---

<!-- - image_path: assets/images/portfolio/ar-head.png
alt: "placeholder image 1"
title: <a href="portfolio/metro-ar/">Underground Portal</a>
excerpt: "An inclusive template to assis people in blocked subway feeling the surficial city in XR world" -->

<!-- Set the font size to 80% of the original size -->
<style>
    body {
        font-size: 90%; 
    }
    /* 窄屏幕（如手机）下的样式 */
    @media screen and (max-width: 768px) {
      /* 将左右布局变为上下布局 */
      .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
  
      /* 图片居中并缩小 */
      .content-wrapper img {
        max-width: 100%; /* 图片占满宽度 */
        height: auto; /* 保持图片宽高比 */
      }
  
      /* 调整文字块的宽度以适应屏幕 */
      .text-content {
        width: 90%; /* 让文字块在窄屏幕下也有适应宽度 */
        padding: 10px;
      }
    }
  
    /* 宽屏幕（如桌面设备）下的样式 */
    .content-wrapper {
      display: flex;
      align-items: center;
      padding-top: 9vh;
    }
  
    .text-content {
      flex: 1;
      padding-right: 20px;
    }
  
    .content-wrapper img {
      flex: 1;
      max-width: 80%; /* 图片在宽屏下保持适中的大小 */
      height: auto;
      display: block;
      margin: 0 auto;
    }
  </style>
  
<div style="flex: 1; display: flex; justify-content: center; padding-top: 3vh;">
  <br>
    This website is still under construction... Come back later!
  </div>
  
  <!-- 页面内容部分 -->
  <div class="content-wrapper">
    <!-- 左边的文本内容 -->
    <div class="text-content">
      <span style="font-weight: bold;font-size: 120%;">
      This is Yifeng, a grad student at <a href="http://dusp.mit.edu">DUSP</a> and <a href="https://www.eecs.mit.edu/">EECS</a> at MIT. 
      </span>
      <br><br>
      From DUSP, my research focuses on the application of urban operations research. In EECS, under the supervision of <a href="https://mraghavan.github.io/">Manish Raghavan</a>, I am researching how to implement fairness in AI within complex industrial recommendation systems.      
      <br><br>
      Prior to MIT, I earned my Bachelor's degree in Architecture from Tsinghua University, where I worked under the guidance of Professors Yuan Lai and Hui Wang, with a strong focus on urban economics and human mobility research.      
      <br><br>
      Scroll down to explore my <a href="#post-section">▽ rescent blogs ▽</a> and <a href="#articles-section">▽ previous work! ▽</a>
      <br> 
      <br>
      <img src="https://visitor-badge.laobi.icu/badge?page_id=lauyihong/lauyihong.github.io" alt="Visitor Count" style="float: left; margin-right: 10px;">
    </div>
    <!-- 右边的图片内容 -->
    <div style="flex: 1; display: flex; justify-content: center;">
      <img src="/assets/images/yifeng_2024.jpg" alt="Yifeng's photo">
    </div>
  </div>
  

<div style="padding-top: 3vh;">

  <!-- posts -->
  <span id="post-section" style="font-size: 1.2em; font-weight: bold;">Research and Projects</span><br><br>

  {% if paginator %}
    {% assign posts = paginator.posts %}
  {% else %}
    {% assign posts = site.posts %}
  {% endif %}

  {% assign entries_layout = page.entries_layout | default: 'list' %}
  <div class="entries-{{ entries_layout }}">
    The world is changing because of the innovative methods of AI, and so am I. Much of my recent work is still in the peer review process or in draft form, but I will post as much as I can here.
    {% for post in posts %}
      {% include archive-single.html type=entries_layout %}
    {% endfor %}
    The further information about me can be found in my <a href="/about/">About</a> and <a href="/portfolio/">Portfolio</a> pages. If anyone is interested in my work, or our band's music, please feel free to connect me! <br><br>
  </div>

  <span id="articles-section" style="font-size: 1.2em; font-weight: bold;">Previous Research & Design Experiences</span><br><br>
  {% include feature_row %}
    
  {% include paginator.html %}


</div>
     


<!-- Avatar Image -->
<div style="text-align: center; padding-top: 5vh">
  <p style="font-size: 1.2em;">Thanks for your reading~<br>| <a href="https://dusp.mit.edu/people/yifeng-liu">DUSP Page</a> | <a href="https://www.linkedin.com/in/lauyihong/">LinkedIn</a> | <a href="https://www.researchgate.net/profile/Yifeng-Liu-25">ResearchGate</a> | <a href="https://lauyihong.github.io/about/">AboutMe</a> |
  </p>
  <!-- <img id="avatarImage" src="/assets/images/portfolio/websiterealphoto.jpg" alt="Avatar" style="width: 68%; max-width: 480px; margin-bottom: 3vh "> -->
</div>

<script>
    function toggleImage() {
        var avatar = document.getElementById("avatarImage");
        if (avatar.src.match("avatar-head-square.png")) {
            avatar.src = "/assets/images/avatar-head-square-2.png";
        } else {
            avatar.src = "/assets/images/avatar-head-square.png";
        }
    }
</script>

<script>
    const targetText = "I am an architect, graphic designer, data representations developer, and also an researcher focus on urban system and human mobility...";
    let currentText = "";
    let index = 0;

    function typeText() {
        if (index < targetText.length) {
            currentText += targetText[index];
            document.getElementById('typewriter').innerText = currentText;
            index++;
            setTimeout(typeText, 36);  // 等待0.1秒
        }
    }

    window.onload = typeText;  // 当页面加载完成后开始打字动画
</script>


