import { Component, computed, inject, signal } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';
import { PortfolioFilter } from '../services/portfolio-filter';
import { PROJECTS, PROJECT_CATEGORIES, PROJECT_TAGS } from '../data/projects';
import { Project } from '../data/types';

@Component({
  selector: 'app-projects',
  imports: [ScrollReveal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private filter = inject(PortfolioFilter);

  readonly categories = PROJECT_CATEGORIES;
  readonly tags = PROJECT_TAGS;

  readonly activeCategory = this.filter.activeCategory;
  readonly activeTag = this.filter.activeTag;

  /** which card has its full Problem→Result detail expanded */
  readonly expanded = signal<string | null>(null);

  readonly filtered = computed<Project[]>(() => {
    const cat = this.activeCategory();
    const tag = this.activeTag();
    return PROJECTS.filter((p) => {
      const catOk = !cat || p.category === cat;
      const tagOk = !tag || p.tags.includes(tag);
      return catOk && tagOk;
    });
  });

  setCategory(category: string | null) {
    this.filter.setCategory(category);
  }

  toggleTag(tag: string) {
    this.filter.toggleTag(tag);
  }

  clearFilters() {
    this.filter.clear();
  }

  toggleExpand(title: string) {
    this.expanded.update((t) => (t === title ? null : title));
  }

  isExpanded(title: string): boolean {
    return this.expanded() === title;
  }
}
