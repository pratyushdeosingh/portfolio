export const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' }
] as const;

export const heroTagline =
  'I build clean, accessible interfaces and keep a strong focus on C++, Python, DSA, and real-world problem solving.';

export const aboutParagraphs = [
  "I'm a first-year Computer Science student at VIT Chennai with a strong interest in building and understanding how things work at a deeper level.",
  "I enjoy working with C++ and Python, and I'm currently focused on mastering Data Structures and Algorithms while also exploring web development and real-world projects.",
  "I like solving problems, experimenting with ideas, and continuously improving my skills. My goal is to become a well-rounded developer who can build efficient and meaningful solutions."
];

export const skillGroups = [
  {
    title: 'Languages',
    tags: ['C++', 'Python']
  },
  {
    title: 'Core Concepts',
    tags: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Problem Solving']
  },
  {
    title: 'Tools & Technologies',
    tags: ['Git', 'GitHub', 'Arduino', 'VS Code']
  },
  {
    title: 'Web Development',
    tags: ['HTML', 'CSS (Basics)']
  },
  {
    title: 'Other Skills',
    tags: ['Basic Embedded Systems', 'Debugging', 'Logical Thinking']
  }
] as const;

export const projects = [
  {
    title: 'Smart Helmet for Rider Safety',
    description:
      'An embedded systems project using Arduino and sensors to enhance rider safety. Features include helmet detection, accident alerts, and emergency notifications.',
    tags: ['Arduino', 'C/C++', 'Sensors', 'IoT'],
    icon: 'helmet',
    actions: [
      {
        label: 'Ask for details',
        href: 'mailto:workforpratyush@gmail.com?subject=Smart%20Helmet%20for%20Rider%20Safety'
      }
    ]
  },
  {
    title: 'Portfolio Website',
    description:
      'A modern, responsive portfolio rebuilt with Next.js and React. Features a glassmorphism layout, particle animation, and smooth scroll interactions.',
    tags: ['Next.js', 'React', 'CSS', 'Canvas'],
    icon: 'globe',
    actions: [
      {
        label: 'View Code',
        href: 'https://github.com/pratyushdeosingh/portfolio'
      },
      {
        label: 'Live Demo',
        href: 'https://pratyushdeosingh.netlify.app'
      }
    ]
  },
  {
    title: 'DSA Problem Solving',
    description:
      'Comprehensive practice of Data Structures and Algorithms on LeetCode. Solved 100+ problems covering arrays, trees, graphs, and dynamic programming.',
    tags: ['C++', 'Python', 'Algorithms', 'LeetCode'],
    icon: 'code',
    actions: [
      {
        label: 'View Profile',
        href: 'https://leetcode.com/u/pratyushdeosingh/'
      }
    ]
  }
] as const;

export const timelineEntries = [
  {
    title: 'B.Tech Computer Science',
    organization: 'VIT Chennai',
    period: '2025 - Present',
    description:
      'Currently pursuing Bachelor of Technology in Computer Science and Engineering. Focusing on Data Structures, Algorithms, and core computer science fundamentals.'
  }
] as const;

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
    label: 'Email',
    href: 'mailto:workforpratyush@gmail.com',
    icon: 'mail'
  }
] as const;
