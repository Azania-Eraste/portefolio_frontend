import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { S_UserService } from './shared/services/S_User.service'; // Vérifie le chemin
import { LoadingComponent } from './components/loading/loading';
import { HeaderComponent } from './components/header/header';
import { BackgroundEffectComponent } from './components/ui/background-effect/background-effect';

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANT : Ajoute tes composants ici
  imports: [CommonModule, RouterOutlet, LoadingComponent, HeaderComponent, BackgroundEffectComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  // 1. On injecte le service dans une variable PUBLIQUE
  public userService = inject(S_UserService);

  mouseX = 0;
  mouseY = 0;

  // Gestion du curseur
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
}