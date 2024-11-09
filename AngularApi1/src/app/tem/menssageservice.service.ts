import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenssageserviceService {

  constructor() { }
  alumnos:string[]=['a','b','c']

  add(alumno:string){
    this.alumnos.push(alumno)
  }
}
