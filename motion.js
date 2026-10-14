"use strict";

(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const toggle = document.getElementById("motion-toggle");
  const hero = document.querySelector(".hero");
  const stage = document.querySelector(".hero-art");
  const portrait = document.querySelector(".portrait-shell");
  const aura = document.querySelector(".pointer-aura");
  const canvas = document.getElementById("neural-field");
  const context = canvas.getContext("2d");
  let paused = false;
  try { paused = localStorage.getItem("portfolio-motion-paused") === "true"; } catch { /* Storage is optional. */ }
  let heroVisible = true;
  let frame = 0;
  let lastFrame = null;
  let drawAccumulator = 0;
  let sceneTime = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let pointerFrame = 0;
  let scrollFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const scenePointer = { x: 0, y: 0 };
  const pointerTarget = { x: 0, y: 0 };
  let stageBounds = null;
  let pointerInside = false;
  const revealElements = [];

  const canAnimate = () => !paused && !reducedMotion.matches;

  function updateToggle() {
    const persian = root.lang === "fa";
    const label = reducedMotion.matches
      ? (persian ? "حرکت‌ها طبق تنظیمات دستگاه کاهش یافته‌اند" : "Motion reduced by your device settings")
      : paused
        ? (persian ? "پخش انیمیشن‌ها" : "Play animations")
        : (persian ? "توقف انیمیشن‌ها" : "Pause animations");
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    toggle.setAttribute("aria-pressed", String(paused || reducedMotion.matches));
    toggle.disabled = reducedMotion.matches;
  }

  // Two identical tracks form a continuous loop without fetching any assets.
  const strip = document.querySelector(".tool-strip-inner");
  const track = document.createElement("div");
  track.className = "marquee-track";
  Array.from(strip.children).forEach(child => track.appendChild(child));
  strip.appendChild(track);
  const secondTrack = track.cloneNode(true);
  secondTrack.setAttribute("aria-hidden", "true");
  secondTrack.querySelectorAll("[data-i18n]").forEach(element => {
    element.dataset.marqueeTranslation = element.dataset.i18n;
    element.removeAttribute("data-i18n");
  });
  strip.appendChild(secondTrack);

  function syncLanguage() {
    updateToggle();
    secondTrack.querySelectorAll("[data-marquee-translation]").forEach(element => {
      const original = track.querySelector(`[data-i18n="${element.dataset.marqueeTranslation}"]`);
      if (original) element.textContent = original.textContent;
    });
  }
  new MutationObserver(syncLanguage).observe(root, { attributes: true, attributeFilter: ["lang"] });

  if ("IntersectionObserver" in window) {
    document.querySelectorAll(".section-heading, .about-content, .section-top, .work-card, .skill-row, .education-section h2, .education-item, .credentials, .contact-panel").forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 3) * 85}ms`);
      revealElements.push(element);
    });
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -20px 0px" });
    revealElements.forEach(element => revealObserver.observe(element));
    document.body.classList.add("motion-enabled");

    new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      syncLoop();
    }, { rootMargin: "100px" }).observe(hero);
  }

  // Fibonacci sphere: deterministic points, rotating wire connections and signals.
  const points = Array.from({ length: 96 }, (_, index) => {
    const y = 1 - (index / 95) * 2;
    const radius = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius };
  });
  const connections = [];
  points.forEach((point, index) => {
    for (let next = index + 1; next < points.length; next++) {
      const other = points[next];
      const distance = Math.hypot(point.x - other.x, point.y - other.y, point.z - other.z);
      if (distance < .43) connections.push([index, next]);
    }
  });

  function drawScene(time) {
    if (!context || !canvasWidth || !canvasHeight) return;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    const angleY = time * .00012 + scenePointer.x * .3;
    const angleX = -.3 + scenePointer.y * .16;
    const radius = Math.min(canvasWidth, canvasHeight) * .45;
    const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
    const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
    const projected = points.map(point => {
      const x = point.x * cosY + point.z * sinY;
      const z = point.z * cosY - point.x * sinY;
      const y = point.y * cosX - z * sinX;
      const depth = point.y * sinX + z * cosX;
      const perspective = 2.8 / (2.8 - depth * .35);
      return { x: canvasWidth / 2 + x * radius * perspective, y: canvasHeight / 2 + y * radius * perspective, depth };
    });
    connections.forEach(([first, second], index) => {
      const a = projected[first], b = projected[second];
      const opacity = .09 + ((a.depth + b.depth + 2) / 4) * .22;
      context.beginPath();
      context.strokeStyle = `rgba(33,85,233,${opacity})`;
      context.lineWidth = .65;
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
      if (index % 11 === 0) {
        const progress = ((time * .00025 + index * .13) % 1);
        context.beginPath();
        context.fillStyle = index % 2 === 0 ? "#e3bc26" : "#2155e9";
        context.arc(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress, 2, 0, Math.PI * 2);
        context.fill();
      }
    });
    projected.forEach((point, index) => {
      const size = 1.3 + (point.depth + 1) * .9;
      context.beginPath();
      context.fillStyle = index % 13 === 0 ? "rgba(227,188,38,.8)" : `rgba(33,85,233,${.18 + (point.depth + 1) * .27})`;
      context.arc(point.x, point.y, size, 0, Math.PI * 2);
      context.fill();
      if (index % 13 === 0) {
        context.beginPath();
        context.strokeStyle = "rgba(227,188,38,.25)";
        context.arc(point.x, point.y, size + 5, 0, Math.PI * 2);
        context.stroke();
      }
    });
  }

  function sizeCanvas() {
    canvasWidth = canvas.clientWidth;
    canvasHeight = canvas.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.round(canvasWidth * ratio);
    const height = Math.round(canvasHeight * ratio);
    if (canvas.width !== width) canvas.width = width;
    if (canvas.height !== height) canvas.height = height;
    if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stageBounds = stage.getBoundingClientRect();
    drawScene(sceneTime);
    updateScroll();
  }

  function animate(timestamp) {
    if (!canAnimate() || document.hidden || !heroVisible) { frame = 0; lastFrame = null; return; }
    const delta = lastFrame === null ? 0 : Math.min(Math.max(timestamp - lastFrame, 0), 50);
    lastFrame = timestamp;
    sceneTime += delta;
    const followingPointer = pointerInside || Math.abs(scenePointer.x) + Math.abs(scenePointer.y) > .0001;
    if (followingPointer) {
      // One shared, time-based response for the photo and the wireframe. No
      // layout reads or style writes occur in the high-frequency pointer handler.
      const smoothing = 1 - Math.exp(-delta / 75);
      scenePointer.x += (pointerTarget.x - scenePointer.x) * smoothing;
      scenePointer.y += (pointerTarget.y - scenePointer.y) * smoothing;
      portrait.style.setProperty("--scene-x", `${-scenePointer.y * 5}deg`);
      portrait.style.setProperty("--scene-y", `${scenePointer.x * 7}deg`);
    }
    const interval = 1000 / (followingPointer ? 60 : 30);
    drawAccumulator += delta;
    if (drawAccumulator + .01 >= interval) {
      // Keep the remainder so fractional display timestamps cannot lose slots.
      drawAccumulator = Math.max(0, drawAccumulator - Math.floor((drawAccumulator + .01) / interval) * interval);
      drawScene(sceneTime);
    }
    frame = requestAnimationFrame(animate);
  }

  function syncLoop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = null;
    drawAccumulator = 0;
    if (canAnimate() && !document.hidden && heroVisible && context) frame = requestAnimationFrame(animate);
    else drawScene(sceneTime);
  }

  function resetInteractions() {
    pointerInside = false;
    pointerTarget.x = pointerTarget.y = 0;
    scenePointer.x = scenePointer.y = 0;
    portrait.style.removeProperty("--scene-x");
    portrait.style.removeProperty("--scene-y");
    document.querySelectorAll(".work-card, .button").forEach(element => {
      ["--tilt-x", "--tilt-y", "--magnet-x", "--magnet-y"].forEach(property => element.style.removeProperty(property));
    });
    aura.classList.remove("is-visible", "is-link");
  }

  function applyMotionPreference() {
    document.body.classList.toggle("motion-paused", !canAnimate());
    if (!canAnimate()) resetInteractions();
    updateToggle();
    syncLoop();
  }

  toggle.addEventListener("click", () => {
    paused = !paused;
    try { localStorage.setItem("portfolio-motion-paused", String(paused)); } catch { /* Keep the current-session preference. */ }
    applyMotionPreference();
  });
  reducedMotion.addEventListener("change", applyMotionPreference);
  precisePointer.addEventListener("change", resetInteractions);
  document.addEventListener("visibilitychange", syncLoop);

  function updateScroll() {
    scrollFrame = 0;
    if (pointerInside) stageBounds = stage.getBoundingClientRect();
    const maximum = root.scrollHeight - window.innerHeight;
    root.style.setProperty("--progress", maximum > 0 ? String(Math.min(1, Math.max(0, window.scrollY / maximum))) : "0");
    document.body.classList.toggle("has-scrolled", window.scrollY > 15);
  }
  window.addEventListener("scroll", () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }, { passive: true });

  document.addEventListener("pointermove", event => {
    if (!canAnimate() || !precisePointer.matches || event.pointerType === "touch") return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    aura.classList.add("is-visible");
    aura.classList.toggle("is-link", Boolean(event.target.closest("a, button")));
    if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
      aura.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      pointerFrame = 0;
    });
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => aura.classList.remove("is-visible"));

  stage.addEventListener("pointerenter", () => {
    stageBounds = stage.getBoundingClientRect();
  });
  stage.addEventListener("pointermove", event => {
    if (!canAnimate() || !precisePointer.matches || event.pointerType === "touch" || !stageBounds?.width || !stageBounds?.height) return;
    pointerInside = true;
    pointerTarget.x = Math.max(-1, Math.min(1, ((event.clientX - stageBounds.left) / stageBounds.width - .5) * 2));
    pointerTarget.y = Math.max(-1, Math.min(1, ((event.clientY - stageBounds.top) / stageBounds.height - .5) * 2));
  }, { passive: true });
  stage.addEventListener("pointerleave", () => {
    pointerInside = false;
    pointerTarget.x = pointerTarget.y = 0;
  });

  document.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      if (!canAnimate() || !precisePointer.matches) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--tilt-x", `${(y - .5) * -8}deg`);
      card.style.setProperty("--tilt-y", `${(x - .5) * 9}deg`);
      card.style.setProperty("--light-x", `${x * 100}%`);
      card.style.setProperty("--light-y", `${y * 100}%`);
    }, { passive: true });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
  document.querySelectorAll(".button").forEach(button => {
    button.addEventListener("pointermove", event => {
      if (!canAnimate() || !precisePointer.matches) return;
      const bounds = button.getBoundingClientRect();
      button.style.setProperty("--magnet-x", `${(event.clientX - bounds.left - bounds.width / 2) * .12}px`);
      button.style.setProperty("--magnet-y", `${(event.clientY - bounds.top - bounds.height / 2) * .18}px`);
    }, { passive: true });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--magnet-x", "0px");
      button.style.setProperty("--magnet-y", "0px");
    });
  });

  if ("ResizeObserver" in window) new ResizeObserver(sizeCanvas).observe(stage);
  else window.addEventListener("resize", sizeCanvas, { passive: true });
  sizeCanvas();
  applyMotionPreference();
})();
