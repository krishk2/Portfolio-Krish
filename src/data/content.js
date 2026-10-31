// src/data/content.js
// Central data store – update this to change all site content

// Achievement images imported directly from src/assets so Vite bundles and resolves them across all deployment platforms
import convolveImg from '../assets/achievements/convolve.png';
import convolveGlassesImg from '../assets/achievements/convolve_glasses.png';
import quantumValleyImg from '../assets/achievements/quantum_valley.png';
import paytmImg from '../assets/achievements/paytm.jpg';

export const personal = {
  name: "Krishna Koushik Padigala",
  tagline: "Multi-Agent Systems · LLM Applications · Computer Vision",
  email: "koushikpadigala2@gmail.com",
  linkedin: "https://www.linkedin.com/in/krishna-koushik-padigala-691728305/",
  github: "https://github.com/krishk2",
};

export const education = {
  university: "Rajiv Gandhi University of Knowledge Technologies, RK Valley",
  degree: "B.Tech in Computer Science and Engineering",
  duration: "Aug 2023 – April 2027",
  gpa: "8.81",
};

export const experience = [
  {
    company: "Glassdata",
    location: "Hyderabad",
    role: "Agentic AI Intern",
    duration: "Jul 2026 – Oct 2026",
    bullets: [
      "Shipped an end-to-end self-hosted WebSocket-based speech pipeline with sub-2s round-trip latency.",
      "Drove the R & D of a fine-grained intent classification system using contrastive Siamese models, while eliminating dependency on cloud LLMs.",
    ],
  },
  {
    company: "Siemens Technical Services Pvt. Ltd.",
    location: "Bangalore",
    role: "Technical Intern",
    duration: "May 2026 – Jul 2026",
    bullets: [
      "Prototyped a Neo4j graph database model to visualize real-time Bangalore traffic pulse, mapping road-node relationships and congestion propagation across 200+ intersections in the pilot zone.",
      "Designed a node-centrality metric to rank bottleneck junctions, reducing simulated signal-response latency by ~30% in proof-of-concept evaluations against flat-table approaches.",
    ],
  },
  {
    company: "Infosys Springboard",
    location: "Remote",
    role: "AI Intern",
    duration: "Nov 2025 – Jan 2026",
    bullets: [
      "Worked on an end-to-end NLP pipeline for enterprise IT support email classification and priority assignment using Python, PyTorch, and Hugging Face.",
      "Achieved 94% classification accuracy and 0.93 weighted F1-score with sub-50ms CPU inference using a fine-tuned DistilBERT model.",
    ],
  },
];

export const projects = [
  {
    id: "masthishq",
    year: "2026",
    title: "Masthishq",
    subtitle: "AI Memory Assistant · Convolve 4.0 Winner",
    summary:
      "Multimodal AI agent designed as an external cognitive memory for Alzheimer's & Dementia patients using FaceNet, YOLOv8, Qdrant vector retrieval, and Groq-hosted Llama-3.",
    description:
      "Multimodal AI agent designed as an external cognitive memory for Alzheimer's & Dementia patients. Integrates FaceNet and YOLOv8 for face and object recognition, Qdrant vector database for episodic memory retrieval, and Groq-hosted Llama-3 with Whisper for real-time contextual voice conversations. Built by Team Twilight and awarded 1st Place at Convolve 4.0 Pan-IIT Hackathon.",
    extendedDescription:
      "Masthishq (meaning 'Brain') is a real-time multimodal assistive agent designed to act as an external cognitive prosthesis for Alzheimer's and Dementia patients. It integrates computer vision (FaceNet for face identification and YOLOv8 for familiar object recognition) with semantic vector recall via Qdrant. Context-aware voice interactions are processed in real-time through Groq-hosted Llama-3 and OpenAI Whisper, providing instantaneous, empathetic memory prompts without cognitive friction. Built by Team Twilight and awarded 1st Place at the Convolve 4.0 Pan-IIT Hackathon among 8,000+ competing teams.",
    highlights: [
      "Sub-2s voice query response latency powered by Groq LPU inference",
      "95%+ face recognition accuracy using 512-dimensional FaceNet embeddings",
      "Episodic memory recall via Qdrant vector search with temporal relevance scoring",
      "Awarded 1st Place at Convolve 4.0 Pan-IIT Hackathon (8,000+ teams)",
    ],
    achievementImages: [
      {
        src: convolveImg,
        label: "Stage Award",
        caption: "Convolve 4.0 Pan-IIT Hackathon — 1st Place Award Ceremony on stage (Powered by Qdrant)",
      },
      {
        src: convolveGlassesImg,
        label: "Prize: Ray-Ban Meta",
        caption: "Ray-Ban Meta Wayfarer Smart Glasses won as 1st Place Prize for Masthishq",
      },
    ],
    tags: ["FastAPI", "React", "Qdrant", "Llama-3", "Groq", "YOLOv8", "FaceNet"],
    github: "https://github.com/krishk2/Masthishq",
    video: "https://drive.google.com/file/d/1mq36FTSPY35Hbm681oE8DaL3NUPv87A6/preview",
    demo: "https://drive.google.com/file/d/1mq36FTSPY35Hbm681oE8DaL3NUPv87A6/view?usp=sharing",
    driveFolder: "https://drive.google.com/drive/u/4/folders/1MO1aNhguOguY9YpZB4rRInw50-J_40JM",
    live: "https://masthishq-frontend.onrender.com/",
    badge: "1st Place Convolve 4.0",
  },
  {
    id: "meeting-prep",
    year: "2026",
    title: "Meeting Prep Agent",
    subtitle: "Autonomous Sales Memory & Executive Briefing",
    summary:
      "Autonomous sales intelligence agent generating contextual pre-meeting briefs, real-time sentiment extraction, and post-call email drafting with continuous learning.",
    description:
      "Autonomous sales intelligence agent built for the Hindsight Hackathon. Formulates contextual pre-meeting briefs from prior interactions, conducts post-call sentiment and action-item extraction with Groq LLM, drafts follow-up emails in Gmail, and continuously adapts to rep preferences through Hindsight's memory learning loop.",
    extendedDescription:
      "An autonomous sales enablement agent built for the Hindsight Hackathon. The system monitors sales reps' calendars, aggregates historical correspondence and previous CRM touchpoints, and synthesizes executive pre-meeting briefs before scheduled calls. Following meetings, it performs automated transcription sentiment analysis, action-item categorization using Groq LLM, and drafts personalized follow-up emails in Gmail while continuously adapting to rep communication preferences through Hindsight's bi-directional memory learning loop.",
    highlights: [
      "Autonomous pre-call briefing synthesized from multi-channel history",
      "Automated action-item extraction & one-click Gmail drafting",
      "Hindsight memory loop continuously learning rep writing style",
      "Built for Hindsight Hackathon with FastAPI, Groq LLM, and React",
    ],
    tags: ["FastAPI", "React", "Hindsight", "Groq LLM", "Gmail API", "Google Calendar"],
    github: "https://github.com/Pasalavijay799/meeting-prep-agent",
    video: "https://drive.google.com/file/d/1sXt4R2UMOnmO0yUck7cl9stCuMtTe2Mk/preview",
    demo: "https://drive.google.com/file/d/1sXt4R2UMOnmO0yUck7cl9stCuMtTe2Mk/view?usp=drive_link",
    live: null,
    badge: "Hindsight Hackathon",
  },
  {
    id: "finagentx",
    year: "2026",
    title: "FinAgentX",
    subtitle: "AI-Powered Remote Banking System",
    summary:
      "4-agent banking workflow automating loan application, data collection, financial verification, underwriting, and risk approval workflows.",
    description:
      "4-agent banking workflow automating loan application, data collection, financial verification, underwriting, and risk approval workflows.",
    extendedDescription:
      "FinAgentX is an autonomous multi-agent financial workflow platform designed to automate loan origination and risk assessment. Built with CrewAI, Python, and Node.js WebSockets, four specialized AI agents collaborate sequentially and in parallel: Data Collection Agent extracts applicant metadata; Financial Verification Agent audits bank statements and credit scores; Underwriting Agent assesses debt-to-income and solvency thresholds; and Risk Approval Agent generates formal compliance audit reports with full explainability.",
    highlights: [
      "4 specialized CrewAI agents with clear operational role separation",
      "Real-time WebSocket streaming of agent deliberation and decision logs",
      "Automated KYC, financial statement verification, and solvency checks",
      "Explainable compliance scoring with audit-ready approval reports",
    ],
    tags: ["CrewAI", "Node.js", "WebSockets", "Python", "Multi-Agent"],
    github: "https://github.com/krishk2/FinAgentX/tree/main",
    video: "https://drive.google.com/file/d/1aWEQlgwh4NrwrSyISKLAJHhl3UfoKbm9/preview",
    demo: "https://drive.google.com/file/d/1aWEQlgwh4NrwrSyISKLAJHhl3UfoKbm9/view?usp=sharing",
    live: null,
    badge: "Multi-Agent Architecture",
  },
  {
    id: "voicelab",
    year: "2026",
    title: "VoiceLab: TTS & ASR",
    subtitle: "Neural Speech Synthesis & Zero-Shot Voice Cloning",
    summary:
      "Production-ready neural speech synthesis and zero-shot voice cloning platform featuring real-time audio visualization, dual GPU acceleration, and Docker deployment.",
    description:
      "Production-ready neural speech synthesis and zero-shot voice cloning platform featuring real-time audio visualization, dual-backend GPU acceleration via Google Colab & Hugging Face, and a production Docker deployment with MongoDB persistence and JWT authentication.",
    extendedDescription:
      "VoiceLab is a high-performance neural speech synthesis and zero-shot voice cloning platform engineered for rapid experimentation and production serving. Features real-time WebAudio waveform visualization, dual-backend GPU acceleration via Google Colab & Hugging Face Inference endpoints, and a containerized Docker deployment backed by MongoDB for user preset persistence and JWT-based session security.",
    highlights: [
      "Zero-shot neural voice cloning from under 5 seconds of sample audio",
      "Real-time FFT audio visualizer with sub-second synthesis streaming",
      "Dual-backend GPU acceleration bridging Colab & Hugging Face",
      "Dockerized microservices architecture with MongoDB persistence",
    ],
    tags: ["Neural TTS", "Voice Cloning", "Hugging Face", "Docker", "MongoDB", "Audio AI"],
    github: "https://github.com/krishk2/VoiceLab--TTS-and-ASR",
    demo: "https://voice-lab-gqcl.onrender.com",
    live: "https://voice-lab-gqcl.onrender.com",
    badge: "Neural Speech Engine",
  },
  {
    id: "quantusight",
    year: "2026",
    title: "QuantuSight",
    subtitle: "IBM Quantum Observability & Visual Circuit Composer",
    summary:
      "IBM Quantum observability dashboard and visual circuit composer featuring predictive ML for queue times and error-rate simulation.",
    description:
      "Comprehensive observability and management dashboard for IBM Quantum workflows (built for the Amaravati Quantum Valley Hackathon). Features real-time job execution tracking, predictive ML models for queue-time and error rate estimation, an interactive circuit composer, and local circuit simulation.",
    extendedDescription:
      "QuantuSight is an end-to-end quantum computing management and telemetry dashboard developed for the Amaravati Quantum Valley Hackathon (awarded Winner). It bridges the gap between quantum research and operational observability by tracking live job execution across IBM Quantum QPUs, utilizing predictive ML models to forecast queue waiting times and device error rates, and offering a visual quantum circuit composer with local statevector simulation.",
    highlights: [
      "Live IBM Quantum QPU telemetry and execution queue monitoring",
      "Predictive ML models for calibration error and queue-time estimation",
      "Visual quantum circuit composer with interactive statevector simulator",
      "Awarded Winner at the Amaravati Quantum Valley Hackathon",
    ],
    achievementImages: [
      {
        src: quantumValleyImg,
        label: "Winners Stage & Trophy",
        caption: "Amaravati Quantum Valley Hackathon 2025 — Grand Finale Winners on stage with Trophy & ₹50,000 Cheque",
      },
    ],
    tags: ["IBM Quantum", "Qiskit", "Jupyter", "Machine Learning", "Quantum Computing"],
    github: "https://github.com/krishk2/quantusight",
    demo: "https://quantu-sight-accelerated.onrender.com",
    live: "https://quantu-sight-accelerated.onrender.com",
    badge: "Amaravati Hackathon Winner",
  },
  {
    id: "email-classifier",
    year: "2026",
    title: "Enterprise Email Classifier",
    subtitle: "Automated IT Support Email Triage",
    summary:
      "Production NLP classification pipeline categorizing enterprise IT support requests with 94% accuracy and sub-50ms CPU inference using fine-tuned DistilBERT.",
    description:
      "Production NLP classification pipeline for enterprise corporate IT support inboxes. Automatically categorizes incoming service requests, complaints, and spam with 94% accuracy and 0.93 weighted F1-score, delivering sub-50ms CPU inference using a fine-tuned DistilBERT model deployed on Streamlit.",
    extendedDescription:
      "Developed during AI Internship at Infosys Springboard, this enterprise-grade NLP pipeline triages incoming corporate IT support email streams. Leveraging a fine-tuned DistilBERT model trained on multi-class support inboxes, the service categorizes service inquiries, network complaints, and spam with 94% accuracy and a 0.93 weighted F1-score, delivering sub-50ms CPU inference latency deployed on Streamlit.",
    highlights: [
      "94% classification accuracy & 0.93 weighted F1-score on enterprise data",
      "Fine-tuned DistilBERT model achieving sub-50ms CPU inference latency",
      "Automated ticket priority tagging and intelligent department routing",
      "Production deployment on Streamlit Cloud with live interactive testbench",
    ],
    tags: ["DistilBERT", "PyTorch", "NLP", "Streamlit", "Hugging Face", "Scikit-Learn"],
    github: "https://github.com/krishk2/Enterprise-email-classifier",
    demo: null,
    live: "https://enterprise-email-classifier.streamlit.app/",
    badge: "Enterprise NLP",
  },
  {
    id: "veritas",
    year: "2026",
    title: "Veritas.AI",
    subtitle: "Multi-Agent Fact-Checking System",
    summary:
      "5-agent LLM framework for AI authenticity, multi-source evidence retrieval, claim extraction, and explainable credibility reporting.",
    description:
      "5-agent LLM framework for AI authenticity — performs claim extraction, evidence retrieval, credibility assessment, reasoning, and report generation integrating 10+ information sources.",
    extendedDescription:
      "Veritas.AI is a decentralized multi-agent verification system designed to combat misinformation and evaluate the authenticity of digital claims. Operating through a 5-agent CrewAI pipeline, the system extracts claims from unstructured text, crawls and queries 10+ authoritative sources, conducts credibility cross-referencing, performs adversarial counter-argument verification, and generates a structured truthfulness report with cited evidence.",
    highlights: [
      "5-agent CrewAI orchestration: Extractor, Researcher, Verifier, Critic, Reporter",
      "Multi-source evidence aggregation querying 10+ real-time knowledge bases",
      "Adversarial verification testing claims against known disinformation patterns",
      "Comprehensive authenticity score with full citation lineage",
    ],
    tags: ["CrewAI", "LLM", "Multi-Agent", "Python"],
    github: "https://github.com/krishk2/Veritas.AI",
    demo: null,
    live: null,
    badge: "Multi-Agent Fact Check",
  },
];

export const accomplishments = [
  {
    title: "1st Place — Convolve 4.0 Pan-IIT Hackathon",
    detail: "Multi-Agent Systems Track · 8,000+ teams · Team Twilight (Masthishq)",
    year: "2026",
    video: "https://drive.google.com/file/d/1mq36FTSPY35Hbm681oE8DaL3NUPv87A6/preview",
    folder: "https://drive.google.com/drive/u/4/folders/1MO1aNhguOguY9YpZB4rRInw50-J_40JM",
    projectTitle: "Masthishq",
    images: [
      {
        src: convolveImg,
        label: "Stage Award",
        caption: "Convolve 4.0 Pan-IIT AI/ML Hackathon — 1st Place Award Ceremony on stage (Multi-Agent Systems Track, Powered by Qdrant)",
        alt: "Convolve 4.0 Pan-IIT Hackathon Award Ceremony on stage",
      },
      {
        src: convolveGlassesImg,
        label: "Prize: Ray-Ban Meta",
        caption: "Ray-Ban Meta Wayfarer Smart Glasses — 1st Place Prize won for Masthishq AI Assistant",
        alt: "Ray-Ban Meta Smart Glasses Prize won at Convolve 4.0",
      },
    ],
  },
  {
    title: "Winner — Amaravati Quantum Valley Hackathon",
    detail: "Built live job-tracking dashboard for IBM Quantum (QuantuSight) · ₹50,000 Prize",
    year: "2026",
    link: "https://quantu-sight-accelerated.onrender.com",
    projectTitle: "QuantuSight",
    images: [
      {
        src: quantumValleyImg,
        label: "Winners Stage & Trophy",
        caption: "Amaravati Quantum Valley Hackathon 2025 — Grand Finale Winners on stage with Trophy, Medals & ₹50,000 Cheque (IBM Quantum)",
        alt: "Amaravati Quantum Valley Hackathon 2025 Grand Finale Winners",
      },
    ],
  },
  {
    title: "Finalist — Paytm Build for India Hackathon",
    detail: "Voice-enabled feature navigator · 4,000+ participants nationwide",
    year: "2026",
    images: [
      {
        src: paytmImg,
        label: "Hackathon Deep Work",
        caption: "Paytm Build for India Hackathon — Finalist team in deep work session building voice-enabled financial navigator at hackathon venue",
        alt: "Paytm Build for India Hackathon Finalist Team Working",
      },
    ],
  },
];

export const certifications = [
  {
    title: "AI Agents Course",
    issuer: "Hugging Face",
    link: "https://drive.google.com/file/d/1r3sZEb5SFfspi3hUvVbGFEzBNTKoMJrJ/view?usp=sharing",
    tag: "Multi-Agent AI",
    year: "2026",
  },
  {
    title: "Certified Foundations Associate",
    issuer: "Oracle",
    link: "https://brm-certview.oracle.com/ords/certview/ecertificate?ssn=OC7480841&trackId=OCI25AICFA&key=368ac6692cbd8982837975065decb19dff7473d9",
    tag: "Cloud & AI",
    year: "2026",
  },
  {
    title: "Deep Learning",
    issuer: "Infosys",
    link: "https://drive.google.com/file/d/1fRuK5r6Fa9ZaxrqHmZzZtPD_YNf9FPUa/view",
    tag: "Deep Learning",
    year: "2026",
  },
  {
    title: "Intro to Machine Learning",
    issuer: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/koushikpadigala/intro-to-machine-learning",
    tag: "Machine Learning",
    year: "2025",
  },
  {
    title: "Data Analysis with Python",
    issuer: "FreeCodeCamp",
    link: "https://freecodecamp.org/certification/fcc4d5b9671-b2f0-4d83-8069-d218fcc26463/data-analysis-with-python-v7",
    tag: "Python & Analytics",
    year: "2025",
  },
  {
    title: "Java OOP",
    issuer: "edX",
    link: "https://courses.edx.org/certificates/1c23caa5ca2d48949183475ac66837f6",
    tag: "Object-Oriented Programming",
    year: "2025",
  },
];

export const skills = {
  Languages: ["Java", "Python", "C", "JavaScript", "SQL"],
  "AI & LLM": ["Multi-Agent Systems", "CrewAI", "Claude Code", "Pandas", "NumPy", "Scikit-learn", "OpenCV"],
  "Web & Backend": ["React.js", "TypeScript", "FastAPI", "Flask", "Node.js", "Express.js", "REST APIs"],
  "Databases & Tools": ["MySQL", "MongoDB", "Qdrant", "PowerBI", "Git", "Docker"],
};
