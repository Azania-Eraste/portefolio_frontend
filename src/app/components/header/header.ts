import { Component, HostListener, signal } from '@angular/core';
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
  isMobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);

  navLinks = [
    { path: '/', label: './home', exact: true },
    { path: '/projets', label: './projects.sh', exact: false },
    { path: '/experiences', label: './career.log', exact: false },
    { path: '/skills', label: './skills', exact: false },
    { path: '/contact', label: './contact', exact: false },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
