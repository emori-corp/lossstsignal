# LOSSSTSIGNAL.COM

A single continuous vertical transmission: ✠ → U → EMORI → ✠ → (loop).
Static site. No build step, no frameworks, no external network calls.

    index.html
    style.css
    script.js
    /assets/
        cross.gif          rotating cross (landing + return)
        cross-still.png     static frame of the cross (reduced-motion fallback)
        cross-metal.png     supplied metallic cross (available; unused in this cut)
        u.webm / u.mp4      the record "U" — full-viewport environment
        u-poster.jpg        first-frame poster for the video
        inter-var.woff2     self-hosted Inter (variable, weights 100–900)

## Deploy
Drag this folder into Cloudflare Pages, or push to a repo and enable GitHub
Pages (serve from root). Everything is referenced relatively — it also runs
by opening index.html locally.

## Notes
- The supplied U video (.mov / HEVC, ~26 MB) was transcoded to u.mp4 (H.264,
  faststart, for Safari/iOS) and u.webm (VP9, smaller, for Chrome/Firefox) so it
  autoplays inline across browsers. Audio is preserved for the SOUND control.
- The cross is the only navigation. The landing page is sealed (no scroll) until
  the cross is clicked. The final cross resets the whole experience and loops.
- Typography is self-hosted Inter (neo-grotesk) — no Google Fonts request.
- Restrained oxblood (#7E1520) appears only on the recurring ✠ mark; the red of
  the world otherwise lives entirely in the U video.
- Reduced-motion users get a still cross instead of the rotating GIF.
