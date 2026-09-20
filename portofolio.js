/* =====================================================
   Portofolio - Main JS
   ===================================================== */

(function () {
  "use strict";

  /* -------- Preloader -------- */
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => preloader.classList.add("hidden"), 300);
    }
  });

  /* -------- Theme Toggle -------- */
  const html = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const themeIcon = toggleBtn ? toggleBtn.querySelector("i") : null;

  function getPreferredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      html.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.className = "bi bi-sun-fill";
    } else {
      html.removeAttribute("data-theme");
      if (themeIcon) themeIcon.className = "bi bi-moon-fill";
    }
    localStorage.setItem("theme", theme);
  }

  applyTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current =
        html.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* -------- Navbar Scroll -------- */
  const navbar = document.getElementById("mainNav");
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------- Active Nav Link on Scroll -------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  function setActiveLink() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });

  /* -------- Close mobile menu on link click -------- */
  const navCollapse = document.getElementById("navbarNav");
  document.querySelectorAll(".navbar .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  /* -------- Back to Top -------- */
  const backBtn = document.getElementById("backToTop");
  function toggleBackBtn() {
    if (!backBtn) return;
    if (window.scrollY > 500) {
      backBtn.classList.add("show");
    } else {
      backBtn.classList.remove("show");
    }
  }
  window.addEventListener("scroll", toggleBackBtn, { passive: true });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* -------- Skill bars animate on view -------- */
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".progress-bar").forEach((bar) => {
            const w = bar.style.width;
            bar.style.width = "0%";
            requestAnimationFrame(() => {
              setTimeout(() => {
                bar.style.width = w;
              }, 50);
            });
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  document
    .querySelectorAll(".skill-card")
    .forEach((card) => skillObserver.observe(card));

  /* -------- Smooth scroll for Safari -------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = this.getAttribute("href");
      if (target === "#" || target.length < 2) return;
      const el = document.querySelector(target);
      if (el) {
        e.preventDefault();
        const offset = 80;
        const top =
          el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
