type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = '',
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-xl ${alignClass} ${className}`.trim()}>
      <p className="text-primary text-xs font-medium uppercase tracking-[0.28em] sm:text-sm sm:tracking-[0.3em]">
        {eyebrow}
      </p>
      <h2 className="font-display text-foreground mt-2 text-3xl sm:text-4xl">{title}</h2>
      {lead ? (
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">{lead}</p>
      ) : null}
    </div>
  );
}
