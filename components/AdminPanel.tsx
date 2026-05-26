"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap');`;

const css = `
  ${FONT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #F5F0E8;
    --ink: #1A1208;
    --espresso: #2C1A0E;
    --roast: #5C3317;
    --caramel: #C4853A;
    --foam: #EDE7D9;
    --steam: #D6CCBA;
    --red: #C0392B;
    --green: #2D6A4F;
    --amber: #D4860A;
    --sidebar-w: 220px;
  }
  body { font-family: 'DM Mono', monospace; background: var(--cream); color: var(--ink); }
  .shell { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--espresso);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 10;
  }
  .logo {
    padding: 28px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .logo-mark {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--caramel);
    letter-spacing: -0.5px;
  }
  .logo-sub {
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-top: 2px;
  }
  .nav { padding: 16px 0; flex: 1; }
  .nav-label {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    padding: 12px 20px 6px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    font-size: 12px;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    border-left: 2px solid transparent;
    transition: all 0.15s;
    letter-spacing: 0.03em;
  }
  .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.04); }
  .nav-item.active { color: var(--caramel); border-left-color: var(--caramel); background: rgba(196,133,58,0.1); }
  .nav-icon { font-size: 14px; width: 18px; text-align: center; }
  .nav-badge {
    margin-left: auto;
    background: var(--caramel);
    color: var(--espresso);
    font-size: 9px;
    font-weight: 500;
    padding: 2px 6px;
    border-radius: 10px;
  }
  .sidebar-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 11px;
    color: rgba(255,255,255,0.3);
  }
  .status-dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4CAF50;
    margin-right: 6px;
    vertical-align: middle;
  }

  /* MAIN */
  .main { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }
  .topbar {
    background: var(--cream);
    border-bottom: 1px solid var(--steam);
    padding: 0 32px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 5;
  }
  .topbar-title {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    color: var(--roast);
  }
  .topbar-right { display: flex; align-items: center; gap: 16px; }
  .topbar-time { font-size: 11px; color: #888; letter-spacing: 0.05em; }
  .avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: var(--roast);
    color: var(--caramel);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
  }
  .content { padding: 28px 32px; }

  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .stat-card {
    background: white;
    border: 1px solid var(--steam);
    border-radius: 10px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }
  .stat-card.c1::before { background: var(--caramel); }
  .stat-card.c2::before { background: var(--green); }
  .stat-card.c3::before { background: var(--roast); }
  .stat-card.c4::before { background: var(--amber); }
  .stat-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #888; margin-bottom: 8px; }
  .stat-value { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--ink); line-height: 1; }
  .stat-sub { font-size: 11px; color: #888; margin-top: 6px; }
  .stat-change { font-size: 10px; margin-top: 4px; }
  .stat-change.up { color: var(--green); }
  .stat-change.down { color: var(--red); }

  /* GRID LAYOUT */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .grid-3-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }

  /* PANEL */
  .panel {
    background: white;
    border: 1px solid var(--steam);
    border-radius: 10px;
    overflow: hidden;
  }
  .panel-head {
    padding: 16px 20px;
    border-bottom: 1px solid var(--foam);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .panel-title { font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--roast); }
  .panel-body { padding: 20px; }

  /* ORDERS TABLE */
  .orders-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .orders-table th {
    text-align: left;
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #999;
    padding: 0 12px 10px;
    border-bottom: 1px solid var(--foam);
    font-weight: 400;
  }
  .orders-table td {
    padding: 12px;
    border-bottom: 1px solid var(--foam);
    vertical-align: middle;
  }
  .orders-table tr:last-child td { border-bottom: none; }
  .orders-table tr:hover td { background: var(--cream); }
  .order-id { font-weight: 500; color: var(--roast); }
  .order-drink { color: var(--ink); }
  .order-meta { font-size: 10px; color: #aaa; margin-top: 2px; }
  .badge {
    display: inline-block;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
  .badge-new { background: #EBF5FF; color: #1a6fb5; }
  .badge-prep { background: #FFF8E7; color: #b07a00; }
  .badge-ready { background: #E8F5E9; color: #2D6A4F; }
  .badge-delivered { background: var(--foam); color: #888; }
  .badge-dine { background: #F3E8FF; color: #6B3FA0; }
  .badge-delivery { background: #FFE8E8; color: #C0392B; }
  .action-btn {
    background: none;
    border: 1px solid var(--steam);
    border-radius: 4px;
    padding: 4px 10px;
    font-size: 10px;
    font-family: 'DM Mono', monospace;
    cursor: pointer;
    color: var(--roast);
    transition: all 0.15s;
  }
  .action-btn:hover { background: var(--roast); color: white; border-color: var(--roast); }

  /* MENU ITEMS */
  .menu-list { display: flex; flex-direction: column; gap: 10px; }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px;
    border: 1px solid var(--foam);
    border-radius: 8px;
    transition: border-color 0.15s;
  }
  .menu-item:hover { border-color: var(--steam); }
  .menu-thumb {
    width: 40px; height: 40px;
    border-radius: 6px;
    background: var(--foam);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
  }
  .menu-info { flex: 1; }
  .menu-name { font-size: 12px; font-weight: 500; color: var(--ink); }
  .menu-price { font-size: 11px; color: #888; margin-top: 1px; }
  .menu-orders { font-size: 10px; color: var(--caramel); margin-top: 1px; }
  .menu-toggle {
    width: 34px; height: 18px;
    border-radius: 9px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .menu-toggle.on { background: var(--green); }
  .menu-toggle.off { background: var(--steam); }
  .menu-toggle::after {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
    border-radius: 50%;
    background: white;
    top: 3px;
    transition: left 0.2s;
  }
  .menu-toggle.on::after { left: 19px; }
  .menu-toggle.off::after { left: 3px; }

  /* ACTIVITY FEED */
  .feed { display: flex; flex-direction: column; gap: 0; }
  .feed-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--foam);
    align-items: flex-start;
  }
  .feed-item:last-child { border-bottom: none; }
  .feed-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
  }
  .feed-text { font-size: 12px; color: var(--ink); line-height: 1.5; }
  .feed-time { font-size: 10px; color: #aaa; margin-top: 2px; }

  /* CHART */
  .chart-bars { display: flex; align-items: flex-end; gap: 6px; height: 100px; padding-top: 10px; }
  .chart-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
  .chart-bar {
    width: 100%;
    border-radius: 3px 3px 0 0;
    background: var(--caramel);
    opacity: 0.8;
    transition: opacity 0.15s;
    cursor: pointer;
  }
  .chart-bar:hover { opacity: 1; }
  .chart-bar.today { background: var(--roast); opacity: 1; }
  .chart-lbl { font-size: 9px; color: #bbb; letter-spacing: 0.05em; }
  .chart-val { font-size: 9px; color: #999; }

  /* TABS */
  .tabs { display: flex; gap: 0; border-bottom: 1px solid var(--steam); margin-bottom: 16px; }
  .tab {
    padding: 8px 16px;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: #999;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.15s;
    font-family: 'DM Mono', monospace;
  }
  .tab.active { color: var(--roast); border-bottom-color: var(--caramel); }
  .tab:hover:not(.active) { color: var(--ink); }

  /* SEARCH */
  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--foam);
    border: 1px solid var(--steam);
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    color: var(--ink);
    width: 200px;
  }
  .search-bar input {
    background: none;
    border: none;
    outline: none;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--ink);
    width: 100%;
  }
  .search-bar input::placeholder { color: #bbb; }

  /* SUMMARY ROW */
  .summary-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    display: flex; align-items: center; gap: 6px;
    background: var(--foam);
    border: 1px solid var(--steam);
    border-radius: 20px;
    padding: 5px 12px;
    font-size: 11px;
    color: var(--roast);
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; }

  /* EMPTY */
  .empty { text-align: center; padding: 40px; color: #bbb; font-size: 12px; }

  /* SCROLLABLE */
  .scroll-y { overflow-y: auto; max-height: 320px; }
`;

// ── Types ──────────────────────────────────────────────────────────────────

type OrderStatus = "new" | "prep" | "ready" | "delivered";
type OrderType = "delivery" | "dine-in";
type View = "dashboard" | "orders" | "menu" | "analytics" | "settings";
type OrderTab = "all" | "new" | "prep" | "ready" | "delivery" | "dine-in";

interface Order {
  id: string;
  drink: string;
  size: string;
  qty: number;
  addons: string[];
  type: OrderType;
  address: string;
  time: string;
  status: OrderStatus;
  name: string;
  total: number;
  at: string;
}

interface MenuItem {
  emoji: string;
  name: string;
  price: string;
  orders: number;
  active: boolean;
}

interface FeedItem {
  color: string;
  text: string;
  time: string;
}

interface NavItem {
  key: View;
  icon: string;
  label: string;
  badge?: number | null;
}

interface TabItem {
  key: OrderTab;
  label: string;
}

interface StatCard {
  label: string;
  value: string | number;
  change: "up" | "down";
  note: string;
}

interface SettingField {
  label: string;
  val: string;
}

interface DeliverySetting {
  label: string;
  on: boolean;
}

interface AddonStat {
  name: string;
  count: number;
}

// ── Data ───────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  { id: "BB-4F2A1C", drink: "Oat Flat White",    size: "Large",  qty: 2, addons: ["Extra Shot"],                    type: "delivery", address: "12 Katipunan Ave", time: "ASAP",   status: "new",       name: "Maria Santos",   total: 9.84,  at: "2 min ago"  },
  { id: "BB-9D3B7E", drink: "Iced Americano",    size: "Medium", qty: 1, addons: [],                                type: "dine-in",  address: "",                 time: "",        status: "prep",      name: "Carlo Reyes",    total: 4.48,  at: "8 min ago"  },
  { id: "BB-1E8C2A", drink: "Brown Sugar Latte", size: "Small",  qty: 1, addons: ["Oat Milk"],                      type: "delivery", address: "88 Morayta St",    time: "30 min",  status: "ready",     name: "Ana Villanueva", total: 5.60,  at: "14 min ago" },
  { id: "BB-7A0F5D", drink: "Cold Brew",         size: "Large",  qty: 3, addons: [],                                type: "dine-in",  address: "",                 time: "",        status: "delivered", name: "Jun dela Cruz",  total: 13.44, at: "22 min ago" },
  { id: "BB-3C6E9B", drink: "Matcha Latte",      size: "Medium", qty: 1, addons: ["Whipped Cream","Vanilla Syrup"], type: "delivery", address: "5 Taft Ave",       time: "1 hour",  status: "new",       name: "Pia Ocampo",     total: 6.72,  at: "1 min ago"  },
  { id: "BB-2D4A8F", drink: "Espresso Shot",     size: "Small",  qty: 2, addons: [],                                type: "dine-in",  address: "",                 time: "",        status: "prep",      name: "Rico Tan",       total: 3.36,  at: "31 min ago" },
];

const MENU: MenuItem[] = [
  { emoji: "☕", name: "Oat Flat White",     price: "$4.50", orders: 142, active: true  },
  { emoji: "🧊", name: "Iced Americano",    price: "$3.50", orders: 118, active: true  },
  { emoji: "🍬", name: "Brown Sugar Latte", price: "$4.75", orders: 97,  active: true  },
  { emoji: "🌿", name: "Matcha Latte",      price: "$5.00", orders: 84,  active: true  },
  { emoji: "🖤", name: "Cold Brew",         price: "$4.00", orders: 73,  active: false },
  { emoji: "⚡", name: "Espresso Shot",     price: "$2.50", orders: 61,  active: true  },
];

const FEED: FeedItem[] = [
  { color: "#C4853A", text: "New order BB-3C6E9B — Matcha Latte delivery to Taft Ave", time: "1 min ago"  },
  { color: "#C4853A", text: "New order BB-4F2A1C — Oat Flat White ×2 to Katipunan",   time: "2 min ago"  },
  { color: "#2D6A4F", text: "BB-1E8C2A marked ready for pickup",                       time: "5 min ago"  },
  { color: "#C0392B", text: "Cold Brew marked unavailable by staff",                   time: "18 min ago" },
  { color: "#2D6A4F", text: "BB-7A0F5D delivered — table 4",                           time: "22 min ago" },
  { color: "#888",    text: "Daily revenue milestone: ₱15,000 crossed",                time: "34 min ago" },
];

const DAYS: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SALES: number[] = [48, 62, 55, 71, 83, 94, 67];
const MAX_SALE: number = Math.max(...SALES);

const STATUS_CYCLE: Record<OrderStatus, OrderStatus> = {
  new: "prep",
  prep: "ready",
  ready: "delivered",
  delivered: "delivered",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New",
  prep: "Preparing",
  ready: "Ready",
  delivered: "Done",
};

// ── Component ──────────────────────────────────────────────────────────────

export default function AdminPanel(): JSX.Element {
  const router = useRouter();
  const [view, setView]           = useState<View>("dashboard");
  const [orders, setOrders]       = useState<Order[]>(ORDERS);
  const [menu, setMenu]           = useState<MenuItem[]>(MENU);
  const [orderTab, setOrderTab]   = useState<OrderTab>("all");
  const [search, setSearch]       = useState<string>("");
  const [now]                     = useState<string>(() =>
    new Date().toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })
  );

  const pendingCount: number = orders.filter((o) => o.status === "new").length;

  function advanceOrder(id: string): void {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: STATUS_CYCLE[o.status] } : o))
    );
  }

  function toggleMenu(idx: number): void {
    setMenu((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, active: !m.active } : m))
    );
  }

  const filteredOrders: Order[] = orders.filter((o) => {
    const matchTab =
      orderTab === "all" ||
      o.status === orderTab ||
      (orderTab === "delivery" && o.type === "delivery") ||
      (orderTab === "dine-in"  && o.type === "dine-in");
    const matchSearch =
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.drink.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalRevenue: number    = orders.reduce((s, o) => s + o.total, 0);
  const deliveryCount: number   = orders.filter((o) => o.type === "delivery").length;
  const dineInCount: number     = orders.filter((o) => o.type === "dine-in").length;

  const navItems: NavItem[] = [
    { key: "dashboard", icon: "▦", label: "Dashboard" },
    { key: "orders",    icon: "◈", label: "Orders", badge: pendingCount || null },
    { key: "menu",      icon: "≡", label: "Menu" },
  ];

  const reportItems: NavItem[] = [
    { key: "analytics", icon: "↗", label: "Analytics" },
    { key: "settings",  icon: "◎", label: "Settings" },
  ];

  const orderTabs: TabItem[] = [
    { key: "all",      label: "All"       },
    { key: "new",      label: "New"       },
    { key: "prep",     label: "Preparing" },
    { key: "ready",    label: "Ready"     },
    { key: "delivery", label: "Delivery"  },
    { key: "dine-in",  label: "Dine In"   },
  ];

  const analyticsStats: StatCard[] = [
    { label: "Avg Order Value", value: `$${(orders.reduce((s, o) => s + o.total, 0) / orders.length).toFixed(2)}`, change: "up",   note: "↑ 8% vs last week"    },
    { label: "Delivery Rate",   value: `${Math.round((deliveryCount / orders.length) * 100)}%`,                    change: "up",   note: "↑ 5% vs last week"    },
    { label: "Items Sold",      value: orders.reduce((s, o) => s + o.qty, 0),                                      change: "up",   note: "↑ 12 today"           },
    { label: "Avg Prep Time",   value: "8 min",                                                                     change: "down", note: "↓ 2 min improved"     },
  ];

  const settingFields: SettingField[] = [
    { label: "Store Name",           val: "Black Bean Café"  },
    { label: "GCash Number",         val: "0917-BLACK-BEAN"  },
    { label: "VAT Rate",             val: "12%"              },
    { label: "Delivery Fee (₱)",     val: "50"               },
    { label: "Est. Prep Time (min)", val: "8"                },
  ];

  const deliverySettings: DeliverySetting[] = [
    { label: "Accept Delivery Orders",  on: true  },
    { label: "Accept Dine-In Orders",   on: true  },
    { label: "ASAP Delivery Available", on: true  },
    { label: "Scheduled Delivery",      on: true  },
    { label: "Custom Time Slots",       on: false },
  ];

  const addonStats: AddonStat[] = [
    { name: "Extra Shot",    count: 89 },
    { name: "Oat Milk",      count: 74 },
    { name: "Vanilla Syrup", count: 51 },
    { name: "Whipped Cream", count: 38 },
  ];

  const topBarTitles: Record<View, string> = {
    dashboard: "Good morning — here's your café at a glance",
    orders:    "Manage orders",
    menu:      "Menu management",
    analytics: "Sales analytics",
    settings:  "Settings",
  };

  return (
    <>
      <style>{css}</style>
      <div className="shell">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-mark">Black Bean</div>
            <div className="logo-sub">Admin Console</div>
          </div>
          <nav className="nav">
            <div className="nav-label">Operations</div>
            {navItems.map((item) => (
              <div
                key={item.key}
                className={`nav-item ${view === item.key ? "active" : ""}`}
                onClick={() => setView(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              </div>
            ))}
            <div className="nav-label" style={{ marginTop: 12 }}>Reports</div>
            {reportItems.map((item) => (
              <div
                key={item.key}
                className={`nav-item ${view === item.key ? "active" : ""}`}
                onClick={() => setView(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <span className="status-dot" />
            Store is open
            <button
              onClick={() => router.push("/")}
              style={{
                display: "block",
                marginTop: 12,
                width: "100%",
                padding: "8px 0",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)";
              }}
            >
              ← Exit Admin
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{topBarTitles[view]}</div>
            <div className="topbar-right">
              <span className="topbar-time">{now}</span>
              <div className="avatar">BB</div>
            </div>
          </div>

          <div className="content">

            {/* ── DASHBOARD ── */}
            {view === "dashboard" && (
              <>
                <div className="stats-grid">
                  <div className="stat-card c1">
                    <div className="stat-label">Today's Revenue</div>
                    <div className="stat-value">₱{(totalRevenue * 58).toFixed(0)}</div>
                    <div className="stat-change up">↑ 14% vs yesterday</div>
                  </div>
                  <div className="stat-card c2">
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{orders.length}</div>
                    <div className="stat-change up">↑ 3 new today</div>
                  </div>
                  <div className="stat-card c3">
                    <div className="stat-label">Delivery</div>
                    <div className="stat-value">{deliveryCount}</div>
                    <div className="stat-sub">{dineInCount} dine-in</div>
                  </div>
                  <div className="stat-card c4">
                    <div className="stat-label">Pending</div>
                    <div className="stat-value">{pendingCount}</div>
                    <div className="stat-change down">Need action</div>
                  </div>
                </div>

                <div className="grid-3-1">
                  {/* Recent orders */}
                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Recent Orders</span>
                      <button className="action-btn" onClick={() => setView("orders")}>View all →</button>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Item</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.slice(0, 5).map((o) => (
                            <tr key={o.id}>
                              <td>
                                <div className="order-id">{o.id}</div>
                                <div className="order-meta">{o.at}</div>
                              </td>
                              <td>
                                <div className="order-drink">{o.drink}</div>
                                <div className="order-meta">{o.size} · {o.name}</div>
                              </td>
                              <td>
                                <span className={`badge badge-${o.type === "dine-in" ? "dine" : "delivery"}`}>
                                  {o.type}
                                </span>
                              </td>
                              <td>
                                <span className={`badge badge-${o.status}`}>
                                  {STATUS_LABEL[o.status]}
                                </span>
                              </td>
                              <td style={{ fontWeight: 500 }}>${o.total.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Live Feed</span></div>
                    <div className="panel-body">
                      <div className="feed">
                        {FEED.map((f, i) => (
                          <div className="feed-item" key={i}>
                            <div className="feed-dot" style={{ background: f.color }} />
                            <div>
                              <div className="feed-text">{f.text}</div>
                              <div className="feed-time">{f.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid-2">
                  {/* Weekly chart */}
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Weekly Orders</span></div>
                    <div className="panel-body">
                      <div className="chart-bars">
                        {DAYS.map((d, i) => (
                          <div className="chart-col" key={d}>
                            <div className="chart-val">{SALES[i]}</div>
                            <div
                              className={`chart-bar ${d === "Sat" ? "today" : ""}`}
                              style={{ height: `${(SALES[i] / MAX_SALE) * 80}px` }}
                            />
                            <div className="chart-lbl">{d}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top menu */}
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Top Items</span></div>
                    <div className="panel-body">
                      <div className="menu-list">
                        {MENU.slice(0, 4).map((m, i) => (
                          <div className="menu-item" key={i}>
                            <div className="menu-thumb">{m.emoji}</div>
                            <div className="menu-info">
                              <div className="menu-name">{m.name}</div>
                              <div className="menu-price">{m.price}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--roast)" }}>{m.orders}</div>
                              <div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em" }}>orders</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── ORDERS ── */}
            {view === "orders" && (
              <div className="panel">
                <div className="panel-head">
                  <div className="summary-pills">
                    <div className="pill"><div className="pill-dot" style={{ background: "#C4853A" }} />{orders.filter((o) => o.status === "new").length} new</div>
                    <div className="pill"><div className="pill-dot" style={{ background: "#D4860A" }} />{orders.filter((o) => o.status === "prep").length} preparing</div>
                    <div className="pill"><div className="pill-dot" style={{ background: "#2D6A4F" }} />{orders.filter((o) => o.status === "ready").length} ready</div>
                    <div className="pill"><div className="pill-dot" style={{ background: "#ccc" }} />{orders.filter((o) => o.status === "delivered").length} done</div>
                  </div>
                  <div className="search-bar">
                    <span style={{ color: "#bbb" }}>⌕</span>
                    <input
                      placeholder="Search orders..."
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="panel-body" style={{ paddingTop: 0 }}>
                  <div className="tabs">
                    {orderTabs.map((t) => (
                      <div
                        key={t.key}
                        className={`tab ${orderTab === t.key ? "active" : ""}`}
                        onClick={() => setOrderTab(t.key)}
                      >
                        {t.label}
                      </div>
                    ))}
                  </div>
                  {filteredOrders.length === 0 ? (
                    <div className="empty">No orders match your filter.</div>
                  ) : (
                    <div style={{ overflowX: "auto" }}>
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Item</th>
                            <th>Type</th>
                            <th>Deliver by</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((o) => (
                            <tr key={o.id}>
                              <td>
                                <div className="order-id">{o.id}</div>
                                <div className="order-meta">{o.at}</div>
                              </td>
                              <td><div style={{ fontSize: 12 }}>{o.name}</div></td>
                              <td>
                                <div className="order-drink">{o.drink}</div>
                                <div className="order-meta">
                                  {o.size} · ×{o.qty}
                                  {o.addons.length > 0 && " · " + o.addons.join(", ")}
                                </div>
                              </td>
                              <td>
                                <span className={`badge badge-${o.type === "dine-in" ? "dine" : "delivery"}`}>
                                  {o.type}
                                </span>
                              </td>
                              <td style={{ fontSize: 11, color: "#888" }}>
                                {o.type === "delivery" ? (o.time || "ASAP") : "—"}
                                {o.address && <div className="order-meta">{o.address}</div>}
                              </td>
                              <td style={{ fontWeight: 500 }}>${o.total.toFixed(2)}</td>
                              <td>
                                <span className={`badge badge-${o.status}`}>
                                  {STATUS_LABEL[o.status]}
                                </span>
                              </td>
                              <td>
                                {o.status !== "delivered" ? (
                                  <button className="action-btn" onClick={() => advanceOrder(o.id)}>
                                    {o.status === "new" ? "Start prep" : o.status === "prep" ? "Mark ready" : "Complete"}
                                  </button>
                                ) : (
                                  <span style={{ fontSize: 11, color: "#bbb" }}>✓ Done</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── MENU ── */}
            {view === "menu" && (
              <div className="grid-2">
                <div className="panel">
                  <div className="panel-head">
                    <span className="panel-title">Drinks ({menu.filter((m) => m.active).length} active)</span>
                  </div>
                  <div className="panel-body">
                    <div className="menu-list">
                      {menu.map((m, i) => (
                        <div className="menu-item" key={i}>
                          <div className="menu-thumb">{m.emoji}</div>
                          <div className="menu-info">
                            <div className="menu-name">{m.name}</div>
                            <div className="menu-price">{m.price}</div>
                            <div className="menu-orders">{m.orders} orders this week</div>
                          </div>
                          <button
                            className={`menu-toggle ${m.active ? "on" : "off"}`}
                            onClick={() => toggleMenu(i)}
                            title={m.active ? "Disable item" : "Enable item"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="panel" style={{ marginBottom: 16 }}>
                    <div className="panel-head"><span className="panel-title">Quick Stats</span></div>
                    <div className="panel-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {menu.map((m, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 16 }}>{m.emoji}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                                <span>{m.name}</span>
                                <span style={{ color: "var(--caramel)", fontWeight: 500 }}>{m.orders}</span>
                              </div>
                              <div style={{ height: 4, background: "var(--foam)", borderRadius: 2, overflow: "hidden" }}>
                                <div style={{
                                  height: "100%",
                                  width: `${(m.orders / 142) * 100}%`,
                                  background: m.active ? "var(--caramel)" : "var(--steam)",
                                  borderRadius: 2,
                                  transition: "width 0.3s",
                                }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Add-on Performance</span></div>
                    <div className="panel-body">
                      {addonStats.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 0",
                            borderBottom: i < 3 ? "1px solid var(--foam)" : "none",
                            fontSize: 12,
                          }}
                        >
                          <span>{a.name}</span>
                          <span style={{ color: "var(--caramel)", fontWeight: 500 }}>{a.count}×</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── ANALYTICS ── */}
            {view === "analytics" && (
              <>
                <div className="stats-grid">
                  {analyticsStats.map((s, i) => (
                    <div className={`stat-card c${i + 1}`} key={i}>
                      <div className="stat-label">{s.label}</div>
                      <div className="stat-value">{s.value}</div>
                      <div className={`stat-change ${s.change}`}>{s.note}</div>
                    </div>
                  ))}
                </div>
                <div className="grid-2">
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Sales by Day (this week)</span></div>
                    <div className="panel-body">
                      <div className="chart-bars" style={{ height: 160 }}>
                        {DAYS.map((d, i) => (
                          <div className="chart-col" key={d}>
                            <div className="chart-val">{SALES[i]}</div>
                            <div
                              className={`chart-bar ${d === "Sat" ? "today" : ""}`}
                              style={{ height: `${(SALES[i] / MAX_SALE) * 130}px` }}
                            />
                            <div className="chart-lbl">{d}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="panel">
                    <div className="panel-head"><span className="panel-title">Order Type Split</span></div>
                    <div className="panel-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 10 }}>
                        {[
                          { label: "Delivery", val: deliveryCount, color: "var(--red)",   pct: Math.round((deliveryCount / orders.length) * 100) },
                          { label: "Dine In",  val: dineInCount,   color: "var(--roast)", pct: Math.round((dineInCount   / orders.length) * 100) },
                        ].map((r) => (
                          <div key={r.label}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                              <span>{r.label}</span>
                              <span style={{ fontWeight: 500 }}>{r.val} orders ({r.pct}%)</span>
                            </div>
                            <div style={{ height: 8, background: "var(--foam)", borderRadius: 4, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 4 }} />
                            </div>
                          </div>
                        ))}
                        <div style={{ borderTop: "1px solid var(--foam)", paddingTop: 16 }}>
                          <div style={{ fontSize: 11, color: "#888", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            Top delivery windows
                          </div>
                          {([ ["ASAP", "61%"], ["30 min", "22%"], ["1 hour", "12%"], ["Custom", "5%"] ] as [string, string][]).map(([k, v]) => (
                            <div
                              key={k}
                              style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: "1px solid var(--foam)" }}
                            >
                              <span>{k}</span>
                              <span style={{ color: "var(--caramel)" }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── SETTINGS ── */}
            {view === "settings" && (
              <div className="grid-2">
                <div className="panel">
                  <div className="panel-head"><span className="panel-title">Store Settings</span></div>
                  <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {settingFields.map((f) => (
                      <div key={f.label} className="field">
                        <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 6 }}>
                          {f.label}
                        </div>
                        <input
                          defaultValue={f.val}
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            border: "1px solid var(--steam)",
                            borderRadius: 6,
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 12,
                            color: "var(--ink)",
                            background: "var(--foam)",
                            outline: "none",
                          }}
                        />
                      </div>
                    ))}
                    <button style={{
                      marginTop: 8,
                      padding: "10px 20px",
                      background: "var(--roast)",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 12,
                      cursor: "pointer",
                      letterSpacing: "0.05em",
                    }}>
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-head"><span className="panel-title">Delivery Settings</span></div>
                  <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {deliverySettings.map((s, i) => (
                      <div
                        key={i}
                        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: "1px solid var(--foam)" }}
                      >
                        <span style={{ fontSize: 12 }}>{s.label}</span>
                        <button className={`menu-toggle ${s.on ? "on" : "off"}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  );
}