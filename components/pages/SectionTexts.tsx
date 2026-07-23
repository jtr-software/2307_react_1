type TextComponentProps = {
  children: ReactNode;
  className?: string;
};

export function SectionHeader({
  children,
  className,
  teaser,
  description,
}: TextComponentProps & { teaser?: string; description?: string }) {
  return (
    <div className="text-center mb-8">
      {teaser && (
        <p className="text-sm font-mono text-primary mb-3 tracking-widest uppercase">
          {teaser}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl md:text-5xl font-bold text-foreground mb-3',
          className,
        )}
      >
        {children}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

