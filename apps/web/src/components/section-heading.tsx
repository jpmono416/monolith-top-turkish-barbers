type SectionHeadingProps = {
  title: string;
  className?: string;
};

export function SectionHeading({ title, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-xl text-center ${className}`.trim()}>
      <h2 className="font-display text-foreground text-3xl uppercase sm:text-4xl">{title}</h2>
      <div className="section-title-divider" aria-hidden="true" />
    </div>
  );
}
