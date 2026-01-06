"use client";

import React from "react";

// =============================================================================
// BUTTON
// =============================================================================
type ButtonVariant = "primary" | "secondary" | "info" | "success" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base = "font-bold uppercase tracking-wider transition-all duration-300 rounded-lg inline-flex items-center justify-center gap-2";
  
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20",
    info: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-white",
  };
  
  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// =============================================================================
// CARD
// =============================================================================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
  onClick,
  selected = false,
}) => (
  <div
    onClick={onClick}
    className={`
      bg-[#1E1E1E] rounded-2xl border transition-all duration-300
      ${selected ? "border-red-500 bg-red-500/10" : "border-white/10"}
      ${hover && !selected ? "hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10" : ""}
      ${onClick ? "cursor-pointer" : ""}
      ${className}
    `}
  >
    {children}
  </div>
);

// =============================================================================
// BADGE
// =============================================================================
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "bf" | "k1";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-white/20 text-white",
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    danger: "bg-red-500/20 text-red-400",
    info: "bg-blue-500/20 text-blue-400",
    bf: "bg-red-500/20 text-red-400",
    k1: "bg-orange-500/20 text-orange-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// =============================================================================
// SECTION TITLE
// =============================================================================
interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  className = "",
  icon,
}) => (
  <div className={`text-center mb-10 ${className}`}>
    <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
      {icon}
      {children}
    </h2>
    {subtitle && <p className="text-gray-500">{subtitle}</p>}
  </div>
);

// =============================================================================
// TOGGLE TABS
// =============================================================================
interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface ToggleTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const ToggleTabs: React.FC<ToggleTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
}) => (
  <div className={`flex bg-white/5 rounded-xl p-1 ${className}`}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`
          flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2
          ${activeTab === tab.id
            ? "bg-red-500 text-white shadow-lg"
            : "text-gray-400 hover:text-white"
          }
        `}
      >
        {tab.icon}
        {tab.label}
      </button>
    ))}
  </div>
);
