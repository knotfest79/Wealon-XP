"use client";

type WealonLogoProps = {
  size?: number;
  className?: string;
};

const WEALON_LOGO_ASPECT_RATIO = 1243 / 1864;

export function WealonLogo({ size = 240, className = "" }: WealonLogoProps) {
  const logoClassName = [
    "relative z-30 h-auto object-contain rounded-xl bg-white/95 p-1.5",
    "shadow-[0_8px_22px_rgba(0,0,0,0.35)] ring-1 ring-white/80",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src="/logo/logo-wealon-tax-accounting.svg"
      width={size}
      height={Math.round(size * WEALON_LOGO_ASPECT_RATIO)}
      className={logoClassName}
      alt="Wealon Tax Accounting Logo"
    />
  );
}

export function FolderSvg({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className="shrink-0">
      <defs>
        <linearGradient id="folder-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4cb62" />
          <stop offset="100%" stopColor="#d4931d" />
        </linearGradient>
        <linearGradient id="folder-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe39a" />
          <stop offset="100%" stopColor="#efbc4e" />
        </linearGradient>
      </defs>
      <path
        d="M5 13 H18 L21 17 H43 V21 H5 Z"
        fill="url(#folder-back)"
        stroke="#a97012"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M4 19 H44 V37 C44 39.2 42.2 41 40 41 H8 C5.8 41 4 39.2 4 37 Z"
        fill="url(#folder-front)"
        stroke="#a97012"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4 22.5 H44"
        stroke="#fff2bf"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export function PdfSvg({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size}>
      <rect
        x="4"
        y="1"
        width="22"
        height="28"
        rx="1"
        fill="#f0e0e0"
        stroke="#a05050"
        strokeWidth=".8"
      />
      <path
        d="M18 1 L26 8 L18 8 Z"
        fill="#e0c8c8"
        stroke="#a05050"
        strokeWidth=".5"
      />
      <text
        x="15"
        y="22"
        textAnchor="middle"
        fill="#c03030"
        fontSize="8"
        fontWeight="bold"
      >
        PDF
      </text>
    </svg>
  );
}

export function XlsSvg({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size}>
      <rect
        x="4"
        y="1"
        width="22"
        height="28"
        rx="1"
        fill="#d4e8d4"
        stroke="#5a8a5a"
        strokeWidth=".8"
      />
      <path
        d="M18 1 L26 8 L18 8 Z"
        fill="#b8d8b8"
        stroke="#5a8a5a"
        strokeWidth=".5"
      />
      <rect
        x="7"
        y="12"
        width="14"
        height="10"
        fill="#fff"
        stroke="#8aba8a"
        strokeWidth=".5"
      />
    </svg>
  );
}

export function DocSvg({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size}>
      <rect
        x="4"
        y="1"
        width="22"
        height="28"
        rx="1"
        fill="#d4d8f0"
        stroke="#5a5e8a"
        strokeWidth=".8"
      />
      <path
        d="M18 1 L26 8 L18 8 Z"
        fill="#b8bcd8"
        stroke="#5a5e8a"
        strokeWidth=".5"
      />
      <line x1="7" y1="13" x2="21" y2="13" stroke="#9a9ecc" strokeWidth=".5" />
      <line x1="7" y1="16" x2="21" y2="16" stroke="#9a9ecc" strokeWidth=".5" />
    </svg>
  );
}

export function FormSvg({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size}>
      <rect
        x="4"
        y="2"
        width="28"
        height="32"
        rx="2"
        fill="#f0ede1"
        stroke="#7f9db9"
        strokeWidth="1.2"
      />
      <rect x="4" y="2" width="28" height="7" rx="2" fill="#1a2744" />
      <text
        x="18"
        y="7.5"
        textAnchor="middle"
        fill="#c9a84c"
        fontSize="5"
        fontFamily="Georgia"
        fontWeight="bold"
      >
        Wealon
      </text>
      <line x1="8" y1="15" x2="24" y2="15" stroke="#ccc" strokeWidth=".8" />
      <line x1="8" y1="19" x2="24" y2="19" stroke="#ccc" strokeWidth=".8" />
    </svg>
  );
}

export function WindowsLogo({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} className="shrink-0">
      <rect
        x="1"
        y="1"
        width="8"
        height="8"
        rx="1"
        fill="#f04020"
        opacity=".95"
      />
      <rect
        x="11"
        y="1"
        width="8"
        height="8"
        rx="1"
        fill="#40b030"
        opacity=".95"
      />
      <rect
        x="1"
        y="11"
        width="8"
        height="8"
        rx="1"
        fill="#2070e0"
        opacity=".95"
      />
      <rect
        x="11"
        y="11"
        width="8"
        height="8"
        rx="1"
        fill="#f0c020"
        opacity=".95"
      />
    </svg>
  );
}

// Desktop icon SVGs
export function AboutIconSvg() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-md">
      <defs>
        <linearGradient id="di-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd94e" />
          <stop offset="100%" stopColor="#e8a020" />
        </linearGradient>
      </defs>
      <path
        d="M4 8 L24 8 L28 12 L44 12 L44 42 L4 42 Z"
        fill="url(#di-a)"
        stroke="#b88014"
      />
      <path d="M4 16 L44 16 L42 42 L6 42 Z" fill="#fce88e" />
      <circle cx="24" cy="28" r="6" fill="#1a2744" stroke="#c9a84c" />
      <text
        x="24"
        y="32"
        textAnchor="middle"
        fill="#c9a84c"
        fontSize="9"
        fontWeight="bold"
        fontFamily="Georgia"
      >
        i
      </text>
    </svg>
  );
}

export function ServicesIconSvg() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-md">
      <defs>
        <linearGradient id="di-s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd94e" />
          <stop offset="100%" stopColor="#e8a020" />
        </linearGradient>
      </defs>
      <path
        d="M4 8 L24 8 L28 12 L44 12 L44 42 L4 42 Z"
        fill="url(#di-s)"
        stroke="#b88014"
      />
      <path d="M4 16 L44 16 L42 42 L6 42 Z" fill="#fce88e" />
      <rect
        x="16"
        y="22"
        width="16"
        height="14"
        rx="1"
        fill="#1a2744"
        stroke="#c9a84c"
        strokeWidth=".8"
      />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fill="#c9a84c"
        fontSize="9"
        fontWeight="bold"
      >
        $
      </text>
    </svg>
  );
}

export function DownloadsIconSvg() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-md">
      <defs>
        <linearGradient id="di-d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd94e" />
          <stop offset="100%" stopColor="#e8a020" />
        </linearGradient>
      </defs>
      <path
        d="M4 8 L24 8 L28 12 L44 12 L44 42 L4 42 Z"
        fill="url(#di-d)"
        stroke="#b88014"
      />
      <path d="M4 16 L44 16 L42 42 L6 42 Z" fill="#fce88e" />
      <path
        d="M24 22 L24 32 M20 28 L24 33 L28 28"
        stroke="#1a2744"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M17 36 L31 36"
        stroke="#1a2744"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BookingIconSvg() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-md">
      <rect
        x="8"
        y="6"
        width="32"
        height="38"
        rx="2"
        fill="#f0ede1"
        stroke="#7f9db9"
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="6"
        width="32"
        height="8"
        rx="2"
        fill="#1a2744"
        stroke="#c9a84c"
      />
      <text
        x="24"
        y="12"
        textAnchor="middle"
        fill="#c9a84c"
        fontSize="6"
        fontFamily="Georgia"
        fontWeight="bold"
      >
        Wealon
      </text>
      <line x1="12" y1="20" x2="30" y2="20" stroke="#aaa" />
      <line x1="12" y1="26" x2="30" y2="26" stroke="#aaa" />
      <circle cx="34" cy="36" r="6" fill="#3fac3b" />
      <path
        d="M31 36 L33 38.5 L37 33.5"
        stroke="#fff"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PagesIconSvg() {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12 drop-shadow-md">
      <defs>
        <linearGradient id="di-p" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd94e" />
          <stop offset="100%" stopColor="#e8a020" />
        </linearGradient>
      </defs>
      <path
        d="M8 10 L22 10 L25 13 L40 13 L40 40 L8 40 Z"
        fill="#d4a826"
        stroke="#b88014"
        strokeWidth=".8"
        opacity=".5"
        transform="translate(-3,-2)"
      />
      <path
        d="M4 8 L24 8 L28 12 L44 12 L44 42 L4 42 Z"
        fill="url(#di-p)"
        stroke="#b88014"
      />
      <path d="M4 16 L44 16 L42 42 L6 42 Z" fill="#fce88e" />
    </svg>
  );
}

export function TileIcon({ type, size = 36 }: { type: string; size?: number }) {
  switch (type) {
    case "pdf":
      return <PdfSvg size={size} />;
    case "xlsx":
      return <XlsSvg size={size} />;
    case "doc":
      return <DocSvg size={size} />;
    case "form":
      return <FormSvg size={size} />;
    default:
      return <FolderSvg size={size} />;
  }
}
