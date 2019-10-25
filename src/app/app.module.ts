import 'reflect-metadata';
import '../polyfills';
// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// core
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService } from './core/services/app-config.service';
import { GlobalRefService } from './core/services/global-ref.service';
import { RestService } from './core/services/rest.service';

// Block UI
import { BlockUIModule } from 'ng-block-ui';

// 일렉트론 서비스
import { ElectronService } from './core/providers/electron.service';
import { WebviewDirective } from './core/directives/webview.directive';

// 컴포넌트
import { AppComponent } from './app.component';
import { SideLayoutComponent } from './common/side-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './common/login.component';
import { ClinicComponent } from './clinic';
import { HealthComponent } from './health';
import { MediComponent } from './medi';
import { DavinciNoteComponent } from './davinciNote';
import { ConferenceComponent } from './conference';
import { UpdateComponent } from './common/update.component';

// 다이얼로그
import {UserAddDialogComponent} from './user/dialogs/add/user-add.dialog';
import {EditDialogComponent} from './user/dialogs/edit/user-edit.dialog';
import {DeleteDialogComponent} from './user/dialogs/delete/user-delete.dialog';

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
  MatToolbarModule,
  MatDialogModule, 
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SideLayoutComponent,
    LoginComponent,
    DashboardComponent,
    ClinicComponent,
    HealthComponent,
    MediComponent,
    DavinciNoteComponent,
    ConferenceComponent,
    UpdateComponent,
    UserComponent,
    WebviewDirective,
    UserAddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BlockUIModule.forRoot(),
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule, 
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    UserAddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent
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
