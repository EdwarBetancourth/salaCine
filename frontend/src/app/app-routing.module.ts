import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';
import { FullComponent } from './layout/full/full.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { 
    path: 'content', 
    component: ContentComponent,
    loadChildren: () => import('./pages/content/content.module').then( m => m.ContentModule )
  },
  { 
    path: 'full', 
    component: FullComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/full/full.module').then( m => m.FullModule )
  },
  { path: '', pathMatch: 'full', redirectTo: 'content/login' },
  { path: '**', pathMatch: 'full', redirectTo: 'content/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
