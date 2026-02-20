type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="border-b border-white/10 py-20">
      <div className="max-w-5xl mx-auto px-4 text-center">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>

        {/* Subtitle (optional) */}
        {subtitle && (
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
