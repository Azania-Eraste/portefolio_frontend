import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S_ContactService } from '../../shared/services/S_Contact.service';
import { MapComponent } from '../map/map'; // Import

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MapComponent], // Import nécessaire pour les formulaires
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(S_ContactService);

  // État du formulaire
  isSending = signal<boolean>(false);
  submitStatus = signal<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  // Définition du formulaire avec validations
  contactForm: FormGroup = this.fb.group({
    nom_complet: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    objet: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSending.set(true);
      this.submitStatus.set('IDLE');

      this.contactService.sendMessage(this.contactForm.value).subscribe({
        next: () => {
          this.isSending.set(false);
          this.submitStatus.set('SUCCESS');
          this.contactForm.reset(); // Vide le formulaire
          
          // Remet le statut à zéro après 5 secondes
          setTimeout(() => this.submitStatus.set('IDLE'), 5000);
        },
        error: (err) => {
          console.error(err);
          this.isSending.set(false);
          this.submitStatus.set('ERROR');
        }
      });
    } else {
      // Marque tous les champs comme "touchés" pour afficher les erreurs rouges
      this.contactForm.markAllAsTouched();
    }
  }
}