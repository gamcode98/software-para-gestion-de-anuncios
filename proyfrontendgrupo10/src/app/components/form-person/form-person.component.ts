import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css'],
})
export class FormPersonComponent implements OnInit {
  person: Person = new Person();
  areas: Area[] = [];
  areaAux: Area[] = [];

  constructor(
    private servicePerson: PersonService,
    private serviceArea: AreaService
  ) {
    this.serviceArea.getAreas().subscribe((resp: any) => {
      console.log(resp);
      this.areas = resp;
    });
    let aux: Area[] = [];
    let a: Area = new Area();
    a.name = 'Medicina';

    a.roles = ['rol1', 'rol2', 'rol3'];
    aux.push(a);

    a.name = 'Academia';
    aux.push(a);
    a.name = 'Diseño';
    aux.push(a);
    a.name = 'Policia';
    aux.push(a);
    this.areas = aux;
  }

  createPerson() {
    this.servicePerson.addPerson(this.person).subscribe((resp) => {
      console.log(resp);
    });
  }

  ngOnInit(): void {}

  requestArea(name: string) {
    let exist: Boolean = false;
    for (let i = 0; i < this.areaAux.length; i++) {
      if (this.areaAux[i].name === name) {
        this.areaAux.splice(i, 1);
        exist = true;
      }
    }
    if (!exist) {
      let a: Area = new Area();
      a.name = name;
      this.areaAux.push(a);
      console.log(this.areaAux);
    }
  }
  requestAreaRol(name: string, rol: string) {
    let exist: Boolean = false;
    let index: number = 0;
    for (let i = 0; i < this.areaAux.length; i++) {
      if (this.areaAux[i].name === name) {
        index = i;
        for (let j = 0; j < this.areaAux[i].roles.length; j++) {
          if (this.areaAux[i].roles[j] === rol) {
            this.areaAux[i].roles.splice(j, 1);
            exist = true;
          }
        }
      }
    }
    if (!exist) {
      let a: Area = new Area();
      this.areaAux[index].roles.push(rol);
      console.log(this.areaAux);
    }
  }
}
