import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('.//modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('.//modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'doctor/:id',
    loadChildren: () => import('.//modules/doctor/doctor.module').then(m => m.DoctorModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('.//modules/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'medical',
    loadChildren: () => import('.//modules/medical-view/medical-view.module').then(m => m.MedicalViewModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
