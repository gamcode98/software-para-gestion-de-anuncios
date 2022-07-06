import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/models/ad';
import { Area } from 'src/app/models/area';
import { Person } from 'src/app/models/person';
import { AdService } from 'src/app/services/ad.service';
import { AreaService } from 'src/app/services/area.service';
import { PersonService } from 'src/app/services/person.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { ApiMethod } from 'ngx-facebook/providers/facebook';

@Component({
  selector: 'app-request-ad-view',
  templateUrl: './request-ad-view.component.html',
  styleUrls: ['./request-ad-view.component.css'],
})
export class RequestAdViewComponent implements OnInit {
  // adsForMe: Ad[] = [];
  // ads: Ad[] = [];
  // ad: Ad = new Ad();
  adsWithImages: Ad[] = [];
  adsWithPlaneText: Ad[] = [];
  adsWithHTML: Ad[] = [];
  adsWithVideo: Ad[] = [];
  adToDoActions!: Ad;
  displayStyle!: string;
  adToDecline!: string;
  adToAuthorize!: string;
  decline!: boolean;
  authorize!: boolean;
  user!: Person;
  idAreaToUpdate!: string;
  html: number = 0;
  img: number = 0;
  txt: number = 0;
  areas!: Area[];
  areaFilter: Area = new Area();
  roleFilter: string = '';
  dateFilter!: Date;
  formS: string = 'bar';
  bar: boolean = false;
  chartInstance: any;
  myAreas: string[] = [];

  ads: any[] = [];
  adsArea1: any[] = [];

  //stadistic
  initOpts = {
    renderer: 'svg',
    width: 500,
    height: 300,
  };

  options!: any;

  constructor(
    private adService: AdService,
    private serviceUser: PersonService,
    private router: Router,
    private areaService: AreaService,
    private fb: FacebookService
  ) {
    this.iniciarFb();
  }

  ngOnInit(): void {
    this.adService.getAdsWhereUserIsEncargado().subscribe((res) => {
      this.ads = res.result;
      // this.ads.forEach((el:any) => {
      // });
      this.ads.forEach((subEl: Ad) => {
        console.log(subEl.typeOfContent.html);
        if (subEl.typeOfContent.html) {
          this.adsWithHTML.push(subEl);
        } else if (subEl.typeOfContent.image) {
          this.adsWithImages.push(subEl);
        } else if (subEl.typeOfContent.planeText) {
          this.adsWithPlaneText.push(subEl);
        } else if (subEl.typeOfContent.video) {
          this.adsWithVideo.push(subEl);
        }
      });
      this.areaService.getAreas().subscribe((q: any) => {
        this.areas = q;
      });
      this.stadistic();
    });
    // this.serviceUser.myInfo().subscribe(res=> {
    //   res.infoAreas.forEach(el=> {
    //     this.myAreas.push(el.area._id)
    //   })
    // })

    // console.log("this.myAreas")
    // console.log(this.myAreas)
  }

  postFb() {
    let apiMethod: ApiMethod = 'post';
    // token a refrescar cada media hora
    let token =
      'EAAFAYJvrhDcBAJppcHlVR9Oy7N1ZCZBDbtH7y6qKHPAllEZAfuzS8RGoGZBEXpe49ZA2e2K9oFqzPmf2VKAr1L4mZBIayZAFvu8MsaP2qnbfGRmn14yaMB3r33Y1FZA3RJtJXqQwUlNdoT2HJJSTyXzsqK1ybM3CdNUBKMQFDZCNl3SQzmzRDgW7YLgWZCFiYAITGBeUZBeAWraZBsyNA6C6zVaA';

    // id de la pagina de facebook
    let pageId = '109497428485411';

    this.fb.api(`/${pageId}/feed`, apiMethod, {
      message: this.adToDoActions.text,
      access_token: token,
    });
  }

  iniciarFb() {
    // id de la aplicacion de facebook
    let applicationId = '352258653652023';
    let initParams: InitParams = {
      appId: applicationId,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v7.0',
    };
    this.fb.init(initParams);
  }

  areaChange() {
    if (this.areaFilter._id === '') {
      this.areaFilter = new Area();
      this.roleFilter = '';
    } else {
      this.areas.forEach((q) => {
        if (q._id === this.areaFilter._id) {
          this.areaFilter = q;
        }
      });
    }
  }
  stadistic() {
    this.adService.getAdsAll().subscribe((q) => {
      this.html = 0;
      this.img = 0;
      this.txt = 0;
      let adsStadistic: Ad[] = [];
      q.forEach((x) => {
        let aux = false;
        x.receivers.forEach((z) => {
          if (z.status === 'autorizado') {
            aux = true;
          }
        });
        if (aux) {
          adsStadistic.push(x);
        }
      });
      if (this.dateFilter !== undefined) {
        let aux: Ad[] = adsStadistic;
        adsStadistic = [];
        aux.forEach((q) => {
          if (q.entryDate.initial >= this.dateFilter) {
            adsStadistic.push(q);
          }
        });
      }
      if (this.areaFilter.name !== undefined) {
        let aux: Ad[] = adsStadistic;
        adsStadistic = [];

        aux.forEach((q) => {
          q.receivers.forEach((x) => {
            if (x.area._id === this.areaFilter._id) {
              if (this.roleFilter === '') {
                adsStadistic.push(q);
              } else {
                x.areaRoles.forEach((z) => {
                  if (z === this.roleFilter) {
                    adsStadistic.push(q);
                  }
                });
              }
            }
          });
        });
      }

      adsStadistic.forEach((a) => {
        if (a.typeOfContent.html) {
          this.html++;
        }
        if (a.typeOfContent.image) {
          this.img++;
        }
        if (a.typeOfContent.planeText) {
          this.txt++;
        }
      });
      if (this.bar) {
        this.options = {
          title: {
            text: 'Estadisticas de Anuncios',
            subtext: 'Datos',
            x: 'center',
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '2%',
            right: '3%',
            bottom: '2%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['Html', 'Imagenes', 'Texto'],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: 'Cantidad',
              type: this.formS,
              barWidth: '60%',
              data: [this.html, this.img, this.txt],
            },
          ],
        };
      } else {
        this.options = {
          backgroundColor: '#2c343c',
          title: {
            text: 'Estadisticas de Anuncios',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc',
            },
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1],
            },
          },
          series: [
            {
              name: 'Cantidad',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                { value: this.html, name: 'HTML' },
                { value: this.txt, name: 'TEXT' },
                { value: this.img, name: 'IMAGE' },
              ].sort((a, b) => a.value - b.value),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 1)',
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(0, 255, 255, 1)',
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20,
                },
              },
              itemStyle: {
                normal: {
                  color: '#ccc',
                  shadowBlur: 200,
                  shadowColor: 'rgba(255,255, 255, 1)',
                },
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: () => Math.random() * 200,
            },
          ],
        };
      }
    });
  }

  selectAd(id: string) {
    this.adsWithHTML.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    this.adsWithImages.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    this.adsWithPlaneText.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });

    this.adsWithVideo.forEach((ad) => {
      if (ad._id === id) {
        this.adToDoActions = ad;
      }
    });
    console.log(
      'this.adToDoActions.receivers => ',
      this.adToDoActions.receivers
    );
    // console.log(this.adToDoActions.receivers[0].area);
  }

  showPopUp(id: string, status: string) {
    console.log('popUp id => ', id);
    this.idAreaToUpdate = id;
    this.displayStyle = 'block';
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

  authorizeAd() {
    // console.log(this.adToDoActions.receivers[0].status)
    // this.adService.updatePartialAd(this.adToDoActions).subscribe(res=> {
    //   console.log(res)
    // })
    for (let i = 0; i < this.adToDoActions.receivers.length; i++) {
      if (this.adToDoActions.receivers[i].area._id === this.idAreaToUpdate) {
        this.adToDoActions.receivers[i].status = 'autorizado';
      }
    }
    console.log(this.adToDoActions);
    this.adService.updatePartialAd(this.adToDoActions).subscribe((q) => {
      console.log(q);
      this.postFb();
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['admin-reques-ad-v2']));
    });
  }

  declineAd() {
    for (let i = 0; i < this.adToDoActions.receivers.length; i++) {
      if (this.adToDoActions.receivers[i].area._id === this.idAreaToUpdate) {
        this.adToDoActions.receivers[i].status = 'cancelado';
      }
    }
    this.adService.updatePartialAd(this.adToDoActions).subscribe((q) => {
      console.log(q);
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['admin-reques-ad-v2']));
    });
  }

  closePopup() {
    this.displayStyle = 'none';
    this.authorize = false;
    this.decline = false;
  }

  getInfo() {
    console.log(this.adsWithHTML);
    console.log(this.adsWithImages);
    console.log(this.adsWithPlaneText);
    console.log(this.adsWithVideo);
  }
}
