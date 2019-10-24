import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { ClinicComponent } from './clinic';

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
];

const makeRoute = () => {
    return console.log(makeRoute)
}

makeRoute()
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
