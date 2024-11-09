import { Component } from '@angular/core';
import { TemahComponent } from "../temah/temah.component";

@Component({
  selector: 'app-temap',
  standalone: true,
  imports: [TemahComponent],
  templateUrl: './temap.component.html',
  styles: ``
})
export class TemapComponent {
  title = 'Hola desde papa';
  menasaje2:string=""
  recibirMensaje(mensaje:string){
    this.menasaje2=mensaje;     
  }
}
