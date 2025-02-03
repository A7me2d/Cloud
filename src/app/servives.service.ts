import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServivesService {

  constructor() { }

api: string = 'https://673728afaafa2ef22232dd7f.mockapi.io/Mapi';

getData(){
  return fetch(this.api);

}

}
