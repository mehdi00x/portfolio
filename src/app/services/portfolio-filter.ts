import { Injectable, signal } from '@angular/core';

// ── Shared filter state ───────────────────────────────────────────────
// Lets the Skills section drive the Projects section: clicking a skill
// sets `activeTag` and scrolls to #projects, which reacts to the signal.
@Injectable({ providedIn: 'root' })
export class PortfolioFilter {
  readonly activeCategory = signal<string | null>(null);
  readonly activeTag = signal<string | null>(null);

  setCategory(category: string | null) {
    this.activeCategory.set(category);
  }

  /** Toggle a tag; passing the already-active tag clears it. */
  toggleTag(tag: string | null) {
    this.activeTag.update((current) => (current === tag ? null : tag));
  }

  setTag(tag: string | null) {
    this.activeTag.set(tag);
  }

  clear() {
    this.activeCategory.set(null);
    this.activeTag.set(null);
  }

  /** Filter by a specific tag and scroll the Projects section into view. */
  filterProjectsByTag(tag: string) {
    this.activeCategory.set(null);
    this.activeTag.set(tag);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
}
