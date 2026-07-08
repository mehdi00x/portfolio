import { SkillCategory } from './types';

// ── Skills ────────────────────────────────────────────────────────────
// Organised by domain (no fake percentage bars). Each `name` is a
// canonical tag: if it matches a tag used in projects.ts, clicking the
// skill filters the Projects section to the work where it was used.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'Offensive Security',
    file: 'offensive.sh',
    icon: '⚔',
    color: 'green',
    items: [
      { name: 'Reverse Engineering', label: 'Reverse Engineering (Ghidra, GDB)' },
      { name: 'Exploit Dev', label: 'Binary Exploitation — RCE, Buffer Overflow' },
      { name: 'RCE', label: 'Vulnerability Analysis' },
      { name: 'CTF', label: 'CTF: RE / Web / Crypto / OSINT' },
      { name: 'Web', label: 'Web Hacking (Burp Suite, SQLi)' },
    ],
  },
  {
    label: 'Mobile Security',
    file: 'mobile.sh',
    icon: '📱',
    color: 'cyan',
    items: [
      { name: 'Mobile Security', label: 'Android Mobile Pentesting' },
      { name: 'Android', label: 'Android Internals & Components' },
      { name: 'Burp Suite', label: 'Traffic Interception — Burp Suite' },
      { name: 'JADX', label: 'Static Analysis — JADX-GUI' },
      { name: 'Frida', label: 'Runtime Instrumentation — Frida' },
      { name: 'ADB', label: 'Device Control & Rooting — ADB / rootAVD' },
      { name: 'OWASP MASVS', label: 'OWASP MASVS / MASTG' },
    ],
  },
  {
    label: 'Programming',
    file: 'languages.sh',
    icon: '</>',
    color: 'green',
    items: [
      { name: 'Assembly x86-64', label: 'x86-64 Assembly — Advanced' },
      { name: 'Kotlin', label: 'Kotlin — Android' },
      { name: 'Python', label: 'C / Java / Python' },
      { name: 'Syscalls', label: 'Bash Scripting' },
      { name: 'Web', label: 'HTML / CSS / JavaScript' },
      { name: 'Linux', label: 'Linux Administration' },
    ],
  },
  {
    label: 'Systems & Networks',
    file: 'systems.sh',
    icon: '⬡',
    color: 'green',
    items: [
      { name: 'Low-Level', label: 'x86 / Von Neumann Architecture' },
      { name: 'Low-Level', label: 'Intel ISA & CPU Internals' },
      { name: 'Networking', label: 'OSI Model' },
      { name: 'Cryptography', label: 'Cryptography: DES, RSA, ECC, ECDSA' },
      { name: 'Networking', label: 'Protocols: VPN IPsec / SSH / Kerberos' },
    ],
  },
];
