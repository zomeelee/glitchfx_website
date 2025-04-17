// 等待文档加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const scrollDown = document.querySelector('.scroll-down');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.8)';
            navbar.style.padding = '15px 0';
        }
    });
    
    // 滚动到下一部分
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(18, 18, 18, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 如果是在移动端，点击后关闭菜单
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 英雄区域视差效果
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // 特效卡片动画
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    // 初始化特效卡片样式
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.5s ease';
    });
    
    // 轮播图自动滚动
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const cardWidth = testimonialCards[0].offsetWidth + 30; // 卡片宽度 + 间距
        let currentIndex = 0;
        
        // 自动滚动
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialSlider.scrollTo({
                left: cardWidth * currentIndex,
                behavior: 'smooth'
            });
        }, 5000);
    }
    
    // 添加视频播放控制
    const demoVideo = document.querySelector('.demo-video video');
    if (demoVideo) {
        demoVideo.addEventListener('click', function() {
            if (demoVideo.paused) {
                demoVideo.play();
            } else {
                demoVideo.pause();
            }
        });
    }
    
    // 添加 Glitch 文字效果增强
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.addEventListener('mouseover', function() {
            text.style.animationDuration = '0.5s';
        });
        
        text.addEventListener('mouseout', function() {
            text.style.animationDuration = '2s';
        });
    });
});