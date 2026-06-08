import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function LoginModal({ open, onClose, onLogin, dark = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
    onLogin()
  }

  const c = {
    bg:          dark ? '#1e3a8a' : '#ffffff',
    border:      dark ? '#1d4ed8' : '#bae6fd',
    text:        dark ? '#eff6ff' : '#075985',
    textMuted:   dark ? '#bfdbfe' : '#0369a1',
    inputBg:     dark ? '#172554' : '#f0f9ff',
    inputColor:  dark ? '#dbeafe' : '#075985',
    btnBg:       dark ? '#dbeafe' : '#0c4a6e',
    btnColor:    dark ? '#172554' : '#dbeafe',
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent style={{
        maxWidth: 420,
        fontFamily: "'Golos Text', sans-serif",
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 16,
      }}>
        <DialogHeader>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <img
              src={dark ? '/assets/noname-logo-nav-dark.svg' : '/assets/noname-logo-nav.svg'}
              alt="NoName"
              style={{ width: 148, height: 36, display: 'block' }}
            />
          </div>
          <DialogTitle style={{
            textAlign: 'center',
            fontFamily: "'Syne', sans-serif",
            textTransform: 'uppercase',
            color: c.text,
            letterSpacing: '0.05em',
          }}>
            Authorization
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600, color: c.text }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%', padding: '10px 14px',
                border: `1px solid ${c.border}`, borderRadius: 8,
                fontSize: 14, color: c.inputColor,
                background: c.inputBg, outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Golos Text', sans-serif",
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, fontWeight: 600, color: c.text }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 14px',
                border: `1px solid ${c.border}`, borderRadius: 8,
                fontSize: 14, color: c.inputColor,
                background: c.inputBg, outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Golos Text', sans-serif",
              }}
            />
          </div>
          <Button
            type="submit"
            style={{
              background: c.btnBg, color: c.btnColor,
              fontFamily: "'Golos Text', sans-serif", fontWeight: 600,
              marginTop: 8, borderRadius: 8, minHeight: 44,
              border: 'none',
            }}
          >
            Sign in →
          </Button>
          <p style={{ textAlign: 'center', fontSize: 12, color: c.textMuted, margin: 0 }}>
            Demo: enter any email and password
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
