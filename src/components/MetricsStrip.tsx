export default function MetricsStrip() {
  const metrics = [
    { label: "Production Uptime", value: "99.9%" },
    { label: "Deployments", value: "120+" },
    { label: "CI/CD Pipelines", value: "15+" },
    { label: "Cloud Services Used", value: "20+" },
  ];

  return (
    <section className="border-y border-white/10 py-10 bg-black">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {metrics.map((m) => (
          <div key={m.label}>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {m.value}
            </p>
            <p className="mt-2 text-sm text-gray-400">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
