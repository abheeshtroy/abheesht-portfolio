export type Project = {
    slug: string;
    title: string;
    filename: string;
    year: string;
    description: string;
    stack: string;
    impact: string;
    tags: string[];
    github?: string;
    live?: string;
    featured: boolean;
    accentColor: string;
    overview?: string;
    problem?: string;
    solution?: string;
    architecture?: string[];
    results?: string[];
  };
  
  export const projects: Project[] = [
    // ── FEATURED ──────────────────────────────────────────────
    {
      slug: "agent-techs-pipeline",
      title: "Agent-Techs AI Pipeline",
      filename: "agent-techs / agentic-data-harmonization",
      year: "2025",
      description:
        "Multi-agent orchestration system for healthcare document processing. Built async task queues, FAISS vector search, and deployed on GCP Cloud Run.",
      stack: "Python · LangChain · FAISS · GCP",
      impact: "~60% reduction in processing time",
      tags: ["multi-agent", "vector search", "distributed"],
      github: "https://github.com/abheeshtroy/agentic-data-harmonization",
      live: undefined, // deploy link coming
      featured: true,
      accentColor: "#6366f1",
      overview:
        "Built during an applied AI internship at Agent-Techs, this pipeline orchestrates multiple AI agents to process and extract structured data from unstructured healthcare documents at scale.",
      problem:
        "Healthcare documents (intake forms, clinical notes, insurance records) arrived in inconsistent formats. Manual processing was slow and error-prone, creating a bottleneck for downstream workflows.",
      solution:
        "Designed a multi-agent pipeline where specialized agents handle classification, extraction, and validation in parallel. FAISS vector search enables semantic deduplication and retrieval across the document corpus.",
      architecture: [
        "Ingestion layer: async queues handle burst document uploads",
        "Classification agent: routes documents by type using fine-tuned embeddings",
        "Extraction agent: structured data extraction via LangChain chains",
        "Validation agent: cross-references extracted fields against knowledge graph",
        "GCP Cloud Run: containerized, scales to zero between workloads",
      ],
      results: [
        "~60% reduction in end-to-end processing time",
        "Handles 3 document types across 2 pipeline variants",
        "Deployed and serving in production on GCP",
      ],
    },
    {
      slug: "text2sql",
      title: "Text2SQL",
      filename: "research / text2sql",
      year: "2024",
      description:
        "Natural language to SQL translation using FLAN-T5, evaluated on the Spider benchmark with knowledge-graph-based validation for query correctness.",
      stack: "Python · FLAN-T5 · HuggingFace · PyTorch",
      impact: "Evaluated on Spider benchmark",
      tags: ["NLP", "LLM fine-tuning", "knowledge graph"],
      github: undefined, // link coming
      featured: true,
      accentColor: "#8b5cf6",
      overview:
        "A research project exploring how smaller fine-tuned models (FLAN-T5) can compete with larger LLMs on structured query generation, with a novel validation layer using knowledge graphs.",
      problem:
        "Most Text2SQL systems rely on giant models with no correctness guarantees. The goal was to build a lightweight, verifiable pipeline that catches semantically wrong queries before they hit a database.",
      solution:
        "Fine-tuned FLAN-T5 on the Spider dataset. Added a KG-based validation step that checks generated SQL against a schema-aware knowledge graph to flag structural and semantic errors.",
      architecture: [
        "FLAN-T5 base fine-tuned on Spider training set",
        "Schema-linking module maps NL entities to DB columns",
        "KG validation layer built on entity-relationship graph",
        "Evaluated using Spider exact-match and execution accuracy",
      ],
      results: [
        "Competitive accuracy on Spider benchmark vs baseline",
        "KG validation catches ~30% of structurally invalid queries",
        "Lightweight enough to run inference on a single GPU",
      ],
    },
    {
      slug: "graph-pipeline",
      title: "Scalable Graph Pipeline",
      filename: "infra / graph-pipeline",
      year: "2024",
      description:
        "Distributed graph data pipeline using Neo4j, Kafka, Kubernetes, and Docker. Designed for real-time ingestion and traversal at scale.",
      stack: "Neo4j · Kafka · Kubernetes · Docker",
      impact: "Real-time ingestion at scale",
      tags: ["distributed systems", "graph DB", "Kafka"],
      github: undefined, // repo TBD
      featured: true,
      accentColor: "#06b6d4",
      overview:
        "A systems project building production-grade infrastructure for graph data — ingesting streams via Kafka, storing in Neo4j, and orchestrating containers with Kubernetes.",
      problem:
        "Graph databases are powerful but hard to feed at scale. Batch imports create lag; naive streaming creates contention. The challenge was a real-time pipeline that keeps the graph fresh without degrading query performance.",
      solution:
        "Kafka handles event streaming from source systems. A consumer service transforms and loads records into Neo4j in micro-batches. Kubernetes manages scaling and restarts; Docker keeps environments reproducible.",
      architecture: [
        "Kafka producers emit graph events (nodes, edges, updates)",
        "Consumer service: transforms events and batches Neo4j writes",
        "Neo4j Causal Cluster for read/write separation",
        "Kubernetes deployment with autoscaling on consumer lag",
        "Docker Compose for local dev; Helm charts for k8s deploy",
      ],
      results: [
        "Handles sustained ingestion without query degradation",
        "Consumer lag stays under 2s at peak load in testing",
        "Full local dev environment in one docker-compose up",
      ],
    },
    {
      slug: "samsung-diagnostic",
      title: "Samsung Diagnostic Tool",
      filename: "samsung / chip-diagnostics",
      year: "2023",
      description:
        "Hardware diagnostic tool for semiconductor validation in C++ and PyQt. Interfaced with I2C/SPI protocols across 3+ chip variants, including hunting down a thread contention bug.",
      stack: "C++ · PyQt · I2C · SPI",
      impact: "Used across 3+ chip variants",
      tags: ["embedded", "hardware", "C++"],
      github: undefined, // proprietary — no link
      featured: true,
      accentColor: "#3b82f6",
      overview:
        "Six months embedded (literally) in Samsung's semiconductor division, building internal tooling for chip validation. The work that doesn't show up in press releases but determines whether hardware ships.",
      problem:
        "Validation engineers needed a reliable GUI tool to run diagnostic sequences across multiple chip variants over I2C/SPI. The existing tooling was brittle, single-chip, and had a race condition that corrupted test results intermittently.",
      solution:
        "Rebuilt the diagnostic tool in C++ with a PyQt frontend. Designed an abstraction layer for chip variants so adding a new chip meant writing one config file, not rewriting the tool. Tracked down the thread contention bug through systematic lock analysis.",
      architecture: [
        "C++ core: protocol handling, test sequencer, result parser",
        "PyQt GUI: test selection, live register readout, log export",
        "Chip abstraction layer: YAML config per variant",
        "I2C/SPI interface via libusb + custom protocol wrappers",
      ],
      results: [
        "Tool used across 3+ chip variants in active validation",
        "Eliminated intermittent result corruption (thread contention fix)",
        "Reduced per-chip onboarding from days to hours via config layer",
      ],
    },
  
    // ── SECONDARY ─────────────────────────────────────────────
    {
      slug: "agrichain",
      title: "AgriChain",
      filename: "agrichain",
      year: "2023",
      description:
        "Blockchain-based agricultural supply chain tracker. Smart contracts for traceability from farm to shelf.",
      stack: "Solidity · React · Node.js",
      impact: "",
      tags: ["Solidity", "React"],
      github: "https://github.com/abheeshtroy/supply-chain-provenance",
      featured: false,
      accentColor: "#6366f1",
    },
    {
      slug: "context-monitoring",
      title: "Context Monitoring App",
      filename: "context-monitor",
      year: "2023",
      description:
        "Real-time application context monitoring with alerting and dashboard visualization.",
      stack: "Python · React · WebSockets",
      impact: "",
      tags: ["Python", "React"],
      github: "https://github.com/abheeshtroy/ContextMonitoringApp",
      featured: false,
      accentColor: "#6366f1",
    },
    {
      slug: "air-passenger",
      title: "Air Passenger Prediction",
      filename: "air-passenger",
      year: "2022",
      description:
        "Time-series forecasting model for airline passenger volumes using classical ML methods.",
      stack: "Python · scikit-learn · pandas",
      impact: "",
      tags: ["ML", "time-series"],
      featured: false,
      accentColor: "#6366f1",
    },
    {
      slug: "mushroom-classifier",
      title: "Poisonous Mushroom Classifier",
      filename: "mushroom-clf",
      year: "2022",
      description:
        "Binary classification model to identify poisonous mushrooms from UCI dataset features.",
      stack: "Python · scikit-learn",
      impact: "",
      tags: ["ML", "classification"],
      github:
        "https://github.com/abheeshtroy/binary_prediction_of_poisonous_mushrooms",
      featured: false,
      accentColor: "#6366f1",
    },
  ];
  
  export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
  }
  
  export const featuredProjects = projects.filter((p) => p.featured);
  export const secondaryProjects = projects.filter((p) => !p.featured);