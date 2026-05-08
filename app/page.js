'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const MEDIA = [
  { type: 'image', src: '/hero-tower.png' },
  { type: 'video', src: '/videos/marina.mp4' },
  { type: 'video', src: '/videos/construction.mp4' },
  { type: 'video', src: '/videos/neighborhood.mp4' },
  { type: 'video', src: '/videos/city-street.mp4' },
  { type: 'video', src: '/videos/event.mp4' },
];

const HOLD = 8000;
const FADE = 2000;

export default function Home() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const vids = useRef([]);
  const timer = useRef(null);

  const advance = useCallback(() => {
    setCur(c => {
      const next = (c + 1) % MEDIA.length;
      setPrev(c);
      return next;
    });
    setTimeout(() => setPrev(null), FADE);
  }, []);

  useEffect(() => {
    timer.current = setInterval(advance, HOLD);
    return () => clearInterval(timer.current);
  }, [advance]);

  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === cur) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else if (i !== prev) {
        v.pause();
      }
    });
  }, [cur, prev]);

  return (
    <div className="page">

      {/* ── TOP BANNER ── */}
      <header className="top-banner">
        <img
          className="logo-mark"
          src="/o-mark-on-dark.png"
          alt="Optronix"
          width={130}
          height={130}
        />
        <a className="logo-wordmark" href="/">optronix.systems</a>
      </header>

      {/* ── MIDDLE — video shows through here ── */}
      <section className="middle">
        <div className="bg-wrap">
          {MEDIA.map((m, i) => {
            const isActive = i === cur;
            const isPrev = i === prev;
            return (
              <div
                key={i}
                className={`bg-slide${isActive ? ' active' : ''}${isPrev ? ' prev' : ''}`}
              >
                {m.type === 'video'
                  ? <video
                      ref={el => vids.current[i] = el}
                      src={m.src}
                      muted
                      loop
                      playsInline
                      preload="none"
                    />
                  : <img src={m.src} alt="" />
                }
              </div>
            );
          })}
          <div className="bg-overlay" />
        </div>
        <h1 className="hero-title">
          Site<br /><span className="accent">Sentry</span><br />Solutions
        </h1>
      </section>

      {/* ── TOWER SILHOUETTE — spans footer up into video ── */}
      <img
        className="tower-silhouette"
        src="/tower-render.png"
        alt=""
        aria-hidden="true"
      />

      {/* ── BOTTOM BANNER ── */}
      <footer className="bottom-banner">
        <div className="wordmark-row">
          <img className="wordmark-icon" src="/o-mark-on-dark.png" alt="" width={24} height={24} />
          <span className="wordmark-text">Optronix.Systems</span>
        </div>
        <p className="coming-soon">site coming soon...</p>
        <a className="email-link" href="mailto:info@optronix.systems">info@optronix.systems</a>
        <span className="copyright">&copy; {new Date().getFullYear()} Optronix Systems</span>
      </footer>

    </div>
  );
}
