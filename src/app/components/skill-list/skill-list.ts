import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILanguage } from '../../shared/models';
import { S_LanguageService } from '../../shared/services/S_Language.service';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-list.html',
  styleUrls: ['./skill-list.scss']
})
export class SkillListComponent implements OnInit {
  private languageService = inject(S_LanguageService);

  // Signal contenant toutes les compétences/langages
  skills = signal<ILanguage[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadSkills();
  }

  private loadSkills() {
    this.isLoading.set(true);
    this.languageService.getAllLanguages().subscribe({
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
}
