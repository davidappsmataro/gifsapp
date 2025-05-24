import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifsListComponent } from './components/gifs-list/gifs-list.component';
import { GifComponent } from './components/gif/gif.component';

const routes: Routes = [
  {
    path: '',
    component: GifsListComponent,
  },
  {
    path: 'gif/:id',
    component: GifComponent,
  },
  {
    path: '**',
    component: GifsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
