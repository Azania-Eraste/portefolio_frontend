import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header'; // Import
import { BackgroundEffectComponent } from './components/ui/background-effect/background-effect'; // Import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BackgroundEffectComponent], // Ajout dans imports
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'portfolio-geek';
}