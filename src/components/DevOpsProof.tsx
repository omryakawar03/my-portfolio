export function DevOpsProof() {
  return (
    <section className="py-20 border-t border-white/10 ">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6 text-center">
          DevOps in Practice
        </h2>

        <ul className="space-y-4 text-sm text-gray-300">
          <li>• CI/CD pipelines with GitHub Actions (test → build → deploy)</li>
          <li>• Dockerized services with multi-stage builds</li>
          <li>• Nginx reverse proxy & SSL termination</li>
          <li>• AWS infrastructure (EC2, S3, RDS, IAM)</li>
          <li>• Environment isolation & secrets handling</li>
          <li>• Rollback-aware deployments</li>
        </ul>
      </div>
    </section>
  );
}
