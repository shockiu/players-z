import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveComponent } from './pages/reactive-form/reactive.component';
import { TemplateComponent } from './pages/template-form/template.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'reactive', component: ReactiveComponent},
  {path: 'template', component: TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
