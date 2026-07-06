import { Component, computed, signal } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';
import { WRITEUPS } from '../data/writeups';
import { Writeup } from '../data/types';

@Component({
  selector: 'app-writeups',
  imports: [ScrollReveal],
  templateUrl: './writeups.html',
  styleUrl: './writeups.scss',
})
export class Writeups {
  readonly all = WRITEUPS;

  readonly tags = Array.from(new Set(WRITEUPS.flatMap((w) => w.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

  readonly activeTag = signal<string | null>(null);

  readonly filtered = computed<Writeup[]>(() => {
    const tag = this.activeTag();
    return tag ? this.all.filter((w) => w.tags.includes(tag)) : this.all;
  });

  toggleTag(tag: string) {
    this.activeTag.update((t) => (t === tag ? null : tag));
  }
}
