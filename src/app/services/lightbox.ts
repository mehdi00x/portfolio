import { Injectable, signal } from '@angular/core';

export interface LightboxItem {
  src: string;
  title: string;
  description?: string;
  /** true → letterbox the image (logos); false → fill (photos/certs) */
  contain?: boolean;
}

// ── Lightbox state ────────────────────────────────────────────────────
// A single overlay lives at app root and reacts to this signal. Any
// component can call open() to pop up an image with a description.
@Injectable({ providedIn: 'root' })
export class Lightbox {
  readonly item = signal<LightboxItem | null>(null);

  open(item: LightboxItem) {
    this.item.set(item);
  }

  close() {
    this.item.set(null);
  }
}
