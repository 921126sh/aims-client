import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AppConfig } from '../environments/environment';
import { ElectronService } from './providers/electron.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * 화면 타이틀
   */
  title: string;

  // prevent key-event(backspace)
  @HostListener('document:keydown', ['$event'])
  clickout(e) {
    let self = this;
    if (e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA") {
      if (e.keyCode === 8) {
        return false;
      }
    }
  }

  constructor(
    public electronService: ElectronService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe((event) => {
        // 브라우저 작업표시줄에 router에서 넘어온 제목을 설정한다.
        this.titleService.setTitle(event['title']);

        // 컨텐츠헤어 컴포넌트에 제목을 넘겨준다.
        this.title = event['title'];
      });
  }
}
