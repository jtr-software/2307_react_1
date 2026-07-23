type Props = {
  children: ReactNode;
  /** Extra classes applied to the outer container (e.g. padding, max-width, text-align) */
  className?: string;
  /** Extra classes applied to the inner `z-10` content wrapper */
  innerClassName?: string;
  /** Override the top-center glow blob size/appearance. Defaults to a medium blob. */
  glowClassName?: string;
};

export function GlassCard({
  children,
  className,
  innerClassName,
  glowClassName,
}: Props) {
  return (
    <div
      className={cn(
        'relative rounded-3xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden',
        className,
      )}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/25 rounded-tl-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-primary/10 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-primary/10 rounded-bl-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-primary/25 rounded-br-3xl pointer-events-none" />

      {/* Top-center glow */}
      <div
        className={cn(
          'absolute top-0 left-1/2 -translate-x-1/2 bg-primary/[0.04] blur-[80px] rounded-full pointer-events-none',
          glowClassName ?? 'w-[350px] h-[180px]',
        )}
      />

      {/* Content */}
      <div className={cn('relative z-10', innerClassName)}>{children}</div>
    </div>
  );
}
