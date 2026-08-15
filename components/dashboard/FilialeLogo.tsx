"use client";

import {
  Sprout,
  Cpu,
  Armchair,
  GraduationCap,
  Building2,
} from "lucide-react";

interface FilialeLogoProps {
  code: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const filialeConfig = {
  AGRO: {
    label: "KARFI AGRO",
    description: "Agriculture & agro-industrie",
    icon: Sprout,
  },

  TECH: {
    label: "KARFI TECH",
    description: "Technologie & solutions digitales",
    icon: Cpu,
  },

  MOBILIER: {
    label: "KARFI MOBILIER",
    description: "Mobilier & aménagement",
    icon: Armchair,
  },

  FORMATION: {
    label: "KARFI FORMATION",
    description: "Formation & incubation",
    icon: GraduationCap,
  },
};

export default function FilialeLogo({
  code,
  size = "md",
  showLabel = false,
  className = "",
}: FilialeLogoProps) {
  const config =
    filialeConfig[
      code.toUpperCase() as keyof typeof filialeConfig
    ];

  if (!config) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-base-200 text-base-content/50 ${className}`}
      >
        <Building2 size={22} />
      </div>
    );
  }

  const Icon = config.icon;

  const sizes = {
    sm: {
      container: "h-10 w-10 rounded-xl",
      icon: 18,
      label: "text-xs",
    },

    md: {
      container: "h-14 w-14 rounded-2xl",
      icon: 25,
      label: "text-sm",
    },

    lg: {
      container: "h-20 w-20 rounded-3xl",
      icon: 34,
      label: "text-base",
    },
  };

  const currentSize = sizes[size];

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
    >
      {/* Logo */}
      <div
        className={`
          ${currentSize.container}
          flex shrink-0 items-center justify-center
          bg-primary text-primary-content
          shadow-lg shadow-primary/20
          transition-all duration-300
          hover:scale-105 hover:shadow-xl
        `}
      >
        <Icon size={currentSize.icon} strokeWidth={1.8} />
      </div>

      {/* Informations */}
      {showLabel && (
        <div className="min-w-0">
          <p
            className={`
              ${currentSize.label}
              truncate font-bold
            `}
          >
            {config.label}
          </p>

          <p className="truncate text-xs text-base-content/50">
            {config.description}
          </p>
        </div>
      )}
    </div>
  );
}