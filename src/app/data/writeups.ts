import { Writeup } from './types';

// ── Writeups / Research ───────────────────────────────────────────────
// Seeded ONLY with material that actually exists (report PDF, LinkedIn
// post, real CTF). Add your own writeups here — set `link` to a PDF in
// /public/docs, a blog post, or a GitHub repo. Tags reuse the canonical
// names from skills.ts so the tag filter and skill cross-linking work.
export const WRITEUPS: Writeup[] = [
  {
    title: 'RCE Exploitation of a Lua-based FTP Server (CVE-2025-47812)',
    category: 'Vulnerability Research',
    date: '2024',
    readingTime: 'Full report',
    summary:
      'Root-cause analysis and automated proof-of-concept for a remote code execution vulnerability, written up during my 1337 / UM6P internship.',
    tags: ['Reverse Engineering', 'RCE', 'CVE-2025-47812', 'Python', 'Exploit Dev'],
    link: '/docs/Internship-Report.pdf',
    linkLabel: 'Read report',
    featured: true,
  },
  {
    title: 'Building an HTTP Server in x86-64 Assembly',
    category: 'Low-Level & Systems',
    date: '2024',
    readingTime: '4 min',
    summary:
      'How a working HTTP server is built from raw Linux syscalls with no libraries — and what it teaches about the OS/CPU boundary.',
    tags: ['Assembly x86-64', 'Linux', 'Syscalls', 'Networking'],
    link: 'https://www.linkedin.com/posts/mehdi-abouelmouahib-52b161254_%F0%9D%97%95%F0%9D%98%82%F0%9D%97%B6%F0%9D%97%B9%F0%9D%97%B1%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%B4-%F0%9D%97%AE-%F0%9D%97%95%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%AE%F0%9D%97%BF%F0%9D%98%86-%F0%9D%97%9B%F0%9D%97%A7%F0%9D%97%A7%F0%9D%97%A3-ugcPost-7375533103110586368-8edC?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6ru7MB0ImEKKsjQEdxEhIuFqFnNGGpIJw',
    linkLabel: 'View post',
    featured: true,
  },
];
