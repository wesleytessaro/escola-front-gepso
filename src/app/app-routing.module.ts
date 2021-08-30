import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RelatorioComponent} from '../app/relatorio/relatorio.component';
const routes: Routes = [
  {
    path:'Relatorio',component:RelatorioComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
