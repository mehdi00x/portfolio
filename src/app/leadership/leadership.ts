import { Component } from '@angular/core';
import { ScrollReveal } from '../scroll-reveal';

interface Role {
  title: string;
  org: string;
  period: string;
  description: string;
  image?: string;
  link?: string;
}

@Component({
  selector: 'app-leadership',
  imports: [ScrollReveal],
  templateUrl: './leadership.html',
  styleUrl: './leadership.scss',
})
export class Leadership {
  roles: Role[] = [
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
      image: '/images/fsf.jpg',
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
}
