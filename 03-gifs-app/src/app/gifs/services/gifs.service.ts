import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap, map, Observable } from "rxjs";

import { environment } from "@enviroments/enviroment";
import { Gif } from './../interfaces/gif.interface';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { gifMapper } from "../mapper/gif.mapper";


const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {

  //crear historial y guardarlo
  //se creó un record de typescript de tipo Gif y con un objeto vacío
  //cuando los valores son dinámicos
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  //guardar las keys de las busquedas que se guardaron en la señal searchHistory
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


  //aquí se inyecta el cliente http
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);


  trendingGifGroup = computed<Gif[][]>(() => {
      const groups = [];
       for (let i = 0; i < this.trendingGifs().length; i +=3) {
        groups.push(this.trendingGifs().slice(i, i +3));
      }
      return groups;
  })

  constructor(){
    this.loadTrendingGifs();
  }

  saveToLocalStorage = effect( () => {
    const historySring = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historySring);
  });

  loadTrendingGifs() {

    if(this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    //Llamada al API con el HTTPCLIENT
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      },
    })
    .subscribe( (resp) => {
      // console.log({ resp });
      const gifs = gifMapper.mapGiphyItemsToGifArray( resp.data );
      this.trendingGifs.update(currentGifs => [
        ...currentGifs,
        ...gifs
      ]);
      this.trendingGifsLoading.set(false);
      this.trendingPage.update( (currentPage) => currentPage + 1 );
    })
  }


  // Tarea
  searchGifs(query: string): Observable<Gif[]>{
    //peticion, mardar el query, y pintarlo en consola con el suscribe
    return this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20
        },
      })
      //operadores rxjs
      //metodo pipe encadena oepradores
      //tap encadena efectos secundarios
      .pipe(
        map( ({ data }) => data),
        map(( item ) => gifMapper.mapGiphyItemsToGifArray( item )),

        //Todo Historial
        tap((item) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: item,
          }));
        })
      );
    }



  getHistoryGifs( query: string ):Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}


