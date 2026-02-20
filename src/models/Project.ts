import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ["app", "devops"],
      required: true,
    },

    description: String,
    techStack: [String],
    githubUrl: String,
    liveUrl: String,

    // 🔥 APPLICATION PROJECT
    content: String,
    screenshots: {
      type: [String],
      default: [],
    },
    demoVideo: {
      type: String,
      default: "",
    },

    // 🔥 DEVOPS PROJECT
    readme: String,

    architectureImage: {
      type: String,
      default: "",
    },

    pipelineImage: {
      type: String,
      default: "",
    },

    monitoringImages: {
      type: [String],
      default: [],
    },

    deploymentFlow: {
      type: String, // markdown
      default: "",
    },

    costNotes: {
      type: String, // markdown
      default: "",
    },

    securityNotes: {
      type: String, // markdown
      default: "",
    },
  },
  { timestamps: true }
  
);

export default models.Project || mongoose.model("Project", ProjectSchema);
