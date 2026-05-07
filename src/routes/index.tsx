import { createFileRoute } from "@tanstack/react-router";
import { Twitter, Linkedin, Github, Dribbble } from "lucide-react";
import portrait from "@/assets/syed-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Syed Ibrahim — AI Engineer" },
      { name: "description", content: "Syed Ibrahim, AI Engineer. Building production LLM systems, RAG pipelines, and intelligent agents." },
      { property: "og:title", content: "Syed Ibrahim — AI Engineer" },
      { property: "og:description", content: "Building intelligence into software." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top nav */}
      <header className="max-w-[1400px] mx-auto px-8 lg:px-14 pt-8 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl tracking-tight italic">
          Syed <span className="font-normal">Ibrahim.</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-[0.18em] uppercase">
          <a href="#work" className="hover:opacity-60 transition">Work</a>
          <a href="#book" className="hover:opacity-60 transition">Book a call</a>
          <a href="mailto:syed@ibrahim.dev" className="hover:opacity-60 transition">Email</a>
          <a href="/cv.pdf" className="hover:opacity-60 transition">Download CV</a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] tracking-wide"
        >
          <span className="size-1.5 rounded-full bg-background" /> Get in touch
        </a>
      </header>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-8 lg:px-14 pt-16 lg:pt-20 pb-10">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left column */}
          <div className="col-span-12 md:col-span-3 space-y-6">
            <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              Professional
            </div>
            <h1 className="font-serif text-[88px] md:text-[110px] leading-[0.88] tracking-[-0.04em]">
              AI<br />Engineer<span className="italic-serif">.</span>
            </h1>
            <div className="flex flex-wrap gap-2 pt-2">
              {["#LLMs", "#RAG", "#Agents", "#MLOps"].map((t) => (
                <span key={t} className="text-xs tracking-wider text-muted-foreground">{t}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed pt-4">
              I am Syed Ibrahim — an engineer shipping production AI: retrieval pipelines,
              autonomous agents, and finely-tuned models that quietly do the work of ten people.
            </p>
          </div>

          {/* Center portrait */}
          <div className="col-span-12 md:col-span-6 relative">
            <div className="relative mx-auto w-full max-w-[480px]">
              <div className="aspect-[4/5] overflow-hidden rounded-full border border-border bg-secondary">
                <img
                  src={portrait}
                  alt="Portrait of Syed Ibrahim, AI Engineer"
                  width={768}
                  height={896}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Call badge */}
              <a
                href="#contact"
                className="absolute -left-4 md:-left-10 bottom-6 size-28 md:size-32 rounded-full bg-background border border-foreground/80 flex flex-col items-center justify-center text-center font-serif italic text-xl leading-tight hover:bg-foreground hover:text-background transition"
              >
                Call<br />Syed<br />→
              </a>
            </div>
          </div>

          {/* Right column — stats */}
          <div className="col-span-12 md:col-span-3 space-y-10 md:pl-6 md:border-l md:border-border md:pt-4">
            <Stat label="Years in AI" value="8" />
            <Stat label="Eval Accuracy" value="100%" />
            <Stat label="Tokens / day prod" value="+40M" />
            <Stat label="Models shipped" value="645" />
          </div>
        </div>

        {/* Bottom row — footer-of-hero */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-6">
          <p className="font-serif italic text-lg max-w-md">
            Want to make your hardest model impossible to ignore?
          </p>
          <div className="flex items-center gap-6 text-foreground/70">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-foreground"><Twitter className="size-4" /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="size-4" /></a>
            <a href="https://github.com" aria-label="GitHub" className="hover:text-foreground"><Github className="size-4" /></a>
            <a href="https://dribbble.com" aria-label="Dribbble" className="hover:text-foreground"><Dribbble className="size-4" /></a>
          </div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
            © 2026 — Istanbul / Remote
          </div>
        </div>
      </section>

      {/* Work strip */}
      <section id="work" className="max-w-[1400px] mx-auto px-8 lg:px-14 py-24 border-t border-border">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif text-5xl md:text-6xl tracking-[-0.03em]">
            Selected <span className="italic-serif">work.</span>
          </h2>
          <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">/ 2024 — 2026</div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {[
            { n: "01", t: "Atlas RAG", d: "Hybrid retrieval over 12M enterprise docs. Sub-300ms p95.", s: "LangChain · Qdrant · Cohere" },
            { n: "02", t: "Synapse Agents", d: "Autonomous research agents with self-correction loops.", s: "LangGraph · OpenAI · Playwright" },
            { n: "03", t: "Lumen Vision", d: "Real-time defect detection on edge. 99.2% recall.", s: "PyTorch · ViT · TensorRT" },
            { n: "04", t: "Codex Copilot", d: "Domain-tuned code assistant via LoRA on 4M commits.", s: "Llama 3 · PEFT · vLLM" },
          ].map((p) => (
            <article key={p.n} className="group border-t border-border pt-6 flex gap-6">
              <div className="font-serif italic text-muted-foreground text-lg w-10">{p.n}</div>
              <div className="flex-1">
                <h3 className="font-serif text-3xl tracking-tight mb-2 group-hover:italic transition-all">{p.t}</h3>
                <p className="text-muted-foreground leading-relaxed mb-3">{p.d}</p>
                <div className="text-[11px] tracking-[0.2em] uppercase text-foreground/60">{p.s}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-[1400px] mx-auto px-8 lg:px-14 py-32 border-t border-border text-center">
        <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-6">/ Contact</div>
        <h2 className="font-serif text-5xl md:text-7xl tracking-[-0.03em] max-w-3xl mx-auto">
          Have a hard problem? <span className="italic-serif">Let's solve it.</span>
        </h2>
        <a
          href="mailto:syed@ibrahim.dev"
          className="inline-block mt-10 font-serif italic text-2xl underline decoration-1 underline-offset-8 hover:opacity-60 transition"
        >
          syed@ibrahim.dev
        </a>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-2">{label}</div>
      <div className="font-serif text-5xl tracking-tight">{value}</div>
    </div>
  );
}
