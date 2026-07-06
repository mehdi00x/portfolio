import { Component, HostListener, effect, inject } from '@angular/core';
import { Lightbox } from '../services/lightbox';

@Component({
  selector: 'app-lightbox',
  imports: [],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
})
export class LightboxComponent {
  private lb = inject(Lightbox);
  readonly item = this.lb.item;

  constructor() {
    // Lock background scroll while the overlay is open.
    effect(() => {
      const open = this.item() !== null;
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.item()) this.lb.close();
  }

  close() {
    this.lb.close();
  }
}
