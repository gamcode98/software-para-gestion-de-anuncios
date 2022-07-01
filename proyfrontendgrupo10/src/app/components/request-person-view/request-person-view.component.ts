import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-request-person-view',
  templateUrl: './request-person-view.component.html',
  styleUrls: ['./request-person-view.component.css'],
})
export class RequestPersonViewComponent implements OnInit {
  user!: Person;
  users!: Person[];
  userToDoActions!: Person;
  displayStyle: string = 'none';
  decline!: boolean;
  authorize!: boolean;
  idAreaToUpdate!: string;
  // displayStyle!: string;

  constructor(private userService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.userService.requestToEnterArea().subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });
  }

  selectUser(id: string) {
    this.users.forEach((user) => {
      if (user._id === id) {
        this.userToDoActions = user;
      }
    });
    console.log(this.userToDoActions.infoAreas);
  }

  showPopUp(id: string, status: string) {
    console.log('popUp id => ', id);
    this.displayStyle = 'block';
    this.idAreaToUpdate = id;
    if (status === 'authorize') this.authorize = true;
    if (status === 'decline') this.decline = true;

    // console.log(this.adToDoActions.receivers[0].area)

    // this.adToDoActions.receivers.forEach(receiver => {
    //   this.myAreas.forEach(area=>{
    //     if(area===receiver.area._id){
    //       console.log("hii")
    //     }
    //   })
    // })
  }

  closePopup() {
    this.displayStyle = 'none';
    this.authorize = false;
    this.decline = false;
  }

  authorizeUser() {
    for (let i = 0; i < this.userToDoActions.infoAreas.length; i++) {
      if (this.userToDoActions.infoAreas[i].area._id === this.idAreaToUpdate) {
        this.userToDoActions.infoAreas[i].status = 'aceptado';
      }
    }
    this.userService.updateUser(this.userToDoActions).subscribe((res) => {
      console.log(res);
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['admin-reques-person-v2']));
    });
  }

  declineUser() {
    for (let i = 0; i < this.userToDoActions.infoAreas.length; i++) {
      if (this.userToDoActions.infoAreas[i].area._id === this.idAreaToUpdate) {
        this.userToDoActions.infoAreas[i].status = 'rechazado';
      }
    }
    this.userService.updateUser(this.userToDoActions).subscribe((res) => {
      console.log(res);
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['admin-reques-person-v2']));
    });
  }
}
