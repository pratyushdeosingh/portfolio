export const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
];

export const heroTagline =
  'I build clean, accessible interfaces and keep a strong focus on C++, Python, DSA, and real-world problem solving. Currently exploring web development with HTML, CSS, JavaScript, and databases.';

export const aboutParagraphs = [
  "I'm a Computer Science undergraduate at VIT Chennai with a strong interest in building things and understanding how they work at a deeper level.",
  'My first year gave me a solid foundation in programming. I work with C, C++, Python, and Java, and I am currently focused on mastering Data Structures and Algorithms.',
  'I am actively learning web development with HTML, CSS, JavaScript, and database management. I enjoy solving problems, experimenting with ideas, and continuously improving my skills to become a well-rounded developer.'
];

export const skillGroups = [
  {
    title: 'Languages',
    tags: ['C', 'C++', 'Python', 'Java'],
    proficiency: 85
  },
  {
    title: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'React (Learning)'],
    proficiency: 60
  },
  {
    title: 'Core Concepts',
    tags: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Problem Solving'],
    proficiency: 80
  },
  {
    title: 'Tools & Technologies',
    tags: ['Git', 'GitHub', 'VS Code', 'Database Management'],
    proficiency: 70
  }
];

export const projects = [
  {
    title: 'ARGUS — Financial Fraud Intelligence',
    description:
      'A fraud-detection prototype that ingests payments, flags suspicious money movement with rules and a graph model, and streams explainable risk scores to a live analyst dashboard. Built with a team of four on synthetic data.',
    tags: ['Python', 'TypeScript', 'Graph ML', 'WebSockets', 'Docker'],
    icon: 'shield',
    actions: [
      {
        label: 'View Code',
        href: 'https://github.com/pratyushdeosingh/ARGUS_CSI',
        external: true
      }
    ]
  },
  {
    title: 'PRATIN — Agentic Invoice Financing',
    description:
      'A simulated marketplace for supply-chain working capital. It reads an invoice PDF, runs explainable risk checks, lets autonomous capital-provider agents price offers, then ranks and settles them. Built with a team of three.',
    tags: ['Python', 'React', 'TypeScript', 'AI Agents', 'Docker'],
    icon: 'landmark',
    actions: [
      {
        label: 'View Code',
        href: 'https://github.com/pratyushdeosingh/PRATIN',
        external: true
      }
    ]
  },
  {
    title: 'Care Continuum — Telemedicine & EHR',
    description:
      'A telemedicine and health-records app covering patients, appointments, prescriptions, lab results and billing across 18 Oracle tables, with PL/SQL triggers that reject allergy-conflicting medicines and a Cassandra patient timeline. A three-person DBMS course project.',
    tags: ['React', 'Express', 'Oracle', 'PL/SQL', 'Cassandra'],
    icon: 'stethoscope',
    actions: [
      {
        label: 'Live Demo',
        href: 'https://telemedicine-consultation-ehr-syste.vercel.app',
        external: true
      },
      {
        label: 'View Code',
        href: 'https://github.com/pratyushdeosingh/telemedicine-consultation-ehr-system',
        external: true
      }
    ]
  },
  {
    title: 'Smart Safety Helmet',
    description:
      'An IoT helmet that detects crashes with an MPU6050 motion sensor and triggers a cancellable emergency alert. Arduino firmware streams GPS and motion data through a Node.js bridge to a real-time React dashboard.',
    tags: ['Arduino', 'C++', 'React', 'TypeScript', 'Node.js'],
    icon: 'helmet',
    actions: [
      {
        label: 'View Code',
        href: 'https://github.com/pratyushdeosingh/mdp',
        external: true
      }
    ]
  },
  {
    title: 'Portfolio Website',
    description:
      'This site. A fast, responsive portfolio built with Next.js, React, and Tailwind CSS, with an interactive canvas background and scroll-driven motion.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Canvas'],
    icon: 'globe',
    actions: [
      {
        label: 'View Code',
        href: 'https://github.com/pratyushdeosingh/portfolio',
        external: true
      },
      {
        label: 'Live Demo',
        href: 'https://pratyushdeosingh.netlify.app',
        external: true
      }
    ]
  },
  {
    title: 'DSA Problem Solving',
    description:
      'Ongoing practice of Data Structures and Algorithms on LeetCode, covering arrays, trees, graphs, and dynamic programming.',
    tags: ['C++', 'Python', 'Algorithms', 'LeetCode'],
    icon: 'code',
    actions: [
      {
        label: 'View Profile',
        href: 'https://leetcode.com/u/pratyushdeosingh/',
        external: true
      }
    ]
  }
];

export const timelineEntries = [
  {
    title: 'B.Tech, Computer Science and Engineering',
    organization: 'Vellore Institute of Technology, Chennai',
    period: '2025 — 2029',
    description:
      'Currently pursuing my degree. Coursework so far covers programming in C and C++, data structures, database systems, discrete mathematics, and digital logic design. Active member of coding clubs and hackathon participant.',
    tags: ['C', 'C++', 'DSA', 'DBMS', 'Discrete Math', 'Digital Logic']
  },
  {
    title: 'Senior Secondary Education',
    organization: 'DAV Centenary Public School',
    period: '2023 — 2025',
    description:
      'Completed my schooling here, where I first got into programming with C++ and Python.',
    tags: ['C++', 'Python']
  }
];

export const faqItems = [
  {
    question: 'What technologies do you currently work with?',
    answer:
      'I primarily work with C, C++, Python, and Java for programming fundamentals and problem solving. I am actively learning web development with HTML, CSS, JavaScript, and database management systems.'
  },
  {
    question: 'Are you open to internships or collaborations?',
    answer:
      'Yes! I am always eager to learn and contribute to real-world projects. Feel free to reach out via email or LinkedIn — I typically respond within 24 hours.'
  },
  {
    question: 'What is your current academic status?',
    answer:
      'I have completed my first year of B.Tech Computer Science at VIT Chennai and am continuing my studies with a focus on software development and web technologies.'
  },
  {
    question: 'How can I contact you?',
    answer:
      'The best way is through email at workforpratyush@gmail.com or via LinkedIn. You can also use the contact form on this site.'
  }
];

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/pratyushdeosingh',
    icon: 'github'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/pratyushdeosingh/',
    icon: 'linkedin'
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/pratyushdeosingh/',
    icon: 'leetcode'
  },
  {
    label: 'Email',
    href: 'mailto:workforpratyush@gmail.com',
    icon: 'mail'
  }
];

export const contactEmail = 'workforpratyush@gmail.com';

export const highlights = [
  { label: 'Current focus', value: 'Data Structures & Algorithms' },
  { label: 'Building', value: 'Full-stack & AI projects' },
  { label: 'Based in', value: 'Chennai, India' }
];

export const marqueeItems = [
  'C++',
  'Python',
  'Java',
  'Data Structures',
  'Algorithms',
  'JavaScript',
  'React',
  'Next.js',
  'Arduino',
  'Git',
  'Problem Solving'
];
