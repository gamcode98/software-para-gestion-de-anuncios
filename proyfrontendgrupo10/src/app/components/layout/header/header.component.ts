import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  infoUsuario: any = 'ninguno';
  me: Person = new Person();
  isEncargadoAndAutorizado: Boolean = false;
  isLogged:boolean = false
  isSuperAdmin:boolean=false

  constructor(
    public authService: AuthService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.authService.disparador.subscribe((data)=> {      
      this.isLogged=data.login
      this.isEncargadoAndAutorizado=data.isEncarAndAut
      this.isSuperAdmin=data.isSupAdm
      this.me=data.user
      // console.log("this.isLogged", this.isLogged)
      // console.log("this.isEncargadoAndAutorizado", this.isEncargadoAndAutorizado)
      // console.log("this.isSuperAdmin", this.isSuperAdmin)
      // console.log("this.me", this.me)
    })
    // this.obtenerInfoUsuario();
  }

  // obtenerInfoUsuario() {
  //   this.personService.myInfo().subscribe((infoUsuario) => {
  //     this.me = infoUsuario;      
  //     this.infoUsuario = infoUsuario.infoAreas;    
  //     this.getArr();
  //     this.isLogged=true      
  //   },
  //   (err) => {      
  //     this.isLogged=false
  //   },
  //   );
  // }


  // getArr() {
  //   [...this.infoUsuario].forEach((rol: any) => {
  //     let isEncargado = rol.userRoles.includes('Encargado');
  //     let isAceptado = rol.status == 'aceptado';
  //     if (isEncargado == true && isAceptado == true) {
  //       this.isEncargadoAndAutorizado = true;
  //       console.log('Es autorizado: ' + this.isEncargadoAndAutorizado);
  //     }
  //   });
  // }

  logout(){
    this.isLogged=false
    this.authService.logout()
  }

}
