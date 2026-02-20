import  PageHeader  from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"About Me – Omkar Ryakawar | Full Stack + DevOps Engineer",
  description:"Learn about my journey as a full-stack developer and DevOps engineer. I specialize in building reliable, scalable, and automated web systems using modern technologies and cloud infrastructure."

}
export default function AboutPage() {
  return (
    <main>
   
      {/* Header */}
      <PageHeader
        title="About"
        subtitle="How I think, how I work, and how I take responsibility."
      />

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 space-y-10 text-gray-300 text-sm sm:text-base leading-relaxed">
          
          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              My Approach
            </h2>
            <p>
          I approach software as an end-to-end system rather than isolated features. My focus is on building applications that are stable, scalable, and maintainable under real-world usage conditions.
            </p>
          </div>
          <div>
             <h2 className="text-lg font-semibold text-white mb-3">
             How I Work
            </h2>
            <p>
              I prioritize clear architecture, reproducible deployments, and operational ownership. I believe that responsibility does not end at writing code — it extends to how the application performs in production, how it scales, and how failures are handled.

When something breaks, I focus on identifying the root cause, understanding system behavior, and improving the overall design rather than applying temporary fixes.
              </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
           Engineering Focus
            </h2>
            <p>
             I improve by building complete systems — from infrastructure provisioning to deployment automation and monitoring. Each project is treated as a production-grade environment with attention to reliability, performance, and cost efficiency.

Currently, I am focused on deepening my system design skills, strengthening automation practices, and building scalable cloud-native architectures.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Full-Stack with DevOps Perspective
            </h2>
            <p>
              I work across frontend, backend, and infrastructure. Beyond application development, I design CI/CD pipelines, manage cloud infrastructure, implement containerized deployments, and ensure observability through monitoring and logging.

Understanding both development and operations allows me to build systems that are easier to deploy, maintain, and scale.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Learning & Growth
            </h2>
            <p>
              I improve by building, shipping, and operating systems end to end.
              Every project is an opportunity to refine decisions around
              scalability, reliability, and maintainability.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              What I’m Focused On
            </h2>
            <p>
              Currently, I’m focused on strengthening system design skills,
              improving deployment automation, and building production-grade
              applications that reflect real-world constraints.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
