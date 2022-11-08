import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.css']
})
export class FormAreaComponent implements OnInit {

  title: string = 'Crea un area';
  area!:Area
  role!:string
  roles:string[]=[]
  count:number=0
  edit:boolean=false
  

  constructor(private areaService: AreaService,private router: Router, private activatedRoute: ActivatedRoute) {
    this.area = new Area()
   }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.areaService.getAreaById(params['id']).subscribe((data:any) => {
        this.area = data;
        this.roles=data.areaRoles
        this.edit = true;
        this.title = 'Actualizar area';
      });
    }
  }

  adRole(){    
    this.roles.push(this.role.trim())
    this.area.areaRoles = this.roles    
    this.count++   
    this.role=" "
  }
  
  deleteRole(index: number){
    this.roles.splice(index,1)
  }
  createArea(){
    this.areaService.createArea(this.area).subscribe(area=> {
      this.router.navigate(['/areas']);      
    })
  }
  editArea(){
    this.areaService.updateArea(this.area).subscribe(res=> {
      this.router.navigate(['/areas']);
    })
  }
}
