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

  obtenerInfoUsuario(){

    this.personService.myInfo().subscribe(infoUsuario => {
      // console.log(infoUsuario);
      this.infoUsuario = infoUsuario.infoAreas ;
      console.log(this.infoUsuario);

      this.getArr()
    })

  }

  getArr(){
    [...this.infoUsuario].forEach((rol: any) =>{
      let isEncargado = rol.userRoles.includes('Encargado')
      let isAceptado = rol.status == 'aceptado';
      if(isEncargado == true && isAceptado == true) {
        this.isEncargadoAndAutorizado = true;
        console.log('Es autorizado: ' + this.isEncargadoAndAutorizado);
      }
    })
  }

}
