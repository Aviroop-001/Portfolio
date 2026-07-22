import openinappLogo from "../../assets/images/logos/openinapp.png";
import commerceiqLogo from "../../assets/images/logos/commerceiq.png";
import airbookLogo from "../../assets/images/logos/airbook.png";
import winspleLogo from "../../assets/images/logos/winsple.png";

export const projectsData = [
  {
    id: "0",
    title: "Generative AI & Financial Reporting Platform",
    description:
      "Developed an ensemble ML pipeline (RandomForest, LightGBM, Logistic Regression) with TF-IDF feature engineering & SMOTE for transaction classification. Automates reporting and goal-based spend optimization using GitHub Actions, Gemini, and Gmail API.",
    repo: "https://github.com/Aviroop-001",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "1",
    title: "Blogetra",
    description:
      "A Fullstack Blog app, frontend built on ReactJS, backend REST API Node.js and Express.js, and MongoDB as a Database with CRUD operations and user Authentication",
    liveLink: "https://aviroop-blog-client-aviroop-001.vercel.app/",
    repo: "https://github.com/Aviroop-001/Blogetra",
    image:
      "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "5",
    title: "Collab.io",
    description:
      "Designed a real-time collaborative document editing platform with the ability to track active users. The project had 100+ registered users, boasting REST API response times under 150 milliseconds",
    liveLink: "https://collab-io-lovat.vercel.app/",
    image:
      "https://www.computerhardwareinc.com/wp-content/uploads/2019/04/collaborate-with-colleagues-in-google-docs.jpg",
  },
  {
    id: "2",
    title: "Radius",
    description:
      "A Realtime Chat app, frontend built on ReactJS, backend REST API Node.js and Express.js, MongoDB as a Database, and Socket.io for bi-directional server-client communication",
    liveLink: "https://radius-seven.vercel.app/",
    repo: "https://github.com/Aviroop-001/Radius",
    image:
      "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "3",
    title: "Intelligram",
    description:
      "A Social-media app, built on React Native Expo, with realtime CRUD operations on Firebase, user Authentication and Like functionality",
    liveLink:
      "https://expo.dev/@aviroop/socialApp?serviceType=classic&distribution=expo-go",
    repo: "https://github.com/Aviroop-001/Intelligram",
    image:
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "4",
    title: "User Dashboard",
    description:
      "A realtime User Dashboard for tracking Employees built on React JS, React Query, JSON-server and Tailwind CSS, with features like CRUD, sorting employees etc.",
    liveLink: "https://user-dashboard-phi.vercel.app/",
    repo: "https://github.com/Aviroop-001/User_Dashboard",
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80",
  },
];

export const timelineData = [
  {
    text: "Multi-Agent Fault Localization, Event-Driven Sync & Foundation Libraries",
    bullets: [
      "Built a multi-agent fault localization system using LangGraph with specialized sub-agents that isolate errors from Jira stack traces via lexical + call-graph search, generate candidate fixes, and open PRs behind human approval checkpoints.",
      "Replaced a legacy polling pipeline with an event-driven sync layer using S3 event triggers and AWS Lambda.",
      "Spearheaded the design of a JSON-driven, PostgreSQL-backed template service for AllyAI to assemble dashboards from reusable widgets.",
      "Architected a standardized 'Golden Path' Node.js foundation library adopted across the microservice ecosystem, integrating OpenTelemetry and circuit-breaker patterns."
    ],
    date: "July 2024 – Present",
    position: "Software Development Engineer",
    org: "CommerceIQ",
    icon: commerceiqLogo,
    skills: "LangGraph, Node.js, NestJS, AWS Lambda, PostgreSQL, OpenTelemetry, TypeScript",
    category: {
      tag: "Full-time",
      color: "#0f4c3a",
    },
  },
  {
    text: "RBAC Microservice & Component Provisioning",
    bullets: [
      "Built a NestJS RBAC microservice automating component rendering and role provisioning across internal engineering teams."
    ],
    date: "Jan 2024 – July 2024",
    position: "Software Development Engineer Intern",
    org: "CommerceIQ",
    icon: commerceiqLogo,
    skills: "NestJS, TypeScript, Node.js, RBAC, Software Architecture",
    category: {
      tag: "Internship",
      color: "#180959",
    },
  },
  {
    text: "ETL Pipelines & NLQ-to-SQL System",
    bullets: [
      "Integrated DuckDB and orchestrated high-efficiency ETL pipelines across BigQuery, Redshift, and Supabase.",
      "Developed a Natural Language Query (NLQ) to SQL system utilizing t5-base and Meta CodeLlama-13B-Instruct."
    ],
    date: "Sep 2023 – Jan 2024",
    position: "Software Engineer Intern",
    org: "Airbook",
    icon: airbookLogo,
    skills: "DuckDB, BigQuery, Redshift, Supabase, Python, CodeLlama-13B, NLQ-to-SQL",
    category: {
      tag: "Internship",
      color: "#180959",
    },
  },
  {
    text: "Multi-Modal Recommendation Pipeline",
    bullets: [
      "Orchestrated a multi-modal recommendation pipeline for 11M users, leveraging OpenAI Whisper for speech-to-text extraction from video ads and BERT for semantic entity mapping for automated affiliate link generation."
    ],
    date: "Mar 2023 – Sep 2023",
    position: "Backend Engineer Intern",
    org: "Listed",
    icon: openinappLogo,
    skills: "OpenAI Whisper, BERT, Node.js, Express.js, SQL, Recommendation Systems",
    category: {
      tag: "Internship",
      color: "#180959",
    },
  },
  {
    text: "Developed multiple frontend features for the flagship product",
    bullets: [
      "Engineered responsive UI modules and state management workflows for flagship fintech product."
    ],
    date: "Dec 2022 – March 2023",
    position: "SDE Intern",
    org: "Fi Ellements",
    icon: "https://media.licdn.com/dms/image/C510BAQELrF4Lb0OOpg/company-logo_200_200/0/1546436333837?e=1687996800&v=beta&t=jD4dowgank25ny5a9M5e4FaWAyO8S-kdjU-rNy0vQrQ",
    skills: "ReactJS, Redux, JavaScript",
    category: {
      tag: "Internship",
      color: "#180959",
    },
  },
  {
    text: "Worked in a team of UI/UX Developers to develop fast & responsive websites",
    bullets: [
      "Collaborated with UI/UX engineers to craft high-performance web interfaces."
    ],
    date: "Oct 2022 – Dec 2022",
    position: "Frontend Developer",
    org: "Winsple",
    icon: winspleLogo,
    skills: "HTML, CSS, JavaScript, ReactJS",
    category: {
      tag: "Internship",
      color: "#180959",
    },
  },
  {
    text: "Taught Web Dev to 50+ students, organized 10+ workshops, hackathons",
    bullets: [
      "Led web development workshops and organized hackathons for student developers."
    ],
    date: "2022 – Present",
    position: "Web Development LEAD",
    org: "Google Developer's Student Club",
    icon: "https://media.licdn.com/dms/image/C4D0BAQHgWZO4CpYT6w/company-logo_200_200/0/1629032109185?e=1687996800&v=beta&t=4nRawtisfkbaF9i8MFkKFnEHBAENP91pR6jKLsrQ7Pg",
    skills: "ReactJS, Node.js, Express.js, MongoDB, Microservices",
    category: {
      tag: "Volunteer",
      color: "#5c120f",
    },
  },
  {
    text: "Organized 10+ contests, including International contests with 200+ attendees",
    bullets: [
      "Authored competitive programming problems and setter solutions for international contests."
    ],
    date: "2021 – 2022",
    position: "Problem Setter",
    org: "Codechef",
    icon: "https://media.licdn.com/dms/image/C560BAQGqbQqGLrllzQ/company-logo_200_200/0/1641201041884?e=1687996800&v=beta&t=2oyq76Q-LwG5IpijX7rEe_L0cRSpOy1hEv2DKb0UVn4",
    category: {
      tag: "Volunteer",
      color: "#5c120f",
    },
  },
];

export const educationData = [
  {
    text: "Graduated with 9.34 CGPA",
    date: "2020 - 2024",
    position: "B.Tech in Computer Science and Engineering",
    org: "Maulana Abul Kalam Azad University of Technology",
    icon: "https://media.licdn.com/dms/image/C510BAQF0ldUOAHOqSQ/company-logo_200_200/0/1532854671740?e=1687996800&v=beta&t=HuOXwOMSOSL8bWqr467_SV7FGa18zRC2syXrYswpYnQ",
    category: {
      tag: "University",
      color: "#053b2c",
    },
  },
  {
    text: "Graduated high school with 9.2 CGPA",
    date: "2018 - 2020",
    position: "AISSCE",
    org: "Aditya Academy Sr. Secondary",
    icon: "https://media.licdn.com/dms/image/C510BAQE_4PQKYedENg/company-logo_200_200/0/1556271098214?e=1687996800&v=beta&t=gHQxV-d8OMOHZZR51W_7GQgpoPvCdYqEIaKlQAJ4YgM",
    category: {
      tag: "High School",
      color: "#053b2c",
    },
  },
  {
    text: "Graduated school with 9.1 CGPA",
    date: "- 2018",
    position: "AISSE",
    org: "Aditya Academy Secondary",
    icon: "https://media.licdn.com/dms/image/C510BAQE_4PQKYedENg/company-logo_200_200/0/1556271098214?e=1687996800&v=beta&t=gHQxV-d8OMOHZZR51W_7GQgpoPvCdYqEIaKlQAJ4YgM",
    category: {
      tag: "School",
      color: "#053b2c",
    },
  },
];

// Companies Data for Marquee (Logos Only)
export const companiesData = [
  {
    name: "CommerceIQ",
    logo: commerceiqLogo,
    fallbackText: "CommerceIQ",
    icon: "🛍️"
  },
  {
    name: "OpeninApp",
    logo: openinappLogo,
    fallbackText: "OpeninApp",
    icon: "🚀"
  },
  {
    name: "Airbook", 
    logo: airbookLogo,
    fallbackText: "Airbook",
    icon: "📊"
  },
  {
    name: "Winsple",
    logo: winspleLogo,
    fallbackText: "Winsple",
    icon: "⚡"
  },
  {
    name: "Listed",
    logo: "https://listed.fan/favicon.ico",
    fallbackText: "Listed",
    icon: "🚀"
  },
  {
    name: "Fi Money",
    logo: "https://fi.money/favicon.ico",
    fallbackText: "Fi",
    icon: "💳"
  },
  {
    name: "Google Developer Student Clubs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Google_Developers_logo.svg/512px-Google_Developers_logo.svg.png",
    fallbackText: "GDSC",
    icon: "🌐"
  },
  {
    name: "Codechef",
    logo: "https://cdn.codechef.com/images/cc-logo.svg",
    fallbackText: "CodeChef",
    icon: "👨‍💻"
  }
];

