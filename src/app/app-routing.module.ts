import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
    {
		path: '',
		redirectTo: '/user',
		pathMatch: 'full'
	},
    {
        path: 'home',
        component: HomeComponent,
        data: { title: '홈' }
    },
    {
        path: 'user',
        component: UserComponent,
        data: { title: '사용자' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
