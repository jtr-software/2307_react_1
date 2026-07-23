type  React.ComponentPropsWithoutRef;

const ElevateButton = React.forwardRef<HTMLButtonElement, ElevateButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold',
        'transition-all duration-200 hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        className,
      )}
      {...props}
    />
  ),
);
;

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  ElevateButtonProps
>(({ className, ...props }, ref) => (
  <ElevateButton
    ref={ref}
    className={cn(
      'bg-primary text-primary-foreground',
      'shadow-[0_4px_14px_rgba(184,245,80,0.25)] hover:shadow-[0_8px_28px_rgba(184,245,80,0.5)]',
      className,
    )}
    {...props}
  />
));
;

;
