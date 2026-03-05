import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProjectListComponent } from './components/project-list/project-list';
import { ExperienceListComponent } from './components/experience-list/experience-list';
import { ContactComponent } from './components/contact/contact'; // Import
import { SkillListComponent } from './components/skill-list/skill-list';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projets', component: ProjectListComponent },
  { path: 'experiences', component: ExperienceListComponent },
  { path: 'skills', component: SkillListComponent },
  { path: 'contact', component: ContactComponent }, // Nouvelle route
  { path: '**', redirectTo: '' }
];