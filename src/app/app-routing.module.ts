import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ClinicComponent } from './clinic';
import { HealthComponent } from './health';
import { MediComponent } from './medi';
import { DavinciNoteComponent } from './davinciNote';
import { ConferenceComponent } from './conference';

const routes: Routes = [
    // {
	// 	path: '',
	// 	redirectTo: '/user',
	// 	pathMatch: 'full'
	// },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: '대시보드' }
    },
    {
        path: 'clinic',
        component: ClinicComponent,
        data: { title: '아이쿱 클리닉' }
    },
    {
        path: 'health',
        component: HealthComponent,
        data: { title: '헬스쿱' }
    },
    {
        path: 'medi',
        component: MediComponent,
        data: { title: '메디쿱' }
    },
    {
        path: 'davinciNote',
        component: DavinciNoteComponent,
        data: { title: '다빈치 노트' }
    },
    {
        path: 'conference',
        component: ConferenceComponent,
        data: { title: '컨퍼런스' }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
