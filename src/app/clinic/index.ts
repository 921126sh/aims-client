import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FacadeService } from '../core/services/facade.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './index.html',
  styleUrls: ['./index.scss'],
  providers: [UserService, FacadeService]
})
export class ClinicComponent implements OnInit {
  tab: number;
  isModify: boolean;

  constructor(){}

  ngOnInit(): void {
    this.tab = 0;  
    this.isModify = false;
  }
  
  onTabClick = (index) => this.tab = index;

  onModify= () => this.isModify = !this.isModify;
}
