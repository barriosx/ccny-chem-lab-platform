import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WasteRequestService {
    domain = "http://localhost:3000";
    constructor(private http: HttpClient) {
    }
  

    getRequests(): Promise<any>{
      let promise = new Promise((resolve,reject) => {
        this.http.get(this.domain + '/schedule').toPromise()
        .then(
          res => { // Success
            resolve(res);
        },
        msg => { // Error
          reject(msg);
        });
      });
      return promise;
    }
}
