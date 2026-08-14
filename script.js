/* =========================================================
   LOSSSTSIGNAL — transmission logic (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  var docEl = document.documentElement;
  docEl.classList.add("js"); // enable progressive-enhancement styles

  var body        = document.body;
  var video       = document.getElementById("u-video");
  var sound       = document.getElementById("sound");
  var soundState  = document.getElementById("sound-state");
  var enterCross  = document.getElementById("enter-cross");
  var returnCross = document.getElementById("return-cross");
  var endSection  = document.getElementById("end");
  var veil        = document.getElementById("veil");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- reduced motion: the cross holds still (same mark, not spinning) --- */
  if (reduceMotion) {
    Array.prototype.forEach.call(
      document.querySelectorAll(".cross-button img"),
      function (img) { img.src = "assets/cross-still.png"; }
    );
  }

  /* --- muted autoplay behind the landing gate ---------------- */
  // Keep it muted so mobile browsers permit autoplay; it plays
  // invisibly under the landing so U is ready the instant you enter.
  video.muted = true;
  var tryPlay = function () {
    var p = video.play();
    if (p && typeof p.catch === "function") { p.catch(function () {}); }
  };
  tryPlay();

  /* --- 01 → 02  cross the threshold into U ------------------- */
  var entered = false;
  function enter() {
    if (entered) return;
    entered = true;
    body.classList.remove("locked");   // open the sealed page
    body.classList.add("entered");
    tryPlay();
  }
  enterCross.addEventListener("click", enter);

  /* --- SOUND / OFF ⇄ SOUND / ON ------------------------------ */
  function setSound(on) {
    video.muted = !on;
    sound.setAttribute("aria-pressed", on ? "true" : "false");
    sound.setAttribute(
      "aria-label",
      on ? "Sound on. Tap to turn sound off." : "Sound off. Tap to turn sound on."
    );
    soundState.textContent = on ? "ON" : "OFF";
    if (on) { tryPlay(); }
  }
  sound.addEventListener("click", function () {
    setSound(video.muted); // muted → turn on; unmuted → turn off
  });

  /* --- hide the sound control once past U -------------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var past = window.pageYOffset > window.innerHeight * 0.55;
      sound.classList.toggle("hidden", past);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* --- scroll reveal for the EMORI manifesto ----------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* --- final cross arrival ----------------------------------- */
  if ("IntersectionObserver" in window) {
    var endIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        endSection.classList.toggle("arrived", e.isIntersecting);
      });
    }, { threshold: 0.4 });
    endIo.observe(endSection);
  } else {
    endSection.classList.add("arrived");
  }

  /* --- 04 → 01  return / loop reset -------------------------- */
  function resetExperience() {
    window.scrollTo(0, 0);
    try {
      video.pause();
      video.currentTime = 0;
    } catch (err) {}
    setSound(false);            // reset to muted / OFF
    sound.classList.remove("hidden");
    endSection.classList.remove("arrived");
    entered = false;
    body.classList.remove("entered"); // restore landing
    body.classList.add("locked");     // re-seal the page
    tryPlay();
  }

  returnCross.addEventListener("click", function () {
    if (reduceMotion) {
      resetExperience();
      return;
    }
    veil.classList.add("show");           // fade to black
    window.setTimeout(function () {
      resetExperience();                  // reset while hidden
      requestAnimationFrame(function () {
        veil.classList.remove("show");    // reveal the landing
      });
    }, 850);
  });

})();
