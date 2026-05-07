import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, ArrowUpRight, Brain, Sparkles, Code2, Database } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Syed Ibrahim — AI Engineer" },
      { name: "description", content: "Syed Ibrahim is an AI Engineer building production-grade LLM systems, RAG pipelines, and intelligent agents." },
      { property: "og:title", content: "Syed Ibrahim — AI Engineer" },
      { property: "og:description", content: "Building intelligent systems with LLMs, RAG, and agentic workflows." },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    title: "Atlas RAG",
    tag: "Retrieval-Augmented Generation",
    desc: "Production RAG framework over 12M enterprise docs. Hybrid BM25 + vector search with reranking, sub-300ms p95 latency.",
    stack: ["LangChain", "Qdrant", "Cohere", "FastAPI"],
    icon: Database,
  },
  {
    title: "Synapse Agents",
    tag: "Multi-Agent System",
    desc: "Autonomous research agents that plan, browse, and synthesize reports. Tool-use orchestration with self-correction loops.",
    stack: ["LangGraph", "OpenAI", "Playwright", "Redis"],
    icon: Brain,
  },
  {
    title: "Lumen Vision",
    tag: "Computer Vision",
    desc: "Real-time defect detection on manufacturing lines. Fine-tuned ViT model deployed on edge with TensorRT, 99.2% recall.",
    stack: ["PyTorch", "ViT", "TensorRT", "ONNX"],
    icon: Sparkles,
  },
  {
    title: "Codex Copilot",
    tag: "LLM Fine-Tuning",
    desc: "Domain-specific code assistant fine-tuned on 4M internal commits via LoRA. Cut review time by 38% across 6 teams.",
    stack: ["Llama 3", "PEFT", "vLLM", "Modal"],
    icon: Code2,
  },
];

const skills = [
  "PyTorch", "TensorFlow", "LangChain", "LangGraph", "LlamaIndex",
  "Hugging Face", "vLLM", "Triton", "Qdrant", "Pinecone", "Weaviate",
  "FastAPI", "Ray", "MLflow", "Kubernetes", "AWS SageMaker",
];

function Portfolio() {
  return (
    <div className="min-h-screen bg-hero">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/40 border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-mono text-sm tracking-tight">
            <span className="text-gradient font-bold">syed</span>
            <span className="text-muted-foreground">.ibrahim</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors">Work</a>
            <a href="#stack" className="hover:text-foreground transition-colors">Stack</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <a
            href="mailto:syed@ibrahim.dev"
            className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:shadow-glow transition-shadow"
          >
            Let's talk →
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-40">
          <div className="flex items-center gap-2 mb-6 font-mono text-xs text-primary">
            <span className="size-2 rounded-full bg-primary animate-pulse shadow-glow" />
            AVAILABLE FOR Q3 2026 ENGAGEMENTS
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
            Building <span className="text-gradient">intelligence</span>
            <br />
            into software.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            I'm <span className="text-foreground font-medium">Syed Ibrahim</span>, an AI Engineer
            shipping production LLM systems, retrieval pipelines, and autonomous agents
            for teams that care about latency, evals, and cost.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all"
            >
              See selected work
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-card transition-colors"
            >
              Book a call
            </a>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {[
              ["6+", "years shipping ML"],
              ["40M+", "tokens / day in prod"],
              ["12", "models fine-tuned"],
              ["3", "patents pending"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-3xl md:text-4xl font-bold text-gradient">{n}</div>
                <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-32">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="font-mono text-xs text-primary mb-3">/ 01 — SELECTED WORK</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Things I've built.</h2>
          </div>
          <div className="hidden md:block text-sm text-muted-foreground max-w-xs">
            A few projects spanning RAG, agents, vision, and fine-tuning.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all shadow-card hover:-translate-y-1 duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <Icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:rotate-12 transition-all" />
                </div>
                <div className="font-mono text-[11px] text-primary uppercase tracking-wider mb-2">{p.tag}</div>
                <h3 className="text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="max-w-6xl mx-auto px-6 py-32 border-t border-border">
        <div className="font-mono text-xs text-primary mb-3">/ 02 — STACK</div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Tools of the trade.</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="px-4 py-2 rounded-full border border-border bg-card hover:border-primary/50 hover:text-primary transition-colors font-mono text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-32 border-t border-border">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="font-mono text-xs text-primary mb-3">/ 03 — ABOUT</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Engineer first.<br />Researcher second.
            </h2>
          </div>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              I started writing CUDA kernels in 2019 and never looked back. Today I help startups
              and research labs put models behind real users — from prototyping a RAG slack-bot in
              an afternoon to scaling a vLLM cluster serving millions of requests.
            </p>
            <p>
              My north star is <span className="text-foreground">measurable impact</span>: faithful
              evals, honest latency budgets, and code that another engineer can pick up at 2am.
            </p>
            <p>
              When I'm not in a notebook, you'll find me running long distances along the Bosphorus
              or losing at chess to a 14-year-old.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-32 border-t border-border">
        <div className="rounded-3xl p-12 md:p-20 bg-card border border-border shadow-card relative overflow-hidden">
          <div className="absolute -top-24 -right-24 size-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <div className="font-mono text-xs text-primary mb-3">/ 04 — CONTACT</div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
              Have a hard problem? <span className="text-gradient">Let's solve it.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg">
              Open to AI engineering contracts, full-time roles, and the occasional advisory call.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="mailto:syed@ibrahim.dev" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-glow transition-all">
                <Mail className="size-4" /> syed@ibrahim.dev
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-secondary transition-colors">
                <Github className="size-4" /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-secondary transition-colors">
                <Linkedin className="size-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
        <div>© 2026 Syed Ibrahim. Built with intent.</div>
        <div>Istanbul / Remote</div>
      </footer>
    </div>
  );
}
