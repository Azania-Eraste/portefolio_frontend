import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICompetence } from '../../shared/models';
import { S_CompetenceService } from '../../shared/services/S_Competence.service';

interface IOption {
  key: string;
  label: string;
}

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-list.html',
  styleUrls: ['./skill-list.scss']
})
export class SkillListComponent implements OnInit {
  private competenceService = inject(S_CompetenceService);

  // Signal contenant toutes les compétences
  skills = signal<ICompetence[]>([]);
  categories = signal<IOption[]>([]);
  activeCategory = signal<string>('ALL');
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadSkills('ALL');
    this.loadCategories();
  }

  setCategory(category: string) {
    this.activeCategory.set(category);
    this.loadSkills(category);
  }

  private loadSkills(category: string) {
    this.isLoading.set(true);

    const request$ =
      category === 'ALL'
        ? this.competenceService.getAllCompetences()
        : this.competenceService.getCompetencesByCategory(category);

    request$.subscribe({
      next: (data) => {
        this.skills.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des compétences:', err);
        this.error.set('Erreur lors du chargement des compétences');
        this.isLoading.set(false);
      }
    });
  }

  private loadCategories() {
    this.competenceService.getCategories().subscribe({
      next: (data: IOption[]) => this.categories.set(data),
      error: (err) => console.error('Erreur chargement catégories', err)
    });
  }
}
