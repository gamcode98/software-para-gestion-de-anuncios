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
  startArea: boolean = true;

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

    a.areaRoles = ['rol1', 'rol2', 'rol3'];
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

  requestArea(id: string, name: string) {
    if (this.startArea) {
      this.areaAux = [{ _id: id, name: name, areaRoles: [] }];
      this.startArea = false;
    } else {
      let exist: Boolean = false;
      for (let i = 0; i < this.areaAux.length; i++) {
        if (this.areaAux[i].name === name) {
          console.log(this.areaAux);
          this.areaAux.splice(i, 1);
          exist = true;
        }
      }
      if (!exist) {
        this.areaAux.push({
          _id: id,
          name: name,
          areaRoles: [],
        });
        console.log(this.areaAux);
      }
    }
  }
  requestAreaRol(name: string, rol: string) {
    let exist: Boolean = false;
    let index: number = 0;
    for (let i = 0; i < this.areaAux.length; i++) {
      if (this.areaAux[i].name === name) {
        index = i;
        for (let j = 0; j < this.areaAux[i].areaRoles.length; j++) {
          if (this.areaAux[i].areaRoles[j] === rol) {
            this.areaAux[i].areaRoles.splice(j, 1);
            exist = true;
          }
        }
      }
    }
    if (!exist) {
      let a: Area = new Area();
      this.areaAux[index].areaRoles.push(rol);
      console.log(this.areaAux);
    }
  }
}
