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
        console.log('Compétences chargées:', data);
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

  /**
   * Génère une URL d'icône à partir du nom de la compétence
   * Utilise plusieurs CDN publics avec fallback
   */
  getCompetenceIcon(competence: ICompetence): string {
    // Si une icône URL est fournie et valide, on l'utilise
    if (competence.icone_url && this.isValidImageUrl(competence.icone_url)) {
      return competence.icone_url;
    }

    // Sinon, on génère automatiquement l'icône depuis un CDN
    const nomLower = competence.nom.toLowerCase().trim();
    
    // Mapping manuel pour les cas spéciaux
    const iconMap: { [key: string]: string } = {
      'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
      'php': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      'ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
      'go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      'rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
      'swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
      'kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      
      // Frameworks
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      'vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
      'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
      'spring': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'node': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      
      // Bases de données
      'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      'sqlite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      
      // Outils
      'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      'linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      'vscode': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
      'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      'photoshop': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
    };

    // Cherche dans le mapping
    if (iconMap[nomLower]) {
      return iconMap[nomLower];
    }

    // Essaie de construire automatiquement l'URL DevIcons
    const cleanName = nomLower.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanName}/${cleanName}-original.svg`;
  }

  /**
   * Vérifie si l'URL est une image valide
   */
  private isValidImageUrl(url: string): boolean {
    if (!url) return false;
    
    // Vérifie que ce n'est pas une page web générique
    if (url.includes('facebook.com') || 
        url.includes('twitter.com') || 
        url.includes('linkedin.com') ||
        !url.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/i) && !url.includes('cdn')) {
      return false;
    }
    
    return true;
  }
}
