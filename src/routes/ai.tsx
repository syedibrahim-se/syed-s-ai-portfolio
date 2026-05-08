import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles, LayoutDashboard, MessageSquare, Zap, Brain, Cpu, Send,
  Plus, Search, Settings, Moon, Sun, ArrowRight, Activity, Bot,
  CheckCircle2, Clock, TrendingUp, Database, Shield, Code2, Image as ImageIcon,
  FileText, Mic, Paperclip, Trash2, Star, ChevronRight, Github,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  BarChart, Bar, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "Nebula AI — Static Demo App" },
      { name: "description", content: "Interactive static demo of an AI application: landing, dashboard, and chat playground." },
    ],
  }),
  component: AIApp,
});

type Screen = "landing" | "dashboard" | "chat";

function AIApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [dark, setDark] = useState(true);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-[oklch(0.14_0.02_270)] dark:bg-[oklch(0.14_0.02_270)] text-white font-sans transition-colors">
        <Toaster theme="dark" position="top-right" />
        <TopNav screen={screen} setScreen={setScreen} dark={dark} setDark={setDark} />
        <main className="pt-16">
          {screen === "landing" && <Landing onLaunch={() => setScreen("dashboard")} onChat={() => setScreen("chat")} />}
          {screen === "dashboard" && <Dashboard />}
          {screen === "chat" && <Chat />}
        </main>
      </div>
    </div>
  );
}

/* ─────────────── TOP NAV ─────────────── */
function TopNav({ screen, setScreen, dark, setDark }: {
  screen: Screen; setScreen: (s: Screen) => void; dark: boolean; setDark: (d: boolean) => void;
}) {
  const items: { id: Screen; label: string; icon: any }[] = [
    { id: "landing", label: "Home", icon: Sparkles },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "chat", label: "Playground", icon: MessageSquare },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[oklch(0.14_0.02_270)/0.7] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => setScreen("landing")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 grid place-items-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">Nebula<span className="text-fuchsia-400">.ai</span></span>
        </button>
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
          {items.map((it) => (
            <button key={it.id} onClick={() => setScreen(it.id)}
              className={`px-4 py-1.5 text-sm rounded-full flex items-center gap-2 transition-all ${
                screen === it.id ? "bg-white text-black shadow" : "text-white/70 hover:text-white"
              }`}>
              <it.icon className="w-3.5 h-3.5" />{it.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)} className="w-9 h-9 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/" className="hidden sm:inline-flex text-xs text-white/60 hover:text-white px-3 py-2">← Portfolio</Link>
        </div>
      </div>
      {/* mobile pill nav */}
      <div className="md:hidden border-t border-white/10 px-4 py-2 flex gap-1 overflow-x-auto">
        {items.map((it) => (
          <button key={it.id} onClick={() => setScreen(it.id)}
            className={`shrink-0 px-3 py-1.5 text-xs rounded-full flex items-center gap-1.5 ${
              screen === it.id ? "bg-white text-black" : "text-white/70 bg-white/5"
            }`}>
            <it.icon className="w-3 h-3" />{it.label}
          </button>
        ))}
      </div>
    </header>
  );
}

/* ─────────────── LANDING ─────────────── */
function Landing({ onLaunch, onChat }: { onLaunch: () => void; onChat: () => void }) {
  return (
    <div className="relative overflow-hidden">
      {/* aurora */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-fuchsia-600/30 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/30 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[450px] h-[450px] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      {/* hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          New • GPT-class reasoning models live
        </span>
        <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl mx-auto">
          The AI workspace
          <br />
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent italic font-serif">built for builders.</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-white/60 text-lg">
          Chat, generate, analyze and ship. One workspace for every model — with usage analytics, prompt history and team collaboration baked in.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onLaunch} className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition flex items-center gap-2 shadow-lg shadow-white/10">
            Launch dashboard <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={onChat} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Try playground
          </button>
        </div>

        {/* hero stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { v: "120ms", l: "P50 latency" },
            { v: "8 models", l: "Live now" },
            { v: "99.98%", l: "Uptime" },
            { v: "12k+", l: "Active teams" },
          ].map((s) => (
            <div key={s.l} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="text-2xl font-semibold">{s.v}</div>
              <div className="text-xs text-white/50 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Brain, title: "Multi-model routing", desc: "Auto-pick the right model per task — reasoning, vision, fast chat." , c: "from-violet-500 to-fuchsia-500"},
            { icon: Cpu, title: "Edge inference", desc: "Sub-second responses with global edge nodes & smart caching." , c: "from-cyan-500 to-blue-500"},
            { icon: Shield, title: "Private by default", desc: "SOC2, end-to-end encryption, zero data retention on request." , c: "from-emerald-500 to-teal-500"},
            { icon: Code2, title: "SDK & REST API", desc: "Drop-in TypeScript / Python SDK. Fully OpenAI-compatible." , c: "from-amber-500 to-orange-500"},
            { icon: Database, title: "Vector memory", desc: "Built-in retrieval augmentation with managed vector store." , c: "from-pink-500 to-rose-500"},
            { icon: Activity, title: "Usage analytics", desc: "Tokens, cost, latency, errors — every call observable." , c: "from-sky-500 to-indigo-500"},
          ].map((f) => (
            <div key={f.title} className="group p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition cursor-pointer">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.c} grid place-items-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-white/60 mt-1">{f.desc}</p>
              <div className="mt-4 text-xs text-white/40 flex items-center gap-1 group-hover:text-fuchsia-300 transition">
                Learn more <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative overflow-hidden p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-violet-600/30 via-fuchsia-600/20 to-cyan-500/20 border border-white/10 text-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-500/40 blur-3xl rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight relative">Ready to ship with AI?</h2>
          <p className="mt-3 text-white/70 relative">Free for the first 100k tokens. No credit card required.</p>
          <button onClick={onLaunch} className="relative mt-6 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition inline-flex items-center gap-2">
            Get started free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Nebula.ai • Static demo built with Lovable
      </footer>
    </div>
  );
}

/* ─────────────── DASHBOARD ─────────────── */
function Dashboard() {
  const [range, setRange] = useState<"24h" | "7d" | "30d">("7d");

  const usage = useMemo(() => {
    const days = range === "24h" ? 24 : range === "7d" ? 7 : 30;
    const seed = range === "24h" ? 800 : range === "7d" ? 18000 : 14000;
    return Array.from({ length: days }, (_, i) => ({
      label: range === "24h" ? `${i}:00` : `D${i + 1}`,
      tokens: Math.round(seed + Math.sin(i / 1.7) * seed * 0.4 + Math.random() * seed * 0.3),
      cost: +(Math.random() * 8 + 2).toFixed(2),
    }));
  }, [range]);

  const models = [
    { name: "Nebula-Pro", calls: 12400, share: 48, color: "#a855f7" },
    { name: "Nebula-Flash", calls: 8200, share: 32, color: "#22d3ee" },
    { name: "Nebula-Vision", calls: 3100, share: 12, color: "#f472b6" },
    { name: "Nebula-Code", calls: 2050, share: 8, color: "#34d399" },
  ];

  const activity = [
    { icon: Bot, who: "api-key-prod", what: "10,432 chat completions", when: "2m ago", c: "text-fuchsia-300" },
    { icon: ImageIcon, who: "design-team", what: "Generated 24 images", when: "12m ago", c: "text-cyan-300" },
    { icon: FileText, who: "rag-pipeline", what: "Indexed 1,204 documents", when: "1h ago", c: "text-emerald-300" },
    { icon: Shield, who: "system", what: "Rotated workspace key", when: "3h ago", c: "text-amber-300" },
    { icon: TrendingUp, who: "billing", what: "Usage at 64% of plan", when: "5h ago", c: "text-violet-300" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs text-white/50 uppercase tracking-widest">Workspace</div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-1">Good evening, Syed</h1>
          <p className="text-white/50 text-sm mt-1">Here's what your AI is up to.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-full bg-white/5 border border-white/10">
            {(["24h", "7d", "30d"] as const).map((r) => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1 text-xs rounded-full transition ${range === r ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>
                {r}
              </button>
            ))}
          </div>
          <button onClick={() => toast.success("API key copied to clipboard")}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-sm font-medium flex items-center gap-2 hover:opacity-90">
            <Plus className="w-4 h-4" /> New key
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total tokens", value: "4.21M", delta: "+12.4%", icon: Zap, c: "from-violet-500 to-fuchsia-500" },
          { label: "API calls", value: "25,742", delta: "+8.1%", icon: Activity, c: "from-cyan-500 to-blue-500" },
          { label: "Avg latency", value: "142ms", delta: "−6.3%", icon: Clock, c: "from-emerald-500 to-teal-500" },
          { label: "Spend", value: "$284.50", delta: "+3.2%", icon: TrendingUp, c: "from-amber-500 to-orange-500" },
        ].map((k) => (
          <div key={k.label} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${k.c} grid place-items-center`}>
                <k.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-emerald-300">{k.delta}</span>
            </div>
            <div className="mt-4 text-2xl font-semibold">{k.value}</div>
            <div className="text-xs text-white/50">{k.label}</div>
          </div>
        ))}
      </div>

      {/* charts */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.04] border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Token usage</h3>
              <p className="text-xs text-white/50">Across all models • {range}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">Live</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={usage}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="tokens" stroke="#a855f7" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
          <h3 className="font-semibold">Capacity</h3>
          <p className="text-xs text-white/50 mb-4">Plan: Pro • 5M tokens</p>
          <div className="h-48">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{ name: "used", value: 64, fill: "#d946ef" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "rgba(255,255,255,0.06)" }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-32 text-center pointer-events-none">
              <div className="text-3xl font-semibold">64%</div>
              <div className="text-xs text-white/50">3.2M / 5M</div>
            </div>
          </div>
          <button onClick={() => toast.info("Upgrade flow coming soon")} className="mt-4 w-full py-2 text-sm rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition">
            Upgrade plan
          </button>
        </div>
      </div>

      {/* models + activity */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/[0.04] border border-white/10">
          <h3 className="font-semibold mb-4">Models in use</h3>
          <div className="space-y-3">
            {models.map((m) => (
              <div key={m.name} className="group">
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                    <span className="font-medium">{m.name}</span>
                  </div>
                  <div className="text-white/60 text-xs">{m.calls.toLocaleString()} calls • {m.share}%</div>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700 group-hover:opacity-80" style={{ width: `${m.share}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-32">
            <ResponsiveContainer>
              <BarChart data={models}>
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="calls" radius={[6, 6, 0, 0]}>
                  {models.map((m) => <cell key={m.name} fill={m.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
          <h3 className="font-semibold mb-4">Recent activity</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 group cursor-pointer">
                <div className={`w-8 h-8 rounded-lg bg-white/5 grid place-items-center ${a.c} group-hover:scale-110 transition`}>
                  <a.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate"><span className="text-white/60">{a.who}</span> {a.what}</div>
                  <div className="text-xs text-white/40">{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── CHAT ─────────────── */
type Msg = { id: string; role: "user" | "assistant"; content: string; time: string };

const PRESETS = [
  { icon: Code2, label: "Explain this code", prompt: "Explain what this React useEffect hook does and any pitfalls." },
  { icon: FileText, label: "Summarize text", prompt: "Summarize the latest advances in retrieval-augmented generation in 5 bullets." },
  { icon: Sparkles, label: "Brainstorm names", prompt: "Brainstorm 8 startup names for an AI-powered note-taking app." },
  { icon: ImageIcon, label: "Describe an image", prompt: "Describe a futuristic city skyline at sunset, vivid and cinematic." },
];

const MOCK_REPLIES: Record<string, string> = {
  default: "Here's a thoughtful, structured answer based on your prompt.\n\n**Key points**\n• Multi-model routing picks the best engine per task\n• Edge inference keeps p50 latency under 150ms\n• Built-in retrieval grounds answers in your data\n\nWant me to dive deeper into any of these?",
};

function Chat() {
  const [model, setModel] = useState("Nebula-Pro");
  const [temp, setTemp] = useState(0.7);
  const [conversations, setConversations] = useState([
    { id: "c1", title: "Welcome chat", starred: true },
    { id: "c2", title: "RAG pipeline plan", starred: false },
    { id: "c3", title: "Marketing copy ideas", starred: false },
  ]);
  const [activeId, setActiveId] = useState("c1");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m0", role: "assistant", content: "Hi! I'm Nebula. Ask me anything, or pick a suggestion below.", time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: t, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    // mock streaming
    const reply = MOCK_REPLIES.default;
    const id = crypto.randomUUID();
    setTimeout(() => {
      setMessages((m) => [...m, { id, role: "assistant", content: "", time: now() }]);
      let i = 0;
      const interval = setInterval(() => {
        i += 4;
        setMessages((m) =>
          m.map((msg) => (msg.id === id ? { ...msg, content: reply.slice(0, i) } : msg))
        );
        if (i >= reply.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 25);
    }, 500);
  };

  const newChat = () => {
    const id = `c${Date.now()}`;
    setConversations((c) => [{ id, title: "New conversation", starred: false }, ...c]);
    setActiveId(id);
    setMessages([{ id: "m0", role: "assistant", content: "Fresh chat. What are we building?", time: now() }]);
    toast.success("New chat created");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[260px_1fr_280px] gap-4 h-[calc(100vh-4rem)]">
      {/* sidebar */}
      <aside className="hidden lg:flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 p-3 overflow-hidden">
        <button onClick={newChat} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> New chat
        </button>
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-white/40" />
          <input placeholder="Search…" className="w-full pl-8 pr-3 py-2 text-sm rounded-lg bg-white/5 border border-white/10 outline-none focus:border-fuchsia-400/50" />
        </div>
        <div className="mt-4 text-[10px] uppercase tracking-widest text-white/40 px-2">History</div>
        <div className="mt-1 space-y-1 overflow-y-auto flex-1">
          {conversations.map((c) => (
            <button key={c.id} onClick={() => setActiveId(c.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 group ${
                activeId === c.id ? "bg-white/10" : "hover:bg-white/5"
              }`}>
              <MessageSquare className="w-3.5 h-3.5 text-white/50" />
              <span className="truncate flex-1">{c.title}</span>
              {c.starred && <Star className="w-3 h-3 text-amber-300 fill-amber-300" />}
              <Trash2
                className="w-3 h-3 text-white/30 hover:text-rose-400 opacity-0 group-hover:opacity-100"
                onClick={(e) => { e.stopPropagation(); setConversations(cs => cs.filter(x => x.id !== c.id)); toast("Deleted"); }}
              />
            </button>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-white/10">
          <div className="text-xs font-medium">Pro plan</div>
          <div className="text-[11px] text-white/50 mt-0.5">3.2M / 5M tokens</div>
          <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full w-[64%] bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full" />
          </div>
        </div>
      </aside>

      {/* chat panel */}
      <section className="flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden min-h-0">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-sm font-medium">Nebula Assistant</div>
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online • {model}
              </div>
            </div>
          </div>
          <button onClick={() => { setMessages([{ id: "m0", role: "assistant", content: "Cleared. What's next?", time: now() }]); toast("Conversation cleared"); }}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">
            Clear
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                m.role === "user"
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white rounded-br-sm"
                  : "bg-white/[0.06] border border-white/10 rounded-bl-sm"
              }`}>
                {renderContent(m.content)}
                <div className="text-[10px] opacity-50 mt-1">{m.time}</div>
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center shrink-0 text-xs font-semibold">SI</div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center"><Bot className="w-4 h-4" /></div>
              <div className="px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" />
              </div>
            </div>
          )}

          {messages.length <= 1 && (
            <div className="grid sm:grid-cols-2 gap-2 pt-4">
              {PRESETS.map((p) => (
                <button key={p.label} onClick={() => send(p.prompt)}
                  className="text-left p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 grid place-items-center text-fuchsia-300"><p.icon className="w-4 h-4" /></div>
                  <div>
                    <div className="text-sm font-medium">{p.label}</div>
                    <div className="text-xs text-white/50 line-clamp-1">{p.prompt}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* input */}
        <div className="p-3 border-t border-white/10">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-end gap-2 p-2 rounded-2xl bg-white/[0.06] border border-white/10 focus-within:border-fuchsia-400/50 transition">
            <button type="button" onClick={() => toast("Attach file (mock)")} className="p-2 text-white/50 hover:text-white"><Paperclip className="w-4 h-4" /></button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              rows={1}
              placeholder="Ask Nebula anything…"
              className="flex-1 bg-transparent outline-none text-sm py-2 resize-none max-h-32"
            />
            <button type="button" onClick={() => toast("Voice input (mock)")} className="p-2 text-white/50 hover:text-white"><Mic className="w-4 h-4" /></button>
            <button type="submit" disabled={!input.trim() || typing}
              className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition">
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-white/40 text-center mt-2">Static demo • Responses are mocked for showcase purposes</div>
        </div>
      </section>

      {/* settings panel */}
      <aside className="hidden lg:flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 p-4 gap-4 overflow-y-auto">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2 flex items-center gap-1"><Settings className="w-3 h-3" /> Configuration</div>
          <label className="text-xs text-white/60">Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}
            className="w-full mt-1 p-2 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-fuchsia-400/50">
            <option className="bg-zinc-900">Nebula-Pro</option>
            <option className="bg-zinc-900">Nebula-Flash</option>
            <option className="bg-zinc-900">Nebula-Vision</option>
            <option className="bg-zinc-900">Nebula-Code</option>
          </select>
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-white/60 mb-1">
            <span>Temperature</span><span className="font-mono text-white">{temp.toFixed(1)}</span>
          </div>
          <input type="range" min={0} max={2} step={0.1} value={temp} onChange={(e) => setTemp(+e.target.value)}
            className="w-full accent-fuchsia-500" />
          <div className="flex justify-between text-[10px] text-white/40 mt-1"><span>Precise</span><span>Creative</span></div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Capabilities</div>
          {[
            { l: "Web search", on: true },
            { l: "Code interpreter", on: true },
            { l: "Vision input", on: false },
            { l: "Long-term memory", on: true },
          ].map((c, i) => (
            <Toggle key={i} label={c.l} initial={c.on} />
          ))}
        </div>
        <div className="mt-auto p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
          <div className="flex items-center gap-2 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5" /> All systems operational</div>
          <div className="text-white/40 mt-1">Region: us-east-1 • v2.4.1</div>
        </div>
      </aside>
    </div>
  );
}

function Toggle({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button onClick={() => setOn(!on)} className="w-full flex items-center justify-between py-2 text-sm group">
      <span className="text-white/80">{label}</span>
      <span className={`w-9 h-5 rounded-full p-0.5 transition ${on ? "bg-gradient-to-r from-violet-500 to-fuchsia-500" : "bg-white/10"}`}>
        <span className={`block w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-4" : ""}`} />
      </span>
    </button>
  );
}

function renderContent(text: string) {
  // very small markdown: **bold** and bullets
  return text.split("\n").map((line, i) => {
    const bold = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={j}>{part.slice(2, -2)}</strong>
        : <span key={j}>{part}</span>
    );
    return <div key={i}>{bold}</div>;
  });
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
