import { DecimalPipe, JsonPipe } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
// import { environment } from '../../../environments/environment';
import {FullscreenControl, Map, NavigationControl, ScaleControl, setWorkerUrl} from 'maplibre-gl';

@Component({
  selector: 'app-fullsrceen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullsrceen-map-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba($color: 0,0,0, $alpha: 1.0);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})
export class FullsrceenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);

  zoom = signal(14);
  coordinates = signal({
    lng:-99.1907,
    lat:19.5345
  });

  zoomEffect = effect(() => {
    if(!this.map()) return;

    this.map()?.setZoom(this.zoom());
    // this.map()?.zoomTo(this.zoom());

  })

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;
    const {lng, lat} = this.coordinates();

    setWorkerUrl('/maplibre-gl-worker.mjs');

    await new Promise((resolve) => setTimeout(resolve, 80));

    const map = new Map({
        container: element, // container id
        style: 'https://tiles.openfreemap.org/styles/bright', // style URL
        center: [lng, lat], // starting position [lng, lat]
        zoom: this.zoom()// starting zoom
    });

    this.mapListeners( map );
  }

  mapListeners(map: Map){

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      // console.log({center});
      this.coordinates.set(center);
    })

    map.on('load', () => {
      console.log('Map Loaded');
    });

    map.addControl(new FullscreenControl());
    map.addControl(new NavigationControl());
    map.addControl(new ScaleControl);

    this.map.set(map);

  }
}
