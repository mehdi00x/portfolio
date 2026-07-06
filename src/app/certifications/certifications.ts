import { Component, inject } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';
import { Lightbox } from '../services/lightbox';

interface Cert {
  name: string;
  issuer: string;
  icon: string;
  date: string;
  /** full certificate image (rendered cover, opens in lightbox) */
  image?: string;
  /** brand logo (rendered contained, opens in lightbox) */
  logo?: string;
  description: string;
}

@Component({
  selector: 'app-certifications',
  imports: [ScrollReveal],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss',
})
export class Certifications {
  private lightbox = inject(Lightbox);

  certs: Cert[] = [
    {
      name: 'ISO/IEC 27001 Information Security Associate',
      issuer: 'SkillFront',
      icon: '🔐',
      date: 'Oct 2025',
      image: '/certs/iso27001.jpg',
      description:
        'ISO/IEC 27001 Information Security Associate — foundations of information security management systems (ISMS), risk, and controls.',
    },
    {
      name: 'Pre Security',
      issuer: 'TryHackMe',
      icon: '🛡',
      date: 'Mar 2025',
      image: '/certs/tryhackme-pre.jpg',
      description:
        'TryHackMe Pre Security path — networking, the web, Linux, and Windows fundamentals that underpin offensive and defensive security.',
    },
    {
      name: 'Introduction to Cyber Security',
      issuer: 'TryHackMe',
      icon: '🛡',
      date: 'Jun 2024',
      image: '/certs/tryhackme-intro.jpg',
      description:
        'TryHackMe Introduction to Cyber Security — offensive and defensive security concepts and a first hands-on tour of the field.',
    },
    {
      name: 'IP Addressing & Subnetting',
      issuer: 'Udemy',
      icon: '🌐',
      date: 'Sep 2024',
      image: '/certs/udemy-subnetting.jpg',
      description:
        'Udemy course on IP addressing and subnetting — CIDR, VLSM, and designing network address plans.',
    },
    {
      name: 'Computer 101',
      issuer: 'pwn.college',
      icon: '🔒',
      date: '',
      logo: '/images/pwncollege.png',
      description:
        'pwn.college Computer 101 — foundational computer architecture and low-level systems: assembly, memory, and how programs really run.',
    },
    {
      name: 'C / C++ Intermediate',
      issuer: 'SoloLearn',
      icon: '💻',
      date: '',
      logo: '/images/sololearn.png',
      description:
        'SoloLearn C / C++ Intermediate — pointers, memory management, and intermediate programming concepts in C and C++.',
    },
  ];

  platforms = ['pwn.college', 'TryHackMe'];

  openCert(cert: Cert) {
    const src = cert.image ?? cert.logo;
    if (!src) return;
    this.lightbox.open({
      src,
      title: `${cert.name} — ${cert.issuer}`,
      description: cert.description,
      contain: !!cert.logo,
    });
  }
}
