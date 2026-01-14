import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S_UserService } from '../../shared/services/S_User.service';
import { IUser } from '../../shared/models';
import { RouterModule } from '@angular/router';
import { Api } from '../../shared/based/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private api = inject(S_UserService);
  
  // Signaux pour gérer l'état
  user = signal<IUser | null>(null);
  typedText = signal<string>(''); // Le texte qui s'écrit petit à petit
  isCursorBlinking = signal<boolean>(true);

  ngOnInit() {
    this.loadProfile();
  }

  // ... imports existants

// Ajoute cette méthode dans ta classe HomeComponent
  transformDriveLink(url: string): string {
    if (!url) return '';
    
    // Vérifie si c'est un lien Google Drive standard
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      try {
        // Extrait l'ID du fichier
        // Format standard: https://drive.google.com/file/d/L_ID_DU_FICHIER/view...
        const id = url.split('/file/d/')[1].split('/')[0];
        
        // Retourne le lien de téléchargement direct
        return `https://drive.google.com/uc?export=download&id=${id}`;
      } catch (e) {
        console.warn("Impossible de transformer le lien Drive", e);
        return url;
      }
    }
    return url;
}

  // Dans home.component.ts

  getDriveImage(url: string | null | undefined): string {
    // Sécurité de base
    if (!url) return 'assets/default-avatar.png';

    // Si c'est déjà un lien direct externe (LinkedIn, etc.), on ne touche pas
    if (!url.includes('drive.google.com')) {
      return url;
    }

    // Extraction de l'ID (marche pour les liens /file/d/ et /open?id=)
    let id = '';
    try {
      // Cas 1: https://drive.google.com/file/d/MON_ID/view...
      if (url.includes('/file/d/')) {
        id = url.split('/file/d/')[1].split('/')[0];
      } 
      // Cas 2: https://drive.google.com/open?id=MON_ID
    else if (url.includes('id=')) {
      const params = new URLSearchParams(url.split('?')[1]);
      id = params.get('id') || '';
    }
  } catch (e) {
    console.error("Erreur extraction ID Drive", e);
    return 'assets/default-avatar.png';
  }

  if (id) {
    // C'EST ICI LA MAGIE : Le format lh3.googleusercontent.com/d/
    // Ce lien donne le fichier brut directement, sans redirection complexe
    return `https://lh3.googleusercontent.com/d/${id}`;
  }

  return 'assets/default-avatar.png';
}


  loadProfile() {
    this.api.getProfile().subscribe({
      next: (users) => {
        if (users && users.length > 0) {
          const profile = users[1];
          console.log('Profil utilisateur chargé:', profile);
          

          this.user.set(profile);
          this.startTypewriter(profile.description || "Développeur Fullstack.");
        }
        else {
        // Cas où la base est vide (pas de crash, juste un message)
        console.warn("Aucun profil trouvé en base de données.");
        this.startTypewriter("En attente de configuration du profil... >_");
        }
      },
      error: (err) => {
        console.error("Erreur API:", err);
        this.startTypewriter("Erreur de connexion au serveur... >_");
      }
    });
  }

  startTypewriter(text: string) {
    let i = 0;
    const speed = 50; // Vitesse de frappe en ms

    const typing = setInterval(() => {
      if (i < text.length) {
        this.typedText.update(current => current + text.charAt(i));
        i++;
      } else {
        clearInterval(typing);
        this.isCursorBlinking.set(true); // Curseur clignote à la fin
      }
    }, speed);
  }
}