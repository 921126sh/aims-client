import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { FacadeService } from '../core/facade.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService, FacadeService]
})
export class HomeComponent implements OnInit {
  constructor(){}

  ngOnInit(): void {
    
  }
}