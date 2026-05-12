import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
};

export function MenuIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3a9 9 0 0 0-2.84 17.54c.45.08.62-.2.62-.44v-1.53c-2.53.55-3.06-1.08-3.06-1.08-.41-1.05-1-1.33-1-1.33-.82-.57.06-.56.06-.56.9.07 1.38.93 1.38.93.8 1.38 2.08.98 2.58.75.08-.58.31-.98.56-1.2-2.02-.23-4.14-1.01-4.14-4.48 0-.99.35-1.79.93-2.42-.1-.23-.4-1.17.09-2.43 0 0 .75-.24 2.45.92a8.4 8.4 0 0 1 4.46 0c1.7-1.16 2.45-.92 2.45-.92.49 1.26.19 2.2.09 2.43.58.63.93 1.43.93 2.42 0 3.48-2.12 4.25-4.15 4.48.32.28.61.84.61 1.7v2.52c0 .25.17.53.63.44A9 9 0 0 0 12 3Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4V8h4v1.8A4.5 4.5 0 0 1 16 8Z" />
      <path d="M4 9h4v11H4z" />
      <circle cx="6" cy="4" r="1.5" />
    </svg>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v5H5V5h5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M19 3v4" />
      <path d="M21 5h-4" />
    </svg>
  );
}

export function HelmetIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M12 4v8" />
      <path d="M4 12h16" />
      <path d="M8 16h8" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.7 4 5.9 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.9-4-9s1.5-6.3 4-9Z" />
    </svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m9 18-6-6 6-6" />
      <path d="m15 6 6 6-6 6" />
      <path d="M14 4 10 20" />
    </svg>
  );
}

export const socialIconMap = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon
} as const;

export const projectIconMap = {
  helmet: HelmetIcon,
  globe: GlobeIcon,
  code: CodeIcon
} as const;
