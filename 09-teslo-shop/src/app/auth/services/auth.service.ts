import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, subscribeOn, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User } from '@auth/interfaces/user.interface';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const url_api = environment.urlApi;

@Injectable({providedIn: 'root'})
export class AuthService {

  private _authSatus = signal<AuthStatus>('checking');
  private _user      = signal<User | null>(null);
  private _token     = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  //Validar el estatus de la autentificación
  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if(this._authSatus() === 'checking') return 'checking';
    if(this._user()) return 'authenticated';
    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  login(email: string, pass: string): Observable<boolean>{
    return this.http.post<AuthResponse>(`${ url_api }/auth/login`,{
      email: email,
      password: pass
    })
    .pipe(
      // tap((resp) => this.handleOutSuccess(resp)),
      map((resp) => this.handleOutSuccess(resp)),
      catchError((error:any) => this.handleAuthError(error))
    )
  }

  checkStatus():Observable<boolean>{
    const token = localStorage.getItem('token');
    if(!token){
      this.logOut();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${url_api}/auth/check-status`, {
      // headers:{
      //   Authorization: `Bearer ${token}`,
      // }
    })
    .pipe(
      map((resp) => this.handleOutSuccess(resp)),
      catchError((error:any) => this.handleAuthError(error))
    )
  }


  logOut(){
    this._user.set(null);
    this._token.set(null);
    this._authSatus.set('not-authenticated');

    // localStorage.clear();
    localStorage.removeItem('token');
  }



  register(email: string, password: string, fullname: string):Observable<boolean>{
    return this.http.post<AuthResponse>(`${url_api}/auth/register`,{
      email: email,
      password: password,
      fullName: fullname
    })
    .pipe(
      map((resp) => this.handleOutSuccess(resp)),
      catchError((error:any) => this.handleAuthError(error))
    )
  }


  private handleOutSuccess( resp: AuthResponse){
      this._authSatus.set('authenticated');
      this._user.set(resp.user);
      this._token.set(resp.token);

      // guardar en localstorage
      localStorage.setItem('token', resp.token);
      return true;
  }

  private handleAuthError(error: any){
    this.logOut();
    return of(false);
  }
}
