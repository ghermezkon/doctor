import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    //----------------------------------------------------------
    //urlPoint: any = 'http://www.monosisgroup.com/api/';
    urlPoint: any = 'http://localhost:5001/api/';
    urlInit: any = 'zaraban_init/';
    //----------------------------------------------------------
    constructor(public http: HttpClient) { }
    //----------------------------------------------------------
    public getUrlPoint() {
        return this.urlPoint;
    }
    //----------------------------------------------------------
    public getDate() {
        return this.http.get(this.urlPoint + 'currentDate');
    }
    //----------------------------------------------------------
    public getAllOstan() {
        return this.http.get(this.urlPoint + this.urlInit + 'ostan')
    }
    save_ostan(ostan?: any) {
        return this.http.post(this.urlPoint+ this.urlInit+ 'ostan', ostan);
    }
    update_ostan(ostan?: any) {
        return this.http.put(this.urlPoint+ this.urlInit+ 'ostan', ostan);
    }
}