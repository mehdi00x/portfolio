import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Writeups } from './writeups/writeups';
import { Timeline } from './timeline/timeline';
import { Certifications } from './certifications/certifications';
import { Leadership } from './leadership/leadership';
import { Contact } from './contact/contact';
import { LightboxComponent } from './lightbox/lightbox';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Hero,
    About,
    Skills,
    Projects,
    Writeups,
    Timeline,
    Certifications,
    Leadership,
    Contact,
    LightboxComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
