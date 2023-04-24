import {ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QueryQuestionsService} from "../../shared/services/query-questions.service";
import {QueryQuestionsTypes} from "../../types/query-questions.types";
import {QuestionsTypes} from "../../types/questions.types";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QueryErrorTypes} from "../../types/query-error.types";
import {ActiveParamsTypes} from "../../types/active-params.types";
import {Location} from "@angular/common";

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private queryQuestionsService: QueryQuestionsService,
              private _snakeBar: MatSnackBar,
              private location: Location,
              private cdr: ChangeDetectorRef) {
  }

  searchTitle: string = '';
  lenQuestions: number = 0;
  listQuestions: boolean = false;
  questions: QuestionsTypes[] = [];
  display: boolean = false;
  activeParams: ActiveParamsTypes = {
    order: 'desc',
    sort: 'activity',
    site: 'stackoverflow'
  }
  activeParamsUserQuestion: ActiveParamsTypes = {
    page: 1,
    pagesize: 5,
    order: 'desc',
    sort: 'activity',
    site: 'stackoverflow'
  };
  activeParamsQuestionForTag: ActiveParamsTypes = {
    site: 'stackoverflow'
  };
  userQuestions: QuestionsTypes[] = [];
  author: string = '';
  tag: string = '';
  sortingOptions: { name: string, value: string }[] = [
    {name: 'активность', value: 'activity'},
    {name: 'голоса', value: 'votes'},
    {name: 'создание', value: 'creation'},
    {name: 'актуальность', value: 'relevance'}
  ];
  orderOptions: { name: string, value: string }[] = [
    {name: 'по убыванию', value: 'desc'},
    {name: 'по возрастанию', value: 'asc'},
  ];

  sortingOpen = false;
  sortingDisplayOpen = false;
  sorting = {
    sortingMain: 'main-table',
    sortingDisplay: 'display-table'
  };
  userId: number = 0;
  loading: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.hasOwnProperty('intitle')) {
        this.searchTitle = params['intitle'];
        this.activeParams.intitle = params['intitle'];
        this.queryQuestionsService.getQuestions(this.activeParams)
          .subscribe({
            next: (data: QueryQuestionsTypes | QueryErrorTypes) => {
              if ((data as QueryErrorTypes).error_id) {
                this.loading = false;
                this._snakeBar.open((data as QueryErrorTypes).error_message)
              }

              this.loading = false;
              if (data as QueryQuestionsTypes) {
                this.questions = (data as QueryQuestionsTypes).items;
                if (this.questions) {
                  this.lenQuestions = this.questions.length;
                }

                if (this.lenQuestions == 0) {
                  this.listQuestions = true;
                }

              }

            },
            error: (errorResponse: HttpErrorResponse) => {
              if (errorResponse.error && errorResponse.error.message) {
                this._snakeBar.open(errorResponse.error.message);
              } else {
                this._snakeBar.open('Ошибка при получении данных');
              }
            }

          })
      } else {
        this._snakeBar.open('Ошибка при получении данных');
      }
    })
  }

  backSearch() {
    this.router.navigate(['/']);
  }

  showDisplay(userId: number | null = null, author: string | null = null, tag: string | null = null) {

    if (author) {
      this.author = author;
      this.tag = '';
    }

    if (tag) {
      this.author = '';
      this.tag = tag;
    }

    if (userId) {
      this.userId = userId;
      this.queryQuestionsService.getUserQuestions(this.activeParamsUserQuestion, userId)
        .subscribe({
          next: (data: QueryQuestionsTypes | QueryErrorTypes) => {
            if ((data as QueryErrorTypes).error_id) {
              this._snakeBar.open((data as QueryErrorTypes).error_message)
            }

            if (data as QueryQuestionsTypes) {
              this.userQuestions = (data as QueryQuestionsTypes).items;
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snakeBar.open(errorResponse.error.message);
            } else {
              this._snakeBar.open('Ошибка при получении данных');
            }
          }

        })
      this.display = true;
    }

    if (tag) {
      this.queryQuestionsService.getQuestionsForTag(this.activeParamsQuestionForTag, tag)
        .subscribe({
          next: (data: QueryQuestionsTypes | QueryErrorTypes) => {
            if ((data as QueryErrorTypes).error_id) {
              this._snakeBar.open((data as QueryErrorTypes).error_message)
            }

            if (data as QueryQuestionsTypes) {
              this.userQuestions = (data as QueryQuestionsTypes).items;
            }
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snakeBar.open(errorResponse.error.message);
            } else {
              this._snakeBar.open('Ошибка при получении данных');
            }
          }

        })
      this.display = true;
    }
    const table = document.getElementsByTagName("table")[0];
    if (table) {
      table.scrollIntoView({behavior: "smooth"});
    }
  }

  closeDisplay() {
    this.display = false;
  }

  questionTheme(id: number) {
    if (this.activeParamsUserQuestion) {
      this.router.navigate(['questions/' + id])
    }

  }

  toggleSorting(sorting: string) {
    if (sorting === this.sorting.sortingMain) {
      this.sortingOpen = !this.sortingOpen;
    } else if (sorting === this.sorting.sortingDisplay) {
      this.sortingDisplayOpen = !this.sortingDisplayOpen;
    }

  }

  sort(valueSort: string | null = null, valueOrder: string | null = null, sorting: string) {
    if (sorting === this.sorting.sortingMain) {
      if (valueSort) {
        this.activeParams.sort = valueSort;
      }
      if (valueOrder) {
        this.activeParams.order = valueOrder;
      }
      this.router.navigate(['search'], {
        queryParams: this.activeParams
      });
    } else if (sorting === this.sorting.sortingDisplay) {
      if (valueSort) {
        this.activeParamsUserQuestion.sort = valueSort;
      }
      if (valueOrder) {
        this.activeParamsUserQuestion.order = valueOrder;
      }
      this.showDisplay(this.userId);
    }
  }
}
