import { Code2, Globe, HardHat, Landmark, ShieldAlert, Stethoscope, type LucideIcon } from 'lucide-react';

const glyphs: Record<string, LucideIcon> = {
  shield: ShieldAlert,
  landmark: Landmark,
  stethoscope: Stethoscope,
  helmet: HardHat,
  globe: Globe,
  code: Code2
};

export function ProjectGlyph({ name, className }: { name: string; className?: string }) {
  const Icon = glyphs[name] ?? Code2;
  return <Icon className={className} strokeWidth={1.1} aria-hidden="true" />;
}
