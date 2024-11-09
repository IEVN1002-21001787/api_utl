import { Pipe, PipeTransform } from '@angular/core';
import { Alumnos } from './alumnos';
@Pipe({
  name: 'alumnosFilter',
  standalone: true
})
export class AlumnosFilterPipe implements PipeTransform {

  transform(value: Alumnos[], args: string): Alumnos[] {
    let filter:string=args ?args.toLocaleLowerCase():'';
 
    return filter? value.filter((alumno:Alumnos)=>
    alumno.nombre.toLocaleLowerCase().indexOf(filter)!=-1
    ):value;
  }

}
