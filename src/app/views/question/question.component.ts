import {Component, OnInit} from '@angular/core';
import {QueryErrorTypes} from "../../types/query-error.types";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QueryQuestionsService} from "../../shared/services/query-questions.service";
import {ActiveParamsTypes} from "../../types/active-params.types";
import {QueryAnswersTypes} from "../../types/query-answers.types";
import {AnswersTypes} from "../../types/answers.types";
import {QueryQuestionsTypes} from "../../types/query-questions.types";
import {Location} from "@angular/common";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private queryQuestionsService: QueryQuestionsService,
              private location: Location) {
  }

  activeParamsAnswers: ActiveParamsTypes = {
    order: 'desc',
    sort: 'activity',
    site: 'stackoverflow',
    filter: 'withbody'
  };

  answersGet: AnswersTypes[] = [];
  question: string = '';
  questionBody: any;

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      if (params && params.hasOwnProperty('id')) {
        this.queryQuestionsService.getQuestion(this.activeParamsAnswers, params['id'])
          .subscribe({
            next: (data: QueryQuestionsTypes | QueryErrorTypes) => {
              if ((data as QueryErrorTypes).error_id) {
                this._snackBar.open((data as QueryErrorTypes).error_message)
              }

              if (data as QueryQuestionsTypes && (data as QueryQuestionsTypes).items[0].title && (data as QueryQuestionsTypes).items[0].body) {
                this.question = (data as QueryQuestionsTypes).items[0].title;
                this.questionBody = (data as QueryQuestionsTypes).items[0].body;
              }

            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open('Ошибка при получении данных');
              }
            }

          })
      } else {
        this._snackBar.open('Ошибка при получении данных');
      }
    })

    this.activatedRoute.params.subscribe(params => {
      if (params && params.hasOwnProperty('id')) {
        this.queryQuestionsService.getAnswersIdQuestion(this.activeParamsAnswers, params['id'])
          .subscribe({
            next: (data: QueryAnswersTypes | QueryErrorTypes) => {
              if ((data as QueryErrorTypes).error_id) {
                this._snackBar.open((data as QueryErrorTypes).error_message)
              }

              if (data as QueryAnswersTypes) {
                this.answersGet = (data as QueryAnswersTypes).items;
              }

            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snackBar.open(errorResponse.error.message);
              } else {
                this._snackBar.open('Ошибка при получении данных');
              }
            }

          })
      } else {
        this._snackBar.open('Ошибка при получении данных');
      }
    })
  }

  backSearchResult() {
    this.location.back();
  }
}
