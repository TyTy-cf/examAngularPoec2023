import {Component, Input} from '@angular/core';
import {IRegion} from "../../models/i-region";
import {IDepartment} from "../../models/i-department";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input()
  iRegion: IRegion | undefined;

  @Input()
  iDepartment: IDepartment | undefined;

  constructor(public router: Router) {
  }

}
