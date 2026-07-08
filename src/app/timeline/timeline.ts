import { Component } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';

interface TimelineItem {
  type: 'work' | 'edu';
  title: string;
  org: string;
  date: string;
  points: string[];
  image?: string;
}

@Component({
  selector: 'app-timeline',
  imports: [ScrollReveal],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  items: TimelineItem[] = [
    {
      type: 'work',
      title: 'Technical Internship',
      org: '1337 / UM6P — Morocco',
      date: '2024',
      points: [
        'RCE vulnerability research & exploit development',
        'Analyzed CVE-2025-47812 affecting a Lua-based FTP server',
      ],
      image: '/images/1337.jpg',
    },
  
    {
      type: 'work',
      title: 'Network Infrastructure Internship',
      org: 'SGBS — Agadir',
      date: 'Jul – Aug 2024',
      points: [
        'OSI protocols study & implementation',
        'Packet Tracer network simulations',
      ],
      image: '/images/sgbs.png',
    },
    {
      type: 'edu',
      title: 'Engineering Degree — Computer Science & Cybersecurity',
      org: 'ENSA Agadir',
      date: '2022 – 2027',
      points: [
        'Specialty: Security & Digital Trust',
        'Includes 2 years of integrated preparatory classes',
      ],
      image: '/images/mehdi_at_ensa.jpeg',
    },
    {
      type: 'edu',
      title: 'Baccalauréat Sciences Mathématiques B',
      org: 'Al-Idrissi Technical High School - Agadir',
      date: '2022',
      points: [],
      image: '/images/idrissi_schoole.jpg',
    },
  ];
}
