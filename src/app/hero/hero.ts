import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CyberBackground } from '../cyber-background/cyber-background';

interface Segment {
  t: string;
  hl?: boolean;
}

@Component({
  selector: 'app-hero',
  imports: [CyberBackground],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, OnDestroy {
  // The command being "typed", then the output lines revealed one by one.
  readonly command = ' cat about.txt';
  readonly outputLines: Segment[][] = [
    [{ t: "> Hello, I'm " }, { t: 'Mehdi Abouelmouahib', hl: true }],
    [{ t: '> Cybersecurity Engineering Student' }],
    [
      { t: '> I explore ' },
      { t: 'low-level systems, reverse engineering, and vulnerability research', hl: true },
    ],
    [{ t: '> Focused on ' }, { t: 'IoT, mobile, and embedded security', hl: true }],
  ];

  readonly typedCmd = signal('');
  readonly cmdDone = signal(false);
  readonly visibleLines = signal(0);
  readonly allDone = signal(false);

  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnInit() {
    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      // No animation: show the finished terminal immediately.
      this.typedCmd.set(this.command);
      this.cmdDone.set(true);
      this.visibleLines.set(this.outputLines.length);
      this.allDone.set(true);
      return;
    }

    this.typeCommand();
  }

  private typeCommand(i = 0) {
    if (i > this.command.length) {
      this.cmdDone.set(true);
      this.revealLines();
      return;
    }
    this.typedCmd.set(this.command.slice(0, i));
    this.timers.push(setTimeout(() => this.typeCommand(i + 1), 45));
  }

  private revealLines(i = 1) {
    if (i > this.outputLines.length) {
      this.timers.push(setTimeout(() => this.allDone.set(true), 200));
      return;
    }
    this.visibleLines.set(i);
    this.timers.push(setTimeout(() => this.revealLines(i + 1), 240));
  }

  ngOnDestroy() {
    this.timers.forEach(clearTimeout);
  }

  scrollTo(selector: string) {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
