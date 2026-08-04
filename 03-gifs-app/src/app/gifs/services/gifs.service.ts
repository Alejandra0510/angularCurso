import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@enviroments/enviroment";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { Gif } from "../interfaces/gif.interface";
import { gifMapper } from "../mapper/gif.mapper";


@Injectable({providedIn: 'root'})
export class GifService {

  //aquí se inyecta el cliente http
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    //Llamada al API con el HTTPCLIENT
    this.http.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20
      },
    })
    .subscribe( (resp) => {
      // console.log({ resp });
      const gifs = gifMapper.mapGiphyItemsToGifArray( resp.data );
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log( { gifs });
    })
  }
}
