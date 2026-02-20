export interface ProjectType {
  _id: string;
  title: string;
  slug: string;
  type: "app" | "devops";
  description?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;

  // App project
  content?: string;
  screenshots?: string[];
  demoVideo?: string;

  // DevOps project
  readme?: string;
  architectureImage?: string;
  pipelineImage?: string;
  monitoringImages?: string[];
  deploymentFlow?: string;
  costNotes?: string;
  securityNotes?: string;

  createdAt?: string;
  updatedAt?: string;
}
