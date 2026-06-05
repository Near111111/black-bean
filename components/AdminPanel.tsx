"use client";

import Image from "next/image";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FONT = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');`;

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  ${FONT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary:     #0B1220;
    --secondary:   #2563EB;
    --accent:      #14B8A6;
    --bg:          #F8FAFC;
    --surface:     #FFFFFF;
    --text:        #0F172A;
    --muted:       #64748B;
    --border:      #E2E8F0;
    --border2:     #CBD5E1;
    --success:     #10B981;
    --warning:     #F59E0B;
    --danger:      #EF4444;
    --sidebar-w:   240px;
    --topbar-h:    56px;
    --radius:      10px;
    --radius-sm:   6px;
    --content-px:  28px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* ── LAYOUT ──────────────────────────────────────────────────────────────── */
  .shell { display: flex; min-height: 100vh; }

  /* ── SIDEBAR ─────────────────────────────────────────────────────────────── */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--primary);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 40;
    border-right: 1px solid rgba(255,255,255,0.04);
    transition: transform 0.25s ease;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 39;
    backdrop-filter: blur(2px);
  }

  .sidebar-logo {
    padding: 20px 18px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .logo-icon {
    width: 34px;
    height: 34px;
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 35%, #e2e8f0 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.75);
    box-shadow:
      0 1px 1px rgba(255,255,255,0.9) inset,
      0 -1px 1px rgba(0,0,0,0.06) inset,
      0 6px 14px rgba(0,0,0,0.22),
      0 0 18px rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    overflow: hidden;
  }

  .logo-icon:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow:
      0 1px 1px rgba(255,255,255,1) inset,
      0 -1px 1px rgba(0,0,0,0.05) inset,
      0 10px 20px rgba(0,0,0,0.28),
      0 0 22px rgba(255,255,255,0.14);
  }

  .logo-text { flex: 1; min-width: 0; }
  .logo-name {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .logo-role {
    font-size: 10px;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 1px;
    font-family: 'DM Mono', monospace;
  }

  .nav { padding: 12px 0; flex: 1; }
  .nav-section-label {
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.22);
    padding: 12px 20px 5px;
    font-family: 'DM Mono', monospace;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px 8px 20px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.48);
    cursor: pointer;
    transition: color 0.13s, background 0.13s;
    position: relative;
    margin: 1px 8px;
    border-radius: 7px;
    letter-spacing: -0.01em;
  }
  .nav-item:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.05); }
  .nav-item.active {
    color: #fff;
    background: rgba(37,99,235,0.2);
    font-weight: 500;
  }
  .nav-item.active::before {
    content: '';
    position: absolute;
    left: -8px; top: 6px; bottom: 6px;
    width: 3px;
    background: var(--secondary);
    border-radius: 0 3px 3px 0;
  }
  .nav-icon {
    width: 18px;
    text-align: center;
    font-size: 14px;
    flex-shrink: 0;
    opacity: 0.9;
  }
  .nav-badge {
    margin-left: auto;
    background: var(--danger);
    color: #fff;
    font-size: 9.5px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 20px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0;
    flex-shrink: 0;
  }

  .sidebar-bottom {
    padding: 14px 16px;
    border-top: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }
  .store-status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(16,185,129,0.08);
    border: 1px solid rgba(16,185,129,0.15);
    border-radius: var(--radius-sm);
    margin-bottom: 10px;
  }
  .pulse-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--success);
    flex-shrink: 0;
    animation: pulse-ring 2.2s infinite;
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(16,185,129,0.45); }
    70%  { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
    100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
  }
  .store-status-text {
    font-size: 11.5px;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
  }
  .store-status-text strong { color: var(--success); font-weight: 600; }
  .exit-btn {
    width: 100%;
    padding: 8px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: var(--radius-sm);
    color: rgba(255,255,255,0.35);
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.13s, color 0.13s, border-color 0.13s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .exit-btn:hover {
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.6);
    border-color: rgba(255,255,255,0.18);
  }

  /* ── MAIN ────────────────────────────────────────────────────────────────── */
  .main {
    margin-left: var(--sidebar-w);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    max-width: 100%;
  }

  /* ── TOPBAR ──────────────────────────────────────────────────────────────── */
  .topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    height: var(--topbar-h);
    padding: 0 var(--content-px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: sticky;
    top: 0;
    z-index: 30;
  }
  .topbar-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .hamburger-btn {
    display: none;
    width: 32px; height: 32px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: var(--muted);
    flex-shrink: 0;
    transition: background 0.13s, border-color 0.13s;
  }
  .hamburger-btn:hover { background: var(--bg); border-color: var(--border2); color: var(--text); }
  .topbar-breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
  }
  .topbar-breadcrumb span:last-child {
    color: var(--text);
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .breadcrumb-sep { opacity: 0.4; flex-shrink: 0; }
  .topbar-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .topbar-time {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 4px 10px;
    white-space: nowrap;
  }
  .topbar-search {
    display: flex;
    align-items: center;
    gap: 7px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 5px 12px;
    font-size: 12px;
    width: clamp(140px, 20vw, 240px);
    transition: border-color 0.13s, width 0.25s;
  }
  .topbar-search:focus-within {
    border-color: var(--secondary);
    width: clamp(160px, 22vw, 280px);
  }
  .topbar-search input {
    background: none; border: none; outline: none;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 12px;
    color: var(--text);
    width: 100%;
    min-width: 0;
  }
  .topbar-search input::placeholder { color: #94A3B8; }
  .topbar-icon-btn {
    width: 32px; height: 32px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 14px;
    color: var(--muted);
    transition: background 0.13s, border-color 0.13s, color 0.13s;
    position: relative;
    flex-shrink: 0;
  }
  .topbar-icon-btn:hover { background: var(--bg); border-color: var(--border2); color: var(--text); }
  .notif-dot {
    position: absolute;
    top: 5px; right: 5px;
    width: 6px; height: 6px;
    background: var(--danger);
    border-radius: 50%;
    border: 1.5px solid var(--surface);
  }
  .avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.02em;
    box-shadow: 0 2px 8px rgba(37,99,235,0.25);
    flex-shrink: 0;
  }

  /* ── LIVE INDICATOR ──────────────────────────────────────────────────────── */
  .live-indicator {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10.5px;
    font-weight: 600;
    color: var(--success);
    background: #ECFDF5;
    border: 1px solid rgba(16,185,129,0.2);
    border-radius: 20px;
    padding: 3px 9px;
    font-family: 'DM Mono', monospace;
    white-space: nowrap;
  }
  .live-indicator::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--success);
    animation: pulse-ring 2s infinite;
  }

  /* ── CONTENT ─────────────────────────────────────────────────────────────── */
  .content {
    padding: var(--content-px) var(--content-px) 48px;
    max-width: 1800px;
    width: 100%;
  }

  /* ── PAGE HEADER ─────────────────────────────────────────────────────────── */
  .page-header { margin-bottom: 24px; }
  .page-title {
    font-size: clamp(18px, 2vw, 22px);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.03em;
    line-height: 1.2;
  }
  .page-subtitle {
    font-size: 13px;
    color: var(--muted);
    margin-top: 3px;
  }

  /* ── KPI GRID ────────────────────────────────────────────────────────────── */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 20px;
  }
  .kpi-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px 20px;
    transition: box-shadow 0.18s, border-color 0.18s;
    position: relative;
    overflow: hidden;
  }
  .kpi-card:hover { box-shadow: 0 4px 20px rgba(15,23,42,0.07); border-color: var(--border2); }
  .kpi-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    border-radius: 0 0 var(--radius) var(--radius);
    opacity: 0;
    transition: opacity 0.18s;
  }
  .kpi-card:hover::after { opacity: 1; }
  .kpi-card.kpi-blue::after  { background: var(--secondary); }
  .kpi-card.kpi-teal::after  { background: var(--accent); }
  .kpi-card.kpi-green::after { background: var(--success); }
  .kpi-card.kpi-red::after   { background: var(--danger); }

  .kpi-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .kpi-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .kpi-icon {
    width: 28px; height: 28px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    flex-shrink: 0;
  }
  .kpi-icon.blue  { background: #EFF6FF; color: var(--secondary); }
  .kpi-icon.teal  { background: #F0FDFA; color: var(--accent); }
  .kpi-icon.green { background: #ECFDF5; color: var(--success); }
  .kpi-icon.red   { background: #FFF1F2; color: var(--danger); }

  .kpi-value {
    font-size: clamp(22px, 2.5vw, 30px);
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 8px;
    font-variant-numeric: tabular-nums;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  .kpi-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
  .kpi-change {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 20px;
    white-space: nowrap;
  }
  .kpi-change.up      { background: #ECFDF5; color: #059669; }
  .kpi-change.down    { background: #FFF1F2; color: #DC2626; }
  .kpi-change.neutral { background: #F1F5F9; color: var(--muted); }
  .kpi-sub { font-size: 11px; color: var(--muted); white-space: nowrap; }

  /* ── GRID SYSTEM ─────────────────────────────────────────────────────────── */
  .grid-2   { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .grid-3-1 { display: grid; grid-template-columns: 1.85fr 1fr; gap: 16px; margin-bottom: 16px; }
  .grid-1-2 { display: grid; grid-template-columns: 1fr 2fr; gap: 16px; margin-bottom: 16px; }

  /* ── PANEL ───────────────────────────────────────────────────────────────── */
  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .panel-head {
    padding: 14px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .panel-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
  }
  .panel-subtitle {
    font-size: 11px;
    color: var(--muted);
    margin-top: 1px;
    font-weight: 400;
  }
  .panel-body { padding: 20px; }

  /* ── ORDERS TABLE ────────────────────────────────────────────────────────── */
  .orders-table { width: 100%; border-collapse: collapse; font-size: 12.5px; min-width: 560px; }
  .orders-table th {
    text-align: left;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0 16px 10px;
    border-bottom: 1px solid var(--border);
    font-family: 'DM Mono', monospace;
    white-space: nowrap;
  }
  .orders-table td {
    padding: 11px 16px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
  .orders-table tr:last-child td { border-bottom: none; }
  .orders-table tbody tr { transition: background 0.1s; cursor: default; }
  .orders-table tbody tr:hover td { background: #F8FAFC; }
  .order-id {
    font-weight: 600;
    color: var(--text);
    font-size: 12px;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.02em;
  }
  .order-time { font-size: 10.5px; color: var(--muted); margin-top: 2px; }
  .order-drink { font-size: 12.5px; font-weight: 500; color: var(--text); }
  .order-meta { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* ── BADGES ──────────────────────────────────────────────────────────────── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.02em;
    padding: 3px 8px;
    border-radius: 5px;
    white-space: nowrap;
  }
  .badge::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .badge-new      { background: #EFF6FF; color: #1D4ED8; }
  .badge-new::before      { background: #3B82F6; }
  .badge-prep     { background: #FFFBEB; color: #92400E; }
  .badge-prep::before     { background: #F59E0B; }
  .badge-ready    { background: #ECFDF5; color: #065F46; }
  .badge-ready::before    { background: #10B981; }
  .badge-delivered { background: #F1F5F9; color: #475569; }
  .badge-delivered::before { background: #94A3B8; }
  .badge-dine     { background: #F5F3FF; color: #5B21B6; }
  .badge-dine::before     { background: #7C3AED; }
  .badge-delivery { background: #FFF1F2; color: #9F1239; }
  .badge-delivery::before { background: #F43F5E; }

  /* ── ACTION BUTTON ───────────────────────────────────────────────────────── */
  .action-btn {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: var(--radius-sm);
    padding: 5px 12px;
    font-size: 11.5px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-weight: 600;
    cursor: pointer;
    color: var(--text);
    transition: background 0.13s, color 0.13s, border-color 0.13s;
    white-space: nowrap;
  }
  .action-btn:hover { background: var(--text); color: #fff; border-color: var(--text); }
  .action-btn.primary { background: var(--secondary); color: #fff; border-color: var(--secondary); }
  .action-btn.primary:hover { background: #1D4ED8; border-color: #1D4ED8; }
  .action-btn.success { background: var(--success); color: #fff; border-color: var(--success); }
  .action-btn.success:hover { background: #059669; border-color: #059669; }

  /* ── MENU ITEMS ──────────────────────────────────────────────────────────── */
  .menu-list { display: flex; flex-direction: column; gap: 1px; }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.1s;
  }
  .menu-item:last-child { border-bottom: none; }
  .menu-thumb {
    width: 44px; height: 44px;
    border-radius: 8px;
    background: var(--bg);
    flex-shrink: 0;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .menu-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .menu-info { flex: 1; min-width: 0; }
  .menu-name { font-size: 13px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .menu-price { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .menu-orders {
    font-size: 10.5px;
    color: var(--secondary);
    margin-top: 2px;
    font-weight: 500;
    font-family: 'DM Mono', monospace;
  }
  .menu-toggle {
    width: 36px; height: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .menu-toggle.on  { background: var(--success); }
  .menu-toggle.off { background: #CBD5E1; }
  .menu-toggle::after {
    content: '';
    position: absolute;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: white;
    top: 3px;
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }
  .menu-toggle.on::after  { left: 19px; }
  .menu-toggle.off::after { left: 3px; }
  .menu-badge-unavail {
    font-size: 9.5px;
    font-weight: 600;
    color: var(--danger);
    background: #FFF1F2;
    border-radius: 4px;
    padding: 2px 6px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  /* ── ACTIVITY FEED ───────────────────────────────────────────────────────── */
  .feed { display: flex; flex-direction: column; }
  .feed-item {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    align-items: flex-start;
  }
  .feed-item:last-child { border-bottom: none; }
  .feed-dot-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-top: 4px;
  }
  .feed-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .feed-line {
    width: 1px;
    flex: 1;
    min-height: 16px;
    background: var(--border);
    margin-top: 4px;
  }
  .feed-item:last-child .feed-line { display: none; }
  .feed-text { font-size: 12px; color: var(--text); line-height: 1.5; }
  .feed-time { font-size: 10.5px; color: var(--muted); margin-top: 2px; font-family: 'DM Mono', monospace; }

  /* ── CHART ───────────────────────────────────────────────────────────────── */
  .chart-bars { display: flex; align-items: flex-end; gap: 6px; padding-top: 10px; }
  .chart-col  { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
  .chart-bar {
    width: 100%;
    border-radius: 4px 4px 0 0;
    background: #BFDBFE;
    transition: opacity 0.15s, background 0.15s;
    cursor: pointer;
    min-height: 4px;
  }
  .chart-bar:hover  { opacity: 0.8; }
  .chart-bar.today  { background: var(--secondary); }
  .chart-bar.accent { background: var(--accent); }
  .chart-lbl { font-size: 9px; color: var(--muted); font-family: 'DM Mono', monospace; }
  .chart-val { font-size: 9px; color: var(--muted); font-family: 'DM Mono', monospace; }

  /* ── TABS ────────────────────────────────────────────────────────────────── */
  .tabs-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    flex-wrap: nowrap;
  }
  .tabs::-webkit-scrollbar { display: none; }
  .tab {
    padding: 9px 14px;
    font-size: 12px;
    font-weight: 500;
    color: var(--muted);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: color 0.13s, border-bottom-color 0.13s;
    font-family: 'DM Sans', system-ui, sans-serif;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .tab.active { color: var(--secondary); border-bottom-color: var(--secondary); }
  .tab:hover:not(.active) { color: var(--text); }

  /* ── SEARCH BAR ──────────────────────────────────────────────────────────── */
  .search-bar {
    display: flex;
    align-items: center;
    gap: 7px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 5px 12px;
    font-size: 12px;
    width: clamp(160px, 20vw, 240px);
    transition: border-color 0.13s, background 0.13s;
  }
  .search-bar:focus-within { border-color: var(--secondary); background: var(--surface); }
  .search-bar input {
    background: none; border: none; outline: none;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 12px;
    color: var(--text);
    width: 100%;
    min-width: 0;
  }
  .search-bar input::placeholder { color: #94A3B8; }

  /* ── STATUS PILLS ────────────────────────────────────────────────────────── */
  .summary-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .pill {
    display: flex; align-items: center; gap: 5px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 11px;
    color: var(--text);
    font-weight: 500;
    cursor: default;
    transition: border-color 0.13s;
    white-space: nowrap;
  }
  .pill:hover { border-color: var(--border2); }
  .pill-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  /* ── EMPTY STATE ─────────────────────────────────────────────────────────── */
  .empty {
    text-align: center;
    padding: 48px 24px;
    color: var(--muted);
    font-size: 13px;
  }
  .empty-icon  { font-size: 28px; margin-bottom: 10px; opacity: 0.4; }
  .empty-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }

  /* ── FORM FIELDS ─────────────────────────────────────────────────────────── */
  .field-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 5px;
    font-family: 'DM Mono', monospace;
  }
  .field-input {
    width: 100%;
    padding: 9px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    color: var(--text);
    background: var(--surface);
    outline: none;
    transition: border-color 0.13s, box-shadow 0.13s;
  }
  .field-input:focus { border-color: var(--secondary); box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
  .save-btn {
    margin-top: 8px;
    padding: 10px 22px;
    background: var(--secondary);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.13s, box-shadow 0.13s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .save-btn:hover { background: #1D4ED8; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }

  /* ── ANALYTICS KPI GRID ──────────────────────────────────────────────────── */
  .analytics-kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 20px;
  }

  /* ── PROGRESS BARS ───────────────────────────────────────────────────────── */
  .progress-bar-wrap {
    height: 6px;
    background: var(--bg);
    border-radius: 3px;
    overflow: hidden;
    margin-top: 4px;
  }
  .progress-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  /* ── HEALTH SCORE CARD ───────────────────────────────────────────────────── */
  .health-score-card {
    background: linear-gradient(135deg, var(--primary) 0%, #1a2744 100%);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius);
    padding: 20px;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .health-score-card::before {
    content: '';
    position: absolute;
    top: -30px; right: -30px;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%);
    pointer-events: none;
  }
  .health-score-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    font-family: 'DM Mono', monospace;
    margin-bottom: 10px;
  }
  .health-score-value {
    font-size: clamp(36px, 4vw, 48px);
    font-weight: 700;
    letter-spacing: -0.05em;
    line-height: 1;
    margin-bottom: 4px;
    font-variant-numeric: tabular-nums;
  }
  .health-score-grade { font-size: 12px; color: rgba(255,255,255,0.55); font-weight: 500; }
  .health-score-grade strong { color: var(--accent); }

  /* ── QUICK ACTIONS ───────────────────────────────────────────────────────── */
  .quick-actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .quick-action-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background 0.13s, color 0.13s, border-color 0.13s;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: rgba(255,255,255,0.7);
    font-size: 11.5px;
    font-weight: 500;
    text-align: left;
  }
  .quick-action-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
    border-color: rgba(255,255,255,0.15);
  }
  .quick-action-icon { font-size: 14px; flex-shrink: 0; }

  /* ── INSIGHT CARD ────────────────────────────────────────────────────────── */
  .insight-item {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
    align-items: flex-start;
  }
  .insight-item:last-child { border-bottom: none; }
  .insight-icon {
    width: 28px; height: 28px;
    border-radius: 7px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
  }
  .insight-icon.blue  { background: #EFF6FF; }
  .insight-icon.green { background: #ECFDF5; }
  .insight-icon.amber { background: #FFFBEB; }
  .insight-icon.red   { background: #FFF1F2; }
  .insight-text  { font-size: 12px; color: var(--text); line-height: 1.45; }
  .insight-label { font-size: 10.5px; color: var(--muted); margin-top: 2px; }

  /* ── SETTING ROW ─────────────────────────────────────────────────────────── */
  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    gap: 16px;
  }
  .setting-row:last-child { border-bottom: none; }
  .setting-row-label { font-size: 13px; font-weight: 500; color: var(--text); }
  .setting-row-desc  { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* ── DELIVERY TOGGLE ─────────────────────────────────────────────────────── */
  .delivery-toggle {
    width: 36px; height: 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    position: relative;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .delivery-toggle.on  { background: var(--success); }
  .delivery-toggle.off { background: #CBD5E1; }
  .delivery-toggle::after {
    content: '';
    position: absolute;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: white;
    top: 3px;
    transition: left 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }
  .delivery-toggle.on::after  { left: 19px; }
  .delivery-toggle.off::after { left: 3px; }

  /* ── REVENUE LEGEND ──────────────────────────────────────────────────────── */
  .revenue-legend { display: flex; gap: 16px; flex-wrap: wrap; }
  .rev-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    color: var(--muted);
    font-weight: 500;
    white-space: nowrap;
  }
  .rev-legend-dot {
    width: 8px; height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* ── SCROLLBAR ───────────────────────────────────────────────────────────── */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

  /* ═══════════════════════════════════════════════════════════════════════════ */
  /* RESPONSIVE BREAKPOINTS                                                      */
  /* ═══════════════════════════════════════════════════════════════════════════ */

  /* ── Ultrawide (1920px+): cap content width, keep sidebar fixed ─────────── */
  @media (min-width: 1920px) {
    :root { --sidebar-w: 260px; --content-px: 36px; }
    .kpi-value { font-size: 32px; }
  }

  /* ── Large desktop (1440px–1920px): comfortable defaults ───────────────── */
  @media (max-width: 1440px) {
    :root { --sidebar-w: 230px; }
  }

  /* ── Standard laptop/desktop (1280px) ──────────────────────────────────── */
  @media (max-width: 1280px) {
    :root { --sidebar-w: 220px; }
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .analytics-kpi-grid { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Tablet landscape (1024px) ──────────────────────────────────────────── */
  @media (max-width: 1024px) {
    .grid-3-1 { grid-template-columns: 1fr; }
    .grid-1-2 { grid-template-columns: 1fr; }
    :root { --content-px: 20px; }
  }

  /* ── Tablet portrait (900px) ────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .grid-2 { grid-template-columns: 1fr; }
  }

  /* ── Mobile landscape / small tablet (768px) ────────────────────────────── */
  @media (max-width: 768px) {
    :root {
      --sidebar-w: 240px;
      --content-px: 16px;
    }

    /* Sidebar hidden by default, shown via .sidebar-open */
    .sidebar {
      transform: translateX(-100%);
    }
    .sidebar.sidebar-open {
      transform: translateX(0);
    }
    .sidebar-overlay {
      display: block;
    }
    .sidebar-overlay.hidden { display: none; }

    .main { margin-left: 0; }

    .hamburger-btn { display: flex; }

    .topbar { padding: 0 var(--content-px); gap: 8px; }
    .topbar-time { display: none; }
    .topbar-search {
      width: clamp(120px, 30vw, 180px);
    }

    .kpi-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .analytics-kpi-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .kpi-value { font-size: 22px; }
    .kpi-card { padding: 14px 16px; }
  }

  /* ── Small mobile (480px) ───────────────────────────────────────────────── */
  @media (max-width: 480px) {
    .kpi-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .analytics-kpi-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .kpi-value { font-size: 20px; }
    .kpi-card { padding: 12px 14px; }
    .kpi-label { font-size: 10px; }

    .page-title { font-size: 17px; }

    .panel-head { padding: 12px 16px; }
    .panel-body { padding: 14px 16px; }

    .topbar-search { display: none; }

    .summary-pills { gap: 4px; }
    .pill { padding: 3px 8px; font-size: 10px; }

    .quick-actions-grid { grid-template-columns: 1fr 1fr; gap: 6px; }
    .quick-action-btn { padding: 8px 10px; font-size: 11px; }

    .search-bar { width: 100%; }

    .health-score-value { font-size: 36px; }
  }

  /* ── Extra small (375px) ────────────────────────────────────────────────── */
  @media (max-width: 375px) {
    .kpi-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
    .kpi-value { font-size: 18px; }
    .topbar-breadcrumb .breadcrumb-prefix { display: none; }
    .breadcrumb-sep { display: none; }
  }
`;

// ── Types ─────────────────────────────────────────────────────────────────────

type OrderStatus = "new" | "prep" | "ready" | "delivered";
type OrderType   = "delivery" | "dine-in";
type View        = "dashboard" | "orders" | "menu" | "analytics" | "settings";
type OrderTab    = "all" | "new" | "prep" | "ready" | "delivery" | "dine-in";

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

// ── Data ──────────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: "BB-4F2A1C", drink: "Oat Flat White", size: "Large", qty: 2,
    addons: ["Extra Shot"], type: "delivery", address: "12 Katipunan Ave",
    time: "ASAP", status: "new", name: "Maria Santos", total: 9.84, at: "2 min ago",
  },
  {
    id: "BB-9D3B7E", drink: "Iced Americano", size: "Medium", qty: 1,
    addons: [], type: "dine-in", address: "", time: "", status: "prep",
    name: "Carlo Reyes", total: 4.48, at: "8 min ago",
  },
  {
    id: "BB-1E8C2A", drink: "Brown Sugar Latte", size: "Small", qty: 1,
    addons: ["Oat Milk"], type: "delivery", address: "88 Morayta St",
    time: "30 min", status: "ready", name: "Ana Villanueva", total: 5.6, at: "14 min ago",
  },
  {
    id: "BB-7A0F5D", drink: "Cold Brew", size: "Large", qty: 3,
    addons: [], type: "dine-in", address: "", time: "", status: "delivered",
    name: "Jun dela Cruz", total: 13.44, at: "22 min ago",
  },
  {
    id: "BB-3C6E9B", drink: "Matcha Latte", size: "Medium", qty: 1,
    addons: ["Whipped Cream", "Vanilla Syrup"], type: "delivery", address: "5 Taft Ave",
    time: "1 hour", status: "new", name: "Pia Ocampo", total: 6.72, at: "1 min ago",
  },
  {
    id: "BB-2D4A8F", drink: "Espresso Shot", size: "Small", qty: 2,
    addons: [], type: "dine-in", address: "", time: "", status: "prep",
    name: "Rico Tan", total: 3.36, at: "31 min ago",
  },
];

const MENU: MenuItem[] = [
  { image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&q=80", name: "Oat Flat White",    price: "$4.50", orders: 142, active: true  },
  { image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=120&q=80", name: "Iced Americano",    price: "$3.50", orders: 118, active: true  },
  { image: "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=120&q=80", name: "Brown Sugar Latte", price: "$4.75", orders: 97,  active: true  },
  { image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=120&q=80", name: "Matcha Latte",        price: "$5.00", orders: 84,  active: true  },
  { image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&q=80", name: "Cold Brew",          price: "$4.00", orders: 73,  active: false },
  { image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=120&q=80", name: "Espresso Shot",      price: "$2.50", orders: 61,  active: true  },
];

const DAYS:     string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SALES:    number[] = [48, 62, 55, 71, 83, 94, 67];
const MAX_SALE: number   = Math.max(...SALES);

const STATUS_CYCLE: Record<OrderStatus, OrderStatus> = {
  new: "prep", prep: "ready", ready: "delivered", delivered: "delivered",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "New", prep: "Preparing", ready: "Ready", delivered: "Done",
};

const PAGE_TITLES: Record<View, string> = {
  dashboard: "Command Center",
  orders:    "Order Management",
  menu:      "Menu Management",
  analytics: "Sales Analytics",
  settings:  "Store Settings",
};

const PAGE_SUBTITLES: Record<View, string> = {
  dashboard: "Real-time operations overview for Black Bean Café",
  orders:    "Track, manage, and advance your live orders",
  menu:      "Manage availability, pricing, and performance",
  analytics: "Revenue intelligence and sales performance",
  settings:  "Configure store, delivery, and operational settings",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminPanel() {
  const router = useRouter();
  const [view, setView]       = useState<View>("dashboard");
  const [orders, setOrders]   = useState<Order[]>(ORDERS);
  const [menu, setMenu]       = useState<MenuItem[]>(() => MENU.map((m) => ({ ...m })));
  const [orderTab, setOrderTab] = useState<OrderTab>("all");
  const [search, setSearch]   = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [now] = useState<string>(() =>
    new Date().toLocaleString("en-PH", { dateStyle: "medium", timeStyle: "short" })
  );

  // ── Computed KPIs ──────────────────────────────────────────────────────────
  const pendingCount:  number = orders.filter((o) => o.status === "new").length;
  const totalRevenue:  number = orders.reduce((s, o) => s + o.total, 0);
  const deliveryCount: number = orders.filter((o) => o.type === "delivery").length;
  const dineInCount:   number = orders.filter((o) => o.type === "dine-in").length;
  const totalItems:    number = orders.reduce((s, o) => s + o.qty, 0);
  const avgOrderValue: number = orders.length > 0 ? totalRevenue / orders.length : 0;

  // ── Store Health Score ─────────────────────────────────────────────────────
  const storeHealthScore: number = useMemo(() => {
    const deliveryRate   = (deliveryCount / orders.length) * 100;
    const menuActiveRate = (menu.filter((m) => m.active).length / menu.length) * 100;
    const pendingRatio   = 100 - (pendingCount / orders.length) * 100;
    const revenueScore   = Math.min(100, (totalRevenue / 60) * 100);
    return Math.round(deliveryRate * 0.15 + menuActiveRate * 0.25 + pendingRatio * 0.3 + revenueScore * 0.3);
  }, [orders, menu, pendingCount, deliveryCount, totalRevenue]);

  // ── Activity feed ──────────────────────────────────────────────────────────
  const liveFeed: FeedItem[] = useMemo(() => {
    const events: FeedItem[] = [];
    orders.forEach((o) => {
      if (o.status === "new")       events.push({ color: "#3B82F6", text: `New order ${o.id} — ${o.drink} ${o.type === "delivery" ? `delivery to ${o.address}` : "dine-in"}`, time: o.at });
      if (o.status === "prep")      events.push({ color: "#F59E0B", text: `${o.id} is being prepared — ${o.drink} for ${o.name}`, time: o.at });
      if (o.status === "ready")     events.push({ color: "#10B981", text: `${o.id} is ready — ${o.drink} for ${o.type === "delivery" ? "pickup/delivery" : "table"}`, time: o.at });
      if (o.status === "delivered") events.push({ color: "#94A3B8", text: `${o.id} completed — ${o.drink} delivered to ${o.name}`, time: o.at });
    });
    menu.forEach((m) => {
      if (!m.active) events.push({ color: "#EF4444", text: `${m.name} is currently unavailable`, time: "recent" });
    });
    events.push({ color: "#64748B", text: "Daily revenue milestone: ₱15,000 crossed", time: "34 min ago" });
    return events.slice(0, 8);
  }, [orders, menu]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const advanceOrder = useCallback((id: string): void => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: STATUS_CYCLE[o.status] } : o)));
  }, []);

  const toggleMenu = useCallback((idx: number): void => {
    setMenu((prev) => prev.map((m, i) => (i === idx ? { ...m, active: !m.active } : m)));
  }, []);

  const navigateTo = useCallback((v: View): void => {
    setView(v);
    setSidebarOpen(false);
  }, []);

  // ── Filtered Orders ────────────────────────────────────────────────────────
  const filteredOrders: Order[] = useMemo(() =>
    orders.filter((o) => {
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
    }),
    [orders, orderTab, search]
  );

  // ── Nav ────────────────────────────────────────────────────────────────────
  const navItems: NavItem[] = [
    { key: "dashboard", icon: "⬡", label: "Dashboard" },
    { key: "orders",    icon: "◈", label: "Orders", badge: pendingCount || null },
    { key: "menu",      icon: "≡", label: "Menu" },
  ];
  const reportItems: NavItem[] = [
    { key: "analytics", icon: "↗", label: "Analytics" },
    { key: "settings",  icon: "◎", label: "Settings" },
  ];
  const orderTabs: TabItem[] = [
    { key: "all",      label: "All orders" },
    { key: "new",      label: "New" },
    { key: "prep",     label: "Preparing" },
    { key: "ready",    label: "Ready" },
    { key: "delivery", label: "Delivery" },
    { key: "dine-in",  label: "Dine In" },
  ];

  // ── Analytics stats ────────────────────────────────────────────────────────
  const analyticsStats: StatCard[] = useMemo(() => [
    { label: "Avg Order Value", value: `$${avgOrderValue.toFixed(2)}`,                                   change: "up", note: "↑ 8% vs last week" },
    { label: "Delivery Rate",   value: `${Math.round((deliveryCount / orders.length) * 100)}%`,          change: "up", note: "↑ 5% vs last week" },
    { label: "Items Sold",      value: totalItems,                                                        change: "up", note: "↑ 12 today" },
    { label: "Avg Prep Time",   value: "8 min",                                                           change: "up", note: "↓ 2 min improved" },
  ], [avgOrderValue, deliveryCount, orders.length, totalItems]);

  const settingFields: SettingField[] = [
    { label: "Store Name",          val: "Black Bean Café" },
    { label: "GCash Number",        val: "0917-BLACK-BEAN" },
    { label: "VAT Rate",            val: "12%" },
    { label: "Delivery Fee (₱)",    val: "50" },
    { label: "Est. Prep Time (min)", val: "8" },
  ];

  const [deliverySettings, setDeliverySettings] = useState<DeliverySetting[]>([
    { label: "Accept Delivery Orders",  on: true  },
    { label: "Accept Dine-In Orders",   on: true  },
    { label: "ASAP Delivery Available", on: true  },
    { label: "Scheduled Delivery",      on: true  },
    { label: "Custom Time Slots",       on: false },
  ]);

  const toggleDeliverySetting = useCallback((idx: number): void => {
    setDeliverySettings((prev) => prev.map((s, i) => (i === idx ? { ...s, on: !s.on } : s)));
  }, []);

  const addonStats: AddonStat[] = [
    { name: "Extra Shot",    count: 89 },
    { name: "Oat Milk",      count: 74 },
    { name: "Vanilla Syrup", count: 51 },
    { name: "Whipped Cream", count: 38 },
  ];

  // ── Business Insights ──────────────────────────────────────────────────────
  const businessInsights = useMemo(() => {
    const topItem       = [...menu].sort((a, b) => b.orders - a.orders)[0];
    const inactiveCount = menu.filter((m) => !m.active).length;
    const deliveryPct   = Math.round((deliveryCount / orders.length) * 100);
    return [
      { icon: "📈", color: "green", text: `${topItem.name} is your best seller with ${topItem.orders} orders this week.`,          label: "Top performer" },
      { icon: "🚚", color: "blue",  text: `${deliveryPct}% of orders are delivery — consider optimizing your delivery radius.`,    label: "Delivery mix"  },
      {
        icon: inactiveCount > 0 ? "⚠️" : "✅",
        color: inactiveCount > 0 ? "amber" : "green",
        text: inactiveCount > 0
          ? `${inactiveCount} menu item(s) unavailable — this may be impacting conversions.`
          : "All menu items are currently active and available.",
        label: "Menu health",
      },
      {
        icon: "⏱", color: pendingCount > 1 ? "red" : "green",
        text: pendingCount > 0
          ? `${pendingCount} order(s) awaiting action — move them to prep to reduce wait times.`
          : "No pending orders. Operations are running smoothly.",
        label: "Queue status",
      },
    ];
  }, [menu, orders, deliveryCount, pendingCount]);

  const maxMenuOrders = useMemo(() => Math.max(...menu.map((m) => m.orders)), [menu]);

  const statusPillColors: Record<OrderStatus, string> = {
    new: "#3B82F6", prep: "#F59E0B", ready: "#10B981", delivered: "#94A3B8",
  };

  const healthGrade = storeHealthScore >= 85 ? "Excellent" : storeHealthScore >= 70 ? "Good" : storeHealthScore >= 50 ? "Fair" : "Needs Attention";
  const healthColor = storeHealthScore >= 85 ? "#10B981" : storeHealthScore >= 70 ? "#14B8A6" : storeHealthScore >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <>
      <style>{css}</style>
      <div className="shell">

        {/* ── SIDEBAR OVERLAY (mobile) ─────────────────────────────────────── */}
        <div
          className={`sidebar-overlay${sidebarOpen ? "" : " hidden"}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside className={`sidebar${sidebarOpen ? " sidebar-open" : ""}`}>
          <div className="sidebar-logo">
            <div className="logo-icon">
              <Image
                src="/beans-no-bg/beanslogo-removebg-preview.png"
                alt="Black Bean Logo"
                width={75}
                height={60}
              />
            </div>
            <div className="logo-text">
              <div className="logo-name">Black Bean</div>
              <div className="logo-role">Admin Console</div>
            </div>
          </div>

          <nav className="nav">
            <div className="nav-section-label">Operations</div>
            {navItems.map((item) => (
              <div
                key={item.key}
                className={`nav-item ${view === item.key ? "active" : ""}`}
                onClick={() => navigateTo(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              </div>
            ))}

            <div className="nav-section-label" style={{ marginTop: 8 }}>Insights</div>
            {reportItems.map((item) => (
              <div
                key={item.key}
                className={`nav-item ${view === item.key ? "active" : ""}`}
                onClick={() => navigateTo(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="store-status-row">
              <span className="pulse-dot" />
              <span className="store-status-text">Store is <strong>Open</strong></span>
            </div>
            <button className="exit-btn" onClick={() => router.push("/")}>
              <span>←</span> Exit admin
            </button>
          </div>
        </aside>

        {/* ── MAIN ─────────────────────────────────────────────────────────── */}
        <main className="main">

          {/* ── TOPBAR ───────────────────────────────────────────────────── */}
          <div className="topbar">
            <div className="topbar-left">
              <button
                className="hamburger-btn"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-label="Toggle navigation"
              >
                ☰
              </button>
              <div className="topbar-breadcrumb">
                <span className="breadcrumb-prefix">Black Bean</span>
                <span className="breadcrumb-sep">›</span>
                <span>{PAGE_TITLES[view]}</span>
              </div>
            </div>
            <div className="topbar-right">
              <div className="topbar-search">
                <span style={{ color: "#94A3B8", fontSize: 13 }}>⌕</span>
                <input
                  placeholder="Search orders, items..."
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(e.target.value);
                    if (view !== "orders") setView("orders");
                  }}
                />
              </div>
              <div className="topbar-time">{now}</div>
              <div className="topbar-icon-btn" title="Notifications">
                🔔
                {pendingCount > 0 && <span className="notif-dot" />}
              </div>
              <div className="avatar">BB</div>
            </div>
          </div>

          {/* ── CONTENT ──────────────────────────────────────────────────── */}
          <div className="content">

            <div className="page-header">
              <div className="page-title">{PAGE_TITLES[view]}</div>
              <div className="page-subtitle">{PAGE_SUBTITLES[view]}</div>
            </div>

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* DASHBOARD                                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === "dashboard" && (
              <>
                {/* KPI Row */}
                <div className="kpi-grid">
                  <div className="kpi-card kpi-blue">
                    <div className="kpi-header">
                      <span className="kpi-label">Today's Revenue</span>
                      <span className="kpi-icon blue">₱</span>
                    </div>
                    <div className="kpi-value">₱{(totalRevenue * 58).toFixed(0)}</div>
                    <div className="kpi-footer">
                      <span className="kpi-change up">↑ 14% vs yesterday</span>
                      <span className="kpi-sub">${totalRevenue.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <div className="kpi-card kpi-teal">
                    <div className="kpi-header">
                      <span className="kpi-label">Total Orders</span>
                      <span className="kpi-icon teal">◈</span>
                    </div>
                    <div className="kpi-value">{orders.length}</div>
                    <div className="kpi-footer">
                      <span className="kpi-change up">↑ 3 new today</span>
                      <span className="kpi-sub">{totalItems} items sold</span>
                    </div>
                  </div>

                  <div className="kpi-card kpi-green">
                    <div className="kpi-header">
                      <span className="kpi-label">Delivery Orders</span>
                      <span className="kpi-icon green">🚚</span>
                    </div>
                    <div className="kpi-value">{deliveryCount}</div>
                    <div className="kpi-footer">
                      <span className="kpi-change neutral">{dineInCount} dine-in</span>
                      <span className="kpi-sub">{Math.round((deliveryCount / orders.length) * 100)}% of total</span>
                    </div>
                  </div>

                  <div className="kpi-card kpi-red">
                    <div className="kpi-header">
                      <span className="kpi-label">Pending Action</span>
                      <span className="kpi-icon red">⚡</span>
                    </div>
                    <div className="kpi-value">{pendingCount}</div>
                    <div className="kpi-footer">
                      <span className={`kpi-change ${pendingCount > 0 ? "down" : "up"}`}>
                        {pendingCount > 0 ? "Require action" : "All caught up"}
                      </span>
                      <button
                        className="action-btn"
                        style={{ fontSize: 10.5, padding: "2px 8px" }}
                        onClick={() => setView("orders")}
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main panels row */}
                <div className="grid-3-1">
                  {/* Recent Orders Table */}
                  <div className="panel">
                    <div className="panel-head">
                      <div>
                        <div className="panel-title">Recent Orders</div>
                        <div className="panel-subtitle">Latest {Math.min(5, orders.length)} transactions</div>
                      </div>
                      <button className="action-btn" onClick={() => setView("orders")}>
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
                                <div className="order-time">{o.at}</div>
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
                              <td>
                                <span style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                                  ${o.total.toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right column: Health Score + Live Feed */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                    {/* Store Health Score */}
                    <div className="health-score-card">
                      <div className="health-score-label">Store Health Score</div>
                      <div className="health-score-value" style={{ color: healthColor }}>
                        {storeHealthScore}
                      </div>
                      <div className="health-score-grade">
                        Status: <strong>{healthGrade}</strong>
                      </div>
                      <div
                        className="progress-bar-wrap"
                        style={{ marginTop: 12, background: "rgba(255,255,255,0.08)" }}
                      >
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${storeHealthScore}%`, background: healthColor }}
                        />
                      </div>

                      {/* Quick Actions */}
                      <div style={{ marginTop: 14 }}>
                        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                          Quick Actions
                        </div>
                        <div className="quick-actions-grid">
                          <button className="quick-action-btn" onClick={() => setView("orders")}>
                            <span className="quick-action-icon">📋</span> Orders
                          </button>
                          <button className="quick-action-btn" onClick={() => setView("menu")}>
                            <span className="quick-action-icon">🍵</span> Menu
                          </button>
                          <button className="quick-action-btn" onClick={() => setView("analytics")}>
                            <span className="quick-action-icon">📊</span> Analytics
                          </button>
                          <button className="quick-action-btn" onClick={() => setView("settings")}>
                            <span className="quick-action-icon">⚙️</span> Settings
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Live Activity Feed */}
                    <div className="panel" style={{ flex: 1 }}>
                      <div className="panel-head">
                        <div>
                          <div className="panel-title">Live Activity</div>
                          <div className="panel-subtitle">Real-time operational events</div>
                        </div>
                        <span className="live-indicator">Live</span>
                      </div>
                      <div className="panel-body" style={{ paddingTop: 10 }}>
                        <div className="feed">
                          {liveFeed.slice(0, 5).map((f, i) => (
                            <div className="feed-item" key={i}>
                              <div className="feed-dot-wrap">
                                <div className="feed-dot" style={{ background: f.color }} />
                                <div className="feed-line" />
                              </div>
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
                </div>

                {/* Bottom row: Weekly Chart + Top Items */}
                <div className="grid-2">
                  {/* Weekly Orders Chart */}
                  <div className="panel">
                    <div className="panel-head">
                      <div>
                        <div className="panel-title">Weekly Orders</div>
                        <div className="panel-subtitle">This week · {SALES.reduce((a, b) => a + b, 0)} total</div>
                      </div>
                      <div className="revenue-legend">
                        <div className="rev-legend-item">
                          <div className="rev-legend-dot" style={{ background: "#2563EB" }} /> Today
                        </div>
                        <div className="rev-legend-item">
                          <div className="rev-legend-dot" style={{ background: "#BFDBFE" }} /> Past
                        </div>
                      </div>
                    </div>
                    <div className="panel-body" style={{ paddingTop: 8 }}>
                      <svg viewBox="0 0 420 130" width="100%" style={{ overflow: "visible", display: "block" }}>
                        {[0, 25, 50, 75, 100].map((pct) => {
                          const y = 100 - pct;
                          return (
                            <g key={pct}>
                              <line x1={0} y1={y} x2={420} y2={y} stroke="#E2E8F0" strokeWidth={0.5} />
                              <text x={-4} y={y + 3} fontSize={8} fill="#94A3B8" textAnchor="end">
                                {Math.round((pct / 100) * MAX_SALE)}
                              </text>
                            </g>
                          );
                        })}
                        {DAYS.map((d, i) => {
                          const barW = 38;
                          const gap  = (420 - DAYS.length * barW) / (DAYS.length + 1);
                          const x    = gap + i * (barW + gap);
                          const barH = (SALES[i] / MAX_SALE) * 95;
                          const y    = 100 - barH;
                          const isToday = d === "Sat";
                          return (
                            <g key={d}>
                              <rect x={x} y={y} width={barW} height={barH} fill={isToday ? "#2563EB" : "#BFDBFE"} rx={4} />
                              {isToday && <rect x={x} y={y} width={barW} height={4} fill="#1D4ED8" rx={4} />}
                              <text x={x + barW / 2} y={y - 5} fontSize={9} fill={isToday ? "#2563EB" : "#94A3B8"} textAnchor="middle" fontWeight={isToday ? "700" : "400"}>{SALES[i]}</text>
                              <text x={x + barW / 2} y={116}  fontSize={9} fill={isToday ? "#2563EB" : "#94A3B8"} textAnchor="middle" fontWeight={isToday ? "700" : "400"}>{d}</text>
                            </g>
                          );
                        })}
                        <line x1={0} y1={100} x2={420} y2={100} stroke="#E2E8F0" strokeWidth={1} />
                      </svg>
                    </div>
                  </div>

                  {/* Top Items */}
                  <div className="panel">
                    <div className="panel-head">
                      <div>
                        <div className="panel-title">Top Items</div>
                        <div className="panel-subtitle">By order volume this week</div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div className="menu-list">
                        {[...menu].sort((a, b) => b.orders - a.orders).slice(0, 4).map((m, i) => (
                          <div className="menu-item" key={i}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", width: 18, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
                              #{i + 1}
                            </div>
                            <div className="menu-thumb">
                              <img src={m.image} alt={m.name} />
                            </div>
                            <div className="menu-info">
                              <div className="menu-name">{m.name}</div>
                              <div className="menu-price">{m.price} per item</div>
                              <div className="progress-bar-wrap">
                                <div
                                  className="progress-bar-fill"
                                  style={{
                                    width: `${(m.orders / maxMenuOrders) * 100}%`,
                                    background: "var(--secondary)",
                                    opacity: m.active ? 1 : 0.35,
                                  }}
                                />
                              </div>
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", fontFamily: "'DM Mono', monospace" }}>
                                {m.orders}
                              </div>
                              <div style={{ fontSize: 9, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                                orders
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Insights Panel */}
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <div className="panel-title">Business Insights</div>
                      <div className="panel-subtitle">Signals derived from your operational data</div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0 }}>
                      {businessInsights.map((insight, i) => (
                        <div className="insight-item" key={i}>
                          <div className={`insight-icon ${insight.color}`}>{insight.icon}</div>
                          <div>
                            <div className="insight-text">{insight.text}</div>
                            <div className="insight-label">{insight.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* ORDERS                                                          */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === "orders" && (
              <div className="panel">
                {/* Header with pills + search */}
                <div className="panel-head" style={{ gap: 10 }}>
                  <div className="summary-pills">
                    {(["new", "prep", "ready", "delivered"] as OrderStatus[]).map((s) => (
                      <div className="pill" key={s}>
                        <div className="pill-dot" style={{ background: statusPillColors[s] }} />
                        {orders.filter((o) => o.status === s).length} {STATUS_LABEL[s].toLowerCase()}
                      </div>
                    ))}
                  </div>
                  <div className="search-bar">
                    <span style={{ color: "#94A3B8", fontSize: 13 }}>⌕</span>
                    <input
                      placeholder="Search by ID, name, or drink..."
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tabs */}
                <div style={{ padding: "0 20px", borderBottom: "1px solid var(--border)" }}>
                  <div className="tabs" style={{ borderBottom: "none" }}>
                    {orderTabs.map((t) => (
                      <div
                        key={t.key}
                        className={`tab ${orderTab === t.key ? "active" : ""}`}
                        onClick={() => setOrderTab(t.key)}
                      >
                        {t.label}
                        {t.key !== "all" && (
                          <span style={{ marginLeft: 5, fontSize: 9.5, fontFamily: "'DM Mono', monospace", opacity: 0.65 }}>
                            {t.key === "delivery"
                              ? orders.filter((o) => o.type === "delivery").length
                              : t.key === "dine-in"
                              ? orders.filter((o) => o.type === "dine-in").length
                              : orders.filter((o) => o.status === t.key).length}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="empty">
                    <div className="empty-icon">◈</div>
                    <div className="empty-title">No orders found</div>
                    <div>Try adjusting your search or filter.</div>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table className="orders-table">
                      <thead>
                        <tr>
                          {["Order ID", "Customer", "Item", "Type", "Deliver by", "Total", "Status", "Action"].map((t) => (
                            <th key={t}>{t}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((o) => (
                          <tr key={o.id}>
                            <td>
                              <div className="order-id">{o.id}</div>
                              <div className="order-time">{o.at}</div>
                            </td>
                            <td>
                              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{o.name}</div>
                            </td>
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
                            <td style={{ fontSize: 11.5, color: "var(--muted)" }}>
                              {o.type === "delivery" ? o.time || "ASAP" : "—"}
                              {o.address && <div className="order-meta">{o.address}</div>}
                            </td>
                            <td>
                              <span style={{ fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                                ${o.total.toFixed(2)}
                              </span>
                            </td>
                            <td>
                              <span className={`badge badge-${o.status}`}>
                                {STATUS_LABEL[o.status]}
                              </span>
                            </td>
                            <td>
                              {o.status !== "delivered" ? (
                                <button
                                  className={`action-btn ${o.status === "new" ? "primary" : o.status === "ready" ? "success" : ""}`}
                                  onClick={() => advanceOrder(o.id)}
                                >
                                  {o.status === "new" ? "Start prep" : o.status === "prep" ? "Mark ready" : "Complete"}
                                </button>
                              ) : (
                                <span style={{ fontSize: 11, color: "var(--success)", fontWeight: 600 }}>✓ Done</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* MENU                                                            */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === "menu" && (
              <div className="grid-2">
                {/* Menu Items */}
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <div className="panel-title">Drinks Menu</div>
                      <div className="panel-subtitle">
                        {menu.filter((m) => m.active).length} of {menu.length} items active
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 600, color: "var(--success)", background: "#ECFDF5", padding: "3px 9px", borderRadius: 20 }}>
                      {menu.filter((m) => m.active).length} live
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
                            <div className="menu-orders">{m.orders} orders this week</div>
                          </div>
                          {!m.active && <span className="menu-badge-unavail">Off</span>}
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

                {/* Right column: Order Share + Addon Performance */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="panel">
                    <div className="panel-head">
                      <div>
                        <div className="panel-title">Order Share</div>
                        <div className="panel-subtitle">By item, this week</div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {[...menu].sort((a, b) => b.orders - a.orders).map((m, i) => (
                          <div key={i}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                              <span style={{ fontWeight: 500, color: m.active ? "var(--text)" : "var(--muted)" }}>{m.name}</span>
                              <span style={{ fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--secondary)", fontSize: 12 }}>{m.orders}</span>
                            </div>
                            <div className="progress-bar-wrap">
                              <div
                                className="progress-bar-fill"
                                style={{
                                  width: `${(m.orders / maxMenuOrders) * 100}%`,
                                  background: m.active ? "var(--secondary)" : "#CBD5E1",
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
                      <div>
                        <div className="panel-title">Add-on Performance</div>
                        <div className="panel-subtitle">Most requested customisations</div>
                      </div>
                    </div>
                    <div className="panel-body">
                      {addonStats.map((a, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 0",
                            borderBottom: i < addonStats.length - 1 ? "1px solid var(--border)" : "none",
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</div>
                            <div className="progress-bar-wrap" style={{ maxWidth: 120, marginTop: 6 }}>
                              <div
                                className="progress-bar-fill"
                                style={{ width: `${(a.count / addonStats[0].count) * 100}%`, background: "var(--accent)" }}
                              />
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontSize: 15, flexShrink: 0, marginLeft: 12 }}>
                            {a.count}×
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* ANALYTICS                                                       */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === "analytics" && (
              <>
                {/* Analytics KPIs */}
                <div className="analytics-kpi-grid">
                  {analyticsStats.map((s, i) => (
                    <div className={`kpi-card kpi-${["blue", "teal", "green", "red"][i % 4]}`} key={i}>
                      <div className="kpi-header">
                        <span className="kpi-label">{s.label}</span>
                      </div>
                      <div className="kpi-value">{s.value}</div>
                      {s.note && (
                        <div className="kpi-footer">
                          <span className={`kpi-change ${s.change || "neutral"}`}>{s.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid-2">
                  {/* Sales by Day */}
                  <div className="panel">
                    <div className="panel-head">
                      <div>
                        <div className="panel-title">Sales by Day</div>
                        <div className="panel-subtitle">This week · {SALES.reduce((a, b) => a + b, 0)} total orders</div>
                      </div>
                      <div className="revenue-legend">
                        <div className="rev-legend-item">
                          <div className="rev-legend-dot" style={{ background: "#2563EB" }} /> Sat (today)
                        </div>
                        <div className="rev-legend-item">
                          <div className="rev-legend-dot" style={{ background: "#BFDBFE" }} /> Past
                        </div>
                      </div>
                    </div>
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

                  {/* Order Type Split */}
                  <div className="panel">
                    <div className="panel-head">
                      <div>
                        <div className="panel-title">Order Type Split</div>
                        <div className="panel-subtitle">Delivery vs dine-in breakdown</div>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 4 }}>
                        {[
                          { label: "Delivery", val: deliveryCount,  color: "#EF4444" },
                          { label: "Dine In",  val: dineInCount,    color: "#2563EB" },
                        ].map((r) => (
                          <div key={r.label}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                              <span style={{ fontWeight: 600 }}>{r.label}</span>
                              <span style={{ color: "var(--muted)", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
                                {r.val} orders ({Math.round((r.val / orders.length) * 100)}%)
                              </span>
                            </div>
                            <div className="progress-bar-wrap" style={{ height: 8 }}>
                              <div
                                className="progress-bar-fill"
                                style={{ width: `${Math.round((r.val / orders.length) * 100)}%`, background: r.color }}
                              />
                            </div>
                          </div>
                        ))}

                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>
                            Delivery Windows
                          </div>
                          {(
                            [["ASAP", "61%"], ["30 min", "22%"], ["1 hour", "12%"], ["Custom", "5%"]] as [string, string][]
                          ).map(([k, v]) => (
                            <div
                              key={k}
                              style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "7px 0", borderBottom: "1px solid var(--border)" }}
                            >
                              <span style={{ color: "var(--muted)" }}>{k}</span>
                              <span style={{ fontWeight: 700, color: "var(--secondary)", fontFamily: "'DM Mono', monospace" }}>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Performance Panel */}
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <div className="panel-title">Product Performance</div>
                      <div className="panel-subtitle">Revenue contribution and order volume by item</div>
                    </div>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Orders</th>
                          <th>Price</th>
                          <th>Est. Revenue</th>
                          <th>Share</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...menu]
                          .sort((a, b) => b.orders - a.orders)
                          .map((m, i) => {
                            const priceNum   = parseFloat(m.price.replace("$", ""));
                            const estRev     = (priceNum * m.orders).toFixed(0);
                            const totalOrders = menu.reduce((s, x) => s + x.orders, 0);
                            const share      = Math.round((m.orders / totalOrders) * 100);
                            return (
                              <tr key={i}>
                                <td>
                                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div className="menu-thumb" style={{ width: 32, height: 32 }}>
                                      <img src={m.image} alt={m.name} />
                                    </div>
                                    <span style={{ fontWeight: 600, fontSize: 12.5 }}>{m.name}</span>
                                  </div>
                                </td>
                                <td>
                                  <span style={{ fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{m.orders}</span>
                                </td>
                                <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{m.price}</td>
                                <td style={{ fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--secondary)" }}>
                                  ${estRev}
                                </td>
                                <td style={{ minWidth: 120 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div className="progress-bar-wrap" style={{ flex: 1 }}>
                                      <div
                                        className="progress-bar-fill"
                                        style={{ width: `${share}%`, background: m.active ? "var(--accent)" : "#CBD5E1" }}
                                      />
                                    </div>
                                    <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "var(--muted)", minWidth: 28 }}>{share}%</span>
                                  </div>
                                </td>
                                <td>
                                  <span style={{
                                    fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 5,
                                    background: m.active ? "#ECFDF5" : "#FFF1F2",
                                    color: m.active ? "#059669" : "#DC2626",
                                  }}>
                                    {m.active ? "Active" : "Off"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/* SETTINGS                                                        */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {view === "settings" && (
              <div className="grid-2">
                {/* Store Settings */}
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <div className="panel-title">Store Settings</div>
                      <div className="panel-subtitle">Core operational configuration</div>
                    </div>
                  </div>
                  <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {settingFields.map((f) => (
                      <div key={f.label}>
                        <div className="field-label">{f.label}</div>
                        <input defaultValue={f.val} className="field-input" />
                      </div>
                    ))}
                    <button className="save-btn">
                      <span>↑</span> Save changes
                    </button>
                  </div>
                </div>

                {/* Delivery Settings */}
                <div className="panel">
                  <div className="panel-head">
                    <div>
                      <div className="panel-title">Delivery Settings</div>
                      <div className="panel-subtitle">Control order acceptance and fulfillment modes</div>
                    </div>
                  </div>
                  <div className="panel-body" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {deliverySettings.map((s, i) => (
                      <div className="setting-row" key={i}>
                        <div className="setting-row-info">
                          <div className="setting-row-label">{s.label}</div>
                        </div>
                        <button
                          className={`delivery-toggle ${s.on ? "on" : "off"}`}
                          onClick={() => toggleDeliverySetting(i)}
                          title={s.on ? "Disable" : "Enable"}
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