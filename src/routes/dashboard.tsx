import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutDashboard, Users, ShoppingBag, BarChart3, Settings, Bell, Search,
  TrendingUp, DollarSign, Activity, MoreHorizontal, ChevronDown,
  CheckCircle2, FileText, UserPlus, Calendar, LogOut, Mail, Phone,
  Plus, Trash2, Edit, Moon, Sun, X,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  RadialBarChart, RadialBar, PolarAngleAxis, BarChart, Bar, CartesianGrid,
} from "recharts";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Admin" },
      { name: "description", content: "Interactive admin dashboard with analytics, users, orders, and settings." },
    ],
  }),
  component: Dashboard,
});

type View = "dashboard" | "users" | "orders" | "analytics" | "calendar" | "settings";

const navItems: { id: View; icon: typeof LayoutDashboard; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "users", icon: Users, label: "Users" },
  { id: "orders", icon: ShoppingBag, label: "Orders" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "settings", icon: Settings, label: "Settings" },
];

function Dashboard() {
  const [view, setView] = useState<View>("dashboard");
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <Toaster richColors position="top-right" />
      <div className={`min-h-screen font-sans transition-colors ${dark ? "bg-slate-900 text-slate-100" : "bg-slate-100 text-slate-800"}`}>
        <div className="flex">
          <aside className="w-20 bg-gradient-to-b from-violet-600 to-indigo-700 min-h-screen flex flex-col items-center py-6 gap-2 text-white sticky top-0">
            <div className="size-10 rounded-xl bg-white/20 grid place-items-center font-bold mb-4">A</div>
            <nav className="flex flex-col gap-2 flex-1">
              {navItems.map((item) => {
                const active = view === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setView(item.id)}
                    title={item.label}
                    className={`size-11 rounded-xl grid place-items-center transition relative group ${active ? "bg-white text-violet-600 shadow-lg" : "hover:bg-white/15"}`}
                  >
                    <item.icon className="size-5" />
                    <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-slate-900 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition z-50">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
            <button
              onClick={() => { setDark((d) => !d); toast.success(`${dark ? "Light" : "Dark"} mode enabled`); }}
              title="Toggle theme"
              className="size-11 rounded-xl grid place-items-center hover:bg-white/15"
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <button
              onClick={() => toast.error("Logged out")}
              title="Logout"
              className="size-11 rounded-xl grid place-items-center hover:bg-white/15"
            >
              <LogOut className="size-5" />
            </button>
          </aside>

          <main className="flex-1 p-6 lg:p-8">
            <Topbar view={view} dark={dark} />
            {view === "dashboard" && <DashboardView dark={dark} />}
            {view === "users" && <UsersView dark={dark} />}
            {view === "orders" && <OrdersView dark={dark} />}
            {view === "analytics" && <AnalyticsView dark={dark} />}
            {view === "calendar" && <CalendarView dark={dark} />}
            {view === "settings" && <SettingsView dark={dark} />}
          </main>
        </div>
      </div>
    </div>
  );
}

function Topbar({ view, dark }: { view: View; dark: boolean }) {
  const titles: Record<View, { t: string; s: string }> = {
    dashboard: { t: "Dashboard", s: "Welcome back, here's what's happening today." },
    users: { t: "Users", s: "Manage your team and customers." },
    orders: { t: "Orders", s: "Track and update incoming orders." },
    analytics: { t: "Analytics", s: "Deep dive into your performance." },
    calendar: { t: "Calendar", s: "Your upcoming events and meetings." },
    settings: { t: "Settings", s: "Configure your preferences." },
  };
  const card = dark ? "bg-slate-800" : "bg-white";
  return (
    <header className="flex items-center justify-between mb-8 gap-4 flex-wrap">
      <div>
        <h1 className={`text-2xl font-bold ${dark ? "text-white" : "text-slate-900"}`}>{titles[view].t}</h1>
        <p className={dark ? "text-slate-400 text-sm" : "text-sm text-slate-500"}>{titles[view].s}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className={`hidden md:flex items-center gap-2 ${card} rounded-xl px-3 py-2 shadow-sm w-72`}>
          <Search className="size-4 text-slate-400" />
          <input placeholder="Search..." className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <button
          onClick={() => toast.info("3 new notifications")}
          className={`size-10 rounded-xl ${card} shadow-sm grid place-items-center relative`}
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-rose-500" />
        </button>
        <button className={`flex items-center gap-2 ${card} rounded-xl px-3 py-2 shadow-sm text-sm`}>
          <span className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          <span className="font-medium">Syed</span>
          <ChevronDown className="size-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}

const baseRevenue = [
  { m: "Jan", a: 22, b: 14 }, { m: "Feb", a: 28, b: 20 }, { m: "Mar", a: 24, b: 18 },
  { m: "Apr", a: 38, b: 26 }, { m: "May", a: 32, b: 22 }, { m: "Jun", a: 56, b: 34 },
  { m: "Jul", a: 44, b: 30 }, { m: "Aug", a: 62, b: 40 }, { m: "Sep", a: 50, b: 32 },
  { m: "Oct", a: 70, b: 46 }, { m: "Nov", a: 58, b: 38 }, { m: "Dec", a: 78, b: 52 },
];

function DashboardView({ dark }: { dark: boolean }) {
  const [range, setRange] = useState<"Day" | "Week" | "Month">("Month");
  const card = dark ? "bg-slate-800 text-slate-100" : "bg-white";

  const data = useMemo(() => {
    const mult = range === "Day" ? 0.3 : range === "Week" ? 0.6 : 1;
    return baseRevenue.map((d) => ({ ...d, a: Math.round(d.a * mult), b: Math.round(d.b * mult) }));
  }, [range]);

  const total = useMemo(() => data.reduce((s, d) => s + d.a + d.b, 0), [data]);

  const stats = [
    { label: "Total Revenue", value: `$${(total * 8.4).toFixed(0)}`, icon: DollarSign, from: "from-violet-500", to: "to-fuchsia-500" },
    { label: "New Orders", value: "20+", icon: ShoppingBag, from: "from-sky-500", to: "to-cyan-400" },
    { label: "New Users", value: "100+", icon: Users, from: "from-orange-500", to: "to-amber-400" },
    { label: "Page Views", value: "12K+", icon: Activity, from: "from-rose-500", to: "to-pink-500" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => toast.success(`${s.label}: ${s.value}`)}
            className={`text-left rounded-2xl p-5 text-white bg-gradient-to-br ${s.from} ${s.to} shadow-lg shadow-black/5 relative overflow-hidden hover:scale-[1.02] active:scale-[0.99] transition`}
          >
            <div className="absolute -right-6 -bottom-6 size-28 rounded-full bg-white/10" />
            <div className="size-11 rounded-xl bg-white/20 grid place-items-center mb-4"><s.icon className="size-5" /></div>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-white/80 mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className={`lg:col-span-2 ${card} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
            <div>
              <div className="text-sm text-slate-500">Total Revenue</div>
              <div className="text-3xl font-bold mt-1">${(total * 8.4).toFixed(2)}</div>
              <div className="flex items-center gap-1 text-xs text-emerald-500 mt-1">
                <TrendingUp className="size-3.5" /> +12.4% vs last period
              </div>
            </div>
            <div className="flex gap-2 text-xs">
              {(["Day", "Week", "Month"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setRange(t)}
                  className={`px-3 py-1.5 rounded-lg transition ${range === t ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: -20, right: 0, top: 10 }}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,.08)" }} />
                <Area type="monotone" dataKey="a" stroke="#f97316" strokeWidth={2.5} fill="url(#ga)" />
                <Area type="monotone" dataKey="b" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#gb)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${card} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Analytics</div>
            <MoreHorizontal className="size-4 text-slate-400" />
          </div>
          <div className="h-56 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: 80, fill: "#8b5cf6" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: dark ? "#334155" : "#f1f5f9" }} dataKey="v" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="text-center">
                <div className="text-4xl font-bold">80%</div>
                <div className="text-xs text-slate-500">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrdersTable dark={dark} compact />
    </>
  );
}

type Order = { id: string; customer: string; price: string; status: "Paid" | "Pending" | "Refund" };
const initialOrders: Order[] = [
  { id: "#INV-2041", customer: "Olivia Reyes", price: "$1,240", status: "Paid" },
  { id: "#INV-2042", customer: "Marcus Chen", price: "$880", status: "Pending" },
  { id: "#INV-2043", customer: "Aisha Khan", price: "$3,120", status: "Paid" },
  { id: "#INV-2044", customer: "Diego Alvarez", price: "$540", status: "Refund" },
  { id: "#INV-2045", customer: "Naomi Tanaka", price: "$2,010", status: "Pending" },
];

function statusColor(s: Order["status"]) {
  if (s === "Paid") return "bg-emerald-100 text-emerald-700";
  if (s === "Pending") return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

function OrdersTable({ dark, compact }: { dark: boolean; compact?: boolean }) {
  const card = dark ? "bg-slate-800" : "bg-white";
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState<"All" | Order["status"]>("All");

  const cycle = (s: Order["status"]): Order["status"] =>
    s === "Pending" ? "Paid" : s === "Paid" ? "Refund" : "Pending";

  const visible = orders
    .filter((o) => tab === "All" || o.status === tab)
    .filter((o) => o.customer.toLowerCase().includes(filter.toLowerCase()) || o.id.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={`${card} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="font-semibold">Order Status</div>
        <div className="flex items-center gap-2">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter..."
            className={`text-xs px-3 py-1.5 rounded-lg outline-none ${dark ? "bg-slate-700" : "bg-slate-100"}`}
          />
          <div className="flex gap-1">
            {(["All", "Paid", "Pending", "Refund"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-xs px-2.5 py-1.5 rounded-lg ${tab === t ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-slate-500 text-left">
            <th className="font-medium pb-3">Invoice</th>
            <th className="font-medium pb-3">Customer</th>
            <th className="font-medium pb-3">Price</th>
            <th className="font-medium pb-3">Status</th>
            <th className="font-medium pb-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((o) => (
            <tr key={o.id} className="border-t border-slate-200 dark:border-slate-700">
              <td className="py-3 font-medium">{o.id}</td>
              <td className="py-3 text-slate-500">{o.customer}</td>
              <td className="py-3 font-medium">{o.price}</td>
              <td className="py-3">
                <button
                  onClick={() => {
                    setOrders((prev) => prev.map((x) => x.id === o.id ? { ...x, status: cycle(x.status) } : x));
                    toast.success(`${o.id} → ${cycle(o.status)}`);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(o.status)}`}
                >
                  {o.status}
                </button>
              </td>
              <td className="py-3 text-right">
                <button
                  onClick={() => { setOrders((prev) => prev.filter((x) => x.id !== o.id)); toast.error(`${o.id} removed`); }}
                  className="px-2 py-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <Trash2 className="size-4" />
                </button>
              </td>
            </tr>
          ))}
          {visible.length === 0 && (
            <tr><td colSpan={5} className="py-8 text-center text-slate-400 text-sm">No orders found</td></tr>
          )}
        </tbody>
      </table>
      {compact && <div className="text-xs text-slate-400 mt-3">Click a status pill to cycle. Click trash to remove.</div>}
    </div>
  );
}

type User = { id: number; name: string; email: string; role: string; active: boolean };
const initialUsers: User[] = [
  { id: 1, name: "Olivia Reyes", email: "olivia@acme.co", role: "Admin", active: true },
  { id: 2, name: "Marcus Chen", email: "marcus@acme.co", role: "Editor", active: true },
  { id: 3, name: "Aisha Khan", email: "aisha@acme.co", role: "Viewer", active: false },
  { id: 4, name: "Diego Alvarez", email: "diego@acme.co", role: "Editor", active: true },
];

function UsersView({ dark }: { dark: boolean }) {
  const card = dark ? "bg-slate-800" : "bg-white";
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const add = () => {
    if (!name || !email) { toast.error("Name and email required"); return; }
    setUsers((u) => [...u, { id: Date.now(), name, email, role: "Viewer", active: true }]);
    toast.success(`${name} added`);
    setName(""); setEmail(""); setShowForm(false);
  };

  return (
    <div className={`${card} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">Team Members ({users.length})</div>
        <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700">
          {showForm ? <X className="size-4" /> : <Plus className="size-4" />}
          {showForm ? "Cancel" : "Add User"}
        </button>
      </div>
      {showForm && (
        <div className={`grid sm:grid-cols-3 gap-2 p-3 rounded-xl mb-4 ${dark ? "bg-slate-700" : "bg-slate-50"}`}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className={`px-3 py-2 rounded-lg text-sm outline-none ${dark ? "bg-slate-800" : "bg-white"}`} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={`px-3 py-2 rounded-lg text-sm outline-none ${dark ? "bg-slate-800" : "bg-white"}`} />
          <button onClick={add} className="px-3 py-2 rounded-lg bg-emerald-500 text-white text-sm">Save</button>
        </div>
      )}
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className={`flex items-center gap-4 p-3 rounded-xl ${dark ? "hover:bg-slate-700" : "hover:bg-slate-50"} transition`}>
            <div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center text-white font-semibold">
              {u.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{u.name}</div>
              <div className="text-xs text-slate-500 truncate">{u.email}</div>
            </div>
            <span className={`px-2 py-1 rounded-md text-xs ${u.role === "Admin" ? "bg-violet-100 text-violet-700" : u.role === "Editor" ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"}`}>{u.role}</span>
            <button
              onClick={() => { setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, active: !x.active } : x)); toast.success(`${u.name} ${u.active ? "deactivated" : "activated"}`); }}
              className={`relative w-10 h-5 rounded-full transition ${u.active ? "bg-emerald-500" : "bg-slate-300"}`}
            >
              <span className={`absolute top-0.5 size-4 rounded-full bg-white transition ${u.active ? "left-5" : "left-0.5"}`} />
            </button>
            <button onClick={() => { setUsers((prev) => prev.filter((x) => x.id !== u.id)); toast.error(`${u.name} removed`); }} className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-lg">
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersView({ dark }: { dark: boolean }) {
  return <OrdersTable dark={dark} />;
}

function AnalyticsView({ dark }: { dark: boolean }) {
  const card = dark ? "bg-slate-800" : "bg-white";
  const [metric, setMetric] = useState<"Visits" | "Sales" | "Signups">("Visits");
  const data = useMemo(() => {
    const seed = metric === "Visits" ? 50 : metric === "Sales" ? 30 : 15;
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({
      d, v: Math.round(seed + Math.sin(i + metric.length) * seed * 0.6 + i * 4),
    }));
  }, [metric]);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className={`lg:col-span-2 ${card} rounded-2xl p-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Weekly {metric}</div>
          <div className="flex gap-1">
            {(["Visits", "Sales", "Signups"] as const).map((m) => (
              <button key={m} onClick={() => setMetric(m)}
                className={`text-xs px-3 py-1.5 rounded-lg ${metric === m ? "bg-violet-600 text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#334155" : "#e2e8f0"} />
              <XAxis dataKey="d" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
              <Bar dataKey="v" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={`${card} rounded-2xl p-6 shadow-sm space-y-4`}>
        <div className="font-semibold">Top Sources</div>
        {[
          { name: "Direct", pct: 42, color: "bg-violet-500" },
          { name: "Search", pct: 31, color: "bg-sky-500" },
          { name: "Social", pct: 18, color: "bg-orange-500" },
          { name: "Referral", pct: 9, color: "bg-rose-500" },
        ].map((s) => (
          <div key={s.name}>
            <div className="flex justify-between text-sm mb-1"><span>{s.name}</span><span className="text-slate-500">{s.pct}%</span></div>
            <div className={`h-2 rounded-full ${dark ? "bg-slate-700" : "bg-slate-100"} overflow-hidden`}>
              <div className={`h-full ${s.color} transition-all duration-700`} style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalendarView({ dark }: { dark: boolean }) {
  const card = dark ? "bg-slate-800" : "bg-white";
  const today = new Date();
  const [month] = useState(today.getMonth());
  const [year] = useState(today.getFullYear());
  const [selected, setSelected] = useState<number>(today.getDate());
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleString("default", { month: "long" });

  const events: Record<number, string[]> = { 5: ["Standup"], 12: ["Demo", "Review"], 18: ["Launch"], [today.getDate()]: ["Today's tasks"] };

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className={`lg:col-span-2 ${card} rounded-2xl p-6 shadow-sm`}>
        <div className="font-semibold mb-4">{monthName} {year}</div>
        <div className="grid grid-cols-7 gap-2 text-xs text-slate-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="text-center">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const has = events[day];
            const isSel = selected === day;
            const isToday = day === today.getDate();
            return (
              <button key={day} onClick={() => setSelected(day)}
                className={`aspect-square rounded-lg text-sm relative transition ${isSel ? "bg-violet-600 text-white" : isToday ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20" : dark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}>
                {day}
                {has && <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full ${isSel ? "bg-white" : "bg-violet-500"}`} />}
              </button>
            );
          })}
        </div>
      </div>
      <div className={`${card} rounded-2xl p-6 shadow-sm`}>
        <div className="font-semibold mb-4">Events on {monthName} {selected}</div>
        {events[selected]?.length ? (
          <div className="space-y-2">
            {events[selected].map((e) => (
              <div key={e} className={`p-3 rounded-xl flex items-center gap-3 ${dark ? "bg-slate-700" : "bg-slate-50"}`}>
                <div className="size-2 rounded-full bg-violet-500" />
                <span className="text-sm">{e}</span>
              </div>
            ))}
          </div>
        ) : <div className="text-sm text-slate-400">No events scheduled.</div>}
        <button onClick={() => toast.success(`Event added to ${monthName} ${selected}`)} className="mt-4 w-full py-2 rounded-xl bg-violet-600 text-white text-sm hover:bg-violet-700 flex items-center justify-center gap-1.5">
          <Plus className="size-4" /> Add event
        </button>
      </div>
    </div>
  );
}

function SettingsView({ dark }: { dark: boolean }) {
  const card = dark ? "bg-slate-800" : "bg-white";
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [profile, setProfile] = useState({ name: "Syed Ibrahim", email: "syed@ibrahim.dev", phone: "+1 555 0100" });

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      <div className={`${card} rounded-2xl p-6 shadow-sm`}>
        <div className="font-semibold mb-4 flex items-center gap-2"><Edit className="size-4" /> Profile</div>
        <div className="space-y-3">
          {([["Name", "name"], ["Email", "email"], ["Phone", "phone"]] as const).map(([label, key]) => (
            <div key={key}>
              <label className="text-xs text-slate-500">{label}</label>
              <input value={profile[key]} onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                className={`w-full mt-1 px-3 py-2 rounded-lg text-sm outline-none ${dark ? "bg-slate-700" : "bg-slate-100"}`} />
            </div>
          ))}
          <button onClick={() => toast.success("Profile saved")} className="mt-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700">Save changes</button>
        </div>
      </div>
      <div className={`${card} rounded-2xl p-6 shadow-sm`}>
        <div className="font-semibold mb-4">Notifications</div>
        {[
          { label: "Email notifications", icon: Mail, on: emailNotif, set: setEmailNotif },
          { label: "Push notifications", icon: Phone, on: pushNotif, set: setPushNotif },
        ].map((n) => (
          <div key={n.label} className={`flex items-center justify-between p-3 rounded-xl ${dark ? "hover:bg-slate-700" : "hover:bg-slate-50"}`}>
            <div className="flex items-center gap-3"><n.icon className="size-4 text-slate-500" /><span className="text-sm">{n.label}</span></div>
            <button onClick={() => { n.set(!n.on); toast.success(`${n.label} ${!n.on ? "on" : "off"}`); }}
              className={`relative w-10 h-5 rounded-full transition ${n.on ? "bg-emerald-500" : "bg-slate-300"}`}>
              <span className={`absolute top-0.5 size-4 rounded-full bg-white transition ${n.on ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
        <div className="mt-6 font-semibold mb-3">Recent activity</div>
        <div className="space-y-3">
          {[
            { icon: CheckCircle2, color: "bg-emerald-500", t: "Profile updated", time: "Just now" },
            { icon: UserPlus, color: "bg-violet-500", t: "New device login", time: "2h ago" },
            { icon: FileText, color: "bg-sky-500", t: "Exported report", time: "Yesterday" },
          ].map((a) => (
            <div key={a.t} className="flex items-center gap-3">
              <div className={`size-9 rounded-xl ${a.color} text-white grid place-items-center`}><a.icon className="size-4" /></div>
              <div className="flex-1 text-sm">{a.t}</div>
              <div className="text-xs text-slate-400">{a.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
