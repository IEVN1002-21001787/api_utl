import { Component } from '@angular/core';
import { messageService } from '../messageservice.service';

@Component({
  selector: 'app-addmessage',
  standalone: true,
  imports: [],
  templateUrl: './addmessage.component.html',
  styles: ``
})
export class AddmessageComponent {

  constructor(public messageService : MessageserviceService ) { } 
}
