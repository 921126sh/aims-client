import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // {
	// 	path: '',
	// 	redirectTo: '/login',
	// 	pathMatch: 'full'
	// },
    {
        path: '',
        component: HomeComponent,
        data: { title: '홈' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
