import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-admin-actions-to-area',
  templateUrl: './admin-actions-to-area.component.html',
  styleUrls: ['./admin-actions-to-area.component.css']
})
export class AdminActionsToAreaComponent implements OnInit {

  areas!: Area[];
  displayStyle!: string;
  idOfAreaToDelete!:string

  constructor(private areaServ: AreaService) { }

  ngOnInit(): void {
    this.getAreas()
  }

  getAreas(){    
    this.areaServ.getAreas().subscribe((areas:any)=> {
      this.areas = areas
    })
  }

  deleteArea(){
    this.areaServ.deleteArea(this.idOfAreaToDelete).subscribe(res=>{            
      console.log(res)
      this.displayStyle = 'none';    
      this.getAreas()
    })
  }

  showPopUp(id: string) {    
    this.displayStyle = 'block';
    this.idOfAreaToDelete=id    
  }

  closePopup() {
    this.displayStyle = 'none';    
  }

}
