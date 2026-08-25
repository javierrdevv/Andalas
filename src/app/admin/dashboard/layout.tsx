"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Image,
  Briefcase,
  FolderOpen,
  MessageSquare,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Beranda", icon: LayoutDashboard },
  { href: "/admin/dashboard/profile", label: "Profil", icon: User },
  { href: "/admin/dashboard/hero", label: "Hero", icon: Image },
  { href: "/admin/dashboard/services", label: "Layanan", icon: Briefcase },
  { href: "/admin/dashboard/projects", label: "Portofolio", icon: FolderOpen },
  { href: "/admin/dashboard/testimonials", label: "Testimoni", icon: MessageSquare },
  { href: "/admin/dashboard/faq", label: "FAQ", icon: HelpCircle },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 bg-white border-r border-slate-200">
        <div className="px-5 py-5 border-b border-slate-100">
          <p className="text-sm font-bold text-slate-900">Andal Las</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Admin Panel</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#ff4a16]/[0.08] text-[#ff4a16]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-slate-100 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors w-full cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Beranda
        </Link>
        <button
          onClick={handleLogout}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          Keluar
        </button>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 flex justify-around py-2 px-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin/dashboard"
              ? pathname === "/admin/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-[#ff4a16]" : "text-slate-500"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Main content */}
      <main className="lg:ml-60 px-4 sm:px-6 py-6 pb-24 lg:pb-6">
        {children}
      </main>
    </div>
  );
}
