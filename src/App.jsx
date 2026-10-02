import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Repositories from './components/Repositories.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="page-status">Couldn’t load the portfolio: {error}</p>;
  if (!data) return <p className="page-status">Loading…</p>;

  const { profile, projects, repos, skills } = data;

  return (
    <>
      <a href="#content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="content">
        <Hero profile={profile} />
        <Work projects={projects} />
        <Repositories repos={repos} githubUser={profile.githubUser} />
        <Skills skills={skills} />
        <Contact profile={profile} />
      </main>
      <footer>
        <div className="shell footer-inner">
          <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</span>
          <span>{profile.title} · {profile.location}</span>
        </div>
      </footer>
    </>
  );
}
