(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:2
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);


{
  class SliderClip {
    constructor(el) {
      this.el = el;
      this.Slides = Array.from(this.el.querySelectorAll("li"));
      this.Nav = Array.from(this.el.querySelectorAll("aside a"));
      this.totalSlides = this.Slides.length;
      this.current = 0;
      this.autoPlay = true; //true or false
      this.timeTrans = 4000; //transition time in milliseconds
      this.IndexElements = [];

      for (let i = 0; i < this.totalSlides; i++) {
        this.IndexElements.push(i);
      }

      this.setCurret();
      this.initEvents();
    }
    setCurret() {
      this.Slides[this.current].classList.add("current");
      this.Nav[this.current].classList.add("current_dot");
    }
    initEvents() {
      const self = this;

      this.Nav.forEach((dot) => {
        dot.addEventListener("click", (ele) => {
          ele.preventDefault();
          this.changeSlide(this.Nav.indexOf(dot));
        });
      });

      this.el.addEventListener("mouseenter", () => (self.autoPlay = false));
      this.el.addEventListener("mouseleave", () => (self.autoPlay = true));

      setInterval(function () {
        if (self.autoPlay) {
          self.current =
            self.current < self.Slides.length - 1 ? self.current + 1 : 0;
          self.changeSlide(self.current);
        }
      }, this.timeTrans);
    }
    changeSlide(index) {
      this.Nav.forEach((allDot) => allDot.classList.remove("current_dot"));

      this.Slides.forEach((allSlides) =>
        allSlides.classList.remove("prev", "current")
      );

      const getAllPrev = (value) => value < index;

      const prevElements = this.IndexElements.filter(getAllPrev);

      prevElements.forEach((indexPrevEle) =>
        this.Slides[indexPrevEle].classList.add("prev")
      );

      this.Slides[index].classList.add("current");
      this.Nav[index].classList.add("current_dot");
    }
  }

  const slider = new SliderClip(document.querySelector(".slider"));
}





// Service
(function () {
  const cursorEl = document.getElementById('fireCursor');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;   // mouse target
  let cx = mx, cy = my;                                          // cursor current (for smoothing)

  // smooth follow using rAF
  function tick(){
    const lerp = 0.18; // smoothing factor
    cx += (mx - cx) * lerp;
    cy += (my - cy) * lerp;
    cursorEl.style.transform = `translate(${cx - 0.5}px, ${cy - 0.6}px)` + ' translate(-50%, -60%)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // create floating sparks at the mouse position
  function spawnSparks(x, y){
    const count = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++){
      const s = document.createElement('div');
      s.className = 'spark';

      // random size / drift / duration
      const size = 6 + Math.random() * 10;
      const dx = (Math.random() * 40 - 20);               // left/right drift
      const dy = -60 - Math.random() * 60;                // float upward
      const dur = 500 + Math.random() * 500;              // ms

      s.style.width = s.style.height = size + 'px';
      s.style.left = x + 'px';
      s.style.top  = y + 'px';
      s.style.setProperty('--dx', dx + 'px');
      s.style.setProperty('--dy', dy + 'px');
      s.style.setProperty('--dur', dur + 'ms');

      document.body.appendChild(s);
      // cleanup
      setTimeout(() => s.remove(), dur + 50);
    }
  }

  // update target position + spawn sparks
  function handleMove(clientX, clientY){
    mx = clientX;
    my = clientY;
    cursorEl.style.left = clientX + 'px';
    cursorEl.style.top  = clientY + 'px';
    spawnSparks(clientX, clientY);
  }

  window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) handleMove(t.clientX, t.clientY);
  }, { passive: true });

  // keep inside viewport on resize
  window.addEventListener('resize', () => {
    mx = Math.min(mx, window.innerWidth  - 2);
    my = Math.min(my, window.innerHeight - 2);
  });
})();


// Service
var mainSlider = new Swiper(".mySwiper2", {
  direction: "vertical",
  parallax: true,
  speed: 1200,
  effect: "slide",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".upk-button-next",
    prevEl: ".upk-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + ' swiper-pagination-bullet--svg-animation"><svg width="28" height="28" viewBox="0 0 28 28"><circle class="svg__circle" cx="14" cy="14" r="10" fill="none" stroke-width="2"></circle><circle class="svg__circle-inner" cx="14" cy="14" r="2" stroke-width="3"></circle></svg></span>';
    },
  },
});
