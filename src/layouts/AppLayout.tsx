import { Menu, PanelLeftClose, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Portfolio Dashboard' },
  { to: '/pm-queue', label: 'PM Work Queue' },
];

export function AppLayout() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navigation = (
    <nav className="sidebar__nav" aria-label="Primary navigation">
      {navItems.map((item) => (
        <NavLink key={item.to} to={item.to} onClick={() => setMobileNavOpen(false)}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="brand-mark">PO</div>
          <div>
            <strong>Project Ops</strong>
            <span>Readiness System</span>
          </div>
        </div>
        {navigation}
        <div className="sidebar__footer">
          <PanelLeftClose size={18} />
          <span>Mock data workspace</span>
        </div>
      </aside>

      <header className="mobile-header">
        <button type="button" className="icon-button" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation menu">
          <Menu size={22} />
        </button>
        <div className="mobile-header__brand">
          <div className="brand-mark">PO</div>
          <strong>Project Ops</strong>
        </div>
      </header>

      {isMobileNavOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-drawer__panel">
            <div className="mobile-drawer__header">
              <div className="sidebar__brand">
                <div className="brand-mark">PO</div>
                <div>
                  <strong>Project Ops</strong>
                  <span>Readiness System</span>
                </div>
              </div>
              <button type="button" className="icon-button" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation menu">
                <X size={22} />
              </button>
            </div>
            {navigation}
          </div>
        </div>
      )}

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
}
