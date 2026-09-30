import { AfterViewInit, Component, ElementRef, input, signal, viewChild, effect } from '@angular/core';
import { LngLat, Map, Marker, setWorkerUrl } from 'maplibre-gl';
import { of } from 'rxjs';

/**
 * width 100%
 * height 260
 * coordenadas
 */

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles:
  `
    div{
      width: 100%;
      height: 260px;
    }
  `
})
export class MiniMapComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);

  coords = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    setWorkerUrl('/maplibre-gl-worker.mjs');

    const map = new Map({
        container: element, // container id
        style: 'https://tiles.openfreemap.org/styles/bright', // style URL
        center: this.coords(),// starting position [lng, lat]
        zoom: this.zoom(),// starting zoom,
        interactive: false,
        pitch: 30
    });

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const markers = new Marker({
      draggable: false,
      color: color
    })
    .setLngLat(this.coords())
    .addTo(map)


  }
}

