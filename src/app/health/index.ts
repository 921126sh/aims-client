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
export class HealthComponent implements OnInit {
  tab: number;

  constructor(){}

  ngOnInit(): void {
    this.tab = 0;  
  }
  
  onTabClick = (index) => {
    this.tab = index;
  }
}
