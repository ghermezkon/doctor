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
        return this.http.get(this.urlPoint + this.urlInit + table_name);
    }
    save(data?: any) {
        return this.http.post(this.urlPoint + this.urlInit, data);
    }
    update(data?: any) {
        return this.http.put(this.urlPoint + this.urlInit, data);
    }
    updateMatab(data?: any) {
        return this.http.put(this.urlPoint + this.urlInit + 'matab', data);
    }

    get_city_of_ostan(data) {
        return this.http.get(this.urlPoint + this.urlInit + 'city_of_ostan/' + data);
    }
    get_tw_of_td(data) {
        return this.http.get(this.urlPoint + this.urlInit + 'tw_of_td/' + data);
    }
    get_doctor_of_td(data) {
        return this.http.get(this.urlPoint + this.urlInit + 'doctor_of_td/' + data);
    }
    get_doctor_by_name(data) {
        return this.http.get(this.urlPoint + this.urlInit + 'search_doctor/' + data);
    }
}