import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
// import { environment } from '../../../environments/environment';
import {Map, setWorkerUrl} from 'maplibre-gl';


@Component({
  selector: 'app-fullsrceen-map-page',
  imports: [],
  templateUrl: './fullsrceen-map-page.component.html',
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }
  `,
})
export class FullsrceenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    // await new Promise(( resolve ) => setTimeout(() => {
    //   debugger;
    //   resolve
    // }, 80));

    console.log('Ya se cargo');

    const element = this.divElement()!.nativeElement;
    setWorkerUrl('/maplibre-gl-worker.mjs');

    const map = new Map({
        container: element, // container id
        style: 'https://tiles.openfreemap.org/styles/bright', // style URL
        center: [-99.1907, 19.5345], // starting position [lng, lat]
        zoom: 13

         // starting zoom
    });
    console.log(map);

  }
}
