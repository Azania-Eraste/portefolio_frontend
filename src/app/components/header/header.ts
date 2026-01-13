import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  // Signal pour gérer l'ouverture du menu sur mobile
  isMobileMenuOpen = signal<boolean>(false);

  toggleMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  // Ferme le menu quand on clique sur un lien (UX mobile)
  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}