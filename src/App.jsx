// src/App.jsx
import { useState } from 'react';
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

export default function App() {
  const [showStartup, setShowStartup] = useState(true);

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
        <Projects />
        <Accomplishments />
        <Contact />
      </main>
    </>
  );
}
