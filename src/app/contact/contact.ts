import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollReveal } from '../scroll-reveal';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, ScrollReveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  name = signal('');
  email = signal('');
  message = signal('');
  submitted = signal(false);

  submit() {
    if (!this.name() || !this.email() || !this.message()) return;
    const subject = encodeURIComponent(`Portfolio Contact from ${this.name()}`);
    const body = encodeURIComponent(
      `Name: ${this.name()}\nEmail: ${this.email()}\n\nMessage:\n${this.message()}`
    );
    window.location.href = `mailto:mehdiabouelmouahib10@gmail.com?subject=${subject}&body=${body}`;
    this.submitted.set(true);
  }
}
