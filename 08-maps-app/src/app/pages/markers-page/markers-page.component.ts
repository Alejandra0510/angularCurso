import { filter } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { LngLatLike, Map, MapMouseEvent, Marker, setWorkerUrl } from 'maplibre-gl';
import { v4 as UUIDV4 } from 'uuid';

interface Markers{
  id: string,
  mapLibeMarker: Marker
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html'
})

export class MarkersPageComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  map = signal<Map | null>(null);
  markers = signal<Markers[]>([]);

  async ngAfterViewInit() {

    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;

    setWorkerUrl('/maplibre-gl-worker.mjs');

    const map = new Map({
        container: element, // container id
        style: 'https://tiles.openfreemap.org/styles/bright', // style URL
        center: [-99.1268487, 19.4233776],// starting position [lng, lat]
        zoom: 11// starting zoom
    });

    //agregar marcadores
    // const markers = new Marker({
    //   draggable: false,
    //   color: "#000"
    // })
    // .setLngLat([-99.1268487, 19.4233776])
    // .addTo(map)

    this.mapListeners( map );
  }


  mapListeners( map: Map ){
    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }


  mapClick( event: MapMouseEvent ){

    if(!this.map()) return;

    const map = this.map()!;
    const {lat, lng} = event.lngLat;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const markers = new Marker({
      draggable: false,
      color: color
    })
    .setLngLat([lng, lat])
    .addTo(map)

    const newMarker: Markers = {
      id: UUIDV4(),
      mapLibeMarker: markers
    }
    this.markers.set([newMarker, ...this.markers()]);
    //o update
    // this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }

  flyToMarker( lnglat: LngLatLike){
    if(!this.map()) return;

    this.map()?.flyTo({
      center: lnglat,
    })
  }


  deleteMarker( marker: Markers ){
    debugger;
    if(!this.map()) return;

    const map = this.map()!;

    marker.mapLibeMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
