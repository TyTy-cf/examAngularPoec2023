import {Component, OnInit} from '@angular/core';
import {IRegion} from "../../models/i-region";
import {IDepartment} from "../../models/i-department";
import {HttpClientService} from "../../service/http-client.service";
import {ActivatedRoute} from "@angular/router";
import {forkJoin} from "rxjs";
import {ICity} from "../../models/i-city";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  iRegion: IRegion | undefined;
  iDepartment: IDepartment | undefined;
  iCites: ICity[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['codeRegion'] && params['codeDpt']) {
        forkJoin([
          this.httpClientService.get<IDepartment>('https://geo.api.gouv.fr/departements/'+params['codeDpt']),
          this.httpClientService.get<IRegion>('https://geo.api.gouv.fr/regions/'+params['codeRegion']),
          this.httpClientService.get<ICity[]>('https://geo.api.gouv.fr/departements/'+params['codeDpt']+'/communes'),
        ]).subscribe(([dpt, region, cities]) => {
          this.iDepartment = dpt;
          this.iRegion = region;
          this.iCites = cities;
        })
      }
    });
  }
}
