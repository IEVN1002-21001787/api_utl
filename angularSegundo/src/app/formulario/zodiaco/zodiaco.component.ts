import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Signos {
  nombre: string;
  apaterno: string;
  amaterno: string;
  dia: number;
  mes: number;
  year: number;
  sexo: string;
}

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './zodiaco.component.html',
  styleUrls: ['./zodiaco.component.css']
})
export default class ZodiacoComponent implements OnInit {
  formGroup!: FormGroup;
  clientes: Signos = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    dia: 0,
    mes: 0,
    year: 0,
    sexo: '',
  };
  nombreCompleto!: string;
  signoZodiacal!: string;
  edad!: number;
  imagenSigno!: string;

  signosZodiacoChino = [
    'Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente',
    'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'
  ];

  signosZodiacoImagenes = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsVrXKCvyKR_RP0jpkMhHQzaTa06J9dZAnlw&s',  // URL para Rata
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHRb69SBZ-esC19wfM8bdqSAmiMwnJJBo9kA&s',  // URL para Buey
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF-t0q8JN4uvH6-JjAB0EnvR-6rgZwvWjKcA&s', // URL para Tigre
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17f9GAXR0SxUCGld4RDjB1W0aNvPujaqNpg&s',// URL para Conejo
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNgGtIET42muWgtSmx7x_OWnZPGyD0UN-XQg&s',// URL para Dragón
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNN-unNXj5xBJEwBoTaYf_nWDt5mp7Bl5kg&s',// URL para Serpiente
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgVJ9H9MXxM0LrhKvmzvBxILxz1Ii1wXssMg&s', // URL para Caballo
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-pL1t_Rwzi0s-QU-Ik4MSjq1oPn6X6Tk55A&s',   // URL para Cabra
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTkOZgmBYVbLHRZq_wOm6uV71jIriBvcFZFg&s',    // URL para Mono
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7ugYxBAsfO4fF9NgYLwzok_g8Dst8pmNzg&s',   // URL para Gallo
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEhRYGEePhyoZqdgLO-j0XXOz5y_EWyzpSag&s',   // URL para Perro
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ69h7HA1axvA6wFC3ZK_l3BcqJM4zYsSr_Mw&s'    // URL para Cerdo
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.initForm();
    this.formGroup.valueChanges.subscribe(() => {
      this.actualizarInfoCliente();
    });
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      apaterno: [''],
      amaterno: [''],
      dia: [''],
      mes: [''],
      year: [''],
      sexo: ['']
    });
  }

  actualizarInfoCliente(): void {
    const { nombre, apaterno, amaterno, dia, mes, year, sexo } = this.formGroup.value;
    
    this.clientes.nombre = nombre;
    this.clientes.apaterno = apaterno;
    this.clientes.amaterno = amaterno;
    this.clientes.dia = dia;
    this.clientes.mes = mes;
    this.clientes.year = year;
    this.clientes.sexo = sexo;


    localStorage.setItem('clienteInfo', JSON.stringify(this.clientes));
  }

  calcularSignoZodiacal(year: number): void {
    const index = (year - 4) % 12;
    this.signoZodiacal = this.signosZodiacoChino[index];
    this.imagenSigno = this.signosZodiacoImagenes[index]; 
  }

  calcularEdad(dia: number, mes: number, year: number): void {
    const actual = new Date();
    let edad = actual.getFullYear() - year;

    const cumple = new Date(actual.getFullYear(), mes - 1, dia);

    if (actual < cumple) {
      edad--;
    }

    this.edad = edad;
  }

  onSubmit(): void {
    this.nombreCompleto = `${this.clientes.nombre} ${this.clientes.apaterno} ${this.clientes.amaterno}`;
    this.calcularSignoZodiacal(this.clientes.year);
    this.calcularEdad(this.clientes.dia, this.clientes.mes, this.clientes.year);

    // Redireccionar
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/auth/zodiacal']);
  }
}
