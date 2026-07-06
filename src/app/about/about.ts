import { Component, inject } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';
import { Lightbox } from '../services/lightbox';

@Component({
  selector: 'app-about',
  imports: [ScrollReveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private lightbox = inject(Lightbox);

  openPhoto() {
    this.lightbox.open({
      src: '/images/profile.png',
      title: 'Mehdi Abouelmouahib',
      description:
        'Cybersecurity engineering student at ENSA Agadir (Security & Digital Trust), focused on low-level systems, reverse engineering, and vulnerability research.',
    });
  }
}
