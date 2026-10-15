(function () {
  "use strict";

  var header = document.getElementById("header");
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var yearEl = document.getElementById("year");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest(".nav__link")) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  document.querySelectorAll("[data-metrics]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (typeof ym === "function") {
        ym(95320166, "reachGoal", "click_" + el.getAttribute("data-metrics"));
      }
    });
  });
})();
