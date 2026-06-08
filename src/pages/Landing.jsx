import { useState, useEffect, useRef } from 'react'
import { RussianRuble, UserRoundPlus, LogIn, SunMoon, TrendingUp, UserRoundCheck, HeartPlus, Menu, X } from 'lucide-react'
import LoginModal from '../components/LoginModal'
import { useWindowWidth } from '../hooks/useWindowWidth'

export default function Landing({ onLogin, dark = false, toggleTheme }) {
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const width = useWindowWidth()
  const isMobile = width <= 1024

  // close on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileMenuOpen])

  const c = {
    bg:             dark ? '#1e3a8a' : '#e0f2fe',
    navBg:          dark ? '#1e3a8a' : '#f0f9ff',
    navBorder:      dark ? '#1d4ed8' : '#bae6fd',
    text:           dark ? '#eff6ff' : '#075985',
    textMuted:      dark ? '#bfdbfe' : '#0369a1',
    cardBg:         dark ? '#1e3a8a' : '#ffffff',
    cardBorder:     dark ? '#1d4ed8' : '#bae6fd',
    primaryBtnBg:   dark ? '#dbeafe' : '#0c4a6e',
    primaryBtnColor:dark ? '#172554' : '#dbeafe',
    ghostColor:     dark ? '#bfdbfe' : '#0369a1',
    iconBtnBg:      dark ? 'rgba(255,255,255,0.15)' : 'rgba(7,89,133,0.15)',
    iconBtnBorder:  dark ? '#1d4ed8' : '#bae6fd',
    iconBtnColor:   dark ? '#bfdbfe' : '#0369a1',
    processBg:      dark ? '#0284c7' : '#ecfccb',
    processText:    dark ? '#dbeafe' : '#0c4a6e',
    processNumBg:   dark ? '#dbeafe' : '#0c4a6e',
    processNumColor:dark ? '#172554' : '#ffffff',
    processRightBg: '#bfdbfe',
    donutCenterBg:  dark ? '#1e3a8a' : '#e0f2fe',
    donutCenterText:dark ? '#dbeafe' : '#0c4a6e',
    donutCenterSub: dark ? '#bfdbfe' : '#075985',
    footerBorder:   dark ? '#1d4ed8' : '#bae6fd',
    footerText:     dark ? '#dbeafe' : '#075985',
    footerLink:     dark ? '#bfdbfe' : '#0369a1',
    wordmark:       dark ? 'rgba(219,234,254,0.5)' : 'rgba(147,197,253,0.45)',
  }

  const ghostBtnD = { ...ghostBtn, color: c.ghostColor }
  const primaryBtnD = { ...primaryBtn, background: c.primaryBtnBg, color: c.primaryBtnColor }
  const iconBtnD = { ...iconBtn, background: c.iconBtnBg, borderColor: c.iconBtnBorder, color: c.iconBtnColor }

  return (
    <div style={{ fontFamily: "'Golos Text', Arial, sans-serif", background: c.bg, minHeight: '100vh', transition: 'background 0.25s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=Nunito+Sans:wght@700;800&family=Syne:wght@600;700&display=swap" rel="stylesheet" />

      {/* Nav — вне main, sticky на весь лендинг */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 18, minHeight: 54, padding: '8px 16px',
        border: `1px solid ${c.navBorder}`, borderTop: 0,
        borderRadius: '0 0 24px 24px', background: c.navBg,
        marginInline: 'clamp(16px, 3.35vw, 48px)',
        position: 'sticky', top: 0, zIndex: 100,
        transition: 'background 0.25s, border-color 0.25s'
      }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img src={dark ? '/assets/noname-logo-nav-dark.svg' : '/assets/noname-logo-nav.svg'} alt="NoName" style={{ width: 99, height: 24, display: 'block' }} />
            </a>

            {isMobile ? (
              /* ── MOBILE: hamburger + dropdown ── */
              <div ref={menuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(o => !o)}
                  style={{ ...iconBtnD, border: `1px solid ${c.navBorder}` }}
                >
                  {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>

                {mobileMenuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    width: 220, background: c.navBg,
                    border: `1px solid ${c.navBorder}`, borderRadius: 12,
                    boxShadow: '0 8px 24px rgba(12,74,110,0.18)',
                    padding: 6, zIndex: 1000,
                    display: 'flex', flexDirection: 'column', gap: 2
                  }}>
                    {[
                      { Icon: RussianRuble, label: 'Price' },
                      { Icon: UserRoundPlus, label: 'Registration' },
                    ].map(({ Icon, label }) => (
                      <button key={label} style={mobileItemStyle(c)} onClick={() => setMobileMenuOpen(false)}>
                        <Icon size={15} />{label}
                      </button>
                    ))}
                    <button style={{ ...mobileItemStyle(c), background: c.primaryBtnBg, color: c.primaryBtnColor }}
                      onClick={() => { setMobileMenuOpen(false); setLoginOpen(true) }}>
                      <LogIn size={15} />Authorization
                    </button>
                    <div style={{ height: 1, background: c.navBorder, margin: '4px 0' }} />
                    <button style={mobileItemStyle(c)} onClick={() => { toggleTheme(); setMobileMenuOpen(false) }}>
                      <SunMoon size={15} />{dark ? 'Light theme' : 'Dark theme'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── DESKTOP: full nav ── */
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button style={ghostBtnD}><RussianRuble size={13} /> <span>Price</span></button>
                <button style={ghostBtnD}><UserRoundPlus size={13} /> <span>Registration</span></button>
                <button style={primaryBtnD} onClick={() => setLoginOpen(true)}><LogIn size={13} /> Authorization</button>
                <button type="button" style={iconBtnD} onClick={toggleTheme} title={dark ? 'Switch to light' : 'Switch to dark'}>
                  <SunMoon size={16} />
                </button>
              </div>
            )}
      </nav>

      <main style={{ minWidth: 320 }}>

        {/* Hero */}
        <style>{`
          @keyframes hero-fade-up {
            from { opacity: 0; transform: translateY(24px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes hero-scale-in {
            from { opacity: 0; transform: scale(0.94) translateY(12px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes plane-float {
            0%, 100% { transform: translateY(0px); }
            50%      { transform: translateY(-18px); }
          }
        `}</style>
        <section style={{ position: 'relative', minHeight: isMobile ? 'auto' : 900, paddingBottom: 76, paddingInline: 'clamp(16px, 3.35vw, 48px)' }}>

          {isMobile ? (
            /* ── MOBILE: single column — text → plane → card ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 64 }}>
              {/* Text */}
              <div>
                <div style={{ marginBottom: 24, animation: 'hero-fade-up 0.6s ease both' }}>
                  <img src={dark ? '/assets/noname-logo-hero-dark.svg' : '/assets/noname-logo-hero.svg'} alt="NoName" style={{ width: 185, height: 45, display: 'block' }} />
                </div>
                <h1 style={{
                  margin: '0 0 20px',
                  fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(36px, 6vw, 52px)', lineHeight: 1,
                  color: c.text,
                  animation: 'hero-fade-up 0.6s ease 0.15s both'
                }}>Find Ideas for Viral Posts</h1>
                <p style={{
                  margin: 0,
                  fontFamily: "'Syne', sans-serif", fontSize: 'clamp(14px, 2.5vw, 18px)',
                  fontWeight: 600, lineHeight: 1.3, textTransform: 'uppercase', color: c.text,
                  animation: 'hero-fade-up 0.6s ease 0.3s both'
                }}>
                  AI analyzes publications and comments in hundreds of Telegram channels and compiles a trend ranking in your niche.
                </p>
              </div>

              {/* Paper plane — centered, large */}
              <div style={{ display: 'flex', justifyContent: 'center', animation: 'hero-fade-up 0.6s ease 0.45s both' }}>
                <img src="/paper plane_Viewport_a 3.png" alt="" style={{ width: '85%', maxWidth: 520, filter: 'drop-shadow(24px 36px 16px rgba(15,23,42,0.16))', animation: 'plane-float 4s ease-in-out infinite' }} />
              </div>

              {/* Reach card */}
              <div style={{
                width: '100%', padding: 16,
                border: `1px solid ${c.cardBorder}`, borderRadius: 24,
                background: c.cardBg, boxShadow: '0 1px 3px rgba(15,23,42,0.1)',
                transition: 'background 0.25s, border-color 0.25s',
                animation: 'hero-scale-in 0.7s ease 0.6s both'
              }}>
                <h2 style={{
                  margin: '0 0 16px', textAlign: 'center',
                  fontFamily: "'Syne', sans-serif", fontWeight: 600,
                  fontSize: 20, lineHeight: 1.2, textTransform: 'uppercase', color: c.text
                }}>Increase audience reach</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                  <Metric value="+35%" label="Subscriber growth" type="subs" colors={c} />
                  <Metric value="+75%" label="Engagement" type="engage" colors={c} />
                </div>
                <button onClick={() => setLoginOpen(true)} style={{
                  ...primaryBtnD, width: '100%', minHeight: 40,
                  paddingBlock: 9, justifyContent: 'center',
                  fontFamily: "'Golos Text', sans-serif", fontSize: 14, fontWeight: 600
                }}>
                  <TrendingUp size={16} /> Find Trends
                </button>
              </div>
            </div>
          ) : (
            /* ── DESKTOP: two-column grid ── */
            <div style={{
              position: 'relative', display: 'grid',
              gridTemplateColumns: 'minmax(360px, 668px) 1fr',
              alignItems: 'center', gap: 18,
              minHeight: 740,
              margin: '127px 0 0'
            }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ marginBottom: 32, animation: 'hero-fade-up 0.6s ease both' }}>
                  <img src={dark ? '/assets/noname-logo-hero-dark.svg' : '/assets/noname-logo-hero.svg'} alt="NoName" style={{ width: 185, height: 45, display: 'block' }} />
                </div>
                <h1 style={{
                  maxWidth: 670, margin: '0 0 32px',
                  fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800,
                  textTransform: 'uppercase',
                  fontSize: 'clamp(46px, 4.8vw, 70px)', lineHeight: 1,
                  color: c.text,
                  animation: 'hero-fade-up 0.6s ease 0.2s both'
                }}>Find Ideas for Viral Posts</h1>
                <p style={{
                  maxWidth: 660, margin: '0 0 48px',
                  fontFamily: "'Syne', sans-serif", fontSize: 'clamp(18px, 1.4vw, 20px)',
                  fontWeight: 600, lineHeight: 1.2, textTransform: 'uppercase', color: c.text,
                  animation: 'hero-fade-up 0.6s ease 0.4s both'
                }}>
                  AI analyzes publications and comments in hundreds of Telegram channels and compiles a trend ranking in your niche.
                </p>

                {/* Reach card */}
                <div style={{
                  width: 'min(100%, 459px)', minHeight: 347, padding: 24,
                  border: `1px solid ${c.cardBorder}`, borderRadius: 24,
                  background: c.cardBg, boxShadow: '0 1px 3px rgba(15,23,42,0.1)',
                  transition: 'background 0.25s, border-color 0.25s',
                  animation: 'hero-scale-in 0.7s ease 0.6s both'
                }}>
                  <h2 style={{
                    margin: '0 0 24px', textAlign: 'center',
                    fontFamily: "'Syne', sans-serif", fontWeight: 600,
                    fontSize: 20, lineHeight: 1.2, textTransform: 'uppercase', color: c.text
                  }}>Increase audience reach</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '189px 190px', gap: 24, justifyContent: 'center', marginBottom: 24 }}>
                    <Metric value="+35%" label="Subscriber growth" type="subs" colors={c} />
                    <Metric value="+75%" label="Engagement" type="engage" colors={c} />
                  </div>
                  <button onClick={() => setLoginOpen(true)} style={{
                    ...primaryBtnD, width: '100%', minHeight: 40,
                    paddingBlock: 9, justifyContent: 'center',
                    fontFamily: "'Golos Text', sans-serif", fontSize: 14, fontWeight: 600
                  }}>
                    <TrendingUp size={16} /> Find Trends
                  </button>
                </div>
              </div>

              {/* Paper plane — grows with viewport, capped at 900px, pinned to right */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minHeight: 548 }}>
                <img src="/paper plane_Viewport_a 3.png" alt="" style={{ width: '100%', maxWidth: 900, marginTop: -95, filter: 'drop-shadow(36px 52px 22px rgba(15,23,42,0.16))', animation: 'plane-float 4s ease-in-out infinite' }} />
              </div>
            </div>
          )}
        </section>

        {/* Process */}
        <section style={{ paddingInline: 'clamp(16px,3.35vw,48px)', paddingBottom: 48 }}>
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? undefined : 'minmax(360px, 0.9fr) minmax(520px, 1.55fr)',
            minHeight: isMobile ? 'auto' : 930,
            overflow: isMobile ? 'visible' : 'hidden',
            borderRadius: 24, background: c.processBg,
            transition: 'background 0.25s'
          }}>
            {/* Image — top on mobile, right on desktop */}
            {isMobile && (
              <div style={{
                borderRadius: '24px 24px 0 0',
                overflow: 'hidden'
              }}>
                <img src="/assets/process-bg.jpeg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            )}
            {/* Text */}
            <div style={{ padding: isMobile ? 24 : '56px 50px', alignSelf: isMobile ? 'auto' : 'center', borderRadius: isMobile ? '0 0 24px 24px' : 0 }}>
              <h2 style={{
                maxWidth: 408, marginBottom: isMobile ? 24 : 48,
                fontFamily: "'Syne', sans-serif", fontWeight: 600,
                fontSize: isMobile ? 30 : 'clamp(28px,2.3vw,40px)', lineHeight: isMobile ? '30px' : 1,
                letterSpacing: isMobile ? '-1px' : 0,
                textTransform: 'uppercase', color: c.processText
              }}>Write about what people discuss</h2>
              <ol style={{ display: 'grid', gap: isMobile ? 28 : 48, margin: 0, padding: 0, listStyle: 'none' }}>
                {[
                  { n: 1, h: 'Choose your niche', p: 'Indicate the topic of your channel' },
                  { n: 2, h: 'Find out what interests your audience', p: 'NoName shows trending discussions in your niche' },
                  { n: 3, h: 'Find out what resonates with your audience', p: 'Review audience reactions' },
                ].map(s => (
                  <li key={s.n} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 12 }}>
                    <span style={{
                      display: 'inline-grid', width: 24, height: 24, placeItems: 'center',
                      borderRadius: 999, color: c.processNumColor, background: c.processNumBg,
                      fontSize: 12, fontWeight: 700
                    }}>{s.n}</span>
                    <div>
                      <h3 style={{ margin: isMobile ? '0 0 12px' : '0 0 20px', fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 20, textTransform: 'uppercase', color: c.processText }}>{s.h}</h3>
                      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: c.processText }}>{s.p}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            {/* Image — right on desktop only */}
            {!isMobile && (
              <div style={{ minHeight: 930, background: c.processRightBg, overflow: 'hidden' }}>
                <img src="/assets/process-cards.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center bottom' }} />
              </div>
            )}
          </div>
        </section>

        {/* Creative */}
        {isMobile ? (
          <section style={{ paddingTop: 48, paddingBottom: 48, paddingInline: 'clamp(16px,3.35vw,48px)', background: c.bg, transition: 'background 0.25s' }}>
            {/* Text */}
            <div style={{ textTransform: 'uppercase', marginBottom: 36 }}>
              <p style={{ marginBottom: 12, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 20, lineHeight: 1.2, color: c.donutCenterText }}>Get creative</p>
              <h2 style={{ margin: 0, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(36px,8vw,52px)', lineHeight: 1, color: c.donutCenterText }}>Let us handle the routine</h2>
            </div>
            {/* Desk image */}
            <div style={{ width: '100%', aspectRatio: '1600/1125', position: 'relative', marginBottom: 36 }}>
              <img src="/assets/desk-base.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5 }} />
              <img src="/assets/desk-overlay.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            {/* Donut chart */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 'min(85vw, 380px)', aspectRatio: 1 }}>
                <DonutChart colors={c} textSize="clamp(32px,9vw,48px)" subTextSize={14} gap={12} />
              </div>
            </div>
          </section>
        ) : (
          <section style={{ position: 'relative', minHeight: 1013, paddingTop: 133, paddingInline: 'clamp(16px,3.35vw,48px)', background: c.bg, transition: 'background 0.25s' }}>
            <div style={{ position: 'relative', zIndex: 2, maxWidth: 690, marginLeft: 17, textTransform: 'uppercase' }}>
              <p style={{ marginBottom: 24, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 24, lineHeight: 1.2, color: c.donutCenterText }}>Get creative</p>
              <h2 style={{ margin: 0, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(44px,4.6vw,70px)', lineHeight: 1, color: c.donutCenterText }}>Let us handle the routine</h2>
            </div>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 162, display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 1162, aspectRatio: '1600/1125', position: 'relative' }}>
                <img src="/assets/desk-base.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5 }} />
                <img src="/assets/desk-overlay.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
            <div style={{ position: 'absolute', right: 'clamp(48px,7.5vw,128px)', top: 348, width: 'min(34vw,486px)', minWidth: 300, aspectRatio: 1 }}>
              <DonutChart
                colors={c}
                textSize="clamp(32px,3.5vw,48px)"
                subTextSize={16}
                gap={16}
                textShadow="0 0 16px rgba(255,255,255,0.95), 0 0 32px rgba(255,255,255,0.8)"
                subTextShadow="0 0 12px rgba(255,255,255,0.95), 0 0 24px rgba(255,255,255,0.7)"
              />
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ display: 'grid', gap: 48, paddingTop: 28, paddingInline: 'clamp(16px,3.35vw,48px)', background: c.bg, transition: 'background 0.25s' }}>
          <div style={{ display: 'grid', justifyItems: 'center', gap: 12, textAlign: 'center' }}>
            <style>{`@keyframes tg-bounce{0%{transform:translateY(0)}30%{transform:translateY(-8px)}60%{transform:translateY(-3px)}80%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
            <a href="https://t.me/rustemgaleev09" target="_blank" rel="noopener noreferrer" style={{ display: 'block', lineHeight: 0 }}
              onMouseEnter={e => { e.currentTarget.querySelector('img').style.animation = 'tg-bounce 0.5s ease' }}
              onMouseLeave={e => { e.currentTarget.querySelector('img').style.animation = '' }}
            >
              <img
                src="/assets/icons/telegram.svg"
                alt="Telegram"
                style={{ width: 40, height: 36, display: 'block' }}
                onAnimationEnd={e => { e.currentTarget.style.animation = '' }}
              />
            </a>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 'clamp(24px,2.2vw,34px)', lineHeight: 1, margin: 0, textTransform: 'uppercase', color: c.footerText }}>Didn't find the topic you need?</h2>
            <a href="https://t.me/rustemgaleev09" target="_blank" rel="noopener noreferrer" style={{ margin: 0, fontSize: 16, fontWeight: 500, color: c.footerText, textDecoration: 'none' }}>Write to us : @rustemgaleev09</a>
            <img src="/assets/qr.png" alt="NoName contact QR code" style={{ width: 86, height: 86, objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingBottom: 12, borderBottom: `1px solid ${c.footerBorder}` }}>
            <p style={{ margin: 0, fontWeight: 600, color: c.footerText }}>NoName © 2025</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {['Registration', 'Authorization', 'Offer'].map(l => (
                <a key={l} href="#" style={{ color: c.footerLink, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{
            width: '100%', overflow: 'hidden',
            color: c.wordmark,
            fontFamily: "'Nunito Sans', sans-serif", fontWeight: 800, fontStyle: 'italic',
            fontSize: 'max(76px, 19.5vw)', lineHeight: 0.85,
            whiteSpace: 'nowrap', textAlign: 'center',
            transition: 'color 0.25s'
          }}>NONAME</div>
        </footer>
      </main>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={onLogin} dark={dark} />
    </div>
  )
}

function DonutChart({ colors, textSize, subTextSize = 16, gap = 12, textShadow, subTextShadow }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const dur = 1500
    let t0 = null, raf
    const tick = (ts) => {
      if (t0 === null) t0 = ts
      const p = Math.min((ts - t0) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 85))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible])

  const R = 196.84
  const C = +(2 * Math.PI * R).toFixed(2)

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <svg viewBox="0 0 486 486" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="donut-grad" x1="243" y1="0" x2="243" y2="486" gradientUnits="userSpaceOnUse">
            <stop stopColor="#26A9E3" />
            <stop offset="0.5" stopColor="#635BF7" />
            <stop offset="1" stopColor="#E0A1EF" />
          </linearGradient>
        </defs>
        <circle
          cx="243" cy="243" r={R}
          fill="none"
          stroke="url(#donut-grad)"
          strokeWidth="92.33"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={visible ? +(C * 0.15).toFixed(2) : C}
          style={{
            transition: visible ? 'stroke-dashoffset 1.5s ease-out' : 'none',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', gap
      }}>
        <strong style={{ display: 'block', fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, fontSize: textSize, lineHeight: 1, letterSpacing: '-1.5px', color: colors.donutCenterText, textShadow }}>
          -{count}%
        </strong>
        <span style={{ maxWidth: 160, fontSize: subTextSize, fontWeight: 500, lineHeight: 1.5, color: colors.donutCenterSub, textShadow: subTextShadow }}>
          time spent searching for post topics
        </span>
      </div>
    </div>
  )
}

function Metric({ value, label, type, colors }) {
  const match = value.match(/^([+\-]?)([\d.]+)(.*)$/)
  const prefix = match ? match[1] : ''
  const targetNum = match ? parseFloat(match[2]) : 0
  const suffix = match ? match[3] : ''
  const [count, setCount] = useState(0)

  useEffect(() => {
    const delay = 1100
    const duration = 1500
    let startTime = null
    let raf
    const animate = (ts) => {
      if (startTime === null) startTime = ts
      const elapsed = ts - startTime
      if (elapsed < delay) { raf = requestAnimationFrame(animate); return }
      const t = Math.min((elapsed - delay) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * targetNum))
      if (t < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [targetNum])

  const displayValue = `${prefix}${count}${suffix}`

  const pieSubs = {
    background: `
      conic-gradient(from 0deg, transparent 0 35%, #72c9ee 35% 100%),
      conic-gradient(from 0deg, #25a8e1 0 5%, #4b80f3 20%, #6a58f0 29%, #8b70f2 35%, transparent 35% 100%)
    `
  }
  const pieEngage = {
    background: `
      conic-gradient(from 0deg, #25a8e1 0 5%, #4e82f3 18%, #6657ef 25%, transparent 25% 100%),
      conic-gradient(from 0deg, transparent 0 25%, #8a6cf2 25%, #ba7eea 58%, #d988e4 100%),
      conic-gradient(from 0deg, #72c9ee 0 25%, transparent 25% 100%)
    `
  }

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 8, textAlign: 'center' }}>
      <div style={{
        width: 110, height: 110, borderRadius: '50%',
        boxShadow: '0 10px 16px rgba(12,74,110,0.16), 0 3px 7px rgba(12,74,110,0.14)',
        ...(type === 'subs' ? pieSubs : pieEngage)
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex', width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
          borderRadius: 999, background: colors.primaryBtnBg, flexShrink: 0
        }}>
          {type === 'subs'
            ? <UserRoundPlus size={13} color={colors.primaryBtnColor} strokeWidth={2} />
            : <HeartPlus size={13} color={colors.primaryBtnColor} strokeWidth={2} />
          }
        </span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, textTransform: 'uppercase', color: colors.text }}>{displayValue}</span>
      </div>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: colors.text }}>{label}</p>
    </div>
  )
}

const ghostBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  minHeight: 36, border: 0, borderRadius: 8, padding: '7px 16px',
  font: '600 14px/21px "Golos Text", sans-serif',
  color: '#0369a1', background: 'transparent', cursor: 'pointer'
}

const primaryBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  minHeight: 36, border: 0, borderRadius: 8, padding: '7px 16px',
  font: '600 14px/21px "Golos Text", sans-serif',
  color: '#dbeafe', background: '#0c4a6e', cursor: 'pointer'
}

const iconBtn = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 36, minHeight: 36, padding: 0, border: '1px solid #bae6fd',
  borderRadius: 8, color: '#0369a1', background: 'rgba(7,89,133,0.15)', cursor: 'pointer'
}

const mobileItemStyle = (c) => ({
  display: 'flex', alignItems: 'center', gap: 10,
  width: '100%', padding: '8px 12px', border: 'none', borderRadius: 8,
  background: 'transparent', cursor: 'pointer', textAlign: 'left',
  font: '500 14px/21px "Golos Text", sans-serif', color: c.text
})
