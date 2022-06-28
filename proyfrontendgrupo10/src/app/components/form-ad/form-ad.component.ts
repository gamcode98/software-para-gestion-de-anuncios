import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { Area } from 'src/app/models/area';
import { AdService } from 'src/app/services/ad.service';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-form-ad',
  templateUrl: './form-ad.component.html',
  styleUrls: ['./form-ad.component.css'],
})
export class FormAdComponent implements OnInit {
  ad!: Ad;
  area: Area[] = [];
  areaAux: Area[] = [];
  sel: string = '';

  constructor(private service: AdService, private serviceArea: AreaService) {
    this.ad = new Ad();
    this.ad.publishingMedia = {
      facebook: false,
      twitter: false,
      youtube: false,
      instagram: false,
      email: false,
      tv: false,
    };
    this.ad.entryDate = {
      initial: new Date(),
      final: new Date(),
    };
    this.init();
  }

  ngOnInit(): void {}
  init() {
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
    this.area = aux;
  }

  createAd() {
    this.service.createAd(this.ad).subscribe((q) => {
      console.log(q);
    });
  }
  addRecivers(name: string) {
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
  addReciversRol(name: string, rol: string) {
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
  selectContent() {
    console.log(this.sel);
    if (this.sel === 'planeText') {
      this.ad.typeOfContent = {
        planeText: true,
        image: false,
        html: false,
        video: false,
      };
    }
    if (this.sel === 'html') {
      this.ad.typeOfContent = {
        planeText: false,
        image: false,
        html: true,
        video: false,
      };
    }
    if (this.sel === 'image') {
      this.ad.typeOfContent = {
        planeText: false,
        image: true,
        html: false,
        video: false,
      };
    }
    if (this.sel === 'video') {
      this.ad.typeOfContent = {
        planeText: false,
        image: false,
        html: false,
        video: true,
      };
    }
    console.log(this.ad);
  }
}
