/**
 * Inline stroke icons (24px grid, currentColor).
 * Kept local so the app ships no icon-font or icon-library dependency.
 */

function Svg({ children, className = "size-4", ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const FileTextIcon = (props) => (
  <Svg {...props}>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M5 8a3 3 0 0 1 3-3h6l5 5v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z" />
    <path d="M9 13h6M9 17h4" />
  </Svg>
);

export const TypeIcon = (props) => (
  <Svg {...props}>
    <path d="M4 6V4h16v2M12 4v16M9 20h6" />
  </Svg>
);

export const ImageIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="m4 16 4.5-4.5a2 2 0 0 1 2.8 0L16 16" />
    <path d="m14.5 14.5 1.2-1.2a2 2 0 0 1 2.8 0L20 14.8" />
  </Svg>
);

export const PaletteIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 1.7-3 2 2 0 0 1 1.7-3H18a3 3 0 0 0 3-3 9 9 0 0 0-9-9Z" />
    <circle cx="8" cy="11" r="1" />
    <circle cx="12" cy="8" r="1" />
    <circle cx="16" cy="11" r="1" />
  </Svg>
);

export const LayoutIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M3 10h18M9 10v10" />
  </Svg>
);

export const CalendarIcon = (props) => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M8 3v4M16 3v4M3 10h18" />
    <path d="M12 14v2.5l1.6 1" />
  </Svg>
);

export const DropletIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3s6 5.7 6 10a6 6 0 0 1-12 0c0-4.3 6-10 6-10Z" />
  </Svg>
);

export const DownloadIcon = (props) => (
  <Svg {...props}>
    <path d="M12 4v11m0 0 4-4m-4 4-4-4" />
    <path d="M4 17v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1" />
  </Svg>
);

export const PrinterIcon = (props) => (
  <Svg {...props}>
    <path d="M7 9V4h10v5" />
    <rect x="3" y="9" width="18" height="7" rx="2" />
    <path d="M7 14h10v6H7z" />
  </Svg>
);

export const ExternalLinkIcon = (props) => (
  <Svg {...props}>
    <path d="M14 4h6v6M20 4l-8 8" />
    <path d="M19 14v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4" />
  </Svg>
);

export const RefreshIcon = (props) => (
  <Svg {...props}>
    <path d="M20 11A8 8 0 0 0 6.3 6.3L4 8.5" />
    <path d="M4 5v4h4" />
    <path d="M4 13a8 8 0 0 0 13.7 4.7L20 15.5" />
    <path d="M20 19v-4h-4" />
  </Svg>
);

export const RotateLeftIcon = (props) => (
  <Svg {...props}>
    <path d="M4 5v5h5" />
    <path d="M4.6 13a8 8 0 1 0 1.4-6.3L4 10" />
  </Svg>
);

export const SunIcon = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Svg>
);

export const MoonIcon = (props) => (
  <Svg {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </Svg>
);

export const AlignLeftIcon = (props) => (
  <Svg {...props}>
    <path d="M4 6h16M4 10h9M4 14h16M4 18h9" />
  </Svg>
);

export const AlignCenterIcon = (props) => (
  <Svg {...props}>
    <path d="M4 6h16M7.5 10h9M4 14h16M7.5 18h9" />
  </Svg>
);

export const AlignRightIcon = (props) => (
  <Svg {...props}>
    <path d="M4 6h16M11 10h9M4 14h16M11 18h9" />
  </Svg>
);

export const CheckIcon = (props) => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
);

export const ChevronDownIcon = (props) => (
  <Svg {...props}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const FitWidthIcon = (props) => (
  <Svg {...props}>
    <path d="M3 5v14M21 5v14" />
    <path d="M7 12h10m0 0-3-3m3 3-3 3M7 12l3-3m-3 3 3 3" />
  </Svg>
);

export const FitPageIcon = (props) => (
  <Svg {...props}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 8h6M9 12h6M9 16h3" />
  </Svg>
);

export const AlertIcon = (props) => (
  <Svg {...props}>
    <path d="M12 8v5M12 16.5v.5" />
    <path d="M10.3 3.9 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
  </Svg>
);

export const SparkleIcon = (props) => (
  <Svg {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8.5 13.4 11 16 12l-2.6 1L12 15.5 10.6 13 8 12l2.6-1z" />
  </Svg>
);

export const SpinnerIcon = ({ className = "size-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`${className} animate-spin`}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.2" />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
