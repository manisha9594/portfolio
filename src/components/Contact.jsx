import { useEffect, useRef, useState } from 'react';

export default function Contact({ profile }) {
  const [toast, setToast] = useState('');
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  function showToast(message) {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 2200);
  }

  function copyEmail() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(profile.email).then(() => showToast('Email copied'), () => showToast(profile.email));
    } else {
      showToast(profile.email);
    }
  }

  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="contact-block">
          <div className="contact-grid">
            <div>
              <span className="section-index">04 / Contact</span>
              <h2>Let’s build something useful.</h2>
              <p>{profile.contactBlurb}</p>
            </div>
            <div className="contact-actions">
              <a className="contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><span aria-hidden="true">↗</span></a>
              <a className="contact-link" href={profile.github} target="_blank" rel="noopener noreferrer"><span>GitHub</span><span aria-hidden="true">↗</span></a>
              <a className="contact-link" href={`mailto:${profile.email}`}><span>Email me</span><span aria-hidden="true">→</span></a>
              <button className="copy-email" type="button" onClick={copyEmail}><span>Copy email</span><span aria-hidden="true">⧉</span></button>
            </div>
          </div>
        </div>
      </div>
      <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </section>
  );
}
