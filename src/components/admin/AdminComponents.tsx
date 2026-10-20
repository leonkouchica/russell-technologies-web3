import React from "react";
import { ArrowUpRight, ArrowDownRight, Calendar, ChevronDown, MoreVertical } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  note?: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconColor?: string;
}

export function AdminStatCard({
  title,
  value,
  change,
  changeType = "increase",
  note,
  icon: Icon,
  iconBgColor = "bg-blue-50",
  iconColor = "text-blue-600",
}: AdminStatCardProps) {
  return (
    <div className="bg-white dark:bg-[#0c1527] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div className={`p-2.5 rounded-xl ${iconBgColor} ${iconColor}`}>
          <Icon className="size-5" />
        </div>
        {change && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              changeType === "increase"
                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                : changeType === "decrease"
                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            }`}
          >
            {changeType === "increase" ? "↑" : changeType === "decrease" ? "↓" : ""} {change}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">{value}</p>
        {note && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">{note}</p>}
      </div>
    </div>
  );
}

export function AdminDateFilter({ dateText = "Sep 1, 2026 – Sep 30, 2026" }: { dateText?: string }) {
  return (
    <button className="inline-flex items-center gap-2 bg-white dark:bg-[#0c1527] border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-semibold text-xs px-3.5 py-2 rounded-xl shadow-xs transition cursor-pointer">
      <Calendar className="size-3.5 text-slate-500 dark:text-slate-400" />
      <span>{dateText}</span>
      <ChevronDown className="size-3 text-slate-400" />
    </button>
  );
}

export function AdminStatusBadge({ status }: { status: "Published" | "Draft" | "Scheduled" | "Active" | "Inactive" | "Trash" | "Archived" | "Subscribed" | "Unsubscribed" | string }) {
  let colorStyles = "bg-slate-100 text-slate-700 border-slate-200";

  switch (status) {
    case "Published":
    case "Active":
    case "Subscribed":
      colorStyles = "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      break;
    case "Draft":
      colorStyles = "bg-amber-50 text-amber-700 border-amber-200/60";
      break;
    case "Scheduled":
      colorStyles = "bg-purple-50 text-purple-700 border-purple-200/60";
      break;
    case "Inactive":
    case "Unsubscribed":
    case "Trash":
    case "Archived":
      colorStyles = "bg-rose-50 text-rose-700 border-rose-200/60";
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${colorStyles}`}>
      {status}
    </span>
  );
}

export function AdminCategoryBadge({ category }: { category: string }) {
  const stylesMap: Record<string, string> = {
    Education: "bg-blue-50 text-blue-700 border-blue-200/60",
    Agriculture: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    Music: "bg-purple-50 text-purple-700 border-purple-200/60",
    Legal: "bg-amber-50 text-amber-700 border-amber-200/60",
    Technology: "bg-sky-50 text-sky-700 border-sky-200/60",
    Business: "bg-rose-50 text-rose-700 border-rose-200/60",
    Sustainability: "bg-teal-50 text-teal-700 border-teal-200/60",
  };

  const style = stylesMap[category] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${style}`}>
      {category}
    </span>
  );
}

export function AdminRoleBadge({ role }: { role: string }) {
  const stylesMap: Record<string, string> = {
    "Super Admin": "bg-purple-50 text-purple-700 border-purple-200/60",
    Administrator: "bg-rose-50 text-rose-700 border-rose-200/60",
    Editor: "bg-blue-50 text-blue-700 border-blue-200/60",
    Author: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    Contributor: "bg-amber-50 text-amber-700 border-amber-200/60",
    Subscriber: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const style = stylesMap[role] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${style}`}>
      {role}
    </span>
  );
}
