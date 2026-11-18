/// Animated aurora backdrop: three soft radial "blobs" drifting slowly.
/// Radial gradients (not `filter: blur`) keep it cheap on phones, and
/// only `transform` is animated so it stays on the compositor.
export function Aurora({
  variant = 'brand',
  className = '',
}: {
  variant?: 'brand' | 'store' | 'soft';
  className?: string;
}) {
  const tone = variant === 'store' ? 'aurora-store' : variant === 'soft' ? 'aurora-soft' : '';
  return (
    <div aria-hidden="true" className={`aurora ${tone} ${className}`}>
      <span className="aurora-blob aurora-blob-1" />
      <span className="aurora-blob aurora-blob-2" />
      <span className="aurora-blob aurora-blob-3" />
    </div>
  );
}
