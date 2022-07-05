import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  infoUsuario: any = 'ninguno';
  isEncargadoAndAutorizado: Boolean = false;

  constructor(public authService: AuthService, private personService: PersonService) { }

  ngOnInit(): void {
    this.obtenerInfoUsuario();
  }

  //* Metodo Get
  // get infoUser() {
  //   console.log(this.personService.InfoUser);
  //   return this.personService.InfoUser;
  // }

  obtenerInfoUsuario(){
    // console.log(this.infoUser);

    this.personService.myInfo().subscribe(infoUsuario => {
      console.log(infoUsuario);
      this.infoUsuario = infoUsuario.infoAreas ;
      console.log(this.infoUsuario);

      this.getArr()
    })

  }

  getArr(){
    // debugger
    [...this.infoUsuario].forEach((rol: any) =>{
      console.log(rol.userRoles);
      const isEncargado = rol.userRoles.includes('Encargado')
      const isAceptado = rol.status == 'aceptado';
      console.log('isEncargado: ' + isEncargado);
      console.log('Status: ' + isAceptado);

      if(isEncargado == true && isAceptado == true) {
        this.isEncargadoAndAutorizado = true;
        console.log('Es autorizado: ' + this.isEncargadoAndAutorizado);
      }
    })
  }

}
