import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css'],
})
export class FormPersonComponent implements OnInit {
  person: Person = new Person();
  areas: Area[] = [];
  areaAux: Area[] = [];
  edit: boolean = false;
  startArea: boolean = true;
  title: string = 'Registrate';
  hiddeArea: boolean = false


  constructor(
    private servicePerson: PersonService,
    private serviceArea: AreaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.serviceArea.getAreas().subscribe((resp: any) => {
      console.log(resp);
      this.areas = resp;
    });
  }

  createPerson() {
    this.servicePerson.addPerson(this.person).subscribe((resp) => {
      console.log(resp);
      this.router.navigate(['login']);
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.servicePerson.getPersonById(params['id']).subscribe((data) => {
        this.person = data;
        this.edit = true;
        this.title = 'Actualizar usuario';
        this.hiddeArea=true
        console.log("this.hiddeArea", this.hiddeArea)
      });
    }
  }

  requestArea(id: string, name: string) {
    if (this.startArea) {
      this.person.infoAreas = [
        {
          area: { _id: id, areaRoles: [], name: '' },
          status: 'pendiente',
          userRoles: [],
        },
      ];
      this.startArea = false;
    } else {
      let exist: Boolean = false;
      for (let i = 0; i < this.person.infoAreas.length; i++) {
        if (this.person.infoAreas[i].area._id === id) {
          console.log(this.person);
          this.person.infoAreas.splice(i, 1);
          exist = true;
        }
      }
      if (!exist) {
        this.person.infoAreas.push({
          area: { _id: id, areaRoles: [], name: '' },
          status: 'pendiente',
          userRoles: [],
        });
        console.log(this.person);
      }
    }
  }
  requestAreaRol(name: string, rol: string) {
    let exist: Boolean = false;
    let index: number = 0;
    for (let i = 0; i < this.person.infoAreas.length; i++) {
      if (this.person.infoAreas[i].area._id === name) {
        index = i;
        for (let j = 0; j < this.person.infoAreas[i].userRoles.length; j++) {
          if (this.person.infoAreas[i].userRoles[j] === rol) {
            this.person.infoAreas[i].userRoles.splice(j, 1);
            exist = true;
            console.log(this.person);
          }
        }
      }
    }
    if (!exist) {
      this.person.infoAreas[index].userRoles.push(rol);
      console.log(this.person);
    }
  }
}
