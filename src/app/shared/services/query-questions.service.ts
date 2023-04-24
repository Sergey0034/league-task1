import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QueryQuestionsTypes} from "../../types/query-questions.types";
import {environment} from "../../../environments/environment";
import {QueryErrorTypes} from "../../types/query-error.types";
import {ActiveParamsTypes} from "../../types/active-params.types";
import {QueryAnswersTypes} from "../../types/query-answers.types";
import {QuestionsTypes} from "../../types/questions.types";

@Injectable({
  providedIn: 'root'
})
export class QueryQuestionsService {

  constructor(private http: HttpClient) { }

  getQuestions(params: ActiveParamsTypes): Observable<QueryQuestionsTypes | QueryErrorTypes> {
    return this.http.get<QueryQuestionsTypes | QueryErrorTypes>(environment.api + 'search', {
      params: params
    })
  }

  getUserQuestions(params: ActiveParamsTypes, userId: number): Observable<QueryQuestionsTypes | QueryErrorTypes> {
    return this.http.get<QueryQuestionsTypes | QueryErrorTypes>(environment.api + 'users/' + userId + '/questions', {
      params: params
    })
  }

  getAnswersIdQuestion(params: ActiveParamsTypes, questionId: number): Observable<QueryAnswersTypes | QueryErrorTypes> {
    return this.http.get<QueryAnswersTypes | QueryErrorTypes>(environment.api + 'questions/' + questionId + '/answers', {
      params: params
    })
  }

  getQuestion(params: ActiveParamsTypes, questionId: number): Observable<QueryQuestionsTypes | QueryErrorTypes> {
    return this.http.get<QueryQuestionsTypes | QueryErrorTypes>(environment.api + 'questions/' + questionId, {
      params: params
    })
  }

  getQuestionsForTag(params: ActiveParamsTypes, tag: string): Observable<QueryQuestionsTypes | QueryErrorTypes> {
    return this.http.get<QueryQuestionsTypes | QueryErrorTypes>(environment.api + 'tags/' + tag + '/faq', {
      params: params
    })
  }
}
