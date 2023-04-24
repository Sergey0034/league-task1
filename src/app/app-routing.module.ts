import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./views/search/search.component";
import {ResultSearchComponent} from "./views/result-search/result-search.component";
import {QuestionComponent} from "./views/question/question.component";

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'search', component: ResultSearchComponent},
  {path: 'questions/:id', component: QuestionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
