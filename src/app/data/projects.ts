import { Project } from './types';

// ── Projects ──────────────────────────────────────────────────────────
// Real projects only. To add a new one, copy an entry and fill every
// field — `tags` must reuse the canonical tool names from skills.ts so
// clicking a skill filters to the matching projects.
export const PROJECTS: Project[] = [
  {
    title: 'RCE Vulnerability Analysis & Automated PoC',
    category: 'Vulnerability Research',
    date: '2024',
    context: 'Technical Internship — 1337 / UM6P, Morocco',
    file: 'rce_analysis.py',
    summary:
      'End-to-end analysis and automated exploitation of a real-world RCE (CVE-2025-47812) in a Lua-based FTP server.',
    problem:
      'A Lua-based FTP server was affected by CVE-2025-47812, a remote code execution vulnerability. The goal was to understand the root cause and reproduce the full exploit chain in a controlled environment.',
    work:
      'Reverse-engineered the vulnerable program to locate the flaw, reconstructed the exploit chain step by step, and wrote an automated Python proof-of-concept for repeatable, controlled testing.',
    tools: ['Python', 'Ghidra', 'GDB', 'Linux'],
    result:
      'Reproduced the exploit reliably and documented root cause and mitigations in a full internship report.',
    tags: ['Reverse Engineering', 'Python', 'CVE-2025-47812', 'Exploit Dev', 'RCE', 'Ghidra', 'GDB'],
    image: '/images/1337_Internship.jpg',
    links: { report: '/docs/Internship-Report.pdf' },
    featured: true,
  },
  {
    title: 'HTTP Server in x86-64 Assembly',
    category: 'Low-Level & Systems',
    date: '2024',
    context: 'Personal Project',
    file: 'http_server.asm',
    summary:
      'A minimal HTTP server written from scratch in x86-64 assembly using raw Linux syscalls — zero external libraries.',
    problem:
      'Understand how networking, the operating system, and the CPU actually cooperate to serve an HTTP request, without any abstraction layer hiding the details.',
    work:
      'Implemented the server directly on raw syscalls (socket, bind, listen, accept, read, write) in x86-64 assembly under Linux, managing the request/response loop by hand.',
    tools: ['Assembly x86-64', 'Linux', 'GDB'],
    result:
      'A working from-scratch HTTP server and a deep, practical grasp of the syscall interface and CPU/OS interaction.',
    tags: ['Assembly x86-64', 'Linux', 'Syscalls', 'Networking', 'Low-Level'],
    image: '/images/http.png',
    links: {
      demo: 'https://www.linkedin.com/posts/mehdi-abouelmouahib-52b161254_%F0%9D%97%95%F0%9D%98%82%F0%9D%97%B6%F0%9D%97%B9%F0%9D%97%B1%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%B4-%F0%9D%97%AE-%F0%9D%97%95%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%AE%F0%9D%97%BF%F0%9D%98%86-%F0%9D%97%9B%F0%9D%97%A7%F0%9D%97%A7%F0%9D%97%A3-ugcPost-7375533103110586368-8edC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6ru7MB0ImEKKsjQEdxEhIuFqFnNGGpIJw',
    },
    featured: true,
  },
  {
    title: 'CTF — GCDSTE Finalist',
    category: 'CTF',
    date: 'April 2025',
    context: 'ENSA Marrakech',
    file: 'ctf_writeup.md',
    summary:
      'Qualified among the top 25 of 75 teams (7th in qualifications) across RE, Crypto, Web and OSINT challenges.',
    problem:
      'Compete against 75 teams in a time-boxed Capture The Flag spanning reverse engineering, cryptography, web and OSINT categories.',
    work:
      'Solved challenges across all four categories under time pressure, coordinating with the team on splitting and prioritising tasks.',
    tools: ['Ghidra', 'GDB', 'Burp Suite', 'Python'],
    result:
      'Ranked 7th in qualifications and reached the finals in the top 25 of 75 teams.',
    tags: ['CTF', 'Reverse Engineering', 'Cryptography', 'Web', 'OSINT'],
    image: '/images/CTF.jpeg',
    featured: false,
  },
];

/** Distinct categories present in the data, in a stable display order. */
export const PROJECT_CATEGORIES: string[] = (() => {
  const order: string[] = [
    'Vulnerability Research',
    'Reverse Engineering',
    'Low-Level & Systems',
    'CTF',
    'Networking',
  ];
  const present = new Set(PROJECTS.map((p) => p.category));
  return order.filter((c) => present.has(c as Project['category']));
})();

/** Distinct tags across all projects, sorted for the tag filter bar. */
export const PROJECT_TAGS: string[] = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tags)),
).sort((a, b) => a.localeCompare(b));
