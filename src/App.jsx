import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Repositories from './components/Repositories.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import savedData from '../server/data/portfolio.json';

export default function App() {
  // Render the bundled content immediately; the API only adds live GitHub star counts.
  const [data, setData] = useState(savedData);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => console.warn(`Showing saved portfolio data: ${err.message}`));
  }, []);

  const { profile, projects, repos, skills } = data;

  return (
    <>
      <a href="#content" className="skip-link">Skip to content</a>
      <Nav name={`${profile.firstName} ${profile.lastName}`} />
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
