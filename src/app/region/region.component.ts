import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../service/http-client.service";
import {IRegion} from "../../models/i-region";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  iRegions: IRegion[] = [];

  constructor(private httpClientService: HttpClientService) {
  }

  ngOnInit(): void {
    this.httpClientService.get<IRegion[]>('https://geo.api.gouv.fr/regions')
      .subscribe((response) => {
        this.iRegions = response;
      });
  }

}
