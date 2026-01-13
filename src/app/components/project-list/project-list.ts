import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject } from '../../shared/models';
import { S_ProjectService } from '../../shared/services/S_Project.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.scss']
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(S_ProjectService);

  // 1. Signal contenant TOUS les projets (données brutes)
  projects = signal<IProject[]>([]);

  // 2. Signal contenant le filtre actif (par défaut 'ALL')
  activeFilter = signal<string>('ALL');

  // 3. Signal CALCULÉ : se met à jour automatiquement quand 'projects' ou 'activeFilter' change
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const allProjects = this.projects();

    if (filter === 'ALL') {
      return allProjects;
    }

    // Filtrage par mot-clé dans le titre ou le résumé
    return allProjects.filter(p => {
      const content = (p.titre + ' ' + p.resume).toUpperCase();
      
      // Logique de mapping des filtres
      if (filter === 'MOBILE') return content.includes('FLUTTER') || content.includes('ANDROID') || content.includes('IOS');
      if (filter === 'WEB') return content.includes('ANGULAR') || content.includes('DJANGO') || content.includes('REACT');
      if (filter === 'BACKEND') return content.includes('PYTHON') || content.includes('API') || content.includes('SQL');
      
      return true;
    });
  });

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
      },
      error: (err) => console.error('Erreur chargement projets', err)
    });
  }

  // Méthode appelée par les boutons HTML
  setFilter(category: string) {
    this.activeFilter.set(category);
  }
}