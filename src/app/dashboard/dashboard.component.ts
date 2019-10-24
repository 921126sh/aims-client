import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FacadeService } from '../core/services/facade.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [UserService, FacadeService]
})
export class DashboardComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {
    
  }
}
