import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { Person } from 'src/app/models/person';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-ad-view',
  templateUrl: './ad-view.component.html',
  styleUrls: ['./ad-view.component.css'],
})
export class AdViewComponent implements OnInit {
  adsWithImages: Ad[] = [];
  adsWithPlaneText: Ad[] = [];
  adsWithHTML: Ad[] = [];
  adsWithVideo: Ad[] = [];
  ads: Ad[] = [];
  ad!: Ad;
  displayStyle!: string;
  idOfAdToDelete!: string;
  adToDoActions!: Ad;
  me!:Person
  infoUsuario: any = 'ninguno';
  isEncargadoAndAutorizado: Boolean = false;
  isSuperAdmin: Boolean = false;
  isLogged:boolean = false



  logged:boolean = true

  constructor(private personService: PersonService ,private authService: AuthService, private adService: AdService, private router: Router) {
    this.obtenerInfoUsuario();
  }

  sendAd() {
    console.log(this.adToDoActions);
    this.adToDoActions.receivers.forEach((q) => {
      q.status = 'confeccionado';
    });
    this.adService.updateAd(this.adToDoActions).subscribe((q) => {
      console.log(q);
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['my-ads']));
    });
  }

  showPopUp(id: string) {
    this.displayStyle = 'block';
    this.idOfAdToDelete = id;
  }

  deleteAd() {
    this.adService.deleteAd(this.idOfAdToDelete).subscribe((res) => {
      this.closePopup();
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['my-ads']));
    });
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  selectAd(id: string) {
    this.ads.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
  }

  viewAds() {
    this.adService.getAds().subscribe((ads) => {
      this.ads = ads;
      this.ads.forEach((ad) => {
        if (ad.typeOfContent.html) {
          this.adsWithHTML.push(ad);
        } else if (ad.typeOfContent.image) {
          this.adsWithImages.push(ad);
        } else if (ad.typeOfContent.planeText) {
          this.adsWithPlaneText.push(ad);
        } else if (ad.typeOfContent.video) {
          this.adsWithVideo.push(ad);
        }
      });
    });
  }

  obtenerInfoUsuario() {
    this.personService.myInfo().subscribe((infoUsuario) => {
      console.log("me =>", infoUsuario)
      this.me = infoUsuario;      
      this.infoUsuario = infoUsuario.infoAreas;    
      this.getArr();
      if(infoUsuario.role===2){
        this.isSuperAdmin=true
      }
      this.isLogged=true      
      this.authService.disparador.emit({login: this.logged, isEncarAndAut: this.isEncargadoAndAutorizado, isSupAdm: this.isSuperAdmin, user: this.me})
    },
    (err) => {      
      this.isLogged=false
    },
    );
  }


  getArr() {
    [...this.infoUsuario].forEach((rol: any) => {
      let isEncargado = rol.userRoles.includes('Encargado');
      let isAceptado = rol.status == 'aceptado';
      if (isEncargado == true && isAceptado == true) {
        this.isEncargadoAndAutorizado = true;
        console.log('Es autorizado: ' + this.isEncargadoAndAutorizado);
      }
    });
  }

  ngOnInit(): void {
    this.viewAds();
  }
}
