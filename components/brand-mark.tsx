/// Text-only wordmark for the "Lope" brand. Uses the display font
/// (Space Grotesk) via the `--font-display` CSS variable. Size and
/// tracking are tuned so the mark reads confidently at 20-24px in
/// the header and reveals dramatically at 96px+ in the hero.
export function BrandMark({
  className = '',
  size = 'md',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}) {
  const sizeClasses = {
    sm: 'text-lg tracking-tight',
    md: 'text-2xl tracking-tight',
    lg: 'text-4xl tracking-tighter',
    hero: 'text-[clamp(4rem,15vw,12rem)] tracking-tighter leading-[0.85]',
  };
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-black ${sizeClasses[size]} ${className}`}
      style={{ fontFeatureSettings: '"ss01"' }}
    >
      Lope
    </span>
  );
}
