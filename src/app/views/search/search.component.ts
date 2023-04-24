import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ActiveParamsTypes} from "../../types/active-params.types";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField = new FormControl();
  activeParams: ActiveParamsTypes = {};

  constructor(private router: Router,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  searchQuestions() {
    let intitle = this.searchField.value;

    if (intitle) {
      this.activeParams.intitle = intitle;
      this.router.navigate(['search'], {
        queryParams: this.activeParams
      })
    } else {
      this._snackBar.open('Введите запрос')
    }
  }

}
