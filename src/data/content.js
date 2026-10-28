// src/data/content.js
// Central data store – update this to change all site content

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
    title: "Masthishq",
    subtitle: "AI Memory Assistant",
    description:
      "Multimodal AI agent designed as an external cognitive memory for Alzheimer's & Dementia patients. Integrates FaceNet and YOLOv8 for face and object recognition, Qdrant vector database for episodic memory retrieval, and Groq-hosted Llama-3 with Whisper for real-time contextual voice conversations.",
    tags: ["FastAPI", "React", "Qdrant", "Llama-3", "Groq", "YOLOv8", "FaceNet"],
    github: "https://github.com/krishk2/Masthishq",
    demo: "https://drive.google.com/file/d/1sXt4R2UMOnmO0yUck7cl9stCuMtTe2Mk/view?usp=drive_link",
    live: "https://masthishq-frontend.onrender.com/",
  },
  {
    title: "Meeting Prep Agent",
    subtitle: "Autonomous Sales Memory & Executive Briefing",
    description:
      "Autonomous sales intelligence agent built for the Hindsight Hackathon. Formulates contextual pre-meeting briefs from prior interactions, conducts post-call sentiment and action-item extraction with Groq LLM, drafts follow-up emails in Gmail, and continuously adapts to rep preferences through Hindsight's memory learning loop.",
    tags: ["FastAPI", "React", "Hindsight", "Groq LLM", "Gmail API", "Google Calendar"],
    github: "https://github.com/Pasalavijay799/meeting-prep-agent",
    demo: "https://drive.google.com/file/d/1sXt4R2UMOnmO0yUck7cl9stCuMtTe2Mk/view?usp=drive_link",
    live: null,
  },
  {
    title: "FinAgentX",
    subtitle: "AI-Powered Remote Banking System",
    description:
      "4-agent banking workflow automating loan application, data collection, financial verification, underwriting, and risk approval workflows.",
    tags: ["CrewAI", "Node.js", "WebSockets", "Python", "Multi-Agent"],
    github: "https://github.com/krishk2/FinAgentX/tree/main",
    demo: "https://drive.google.com/file/d/1aWEQlgwh4NrwrSyISKLAJHhl3UfoKbm9/view?usp=sharing",
    live: null,
  },
  {
    title: "VoiceLab: TTS & ASR",
    subtitle: "Neural Speech Synthesis & Zero-Shot Voice Cloning",
    description:
      "Production-ready neural speech synthesis and zero-shot voice cloning platform featuring real-time audio visualization, dual-backend GPU acceleration via Google Colab & Hugging Face, and a production Docker deployment with MongoDB persistence and JWT authentication.",
    tags: ["Neural TTS", "Voice Cloning", "Hugging Face", "Docker", "MongoDB", "Audio AI"],
    github: "https://github.com/krishk2/VoiceLab--TTS-and-ASR",
    demo: "https://voice-lab-gqcl.onrender.com",
    live: null,
  },
  {
    title: "QuantuSight",
    subtitle: "IBM Quantum Observability & Visual Circuit Composer",
    description:
      "Comprehensive observability and management dashboard for IBM Quantum workflows (built for the Amaravati Quantum Valley Hackathon). Features real-time job execution tracking, predictive ML models for queue-time and error rate estimation, an interactive circuit composer, and local circuit simulation.",
    tags: ["IBM Quantum", "Qiskit", "Jupyter", "Machine Learning", "Quantum Computing"],
    github: "https://github.com/krishk2/quantusight",
    demo: "https://quantu-sight-accelerated.onrender.com",
    live: null,
  },
  {
    title: "Enterprise Email Classifier",
    subtitle: "Automated IT Support Email Triage",
    description:
      "Production NLP classification pipeline for enterprise corporate IT support inboxes. Automatically categorizes incoming service requests, complaints, and spam with 94% accuracy and 0.93 weighted F1-score, delivering sub-50ms CPU inference using a fine-tuned DistilBERT model deployed on Streamlit.",
    tags: ["DistilBERT", "PyTorch", "NLP", "Streamlit", "Hugging Face", "Scikit-Learn"],
    github: "https://github.com/krishk2/Enterprise-email-classifier",
    demo: null,
    live: "https://enterprise-email-classifier.streamlit.app/",
  },
  {
    title: "Veritas.AI",
    subtitle: "Multi-Agent Fact-Checking System",
    description:
      "5-agent LLM framework for AI authenticity — performs claim extraction, evidence retrieval, credibility assessment, reasoning, and report generation integrating 10+ information sources.",
    tags: ["CrewAI", "LLM", "Multi-Agent", "Python"],
    github: "https://github.com/krishk2/Veritas.AI",
    demo: null,
    live: null,
  },
];

export const accomplishments = [
  {
    title: "1st Place — Convolve 4.0 Pan-IIT Hackathon",
    detail: "Multi-Agent Systems Track · 8,000+ teams",
    year: "2026",
  },
  {
    title: "Winner — Amaravati Quantum Valley Hackathon",
    detail: "Built live job-tracking dashboard for IBM Quantum",
    year: "2026",
  },
  {
    title: "Finalist — Paytm Build for India Hackathon",
    detail: "Voice-enabled feature navigator · 4,000+ participants",
    year: "2026",
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
