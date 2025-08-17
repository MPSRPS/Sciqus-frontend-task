document.addEventListener('DOMContentLoaded', function () {
  // Sidebar toggle for mobile
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('active');
    });

   
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 767 && sidebar.classList.contains('active')) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      }
    });
  }

  // Features Slider 
  const featureSlides = document.querySelectorAll('.feature-slide');
  const featureLeftArrow = document.querySelector('.features-slider-container .slider-arrow.left');
  const featureRightArrow = document.querySelector('.features-slider-container .slider-arrow.right');
  let currentFeatureIndex = 0;

  function showFeatureSlide(index) {
    featureSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  if (featureSlides.length > 0) {
    if (featureLeftArrow) {
      featureLeftArrow.addEventListener('click', function () {
        currentFeatureIndex = (currentFeatureIndex - 1 + featureSlides.length) % featureSlides.length;
        showFeatureSlide(currentFeatureIndex);
      });
    }

    if (featureRightArrow) {
      featureRightArrow.addEventListener('click', function () {
        currentFeatureIndex = (currentFeatureIndex + 1) % featureSlides.length;
        showFeatureSlide(currentFeatureIndex);
      });
    }

    
    setInterval(function () {
      currentFeatureIndex = (currentFeatureIndex + 1) % featureSlides.length;
      showFeatureSlide(currentFeatureIndex);
    }, 5000);
  }

  // Features Showcase Slider
  const showcaseSlides = document.querySelectorAll('.showcase-slide');
  const showcaseLeftArrow = document.querySelector('.features-showcase .slider-arrow.left');
  const showcaseRightArrow = document.querySelector('.features-showcase .slider-arrow.right');
  let currentShowcaseIndex = 0;

  function showShowcaseSlide(index) {
    showcaseSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  if (showcaseSlides.length > 0) {
    if (showcaseLeftArrow) {
      showcaseLeftArrow.addEventListener('click', function () {
        currentShowcaseIndex = (currentShowcaseIndex - 1 + showcaseSlides.length) % showcaseSlides.length;
        showShowcaseSlide(currentShowcaseIndex);
      });
    }

    if (showcaseRightArrow) {
      showcaseRightArrow.addEventListener('click', function () {
        currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseSlides.length;
        showShowcaseSlide(currentShowcaseIndex);
      });
    }

    
    setInterval(function () {
      currentShowcaseIndex = (currentShowcaseIndex + 1) % showcaseSlides.length;
      showShowcaseSlide(currentShowcaseIndex);
    }, 6000);
  }


  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 767 && sidebar) {
          sidebar.classList.remove('active');
        }
      }
    });
  });


  const ctaButtons = document.querySelectorAll('.cta-btn');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Add click effect
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Handle specific button actions
      if (this.classList.contains('btn-primary')) {
        
        console.log('Get Started clicked - would redirect to signup');
        // window.open('https://sciqusams.com/pricing/', '_blank');
      } else if (this.classList.contains('btn-secondary')) {
       
        console.log('Watch Demo clicked - would open demo video');
        // window.open('https://www.youtube.com/watch?v=F_7ikEiH-mA', '_blank');
      }
    });
  });

  // Solution items hover effects
  const solutionItems = document.querySelectorAll('.solution-item');
  solutionItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Benefit items animation on scroll
  const benefitItems = document.querySelectorAll('.benefit-item');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  benefitItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });

  // Error handling for image load failures
  document.querySelectorAll('img').forEach(img => {
    img.onerror = function () {
      this.style.display = 'none';
      console.log('Image failed to load:', this.src);
    };
  });

  // Responsive adjustments
  function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 767 && sidebar) {
      sidebar.classList.remove('active');
    }
  }

  window.addEventListener('resize', handleResize);

  // Add loading states
  function addLoadingState(element) {
    element.classList.add('loading');
    setTimeout(() => {
      element.classList.remove('loading');
    }, 1000);
  }

  // Performance optimization: Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Add subtle parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
      heroContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  console.log('Sciqus AMS website loaded successfully!');
});
