import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { HttpService } from '../http/HttpService';

@Injectable()
export class HttpOstanResolver implements Resolve<Observable<any>> {

    constructor(public _http: HttpService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._http.getAll('ostan').pipe(map(res => _.orderBy(res, ['ostan_code'])));
    }
}
