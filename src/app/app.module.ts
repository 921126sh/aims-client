import 'reflect-metadata';
import '../polyfills';
// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// core
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService } from './core/app-config.service';
import { GlobalRefService } from './core/global-ref.service';
import { RestService } from './core/rest.service';

// Block UI
import { BlockUIModule } from 'ng-block-ui';

// 일렉트론 서비스
import { ElectronService } from './providers/electron.service';
import { WebviewDirective } from './directives/webview.directive';



// 컴포넌트
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export function loadConfig(config: AppConfigService) { return () => config.load(); };
export function customHttpService(config: AppConfigService, handler: HttpHandler) {
	return new RestService(config, handler);
}

// 메터리얼
import {
  MatNativeDateModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective
  ],
  imports: [
    BlockUIModule.forRoot(),
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatNativeDateModule,

    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  
  providers: [
    ElectronService,
    GlobalRefService,
		AppConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: loadConfig,
			deps: [AppConfigService],
			multi: true
		},
		{
			provide: RestService,
			useFactory: customHttpService,
			deps: [AppConfigService, HttpHandler]
		},
		{
			provide: COMPOSITION_BUFFER_MODE,
			useValue: false
		}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
