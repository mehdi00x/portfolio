import { Component, inject } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';
import { PortfolioFilter } from '../services/portfolio-filter';
import { SKILL_CATEGORIES } from '../data/skills';
import { PROJECT_TAGS } from '../data/projects';

@Component({
  selector: 'app-skills',
  imports: [ScrollReveal],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private filter = inject(PortfolioFilter);

  categories = SKILL_CATEGORIES;

  /** a skill is clickable only if some project actually uses that tag */
  private linkable = new Set(PROJECT_TAGS);

  hasProjects(tag: string): boolean {
    return this.linkable.has(tag);
  }

  showRelated(tag: string) {
    if (this.hasProjects(tag)) this.filter.filterProjectsByTag(tag);
  }
}
