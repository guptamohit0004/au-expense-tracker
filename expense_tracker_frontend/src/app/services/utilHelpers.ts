import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { authenticationService } from '../services/authentication';

export class utilHelpers {
  constructor(public _snackBar: MatSnackBar) {}
  static getDatesFunction(value: string) {
    let date = new Date();
    if (value == 'today') {
      return {
        from: moment(date).format('YYYY-MM-DD'),
        to: moment(date).format('YYYY-MM-DD'),
      };
    } else if (value == 'yesterday') {
      let yesterday = moment(new Date(date))
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      return {
        from: yesterday,
        to: yesterday,
      };
    } else if (value == 'curr_week') {
      var currentDate = moment();
      var weekStart = currentDate.clone().startOf('week').format('YYYY-MM-DD');
      var weekEnd = currentDate.clone().endOf('week').format('YYYY-MM-DD');
      return {
        from: weekStart,
        to: weekEnd,
      };
    } else if (value == 'prev_week') {
      let start = moment()
        .subtract(1, 'weeks')
        .startOf('week')
        .format('YYYY-MM-DD');
      let end = moment()
        .subtract(1, 'weeks')
        .endOf('week')
        .format('YYYY-MM-DD');
      return {
        from: start,
        to: end,
      };
    } else if (value == 'curr_month') {
      var currentDate = moment();
      var monthStart = currentDate
        .clone()
        .startOf('month')
        .format('YYYY-MM-DD');
      var monthEnd = currentDate.clone().endOf('month').format('YYYY-MM-DD');
      return {
        from: monthStart,
        to: monthEnd,
      };
    } else if (value == 'prev_month') {
      let start = moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
      let end = moment()
        .subtract(1, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');
      return {
        from: start,
        to: end,
      };
    }
  }
  static toTitleCase(str) {
    return str.replace(/(\w*\W*|\w*)\s*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  static headers() {
    let token = JSON.parse(localStorage.getItem('currentUser'));
    let header = new HttpHeaders();
    header = header.set('Authorization', `Bearer ${token}`);
    return header;
  }
}
