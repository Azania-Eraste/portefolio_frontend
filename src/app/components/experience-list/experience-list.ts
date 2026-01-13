import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // DatePipe pour formater les dates
import { S_ExperienceService } from '../../shared/services/S_Experience.service';
import { IExperience } from '../../shared/models';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [CommonModule, DatePipe], // Important d'importer DatePipe
  templateUrl: './experience-list.html',
  styleUrls: ['./experience-list.scss']
})
export class ExperienceListComponent implements OnInit {
  private experienceService = inject(S_ExperienceService);

  // Signal pour stocker la liste
  experiences = signal<IExperience[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit() {
    this.loadExperiences();
  }

  loadExperiences() {
    this.experienceService.getAllExperiences().subscribe({
      next: (data) => {
        // Tri décroissant (Du plus récent au plus vieux)
        const sortedData = data.sort((a, b) => 
          new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime()
        );
        this.experiences.set(sortedData);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur chargement expériences', err);
        this.isLoading.set(false);
      }
    });
  }
}