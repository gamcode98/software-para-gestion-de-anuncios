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

  constructor(
    private servicePerson: PersonService,
    private serviceArea: AreaService
  ) {
    this.serviceArea.getAreas().subscribe((resp: any) => {
      console.log(resp);
      this.areas = resp;
    });
  }

  createPerson() {
    this.servicePerson.addPerson(this.person).subscribe((resp) => {
      console.log(resp);
    });
  }

  ngOnInit(): void {}
}
