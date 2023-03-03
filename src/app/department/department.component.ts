import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../service/http-client.service";
import {ActivatedRoute} from "@angular/router";
import {IDepartment} from "../../models/i-department";
import {IRegion} from "../../models/i-region";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  iRegion: IRegion | undefined;
  iDepartments: IDepartment[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['codeRegion']) {
        forkJoin([
          this.httpClientService.get<IDepartment[]>('https://geo.api.gouv.fr/regions/'+params['codeRegion']+'/departements'),
          this.httpClientService.get<IRegion>('https://geo.api.gouv.fr/regions/'+params['codeRegion']),
        ]).subscribe(([dptsResponse, region]) => {
          this.iDepartments = dptsResponse;
          this.iRegion = region;
        })
      } else {
        this.httpClientService.get<IDepartment[]>('https://geo.api.gouv.fr/departements')
          .subscribe((response) => {
            this.iDepartments = response;
          });
      }
    });
  }

}
