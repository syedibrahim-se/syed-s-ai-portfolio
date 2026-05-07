import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ShoppingBag, BarChart3, Settings, Bell, Search,
  TrendingUp, Package, DollarSign, Activity, MoreHorizontal, ChevronDown,
  CheckCircle2, FileText, UserPlus, Calendar,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Admin" },
      { name: "description", content: "Modern colorful admin dashboard with analytics, revenue, and orders." },
    ],
  }),
  component: Dashboard,
});

const revenueData = [
  { m: "Jan", a: 22, b: 14 }, { m: "Feb", a: 28, b: 20 }, { m: "Mar", a: 24, b: 18 },
  { m: "Apr", a: 38, b: 26 }, { m: "May", a: 32, b: 22 }, { m: "Jun", a: 56, b: 34 },
  { m: "Jul", a: 44, b: 30 }, { m: "Aug", a: 62, b: 40 }, { m: "Sep", a: 50, b: 32 },
  { m: "Oct", a: 70, b: 46 }, { m: "Nov", a: 58, b: 38 }, { m: "Dec", a: 78, b: 52 },
];

const stats = [
  { label: "Total Revenue", value: "578+", icon: DollarSign, from: "from-violet-500", to: "to-fuchsia-500" },
  { label: "New Orders", value: "20+", icon: ShoppingBag, from: "from-sky-500", to: "to-cyan-400" },
  { label: "New Users", value: "100+", icon: Users, from: "from-orange-500", to: "to-amber-400" },
  { label: "Page Views", value: "12+", icon: Activity, from: "from-rose-500", to: "to-pink-500" },
];

const activities = [
  { icon: CheckCircle2, color: "bg-emerald-500", title: "Task Updated", time: "Just now", desc: "Q4 roadmap reviewed" },
  { icon: UserPlus, color: "bg-violet-500", title: "Deal Added", time: "2h ago", desc: "Acme Corp · $24,500" },
  { icon: FileText, color: "bg-sky-500", title: "Published Article", time: "5h ago", desc: "Designing for trust" },
];

const orders = [
  { id: "#INV-2041", customer: "Olivia Reyes", price: "$1,240", status: "Paid", color: "bg-emerald-100 text-emerald-700" },
  { id: "#INV-2042", customer: "Marcus Chen", price: "$880", status: "Pending", color: "bg-amber-100 text-amber-700" },
  { id: "#INV-2043", customer: "Aisha Khan", price: "$3,120", status: "Paid", color: "bg-emerald-100 text-emerald-700" },
  { id: "#INV-2044", customer: "Diego Alvarez", price: "$540", status: "Refund", color: "bg-rose-100 text-rose-700" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-20 bg-gradient-to-b from-violet-600 to-indigo-700 min-h-screen flex flex-col items-center py-6 gap-6 text-white sticky top-0">
          <div className="size-10 rounded-xl bg-white/20 grid place-items-center font-bold">A</div>
          <nav className="flex flex-col gap-3 mt-4">
            {[LayoutDashboard, Users, ShoppingBag, BarChart3, Calendar, Settings].map((Icon, i) => (
              <button key={i} className={`size-11 rounded-xl grid place-items-center transition ${i === 0 ? "bg-white text-violet-600 shadow-lg" : "hover:bg-white/15"}`}>
                <Icon className="size-5" />
              </button>
            ))}
          </nav>
          <div className="mt-auto size-10 rounded-full bg-white/20 grid place-items-center text-sm font-semibold">SI</div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Topbar */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Welcome back, here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm w-72">
                <Search className="size-4 text-slate-400" />
                <input placeholder="Search..." className="bg-transparent outline-none text-sm flex-1" />
              </div>
              <button className="size-10 rounded-xl bg-white shadow-sm grid place-items-center relative">
                <Bell className="size-4 text-slate-600" />
                <span className="absolute top-2 right-2 size-2 rounded-full bg-rose-500" />
              </button>
              <button className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm text-sm">
                <span className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                <span className="font-medium">Syed</span>
                <ChevronDown className="size-4 text-slate-400" />
              </button>
            </div>
          </header>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            {stats.map((s) => (
              <div key={s.label} className={`rounded-2xl p-5 text-white bg-gradient-to-br ${s.from} ${s.to} shadow-lg shadow-black/5 relative overflow-hidden`}>
                <div className="absolute -right-6 -bottom-6 size-28 rounded-full bg-white/10" />
                <div className="size-11 rounded-xl bg-white/20 grid place-items-center mb-4">
                  <s.icon className="size-5" />
                </div>
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-sm text-white/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Revenue + Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-sm text-slate-500">Total Revenue</div>
                  <div className="text-3xl font-bold text-slate-900 mt-1">$6,468.96</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                    <TrendingUp className="size-3.5" /> +12.4% vs last month
                  </div>
                </div>
                <div className="flex gap-2 text-xs">
                  {["Day", "Week", "Month"].map((t, i) => (
                    <button key={t} className={`px-3 py-1.5 rounded-lg ${i === 2 ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ left: -20, right: 0, top: 10 }}>
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

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-slate-900">Analytics</div>
                <MoreHorizontal className="size-4 text-slate-400" />
              </div>
              <div className="h-56 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: 80, fill: "#8b5cf6" }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar background={{ fill: "#f1f5f9" }} dataKey="v" cornerRadius={20} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900">80%</div>
                    <div className="text-xs text-slate-500">Transactions</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-around mt-2 text-xs">
                <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-violet-500" /> Sales</div>
                <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-slate-200" /> Distribution</div>
              </div>
            </div>
          </div>

          {/* Activities + Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="font-semibold text-slate-900 mb-4">Recent Activities</div>
              <div className="space-y-4">
                {activities.map((a) => (
                  <div key={a.title} className="flex items-start gap-3">
                    <div className={`size-10 rounded-xl ${a.color} grid place-items-center text-white shrink-0`}>
                      <a.icon className="size-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">{a.title}</div>
                      <div className="text-xs text-slate-500">{a.desc}</div>
                    </div>
                    <div className="text-xs text-slate-400">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-slate-900">Order Status</div>
                <button className="text-xs text-violet-600 hover:underline">View all</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-500 text-left">
                    <th className="font-medium pb-3">Invoice</th>
                    <th className="font-medium pb-3">Customer</th>
                    <th className="font-medium pb-3">Price</th>
                    <th className="font-medium pb-3">Status</th>
                    <th className="font-medium pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-slate-100">
                      <td className="py-3 font-medium text-slate-900">{o.id}</td>
                      <td className="py-3 text-slate-600">{o.customer}</td>
                      <td className="py-3 text-slate-900 font-medium">{o.price}</td>
                      <td className="py-3"><span className={`px-2.5 py-1 rounded-full text-xs font-medium ${o.color}`}>{o.status}</span></td>
                      <td className="py-3 text-right">
                        <button className="px-3 py-1 rounded-lg bg-violet-50 text-violet-600 text-xs font-medium hover:bg-violet-100">Detail</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
