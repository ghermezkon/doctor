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
    getAll(table_name) {
        return this.http.get(this.urlPoint + this.urlInit + table_name)
    }
    save(table_name, data?: any) {
        return this.http.post(this.urlPoint + this.urlInit + table_name, data);
    }
    update(table_name, data?: any) {
        return this.http.put(this.urlPoint + this.urlInit + table_name, data);
    }
    get_city_of_ostan(data) {
        return this.http.get(this.urlPoint + this.urlInit + 'city_of_ostan/' + data)
    }

}