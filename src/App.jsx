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
import VideoModal from './components/VideoModal';

export default function App() {
  const [showStartup, setShowStartup] = useState(true);
  const [activeVideoProject, setActiveVideoProject] = useState(null);

  useEffect(() => {
    const handleOpenVideo = (e) => {
      if (e.detail) {
        setActiveVideoProject(e.detail);
      }
    };
    window.addEventListener('open-video', handleOpenVideo);
    return () => window.removeEventListener('open-video', handleOpenVideo);
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
        <Projects onOpenVideo={setActiveVideoProject} />
        <Accomplishments />
        <Contact />
      </main>

      {activeVideoProject && (
        <VideoModal
          project={activeVideoProject}
          onClose={() => setActiveVideoProject(null)}
        />
      )}
    </>
  );
}
