import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background-effect',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background-effect.html',
  styleUrls: ['./background-effect.scss']
})
export class BackgroundEffectComponent {
  // Coordonnées de la souris (initialisées au centre)
  mouseX = signal<number>(0);
  mouseY = signal<number>(0);

  // Écoute globale des mouvements de souris
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX.set(e.clientX);
    this.mouseY.set(e.clientY);
  }
}