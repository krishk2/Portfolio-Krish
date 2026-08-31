// src/data/content.js
// Central data store – update this to change all site content

export const personal = {
  name: "Krishna Koushik Padigala",
  tagline: "Multi-Agent Systems · LLM Applications · Computer Vision",
  email: "koushikpadigala2@gmail.com",
  phone: "+91-9490044270",
  linkedin: "https://www.linkedin.com/in/krishna-koushik-padigala-691728305/",
  github: "https://github.com/krishk2",
};

export const education = {
  university: "Rajiv Gandhi University of Knowledge Technologies, RK Valley",
  degree: "B.Tech in Computer Science and Engineering",
  duration: "Aug 2023 – April 2027",
  gpa: "8.77",
};

export const experience = [
  {
    company: "Siemens Technical Services Pvt. Ltd.",
    location: "Bangalore",
    role: "Intern",
    duration: "May 2026 – June 2026",
    bullets: [
      "Prototyped a Neo4j graph database model to visualize real-time Bangalore traffic pulse, mapping road-node relationships and congestion propagation across 200+ intersections.",
      "Designed a node-centrality metric to rank bottleneck junctions, reducing simulated signal-response latency by ~30% in proof-of-concept evaluations.",
    ],
  },
  {
    company: "Infosys Springboard",
    location: "Remote",
    role: "AI Intern",
    duration: "Nov 2025 – Jan 2026",
    bullets: [
      "Built an end-to-end NLP pipeline for enterprise IT support email classification using Python, PyTorch, and Hugging Face.",
      "Achieved 94% classification accuracy and 0.93 weighted F1-score with sub-50ms CPU inference using a fine-tuned DistilBERT model.",
    ],
  },
  {
    company: "Glassdata",
    location: "Remote",
    role: "Agentic AI Intern",
    duration: "2026",
    bullets: [
      "Built an end-to-end WebSocket-based native speech pipeline for real-time AI interactions.",
      "Optimized audio processing workflows, improving overall system response latency by 5%.",
    ],
  },
];

export const projects = [
  {
    title: "Masthishq",
    subtitle: "AI Memory Assistant",
    description:
      "Multimodal AI memory assistant for Alzheimer's care using FaceNet, YOLOv8, Qdrant, and Llama-3 (Groq). Achieved 95%+ face recognition accuracy with sub-2s response latency.",
    tags: ["FaceNet", "YOLOv8", "Qdrant", "Llama-3", "Groq"],
    github: "https://github.com/krishk2/Masthishq",
    live: "https://masthishq-frontend.onrender.com/",
  },
  {
    title: "Veritas.AI",
    subtitle: "Multi-Agent Fact-Checking System",
    description:
      "5-agent LLM framework for AI authenticity — performs claim extraction, evidence retrieval, credibility assessment, reasoning, and report generation integrating 10+ information sources.",
    tags: ["CrewAI", "LLM", "Multi-Agent", "Python"],
    github: "https://github.com/krishk2/Veritas.AI",
    live: null,
  },
  {
    title: "FinAgentX",
    subtitle: "AI-Powered Remote Banking",
    description:
      "4-agent AI banking platform automating loan data collection, verification, underwriting, and approval workflows.",
    tags: ["CrewAI", "Node.js", "WebSockets", "Python"],
    github: "https://github.com/krishk2/FinAgentX",
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

export const skills = {
  Languages: ["Java", "Python", "C", "JavaScript", "SQL"],
  "AI & LLM": ["Multi-Agent Systems", "CrewAI", "Claude Code", "Pandas", "NumPy", "Scikit-learn", "OpenCV"],
  "Web & Backend": ["React.js", "TypeScript", "FastAPI", "Flask", "Node.js", "Express.js", "REST APIs"],
  "Databases & Tools": ["MySQL", "MongoDB", "Qdrant", "PowerBI", "Git", "Docker"],
};
