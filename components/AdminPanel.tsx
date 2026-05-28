"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');`;

const css = `
  ${FONT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #F7F8FA;
    --ink: #0F1117;
    --surface: #FFFFFF;
    --muted: #6B7280;
    --border: #E5E7EB;
    --border2: #D1D5DB;
    --accent: #1D4ED8;
    --accent-light: #EFF6FF;
    --accent-text: #1E40AF;
    --green: #065F46;
    --green-bg: #D1FAE5;
    --amber: #92400E;
    --amber-bg: #FEF3C7;
    --red: #991B1B;
    --red-bg: #FEE2E2;
    --blue-bg: #DBEAFE;
    --blue-text: #1D4ED8;
    --sidebar: #111827;
    --sidebar-w: 220px;
  }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: var(--cream);
    color: var(--ink);
    font-size: 14px;
    line-height: 1.5;
  }
  .shell { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--sidebar);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 10;
  }
  .logo {
    padding: 20px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .logo-mark {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    letter-spacing: -0.01em;
  }
  .logo-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    margin-top: 2px;
    letter-spacing: 0.02em;
  }
  .nav { padding: 12px 0; flex: 1; }
  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    padding: 12px 16px 4px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 16px;
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    transition: all 0.12s;
    letter-spacing: 0.01em;
    font-weight: 400;
  }
  .nav-item:hover { color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.06); }
  .nav-item.active { color: #fff; background: rgba(255,255,255,0.12); font-weight: 500; }
  .nav-icon { font-size: 15px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto;
    background: #EF4444;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 10px;
  }
  .sidebar-footer {
    padding: 14px 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .status-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
  }
  .status-dot {
    display: inline-block;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #10B981;
    flex-shrink: 0;
  }
  .exit-btn {
    margin-top: 10px;
    width: 100%;
    padding: 7px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px;
    color: rgba(255,255,255,0.4);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.12s;
  }
  .exit-btn:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }

  /* MAIN */
  .main { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }
  .topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 28px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 5;
  }
  .topbar-title { font-size: 14px; font-weight: 500; color: var(--ink); }
  .topbar-right { display: flex; align-items: center; gap: 14px; }
  .topbar-time { font-size: 12px; color: var(--muted); }
  .avatar {
    width: 30px; height: 30px;
    border-radius: 50%;
    background: var(--accent);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
  }
  .content { padding: 24px 28px; }

  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px 18px;
  }
  .stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
  .stat-value { font-size: 26px; font-weight: 600; color: var(--ink); line-height: 1.1; letter-spacing: -0.02em; }
  .stat-sub { font-size: 11px; color: var(--muted); margin-top: 5px; }
  .stat-change { font-size: 11px; margin-top: 5px; }
  .stat-change.up { color: #059669; }
  .stat-change.down { color: #DC2626; }

  /* GRID LAYOUT */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .grid-3-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 16px; }

  /* PANEL */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .panel-head {
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .panel-title {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .panel-body { padding: 18px; }

  /* ORDERS TABLE */
  .orders-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .orders-table th {
    text-align: left;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0 14px 10px;
    border-bottom: 1px solid var(--border);
  }
  .orders-table td {
    padding: 11px 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .orders-table tr:last-child td { border-bottom: none; }
  .orders-table tr:hover td { background: #FAFAFA; }
  .order-id { font-weight: 500; color: var(--ink); font-size: 12px; }
  .order-drink { color: var(--ink); }
  .order-meta { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.03em;
    padding: 2px 8px;
    border-radius: 4px;
  }
  .badge-new { background: var(--blue-bg); color: var(--blue-text); }
  .badge-prep { background: var(--amber-bg); color: var(--amber); }
  .badge-ready { background: var(--green-bg); color: var(--green); }
  .badge-delivered { background: #F3F4F6; color: #6B7280; }
  .badge-dine { background: #F3E8FF; color: #6B21A8; }
  .badge-delivery { background: #FEE2E2; color: #991B1B; }
  .action-btn {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 5px;
    padding: 5px 12px;
    font-size: 11px;
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 500;
    cursor: pointer;
    color: var(--ink);
    transition: all 0.12s;
  }
  .action-btn:hover { background: var(--ink); color: #fff; border-color: var(--ink); }

  /* MENU ITEMS */
  .menu-list { display: flex; flex-direction: column; gap: 8px; }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 7px;
    transition: border-color 0.12s;
  }
  .menu-item:hover { border-color: var(--border2); }
  .menu-thumb {
    width: 44px; height: 44px;
    border-radius: 6px;
    background: var(--cream);
    flex-shrink: 0;
    overflow: hidden;
  }
  .menu-thumb img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .menu-info { flex: 1; }
  .menu-name { font-size: 13px; font-weight: 500; color: var(--ink); }
  .menu-price { font-size: 11px; color: var(--muted); margin-top: 1px; }
  .menu-orders { font-size: 10px; color: var(--accent); margin-top: 1px; }
  .menu-toggle {
    width: 34px; height: 18px;
    border-radius: 9px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .menu-toggle.on { background: #059669; }
  .menu-toggle.off { background: #D1D5DB; }
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
  .feed { display: flex; flex-direction: column; }
  .feed-item {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    align-items: flex-start;
  }
  .feed-item:last-child { border-bottom: none; }
  .feed-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
  }
  .feed-text { font-size: 12px; color: var(--ink); line-height: 1.5; }
  .feed-time { font-size: 10px; color: var(--muted); margin-top: 2px; }

  /* CHART */
  .chart-bars { display: flex; align-items: flex-end; gap: 6px; height: 100px; padding-top: 10px; }
  .chart-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
  .chart-bar {
    width: 100%;
    border-radius: 3px 3px 0 0;
    background: #BFDBFE;
    transition: opacity 0.15s;
    cursor: pointer;
  }
  .chart-bar:hover { background: #93C5FD; }
  .chart-bar.today { background: var(--accent); }
  .chart-lbl { font-size: 10px; color: var(--muted); }
  .chart-val { font-size: 10px; color: var(--muted); }

  /* TABS */
  .tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
  .tab {
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all 0.12s;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .tab:hover:not(.active) { color: var(--ink); }

  /* SEARCH */
  .search-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #F9FAFB;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 12px;
    width: 200px;
  }
  .search-bar input {
    background: none;
    border: none;
    outline: none;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    color: var(--ink);
    width: 100%;
  }
  .search-bar input::placeholder { color: #9CA3AF; }

  /* SUMMARY ROW */
  .summary-pills { display: flex; gap: 7px; flex-wrap: wrap; }
  .pill {
    display: flex; align-items: center; gap: 5px;
    background: #F9FAFB;
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 11px;
    color: var(--ink);
    font-weight: 500;
  }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; }

  /* EMPTY */
  .empty { text-align: center; padding: 40px; color: var(--muted); font-size: 13px; }

  /* FORM FIELDS */
  .field-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 5px;
  }
  .field-input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--border);
    border-radius: 6px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
    color: var(--ink);
    background: var(--surface);
    outline: none;
    transition: border-color 0.12s;
  }
  .field-input:focus { border-color: var(--accent); }
  .save-btn {
    margin-top: 10px;
    padding: 9px 20px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 6px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.12s;
  }
  .save-btn:hover { background: #1E40AF; }
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
  image: string;
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
  change?: "up" | "down";
  note?: string;
  sub?: string;
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
  {
    id: "BB-4F2A1C",
    drink: "Oat Flat White",
    size: "Large",
    qty: 2,
    addons: ["Extra Shot"],
    type: "delivery",
    address: "12 Katipunan Ave",
    time: "ASAP",
    status: "new",
    name: "Maria Santos",
    total: 9.84,
    at: "2 min ago",
  },
  {
    id: "BB-9D3B7E",
    drink: "Iced Americano",
    size: "Medium",
    qty: 1,
    addons: [],
    type: "dine-in",
    address: "",
    time: "",
    status: "prep",
    name: "Carlo Reyes",
    total: 4.48,
    at: "8 min ago",
  },
  {
    id: "BB-1E8C2A",
    drink: "Brown Sugar Latte",
    size: "Small",
    qty: 1,
    addons: ["Oat Milk"],
    type: "delivery",
    address: "88 Morayta St",
    time: "30 min",
    status: "ready",
    name: "Ana Villanueva",
    total: 5.6,
    at: "14 min ago",
  },
  {
    id: "BB-7A0F5D",
    drink: "Cold Brew",
    size: "Large",
    qty: 3,
    addons: [],
    type: "dine-in",
    address: "",
    time: "",
    status: "delivered",
    name: "Jun dela Cruz",
    total: 13.44,
    at: "22 min ago",
  },
  {
    id: "BB-3C6E9B",
    drink: "Matcha Latte",
    size: "Medium",
    qty: 1,
    addons: ["Whipped Cream", "Vanilla Syrup"],
    type: "delivery",
    address: "5 Taft Ave",
    time: "1 hour",
    status: "new",
    name: "Pia Ocampo",
    total: 6.72,
    at: "1 min ago",
  },
  {
    id: "BB-2D4A8F",
    drink: "Espresso Shot",
    size: "Small",
    qty: 2,
    addons: [],
    type: "dine-in",
    address: "",
    time: "",
    status: "prep",
    name: "Rico Tan",
    total: 3.36,
    at: "31 min ago",
  },
];

const MENU: MenuItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&q=80",
    name: "Oat Flat White",
    price: "$4.50",
    orders: 142,
    active: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=120&q=80",
    name: "Iced Americano",
    price: "$3.50",
    orders: 118,
    active: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=120&q=80",
    name: "Brown Sugar Latte",
    price: "$4.75",
    orders: 97,
    active: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=120&q=80",
    name: "Matcha Latte",
    price: "$5.00",
    orders: 84,
    active: true,
  },
  {
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&q=80",
    name: "Cold Brew",
    price: "$4.00",
    orders: 73,
    active: false,
  },
  {
    image:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=120&q=80",
    name: "Espresso Shot",
    price: "$2.50",
    orders: 61,
    active: true,
  },
];

const FEED: FeedItem[] = [
  {
    color: "#3B82F6",
    text: "New order BB-3C6E9B — Matcha Latte delivery to Taft Ave",
    time: "1 min ago",
  },
  {
    color: "#3B82F6",
    text: "New order BB-4F2A1C — Oat Flat White ×2 to Katipunan",
    time: "2 min ago",
  },
  {
    color: "#059669",
    text: "BB-1E8C2A marked ready for pickup",
    time: "5 min ago",
  },
  {
    color: "#EF4444",
    text: "Cold Brew marked unavailable by staff",
    time: "18 min ago",
  },
  {
    color: "#059669",
    text: "BB-7A0F5D delivered — table 4",
    time: "22 min ago",
  },
  {
    color: "#6B7280",
    text: "Daily revenue milestone: ₱15,000 crossed",
    time: "34 min ago",
  },
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

const TOP_BAR_TITLES: Record<View, string> = {
  dashboard: "Dashboard overview",
  orders: "Order management",
  menu: "Menu management",
  analytics: "Sales analytics",
  settings: "Settings",
};

// ── Component ──────────────────────────────────────────────────────────────

export default function AdminPanel() {
  const router = useRouter();
  const [view, setView] = useState<View>("dashboard");
  const [orders, setOrders] = useState<Order[]>(ORDERS);
  const [menu, setMenu] = useState<MenuItem[]>(() =>
    MENU.map((m) => ({ ...m })),
  );
  const [orderTab, setOrderTab] = useState<OrderTab>("all");
  const [search, setSearch] = useState<string>("");
  const [now] = useState<string>(() =>
    new Date().toLocaleString("en-PH", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  );

  const pendingCount: number = orders.filter((o) => o.status === "new").length;
  const totalRevenue: number = orders.reduce((s, o) => s + o.total, 0);
  const deliveryCount: number = orders.filter(
    (o) => o.type === "delivery",
  ).length;
  const dineInCount: number = orders.filter((o) => o.type === "dine-in").length;

  function advanceOrder(id: string): void {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: STATUS_CYCLE[o.status] } : o,
      ),
    );
  }

  function toggleMenu(idx: number): void {
    setMenu((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, active: !m.active } : m)),
    );
  }

  const filteredOrders: Order[] = orders.filter((o) => {
    const matchTab =
      orderTab === "all" ||
      o.status === orderTab ||
      (orderTab === "delivery" && o.type === "delivery") ||
      (orderTab === "dine-in" && o.type === "dine-in");
    const matchSearch =
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.drink.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const navItems: NavItem[] = [
    { key: "dashboard", icon: "▦", label: "Dashboard" },
    { key: "orders", icon: "◈", label: "Orders", badge: pendingCount || null },
    { key: "menu", icon: "≡", label: "Menu" },
  ];

  const reportItems: NavItem[] = [
    { key: "analytics", icon: "↗", label: "Analytics" },
    { key: "settings", icon: "◎", label: "Settings" },
  ];

  const orderTabs: TabItem[] = [
    { key: "all", label: "All" },
    { key: "new", label: "New" },
    { key: "prep", label: "Preparing" },
    { key: "ready", label: "Ready" },
    { key: "delivery", label: "Delivery" },
    { key: "dine-in", label: "Dine In" },
  ];

  const analyticsStats: StatCard[] = [
    {
      label: "Avg Order Value",
      value: `$${(orders.reduce((s, o) => s + o.total, 0) / orders.length).toFixed(2)}`,
      change: "up",
      note: "↑ 8% vs last week",
    },
    {
      label: "Delivery Rate",
      value: `${Math.round((deliveryCount / orders.length) * 100)}%`,
      change: "up",
      note: "↑ 5% vs last week",
    },
    {
      label: "Items Sold",
      value: orders.reduce((s, o) => s + o.qty, 0),
      change: "up",
      note: "↑ 12 today",
    },
    {
      label: "Avg Prep Time",
      value: "8 min",
      change: "up",
      note: "↓ 2 min improved",
    },
  ];

  const settingFields: SettingField[] = [
    { label: "Store Name", val: "Black Bean Café" },
    { label: "GCash Number", val: "0917-BLACK-BEAN" },
    { label: "VAT Rate", val: "12%" },
    { label: "Delivery Fee (₱)", val: "50" },
    { label: "Est. Prep Time (min)", val: "8" },
  ];

  const deliverySettings: DeliverySetting[] = [
    { label: "Accept Delivery Orders", on: true },
    { label: "Accept Dine-In Orders", on: true },
    { label: "ASAP Delivery Available", on: true },
    { label: "Scheduled Delivery", on: true },
    { label: "Custom Time Slots", on: false },
  ];

  const addonStats: AddonStat[] = [
    { name: "Extra Shot", count: 89 },
    { name: "Oat Milk", count: 74 },
    { name: "Vanilla Syrup", count: 51 },
    { name: "Whipped Cream", count: 38 },
  ];

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
                {item.badge ? (
                  <span className="nav-badge">{item.badge}</span>
                ) : null}
              </div>
            ))}
            <div className="nav-label" style={{ marginTop: 10 }}>
              Reports
            </div>
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
            <div className="status-row">
              <span className="status-dot" />
              Store is open
            </div>
            <button className="exit-btn" onClick={() => router.push("/")}>
              ← Exit admin
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{TOP_BAR_TITLES[view]}</div>
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
                  <div className="stat-card">
                    <div className="stat-label">Today's Revenue</div>
                    <div className="stat-value">
                      ₱{(totalRevenue * 58).toFixed(0)}
                    </div>
                    <div className="stat-change up">↑ 14% vs yesterday</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{orders.length}</div>
                    <div className="stat-change up">↑ 3 new today</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Delivery Orders</div>
                    <div className="stat-value">{deliveryCount}</div>
                    <div className="stat-sub">{dineInCount} dine-in</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Pending</div>
                    <div className="stat-value">{pendingCount}</div>
                    <div className="stat-change down">Require action</div>
                  </div>
                </div>

                <div className="grid-3-1">
                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Recent Orders</span>
                      <button
                        className="action-btn"
                        onClick={() => setView("orders")}
                      >
                        View all →
                      </button>
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
                                <div className="order-meta">
                                  {o.size} · {o.name}
                                </div>
                              </td>
                              <td>
                                <span
                                  className={`badge badge-${o.type === "dine-in" ? "dine" : "delivery"}`}
                                >
                                  {o.type}
                                </span>
                              </td>
                              <td>
                                <span className={`badge badge-${o.status}`}>
                                  {STATUS_LABEL[o.status]}
                                </span>
                              </td>
                              <td style={{ fontWeight: 500 }}>
                                ${o.total.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Live Feed</span>
                    </div>
                    <div className="panel-body">
                      <div className="feed">
                        {FEED.map((f, i) => (
                          <div className="feed-item" key={i}>
                            <div
                              className="feed-dot"
                              style={{ background: f.color }}
                            />
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
                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Weekly Orders</span>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>
                        This week · {SALES.reduce((a, b) => a + b, 0)} total
                      </span>
                    </div>
                    <div className="panel-body" style={{ paddingTop: 8 }}>
                      <svg
                        viewBox="0 0 420 130"
                        width="100%"
                        style={{ overflow: "visible" }}
                      >
                        {/* Grid lines */}
                        {[0, 25, 50, 75, 100].map((pct) => {
                          const y = 100 - pct;
                          return (
                            <g key={pct}>
                              <line
                                x1={0}
                                y1={y}
                                x2={420}
                                y2={y}
                                stroke="#E5E7EB"
                                strokeWidth={0.5}
                              />
                              <text
                                x={-4}
                                y={y + 3}
                                fontSize={8}
                                fill="#9CA3AF"
                                textAnchor="end"
                              >
                                {Math.round((pct / 100) * MAX_SALE)}
                              </text>
                            </g>
                          );
                        })}
                        {/* Bars */}
                        {DAYS.map((d, i) => {
                          const barW = 38;
                          const gap =
                            (420 - DAYS.length * barW) / (DAYS.length + 1);
                          const x = gap + i * (barW + gap);
                          const barH = (SALES[i] / MAX_SALE) * 95;
                          const y = 100 - barH;
                          const isToday = d === "Sat";
                          return (
                            <g key={d}>
                              <rect
                                x={x}
                                y={y}
                                width={barW}
                                height={barH}
                                fill={isToday ? "#1D4ED8" : "#BFDBFE"}
                                rx={3}
                              />
                              {isToday && (
                                <rect
                                  x={x}
                                  y={y}
                                  width={barW}
                                  height={4}
                                  fill="#1E40AF"
                                  rx={3}
                                />
                              )}
                              <text
                                x={x + barW / 2}
                                y={y - 4}
                                fontSize={9}
                                fill={isToday ? "#1D4ED8" : "#6B7280"}
                                textAnchor="middle"
                                fontWeight={isToday ? "600" : "400"}
                              >
                                {SALES[i]}
                              </text>
                              <text
                                x={x + barW / 2}
                                y={116}
                                fontSize={9}
                                fill={isToday ? "#1D4ED8" : "#9CA3AF"}
                                textAnchor="middle"
                                fontWeight={isToday ? "600" : "400"}
                              >
                                {d}
                              </text>
                            </g>
                          );
                        })}
                        {/* Baseline */}
                        <line
                          x1={0}
                          y1={100}
                          x2={420}
                          y2={100}
                          stroke="#D1D5DB"
                          strokeWidth={1}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Top Items</span>
                    </div>
                    <div className="panel-body">
                      <div className="menu-list">
                        {MENU.slice(0, 4).map((m, i) => (
                          <div className="menu-item" key={i}>
                            <div className="menu-thumb">
                              <img src={m.image} alt={m.name} />
                            </div>
                            <div className="menu-info">
                              <div className="menu-name">{m.name}</div>
                              <div className="menu-price">{m.price}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div
                                style={{
                                  fontSize: 13,
                                  fontWeight: 600,
                                  color: "var(--ink)",
                                }}
                              >
                                {m.orders}
                              </div>
                              <div
                                style={{
                                  fontSize: 9,
                                  color: "#bbb",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.06em",
                                }}
                              >
                                orders
                              </div>
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
                    {(
                      ["new", "prep", "ready", "delivered"] as OrderStatus[]
                    ).map((s) => {
                      const colors: Record<OrderStatus, string> = {
                        new: "#3B82F6",
                        prep: "#F59E0B",
                        ready: "#059669",
                        delivered: "#9CA3AF",
                      };
                      return (
                        <div className="pill" key={s}>
                          <div
                            className="pill-dot"
                            style={{ background: colors[s] }}
                          />
                          {orders.filter((o) => o.status === s).length}{" "}
                          {STATUS_LABEL[s].toLowerCase()}
                        </div>
                      );
                    })}
                  </div>
                  <div className="search-bar">
                    <span style={{ color: "#9CA3AF" }}>⌕</span>
                    <input
                      placeholder="Search orders..."
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                      }
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
                            {[
                              "Order ID",
                              "Customer",
                              "Item",
                              "Type",
                              "Deliver by",
                              "Total",
                              "Status",
                              "Action",
                            ].map((t) => (
                              <th key={t}>{t}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOrders.map((o) => (
                            <tr key={o.id}>
                              <td>
                                <div className="order-id">{o.id}</div>
                                <div className="order-meta">{o.at}</div>
                              </td>
                              <td>
                                <div style={{ fontSize: 12, fontWeight: 500 }}>
                                  {o.name}
                                </div>
                              </td>
                              <td>
                                <div className="order-drink">{o.drink}</div>
                                <div className="order-meta">
                                  {o.size} · ×{o.qty}
                                  {o.addons.length > 0 &&
                                    " · " + o.addons.join(", ")}
                                </div>
                              </td>
                              <td>
                                <span
                                  className={`badge badge-${o.type === "dine-in" ? "dine" : "delivery"}`}
                                >
                                  {o.type}
                                </span>
                              </td>
                              <td
                                style={{ fontSize: 11, color: "var(--muted)" }}
                              >
                                {o.type === "delivery" ? o.time || "ASAP" : "—"}
                                {o.address && (
                                  <div className="order-meta">{o.address}</div>
                                )}
                              </td>
                              <td style={{ fontWeight: 500 }}>
                                ${o.total.toFixed(2)}
                              </td>
                              <td>
                                <span className={`badge badge-${o.status}`}>
                                  {STATUS_LABEL[o.status]}
                                </span>
                              </td>
                              <td>
                                {o.status !== "delivered" ? (
                                  <button
                                    className="action-btn"
                                    onClick={() => advanceOrder(o.id)}
                                  >
                                    {o.status === "new"
                                      ? "Start prep"
                                      : o.status === "prep"
                                        ? "Mark ready"
                                        : "Complete"}
                                  </button>
                                ) : (
                                  <span
                                    style={{
                                      fontSize: 11,
                                      color: "var(--muted)",
                                    }}
                                  >
                                    ✓ Done
                                  </span>
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
                    <span className="panel-title">
                      Drinks ({menu.filter((m) => m.active).length} active)
                    </span>
                  </div>
                  <div className="panel-body">
                    <div className="menu-list">
                      {menu.map((m, i) => (
                        <div className="menu-item" key={i}>
                          <div className="menu-thumb">
                            <img src={MENU[i].image} alt={m.name} />
                          </div>
                          <div className="menu-info">
                            <div className="menu-name">{m.name}</div>
                            <div className="menu-price">{m.price}</div>
                            <div className="menu-orders">
                              {m.orders} orders this week
                            </div>
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
                  <div className="panel" style={{ marginBottom: 14 }}>
                    <div className="panel-head">
                      <span className="panel-title">Order share</span>
                    </div>
                    <div className="panel-body">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 10,
                        }}
                      >
                        {menu.map((m, i) => (
                          <div key={i}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 12,
                                marginBottom: 4,
                              }}
                            >
                              <span>{m.name}</span>
                              <span
                                style={{
                                  fontWeight: 500,
                                  color: "var(--accent)",
                                }}
                              >
                                {m.orders}
                              </span>
                            </div>
                            <div
                              style={{
                                height: 5,
                                background: "var(--cream)",
                                borderRadius: 3,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${(m.orders / 142) * 100}%`,
                                  background: m.active
                                    ? "var(--accent)"
                                    : "#D1D5DB",
                                  borderRadius: 3,
                                  transition: "width 0.3s",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Add-on performance</span>
                    </div>
                    <div className="panel-body">
                      {addonStats.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 0",
                            borderBottom:
                              i < 3 ? "1px solid var(--border)" : "none",
                            fontSize: 12,
                          }}
                        >
                          <span>{a.name}</span>
                          <span
                            style={{ color: "var(--accent)", fontWeight: 500 }}
                          >
                            {a.count}×
                          </span>
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
                    <div className="stat-card" key={i}>
                      <div className="stat-label">{s.label}</div>
                      <div className="stat-value">{s.value}</div>
                      {s.note && (
                        <div className={`stat-change ${s.change}`}>
                          {s.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="grid-2">
                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">
                        Sales by day (this week)
                      </span>
                    </div>
                    <div className="panel-body">
                      <div className="chart-bars" style={{ height: 160 }}>
                        {DAYS.map((d, i) => (
                          <div className="chart-col" key={d}>
                            <div className="chart-val">{SALES[i]}</div>
                            <div
                              className={`chart-bar ${d === "Sat" ? "today" : ""}`}
                              style={{
                                height: `${(SALES[i] / MAX_SALE) * 130}px`,
                              }}
                            />
                            <div className="chart-lbl">{d}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-head">
                      <span className="panel-title">Order type split</span>
                    </div>
                    <div className="panel-body">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 20,
                          paddingTop: 6,
                        }}
                      >
                        {[
                          {
                            label: "Delivery",
                            val: deliveryCount,
                            color: "#EF4444",
                          },
                          {
                            label: "Dine In",
                            val: dineInCount,
                            color: "#1D4ED8",
                          },
                        ].map((r) => (
                          <div key={r.label}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 12,
                                marginBottom: 6,
                              }}
                            >
                              <span style={{ fontWeight: 500 }}>{r.label}</span>
                              <span style={{ color: "var(--muted)" }}>
                                {r.val} orders (
                                {Math.round((r.val / orders.length) * 100)}%)
                              </span>
                            </div>
                            <div
                              style={{
                                height: 7,
                                background: "var(--cream)",
                                borderRadius: 4,
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  width: `${Math.round((r.val / orders.length) * 100)}%`,
                                  background: r.color,
                                  borderRadius: 4,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        <div
                          style={{
                            borderTop: "1px solid var(--border)",
                            paddingTop: 14,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                              color: "var(--muted)",
                              marginBottom: 8,
                            }}
                          >
                            Top delivery windows
                          </div>
                          {(
                            [
                              ["ASAP", "61%"],
                              ["30 min", "22%"],
                              ["1 hour", "12%"],
                              ["Custom", "5%"],
                            ] as [string, string][]
                          ).map(([k, v]) => (
                            <div
                              key={k}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: 12,
                                padding: "5px 0",
                                borderBottom: "1px solid var(--border)",
                              }}
                            >
                              <span>{k}</span>
                              <span
                                style={{
                                  color: "var(--accent)",
                                  fontWeight: 500,
                                }}
                              >
                                {v}
                              </span>
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
                  <div className="panel-head">
                    <span className="panel-title">Store settings</span>
                  </div>
                  <div
                    className="panel-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {settingFields.map((f) => (
                      <div key={f.label}>
                        <div className="field-label">{f.label}</div>
                        <input defaultValue={f.val} className="field-input" />
                      </div>
                    ))}
                    <button className="save-btn">Save changes</button>
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-head">
                    <span className="panel-title">Delivery settings</span>
                  </div>
                  <div
                    className="panel-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    {deliverySettings.map((s, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "4px 0",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <span style={{ fontSize: 13 }}>{s.label}</span>
                        <button
                          className={`menu-toggle ${s.on ? "on" : "off"}`}
                        />
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
