// src/App.jsx
import { useState, useEffect } from 'react';
import './styles/global.css';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Accomplishments from './components/Accomplishments';
import Contact from './components/Contact';
import StartupAnimation from './components/StartupAnimation';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [showStartup, setShowStartup] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleOpenProject = (e) => {
      if (e.detail) {
        setSelectedProject(e.detail);
      }
    };
    window.addEventListener('open-project', handleOpenProject);
    window.addEventListener('open-video', handleOpenProject);
    return () => {
      window.removeEventListener('open-project', handleOpenProject);
      window.removeEventListener('open-video', handleOpenProject);
    };
  }, []);

  return (
    <>
      {showStartup && (
        <StartupAnimation onComplete={() => setShowStartup(false)} />
      )}
      <Cursor />
      <Navbar onReplayIntro={() => setShowStartup(true)} />
      <main>
        <Hero isReady={!showStartup} />
        <About />
        <Experience />
        <Projects onOpenProject={setSelectedProject} />
        <Accomplishments />
        <Contact />
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
