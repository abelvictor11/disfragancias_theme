/* Hot Sale Landing - Disfragancias: UX helpers */
(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var root = document.querySelector('.hot-sale-landing');
    if (!root) return;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Init visual enhancements
    initReveal(root, reducedMotion);
    initCarousel(root, reducedMotion);
    initParallax(root, reducedMotion);

    // Smooth scroll for internal anchors inside landing
    root.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!id) return;
        var el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          try {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (_) {
            // Fallback
            var top = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo(0, top);
          }
        }
      });
    });

    // Export table to CSV
    var exportBtn = root.querySelector('[data-export-csv]');
    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        var table = root.querySelector('#categories-table');
        if (!table) return;
        var rows = Array.prototype.slice.call(table.querySelectorAll('tr'));
        var csv = rows
          .map(function (row) {
            var cells = Array.prototype.slice.call(row.querySelectorAll('th, td'));
            return cells
              .map(function (cell) {
                var text = (cell.innerText || '').replace(/\s+/g, ' ').trim();
                return '"' + text.replace(/"/g, '""') + '"';
              })
              .join(',');
          })
          .join('\r\n');
        var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'categorias-hot-sale.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Newsletter form UX: disable submit while sending
    var form = root.querySelector('#HotSaleNewsletter');
    if (form) {
      var btn = form.querySelector('button[type="submit"]');
      form.addEventListener('submit', function () {
        if (btn && !btn.disabled) {
          btn.dataset.originalText = btn.textContent || '';
          btn.textContent = 'Enviando...';
          btn.disabled = true;
        }
      });
    }

    /* ===== Functions ===== */
    function initReveal(scope, rm) {
      var io;
      try {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var el = entry.target;
              if (el.classList.contains('stagger')) {
                var children = Array.prototype.slice.call(el.children);
                children.forEach(function (c, i) {
                  c.style.transitionDelay = (i * 60) + 'ms';
                });
              }
              el.classList.add('is-in');
              io.unobserve(el);
            }
          });
        }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
      } catch (_) {
        // Fallback: if IO unsupported just show immediately
        io = null;
      }

      var targets = scope.querySelectorAll('.reveal, .stagger');
      targets.forEach(function (el) {
        if (io && !rm) io.observe(el); else el.classList.add('is-in');
      });
    }

    function initCarousel(scope, rm) {
      var carousels = scope.querySelectorAll('.hs-carousel');
      carousels.forEach(function (c) {
        var track = c.querySelector('.hs-carousel__track');
        if (!track) return;
        var slides = Array.prototype.slice.call(c.querySelectorAll('.hs-carousel__slide'));
        var btnPrev = c.querySelector('[data-prev]');
        var btnNext = c.querySelector('[data-next]');
        var dots = c.querySelector('.hs-carousel__dots');
        var index = 0;
        var timer = null;
        var autoMs = 5000;

        // Build dots if missing
        if (!dots) {
          dots = document.createElement('div');
          dots.className = 'hs-carousel__dots';
          c.appendChild(dots);
        }
        dots.innerHTML = '';
        slides.forEach(function (_, i) {
          var d = document.createElement('button');
          d.type = 'button';
          d.className = 'hs-carousel__dot';
          d.setAttribute('aria-label', 'Ir al slide ' + (i + 1));
          d.addEventListener('click', function () { goTo(i); stopAuto(); });
          dots.appendChild(d);
        });

        function update() {
          track.style.transform = 'translateX(' + (-index * 100) + '%)';
          var ds = dots.querySelectorAll('.hs-carousel__dot');
          ds.forEach(function (el, i) {
            el.classList.toggle('is-active', i === index);
          });
          slides.forEach(function (s, i) {
            s.setAttribute('aria-hidden', i !== index ? 'true' : 'false');
          });
        }

        function goTo(i) {
          index = (i + slides.length) % slides.length;
          update();
        }
        function next() { goTo(index + 1); }
        function prev() { goTo(index - 1); }

        if (btnPrev) btnPrev.addEventListener('click', function () { prev(); stopAuto(); });
        if (btnNext) btnNext.addEventListener('click', function () { next(); stopAuto(); });

        // Swipe support
        var startX = 0, dx = 0, touching = false;
        c.addEventListener('pointerdown', function (e) { touching = true; startX = e.clientX; dx = 0; });
        c.addEventListener('pointermove', function (e) { if (!touching) return; dx = e.clientX - startX; });
        c.addEventListener('pointerup', function () {
          if (!touching) return; touching = false;
          if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); stopAuto(); }
        });
        c.addEventListener('pointercancel', function () { touching = false; });

        // Autoplay
        function startAuto() { if (rm) return; stopAuto(); timer = setInterval(next, autoMs); }
        function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }
        c.addEventListener('mouseenter', stopAuto);
        c.addEventListener('mouseleave', startAuto);
        c.addEventListener('focusin', stopAuto);
        c.addEventListener('focusout', startAuto);

        update();
        startAuto();
      });
    }

    function initParallax(scope, rm) {
      if (rm) return;
      var media = scope.querySelector('.hot-sale-landing__hero-media');
      if (!media) return;
      var ticking = false;
      function onScroll() {
        if (ticking) return; ticking = true;
        requestAnimationFrame(function () {
          var rect = media.getBoundingClientRect();
          var vh = window.innerHeight || 800;
          var progress = 1 - Math.min(Math.max(rect.top / vh, -1), 1); // -1..1
          var translate = Math.max(Math.min(progress * -12, 16), -16);
          media.style.transform = 'translateY(' + translate + 'px)';
          ticking = false;
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });
})();
