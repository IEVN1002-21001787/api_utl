import { Component } from '@angular/core';
import { MenssageserviceService } from '../menssageservice.service';

@Component({
  selector: 'app-addmenssage',
  standalone: true,
  imports: [],
  templateUrl: './addmenssage.component.html',
  styles: ``
})
export class AddmenssageComponent {

  constructor(public messajeService:MenssageserviceService){}
}
