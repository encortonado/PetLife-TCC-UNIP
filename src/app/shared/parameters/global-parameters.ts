import { AuthenticateResponse } from './../../models/authenticate-response';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalParameters {

  public auth: AuthenticateResponse;

  constructor() {}



    public getUsuarioLogado() {
        return this.auth;
    }

    public setUsuarioLogado(usuario) {
        this.auth = usuario;
    }

    public removeUsuarioLogado() {
        this.auth = null;
    }

}
