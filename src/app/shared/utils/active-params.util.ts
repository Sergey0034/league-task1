import {Params} from "@angular/router";
import {ActiveParamsTypes} from "../../types/active-params.types";


export class ActiveParamsUtil {
  static processParams(params: Params): ActiveParamsTypes {
    const activeParams: ActiveParamsTypes = {};

    if (params.hasOwnProperty('page')) {
      activeParams.page = +params['page'];
    }

    if (params.hasOwnProperty('pagesize')) {
      activeParams.pagesize = +params['pagesize'];
    }

    if (params.hasOwnProperty('order')) {
      activeParams.order = params['order'];
    }

    if (params.hasOwnProperty('sort')) {
      activeParams.sort = params['sort'];
    }

    if (params.hasOwnProperty('intitle')) {
      activeParams.intitle = params['intitle'];
    }

    if (params.hasOwnProperty('site')) {
      activeParams.site = params['site'];
    }

    return activeParams;

  }
}
