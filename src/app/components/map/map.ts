import { Component, OnInit, inject, signal, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { S_LocalisationService } from '../../shared/services/S_Localisation.service';
import { ILocalisation } from '../../shared/models';
import * as L from 'leaflet'; // Import de la librairie

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class MapComponent implements OnInit, AfterViewInit {
  private locService = inject(S_LocalisationService);
  
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  map: L.Map | undefined;
  localisations = signal<ILocalisation[]>([]);

  // Icône personnalisée "Geek" (un simple cercle vert)
  private geekIcon = L.divIcon({
    className: 'custom-div-icon',
    html: "<div style='background-color:#00ff41; width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 10px #00ff41; border: 2px solid #000;'></div>",
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  ngOnInit() {
    this.loadLocations();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  loadLocations() {
    this.locService.getAllLocalisations().subscribe({
      next: (data) => {
        this.localisations.set(data);
        this.addMarkers();
      },
      error: (err) => console.error(err)
    });
  }

  initMap() {
    // Centre par défaut (ex: Afrique de l'Ouest ou (0,0))
    this.map = L.map(this.mapContainer.nativeElement).setView([5.34, -4.03], 3); // Zoom dézoomé

    // Fond de carte "Dark Matter" (Gratuit et style Geek parfait)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);
  }

  addMarkers() {
    if (!this.map) return;

    this.localisations().forEach(loc => {
      // Vérification basique des coordonnées
      if (loc.latitude && loc.longitude) {
        const marker = L.marker([loc.latitude, loc.longitude], { icon: this.geekIcon })
          .addTo(this.map!)
          .bindPopup(`
            <div style="font-family: monospace; color: #000;">
              <b>${loc.ville}, ${loc.pays}</b><br>
              <span style="color: #008F11;">${loc.quartier}</span>
            </div>
          `);
      }
    });
  }
}