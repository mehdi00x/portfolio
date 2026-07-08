// ── Shared content types ──────────────────────────────────────────────
// All portfolio content is defined against these interfaces so sections
// render from /data/* instead of hardcoded markup. Update the data files;
// the components pick the changes up automatically.

export type ProjectCategory =
  | 'Vulnerability Research'
  | 'Mobile Security'
  | 'Low-Level & Systems'
  | 'Reverse Engineering'
  | 'CTF'
  | 'Networking';

export interface ProjectLinks {
  github?: string;
  writeup?: string;
  demo?: string;
  report?: string;
}

export interface Project {
  title: string;
  category: ProjectCategory;
  date: string;
  context: string;
  /** terminal-style filename shown in the card header */
  file: string;
  summary: string;
  problem: string;
  work: string;
  tools: string[];
  result: string;
  /** tags used by the tag filter and by skill → project cross-linking */
  tags: string[];
  image?: string;
  /** CSS object-position for the card image (default 'center') */
  imagePosition?: string;
  links?: ProjectLinks;
  featured?: boolean;
}

export interface SkillItem {
  /** canonical tag — must match project/writeup tags for cross-linking */
  name: string;
  /** optional longer label shown in the list (defaults to name) */
  label?: string;
}

export interface SkillCategory {
  label: string;
  file: string;
  icon: string;
  color: 'green' | 'cyan';
  items: SkillItem[];
}

export interface Writeup {
  title: string;
  category: string;
  date: string;
  readingTime: string;
  summary: string;
  tags: string[];
  /** external artifact backing this writeup (report PDF, post, repo…) */
  link?: string;
  /** human label for the link, e.g. "Read report", "View post" */
  linkLabel?: string;
  featured?: boolean;
}
