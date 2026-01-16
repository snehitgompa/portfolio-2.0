import { Experience, Project, SkillCategory, Certification } from "./types";

export const PERSONAL_INFO = {
  name: "SNEHIT GOMPA",
  email: "gompasnehit@gmail.com",
  phone: "+1 (945) 328-8376",
  location: "Oakland, CA, USA",
  linkedin: "https://linkedin.com",
  summary:
    "Software Engineer with hands-on experience designing, developing, and supporting production web applications using Python, JavaScript, TypeScript, and Salesforce technologies across cloud-based environments.",
};

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    company: "OWOW Talents Inc",
    location: "USA",
    role: "Software Developer (AI Systems Intern)",
    period: "Nov 2025 – Present",
    bullets: [
      "Developed and debugged backend data-processing workflows using Python, SQL, and REST-based services, reducing recurring processing errors by 25%.",
      "Implemented and validated feature-level logic for AI-driven applications using Python-based model support scripts, improving output accuracy and response consistency.",
      "Optimized and documented system workflows using technical documentation and code-level annotations, reducing onboarding and troubleshooting time by 30%.",
    ],
  },
  {
    id: "exp-2",
    company: "FeatureboxAI",
    location: "USA",
    role: "Software Engineer",
    period: "Sep 2025 – Nov 2025",
    bullets: [
      "Designed and developed a production web application using JavaScript and backend API integrations, delivering a scalable analytics platform.",
      "Integrated third-party services using REST APIs and JSON payloads, enabling dynamic 'Results Screen' dashboards and real-time data visualization.",
      "Implemented frontend-to-backend workflows using React fundamentals and backend service coordination, improving UI responsiveness by 20%.",
    ],
  },
  {
    id: "exp-3",
    company: "Salesforce Developer Virtual Internship",
    location: "India",
    role: "Software Developer",
    period: "Jul 2022 – Dec 2022",
    bullets: [
      "Developed and implemented business logic and automation workflows using Salesforce Apex, Flows, Lightning Web Components (LWC), and REST APIs.",
      "Tested and validated application logic using Apex unit testing and debugging tools, reducing regression issues across deployments.",
      "Automated and optimized business processes using Salesforce Process Automation and Flow Builder, improving workflow efficiency.",
    ],
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages & Scripting",
    skills: ["Python", "Java", "TypeScript", "SQL", "C++"],
  },
  {
    category: "Web & Backend",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Node.js",
      "RESTful APIs",
      "LWC",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, Lambda)", "Azure", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    category: "Data & Analytics",
    skills: ["Matplotlib", "Analytics Dashboards", "Data Preparation"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "AI-Driven Workforce Analytics",
    date: "Jan 2025",
    description: [
      "Built and deployed a multi-user analytics web application supporting role-based access and real-time data visualization.",
      "Owned frontend components and REST API integrations end-to-end.",
      "Improved dashboard accuracy and reduced user-reported errors by 30%.",
    ],
    tags: ["React", "Python", "REST API", "Analytics"],
  },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "AWS Certified Solutions Architect – Associate" },
  { name: "AWS Certified Cloud Practitioner" },
  { name: "PCAP: Programming Essentials in Python" },
  { name: "NPTEL – Cloud Computing" },
];
