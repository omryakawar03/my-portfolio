const tools = [
  "AWS - [ EC2, VPC, IAM, S3, RDS, ASG, ALB, EKS, ECR, Secrets-manager, Lambda, Cloud-Watch, Route 53, CLoudFront, CloudFormation ]",
  "Azure",
   "GCP",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Helm",
  "Nginx",
  "GitHub Actions",
  "Prometheus",
  "Grafana",
  "Datadog",
  "NextJs",
  "NestJs",
  "TypeScript",
  "MongoDB",
  "TailwindCSS",

  
  
  
  

];

export default function Tools() {
  return (
    <section className="py-20 max-h-screen ">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-semibold mb-8 text-center">
          Worked With
        </h3>

        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-full hover:scale-110 hover:border-amber-50 text-sm bg-white/5 border border-white/10 text-gray-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
