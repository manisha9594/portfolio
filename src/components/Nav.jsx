import { useEffect, useState } from 'react';
import { ArrowRight, MenuIcon } from './Icons.jsx';

const LINKS = [
  { id: 'work', label: 'Selected work' },
  { id: 'repositories', label: 'Repositories' },
  { id: 'skills', label: 'Skills' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Lock page scrolling only while the mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  // Close the menu with Escape, or when the screen becomes wide enough to show the full nav.
  useEffect(() => {
    if (!open) return undefined;
    const wide = window.matchMedia('(min-width: 681px)');
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onWide = (e) => { if (e.matches) setOpen(false); };
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  // Highlight the link for whichever section is on screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-25% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="shell nav-inner">
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
        <div className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'true' : undefined} onClick={close}>
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" aria-current={active === 'contact' ? 'true' : undefined} onClick={close}>
            Let’s connect <ArrowRight />
          </a>
        </div>
      </div>
    </nav>
  );
}
