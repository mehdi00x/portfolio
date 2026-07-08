import { Component, inject, signal } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';
import { Lightbox } from '../services/lightbox';

interface Role {
  title: string;
  org: string;
  period: string;
  description?: string;
  image?: string;
  /** two images shown split half-and-half in one frame */
  images?: string[];
  link?: string;
  /** optional expandable "show details" lines (terminal style) */
  details?: string[];
  /** small badge, e.g. a competition tag */
  badge?: string;
}

@Component({
  selector: 'app-leadership',
  imports: [ScrollReveal],
  templateUrl: './leadership.html',
  styleUrl: './leadership.scss',
})
export class Leadership {
  private lightbox = inject(Lightbox);

  roles: Role[] = [
    {
      title: 'CTF — GCDSTE Finalist',
      org: 'ENSA Marrakech',
      period: 'April 2025',
      badge: '🚩 Competition',
      description:
        'National Capture The Flag competition spanning Reverse Engineering, Cryptography, Web and OSINT.',
      image: '/images/CTF.jpeg',
      details: [
        'Reached the finals — top 25 of 75 teams',
        'Ranked 7th in the qualification round',
        'Categories: Reverse Engineering · Cryptography · Web · OSINT',
        'Fast triage & teamwork under a strict time budget',
      ],
    },
    {
      title: 'President — ADE ENSA Agadir',
      org: 'ADE ENSA Agadir',
      period: 'Jul 2025 – present',
      description:
        'Led resolution of an institutional crisis: 128 students at risk of repeating a year → 99 reintegrated after negotiations with school administration.',
      image: '/images/ade.png',
      link: 'https://www.instagram.com/ade.ensaa/',
    },
    {
      title: 'General Coordinator — South Meeting Olympiad 8th ed.',
      org: 'Southern Morocco',
      period: 'Feb 2025',
      description: 'Coordinated the largest university sports event in Southern Morocco.',
      image: '/images/activity_olympiad_8thEdition_Coordinator.jpeg',
      link: 'https://www.instagram.com/smo_ensaa/',
    },
    {
      title: 'Int. & Ext. Relations Manager — AppsClub',
      org: 'AppsClub ENSA Agadir',
      period: 'Jul 2024 – Jul 2025',
      description: '',
      image: '/images/AppsClub.jpeg',
      link: 'https://www.instagram.com/appsclub.ensaa/',
    },
    {
      title: 'Trainer',
      org: 'Club FSF ENSA Agadir',
      period: 'Jan 2024 – Feb 2026',
      description: '',
      images: ['/images/fsf.jpg', '/images/fsf.jpeg'],
      link: 'https://www.instagram.com/fsfclub_ensaa/',
    },
    {
      title: 'Logistics Manager — South Meeting Olympiad 7th ed.',
      org: 'Southern Morocco',
      period: 'Feb 2024',
      description: '',
      image: '/images/TEAM.png',
      link: 'https://www.instagram.com/smo_ensaa/',
    },
    {
      title: 'Events Manager — ADE ENSA Agadir',
      org: 'ADE ENSA Agadir',
      period: 'Jul 2023 – Jul 2024',
      description: '',
      image: '/images/BDE_evenementiel.jpeg',
      link: 'https://www.instagram.com/ade.ensaa/',
    },
  ];

  private expandedId = signal<string | null>(null);

  toggleDetails(title: string) {
    this.expandedId.update((t) => (t === title ? null : title));
  }

  isExpanded(title: string): boolean {
    return this.expandedId() === title;
  }

  openImage(src: string, role: Role) {
    this.lightbox.open({
      src,
      title: role.title,
      description:
        role.description ||
        `${role.org} · ${role.period}`,
    });
  }
}
