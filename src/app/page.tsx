import Image from "next/image";
import HeroSec from "@/components/HeroSec";

import Tools from "@/components/Tools";
import About from "@/components/About";
import ProjectsCTA from "@/components/ProjectsCTA";

import { Metadata } from "next";

export const metadata:Metadata={
  title:"OMKAR RYAKAWAR | Full Stack Developer & DevOps Engineer | Portfolio",
  description:"I build scalable full-stack applications and robust DevOps pipelines. From frontend to backend, Docker to Kubernetes, CI/CD to AWS deployments — I deliver systems that don’t break in production."

}
export default function Home() {
  return (
  <main>
   
    <HeroSec />
 
    <Tools />
    <About />
    <ProjectsCTA />
  </main>
  );
}
