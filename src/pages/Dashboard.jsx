import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Heart, Bookmark, LifeBuoy, FileText, LogIn, SunMoon, ArrowUpRight, Menu, X, LogOut } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWindowWidth } from '../hooks/useWindowWidth'

const niches = [
  { id: 'beauty', name: 'Beauty', img: '/assets/dashboard/beauty.png', tags: ['Cosmetics', 'Perfumery', 'Makeup'] },
  { id: 'motherhood', name: 'Motherhood', img: '/assets/dashboard/motherhood.png', tags: ['Family', 'Children'] },
  { id: 'lifestyle', name: 'Lifestyle', img: '/assets/dashboard/lifestyle.png', tags: ['Fashion', "Women's Lifestyle", "Men's Lifestyle"] },
  { id: 'travel', name: 'Travel', img: '/assets/dashboard/travel.png', tags: ['Tourism', 'Emigration'] },
  { id: 'media', name: 'Media Culture', img: '/assets/dashboard/media-culture.png', tags: ['Showbiz', 'Cinema', 'Music', 'Games'] },
  { id: 'science', name: 'Popular Science', img: '/assets/dashboard/popular-science.png', tags: ['Technology', 'Science'] },
  { id: 'health', name: 'Health', img: '/assets/dashboard/health.png', tags: ['Medicine', "Children's Health", 'Nutritionology', 'Wellness'] },
  { id: 'sports', name: 'Sports', img: '/assets/dashboard/sports.png', tags: ['Sports News', 'Training', "Women's Fitness", 'Motivation'] },
  { id: 'marketing', name: 'Marketing and Sales', img: '/assets/dashboard/marketing.png', tags: ['Marketing', 'Sales', 'SMM'] },
]

const trendsByNiche = {
  default: [
    'How to grow audience with AI tools',
    'Morning routine that changed my life',
    'Honest review: is it worth buying?',
    'Behind the scenes of content creation',
    'Mistakes beginners make in this niche',
  ]
}

export default function Dashboard({ onLogout, dark = false, toggleTheme }) {
  const [activeNav, setActiveNav] = useState('Themes')
  const [selectedNiche, setSelectedNiche] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const width = useWindowWidth()
  const isMobile = width <= 1024

  useEffect(() => {
    if (!mobileMenuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMobileMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [mobileMenuOpen])

  const colors = {
    bg: dark ? '#0f1c2e' : '#e0f2fe',
    sidebar: dark ? '#0c1e35' : '#e0f2fe',
    sidebarBorder: dark ? '#1e3a5f' : '#bae6fd',
    card: dark ? '#0d2240' : '#f6f6ee',
    cardBorder: dark ? '#1e3a5f' : '#bae6fd',
    text: dark ? '#93c5fd' : '#0369a1',
    textDark: dark ? '#dbeafe' : '#075985',
    primary: dark ? '#dbeafe' : '#0c4a6e',
    primaryBg: dark ? '#1e3a8a' : '#0c4a6e',
    topbar: dark ? '#0c1e35' : '#ffffff',
    tagBg: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)',
    tagBorder: dark ? '#1e3a5f' : '#bae6fd',
  }

  const mobileNavItems = [
    { label: 'Themes', Icon: TrendingUp, action: () => { setActiveNav('Themes'); setMobileMenuOpen(false) } },
    { label: 'My Trends', Icon: Heart, action: () => { setActiveNav('My Trends'); setMobileMenuOpen(false) } },
    { label: 'Saved', Icon: Bookmark, action: () => { setActiveNav('Saved'); setMobileMenuOpen(false) } },
  ]
  const mobileUtilItems = [
    { label: 'Support', Icon: LifeBuoy },
    { label: 'My Documents', Icon: FileText },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: colors.bg, fontFamily: "'Golos Text', sans-serif", overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=Syne:wght@600;700&display=swap" rel="stylesheet" />

      {/* ── DESKTOP Sidebar ── */}
      {!isMobile && (
        <aside style={{
          width: 120, flexShrink: 0, display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', padding: '20px 0',
          background: colors.sidebar, borderRight: `1px solid ${colors.sidebarBorder}`
        }}>
          <div>
            <div style={{ padding: '0 16px 20px' }}>
              <img src={dark ? '/assets/noname-logo-sidebar-dark.svg' : '/assets/noname-logo-sidebar.svg'} alt="NoName" style={{ width: 82, height: 20, display: 'block' }} />
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
              {[
                { label: 'Themes', Icon: TrendingUp },
                { label: 'My Trends', Icon: Heart },
                { label: 'Saved', Icon: Bookmark },
              ].map(item => (
                <SidebarItem key={item.label} {...item} active={activeNav === item.label} colors={colors} onClick={() => setActiveNav(item.label)} />
              ))}
            </nav>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 8px' }}>
            {[
              { label: 'Support', Icon: LifeBuoy },
              { label: 'My Documents', Icon: FileText },
            ].map(item => (
              <SidebarItem key={item.label} {...item} active={false} colors={colors} onClick={() => {}} />
            ))}
            <button onClick={onLogout} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              padding: '8px 4px', borderRadius: 8, border: 'none', background: 'transparent',
              cursor: 'pointer', color: colors.text, fontSize: 11, fontWeight: 500, width: '100%'
            }}>
              <LogOut size={18} />
              Log out
            </button>
          </nav>
        </aside>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Topbar */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 16px', height: 52, flexShrink: 0,
          background: colors.topbar, borderBottom: `1px solid ${colors.cardBorder}`,
          position: 'relative'
        }}>
          {isMobile ? (
            /* ── MOBILE topbar ── */
            <>
              <img src={dark ? '/assets/noname-logo-sidebar-dark.svg' : '/assets/noname-logo-sidebar.svg'} alt="NoName" style={{ width: 82, height: 20, display: 'block' }} />
              <div ref={menuRef} style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(o => !o)}
                  style={{
                    width: 36, height: 36, border: `1px solid ${colors.cardBorder}`,
                    borderRadius: 8, background: dark ? '#1e3a8a' : 'rgba(7,89,133,0.1)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: colors.text
                  }}
                >
                  {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>

                {mobileMenuOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    width: 240, background: colors.topbar,
                    border: `1px solid ${colors.cardBorder}`, borderRadius: 12,
                    boxShadow: '0 8px 24px rgba(12,74,110,0.18)',
                    padding: 6, zIndex: 1000
                  }}>
                    {/* User header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: colors.primaryBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#dbeafe' }}>N</span>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: colors.textDark }}>Name Surname</span>
                    </div>
                    <div style={{ height: 1, background: colors.cardBorder, margin: '4px 0' }} />

                    {/* Nav items */}
                    {mobileNavItems.map(({ label, Icon, action }) => (
                      <button key={label} onClick={action} style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '8px 12px', border: 'none', borderRadius: 8, cursor: 'pointer',
                        background: activeNav === label ? (dark ? 'rgba(30,58,95,0.8)' : '#d7eadd') : 'transparent',
                        color: activeNav === label ? colors.textDark : colors.text,
                        font: '400 14px/21px "Golos Text", sans-serif', textAlign: 'left'
                      }}>
                        <Icon size={16} />{label}
                      </button>
                    ))}
                    <div style={{ height: 1, background: colors.cardBorder, margin: '4px 0' }} />

                    {/* Utility items */}
                    {mobileUtilItems.map(({ label, Icon }) => (
                      <button key={label} style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '8px 12px', border: 'none', borderRadius: 8, cursor: 'pointer',
                        background: 'transparent', color: colors.text,
                        font: '400 14px/21px "Golos Text", sans-serif', textAlign: 'left'
                      }}>
                        <Icon size={16} />{label}
                      </button>
                    ))}
                    <div style={{ height: 1, background: colors.cardBorder, margin: '4px 0' }} />

                    {/* Log out */}
                    <button onClick={() => { setMobileMenuOpen(false); onLogout() }} style={{
                      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                      padding: '8px 12px', border: 'none', borderRadius: 8, cursor: 'pointer',
                      background: 'transparent', color: colors.text,
                      font: '400 14px/21px "Golos Text", sans-serif', textAlign: 'left'
                    }}>
                      <LogOut size={16} />Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* ── DESKTOP topbar ── */
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.text, fontSize: 14, fontWeight: 500 }}>
                <span>≡</span>
                <span style={{ color: colors.textDark }}>›</span>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, textTransform: 'uppercase', color: colors.textDark }}>
                  {activeNav}
                </span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                title={dark ? 'Switch to light' : 'Switch to dark'}
                style={{
                  width: 36, height: 36,
                  border: `2px solid ${dark ? '#93c5fd' : '#0369a1'}`,
                  borderRadius: 8,
                  background: dark ? '#1e3a8a' : 'rgba(7,89,133,0.15)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: dark ? '#93c5fd' : '#0369a1',
                  flexShrink: 0
                }}
              >
                <SunMoon size={16} />
              </button>
            </>
          )}
        </header>

        {/* Cards grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Section 1: Beauty (tall left 2/3) + Motherhood/Lifestyle (stacked right 1/3) */}
            {isMobile ? (
              ['beauty','motherhood','lifestyle'].map(id => <NicheCard key={id} niche={niches.find(n=>n.id===id)} colors={colors} imgH={160} onSelect={setSelectedNiche} />)
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: '678px', gap: 16 }}>
                <NicheCard niche={niches.find(n=>n.id==='beauty')} colors={colors} tall onSelect={setSelectedNiche} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <NicheCard niche={niches.find(n=>n.id==='motherhood')} colors={colors} onSelect={setSelectedNiche} />
                  <NicheCard niche={niches.find(n=>n.id==='lifestyle')} colors={colors} onSelect={setSelectedNiche} />
                </div>
              </div>
            )}

            {/* Section 2: Travel / Media Culture / Popular Science (3 equal) */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {['travel','media','science'].map(id => (
                <NicheCard key={id} niche={niches.find(n=>n.id===id)} colors={colors} imgH={160} onSelect={setSelectedNiche} />
              ))}
            </div>

            {/* Section 3: Health/Sports (stacked left 1/3) + Marketing (tall right 2/3) */}
            {isMobile ? (
              ['health','sports','marketing'].map(id => <NicheCard key={id} niche={niches.find(n=>n.id===id)} colors={colors} imgH={160} onSelect={setSelectedNiche} />)
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gridTemplateRows: '678px', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <NicheCard niche={niches.find(n=>n.id==='health')} colors={colors} onSelect={setSelectedNiche} />
                  <NicheCard niche={niches.find(n=>n.id==='sports')} colors={colors} onSelect={setSelectedNiche} />
                </div>
                <NicheCard niche={niches.find(n=>n.id==='marketing')} colors={colors} tall onSelect={setSelectedNiche} />
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Niche trends modal */}
      {selectedNiche && (
        <Dialog open={!!selectedNiche} onOpenChange={() => setSelectedNiche(null)}>
          <DialogContent style={{ maxWidth: 480, fontFamily: "'Golos Text', sans-serif" }}>
            <DialogHeader>
              <DialogTitle style={{ fontFamily: "'Syne', sans-serif", textTransform: 'uppercase', color: '#075985' }}>
                {selectedNiche.name} — Top Trends
              </DialogTitle>
            </DialogHeader>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#0369a1' }}>Trending topics this week in your niche</p>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(trendsByNiche.default).map((trend, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                  <span style={{ width: 24, height: 24, borderRadius: 999, background: '#0c4a6e', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 14, color: '#075985' }}>{trend}</span>
                  {i === 0 && <span style={{ fontSize: 11, fontWeight: 600, color: '#0369a1', background: '#bae6fd', padding: '2px 8px', borderRadius: 4 }}>↑ Hot</span>}
                  {i === 1 && <span style={{ fontSize: 11, fontWeight: 600, color: '#0369a1', background: '#bae6fd', padding: '2px 8px', borderRadius: 4 }}>↑ Rising</span>}
                </li>
              ))}
            </ol>
            <Button style={{ marginTop: 8, background: '#0c4a6e', color: '#dbeafe', width: '100%', fontFamily: "'Golos Text', sans-serif", fontWeight: 600 }}>
              Find Trends →
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function SidebarItem({ label, Icon, active, colors, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      padding: '8px 4px', borderRadius: 8, border: 'none', cursor: 'pointer',
      background: active ? colors.card : 'transparent',
      color: active ? colors.textDark : colors.text,
      fontSize: 11, fontWeight: active ? 600 : 500, transition: 'background 0.15s',
      width: '100%'
    }}>
      <Icon size={18} />
      {label}
    </button>
  )
}

function NicheCard({ niche, colors, tall = false, onSelect }) {
  const shadow = '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)'
  return (
    <article
      onClick={() => onSelect(niche)}
      style={{
        background: colors.card, border: `1px solid ${colors.cardBorder}`,
        borderRadius: 24, overflow: 'hidden', cursor: 'pointer', padding: 2,
        boxShadow: shadow,
        transition: 'transform 0.15s, box-shadow 0.15s',
        display: 'flex', flexDirection: 'column',
        height: tall ? undefined : 327,
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,23,42,0.14)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = shadow }}
    >
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', borderRadius: '22px 22px 0 0', position: 'relative' }}>
        <img src={niche.img} alt={niche.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 20, lineHeight: '24px', textTransform: 'uppercase', color: colors.textDark }}>{niche.name}</h3>
          <button style={{
            flexShrink: 0, width: 32, height: 32, borderRadius: 8,
            background: colors.primaryBg, border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}><ArrowUpRight size={15} color="#dbeafe" /></button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {niche.tags.map(tag => (
            <span key={tag} style={{
              padding: '2px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.18px',
              background: colors.tagBg, border: `1px solid ${colors.tagBorder}`, color: colors.text
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}
