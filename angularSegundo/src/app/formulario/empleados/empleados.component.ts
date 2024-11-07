import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: number;
  nombre: string;
  email: string;
  edad: number;
  horas: number;
  pago: number;
  extra: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadosComponent implements OnInit {

  formulario!: FormGroup;
  empleados: Empleado[] = [];
  totalPagos: number = 0;
  errorMessage: string = '';       
  successMessage: string = '';     
  matriculaModificar: number | null = null;
  matriculaEliminar: number | null = null;
  mostrarTabla: boolean = false;  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.initForm();
    this.cargarEmpleados();
    this.calcularTotalPagos();
  }

  initForm(): FormGroup {
    return this.fb.group({
      matricula: [''],
      nombre: [''],
      email: [''],
      edad: [''],
      horas: ['']
    });
  }

  onSubmit(): void {
    const { matricula, nombre, email, edad, horas } = this.formulario.value;

   
    const matriculaExiste = this.empleados.some(empleado => empleado.matricula === matricula);
    const correoExiste = this.empleados.some(empleado => empleado.email === email);

    if (matriculaExiste && this.matriculaModificar === null) {
        this.errorMessage = 'La matrícula ya existe.';
        this.successMessage = '';  
        return;
    }

    if (correoExiste && this.matriculaModificar === null) {
      this.errorMessage = 'El correo ya existe.';
      this.successMessage = '';  
      return;
    }

     const pagoNormal = this.calcularPagoNormal(horas);
     const pagoExtra = this.calcularPagoExtra(horas);
     const subtotal = pagoNormal + pagoExtra;

     const empleado: Empleado = {
      matricula,
      nombre,
      email,
      edad,
      horas,
      pago: pagoNormal,
      extra: pagoExtra,
      subtotal
     };

     if (this.matriculaModificar !== null) {
      const empleadoIndex = this.empleados.findIndex(e => e.matricula === this.matriculaModificar);
      if (empleadoIndex !== -1) {
          this.empleados[empleadoIndex] = empleado;
      }
      this.matriculaModificar = null;
      this.successMessage = 'Empleado modificado con exito.';
      this.errorMessage = '';  
     } else {
      this.empleados.push(empleado);
      this.successMessage = 'Empleado agregado con exito.';
      this.errorMessage = ''; 
     }

     localStorage.setItem('empleados', JSON.stringify(this.empleados));
     this.calcularTotalPagos();
     this.formulario.reset();
  }

  imprimirTabla(): void {
    this.mostrarTabla = true; 
  }

  cargarEmpleados(): void {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
    }
  }

  calcularPagoNormal(horas: number): number {
    return Math.min(horas, 40) * 70;
  }

  calcularPagoExtra(horas: number): number {
    return Math.max(horas - 40, 0) * 140;
  }

  calcularTotalPagos(): void {
    this.totalPagos = this.empleados.reduce((sum, empleado) => sum + empleado.subtotal, 0);
  }

  buscarEmpleadoPorMatricula(): void {
    if (this.matriculaModificar !== null) {
      const empleado = this.empleados.find(e => e.matricula === this.matriculaModificar);
      if (empleado) {
        this.formulario.patchValue(empleado);  
        this.successMessage = '';  
      } else {
        this.errorMessage = 'no encontrado.';
        this.successMessage = '';  
      }
    }
  }

  eliminarEmpleadoPorMatricula(): void {
    if (this.matriculaEliminar !== null) {
      this.empleados = this.empleados.filter(empleado => empleado.matricula !== this.matriculaEliminar);
      localStorage.setItem('empleados', JSON.stringify(this.empleados));
      this.calcularTotalPagos();
      this.matriculaEliminar = null;
      this.successMessage = 'Empleado eliminado.';
      this.errorMessage = '';  
    }
  }
}
