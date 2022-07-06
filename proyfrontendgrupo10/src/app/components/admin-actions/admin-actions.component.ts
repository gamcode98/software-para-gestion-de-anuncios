import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {

  users!: Person[];
  displayStyle!: string;
  idOfUserToDelete!:string


  constructor(private usersService: PersonService) { }

  ngOnInit(): void {
    this.getUsers()
  }
  
  getUsers(){    
    this.usersService.getUsers().subscribe(users=> {
      this.users = users
    })
  }

  deleteUser(){
    this.usersService.deleteUser(this.idOfUserToDelete).subscribe(res=>{      
      this.getUsers()
      this.displayStyle = 'none';    
    })
  }

  showPopUp(id: string) {    
    this.displayStyle = 'block';
    this.idOfUserToDelete=id    
  }

  closePopup() {
    this.displayStyle = 'none';    
  }
  

}
