import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject, IProjectType } from '../../shared/models';
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

  // Types de projet exposés par le backend
  projectTypes = signal<IProjectType[]>([]);

  // 2. Signal contenant le filtre actif (par défaut 'ALL')
  activeFilter = signal<string>('ALL');

  // 3. Signal CALCULÉ : se met à jour automatiquement quand 'projects' ou 'activeFilter' change
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const allProjects = this.projects();

    if (filter === 'ALL') {
      return allProjects;
    }

    // Filtrage par type_de_projet
    return allProjects.filter(p => p.type_de_projet === filter);
  });

  ngOnInit() {
    this.loadProjects();
    this.loadProjectTypes();
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

  loadProjectTypes() {
    this.projectService.getProjectTypes().subscribe({
      next: (types) => this.projectTypes.set(types),
      error: (err) => console.error('Erreur chargement types de projet', err)
    });
  }
}
