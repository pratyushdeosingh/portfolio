import type { SVGProps } from 'react';
import { Mail } from 'lucide-react';

type IconProps = SVGProps<SVGSVGElement>;

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function LeetCodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.23 3.9 9.67a5.27 5.27 0 0 0-1.21 2.1 5.35 5.35 0 0 0-.13 2.7c.1.47.25.92.45 1.35.24.5.55.96.93 1.36l4.33 4.36a5.06 5.06 0 0 0 3.57 1.46 5.06 5.06 0 0 0 3.57-1.46l2.7-2.7a1.38 1.38 0 0 0-1.95-1.95l-2.7 2.7a2.3 2.3 0 0 1-1.62.66 2.3 2.3 0 0 1-1.62-.66l-4.3-4.34a2.2 2.2 0 0 1-.5-.76 2.5 2.5 0 0 1-.14-1.57c.08-.43.28-.83.57-1.15l3.2-3.44 5.4-5.77A1.38 1.38 0 0 0 13.48 0Zm-2.87 12.35a1.38 1.38 0 0 0 0 2.75h9.45a1.38 1.38 0 0 0 0-2.75h-9.45Z" />
    </svg>
  );
}

export function SocialIcon({ name, ...props }: IconProps & { name: string }) {
  switch (name) {
    case 'github':
      return <GitHubIcon {...props} />;
    case 'linkedin':
      return <LinkedInIcon {...props} />;
    case 'leetcode':
      return <LeetCodeIcon {...props} />;
    default:
      return <Mail aria-hidden="true" {...props} />;
  }
}
