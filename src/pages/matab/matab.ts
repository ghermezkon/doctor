import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { map, delay } from "rxjs/operators";
import * as _ from 'lodash';
import { FormControl } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { List, InfiniteScroll } from "ionic-angular";
import { Validators } from "@angular/forms";
import { SelectSearchableComponent } from "ionic-select-searchable";
import { Observable, Subscription } from "rxjs";
import { forkJoin } from "rxjs/internal/observable/forkJoin";

@Component({
    selector: 'matab-page',
    templateUrl: 'matab.html'
})
export class MatabPage {
    dataForm: FormGroup;
    data_list: any[] = [];
    counter_list: any[] = [];
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    validation_msg: any;
    idx: any = -1;
    //----------------------------------------------------------
    doctor_list: any[] = [];
    city_list: any[] = [];
    doctor: any;
    city: any;
    page = 2;
    doctorsSubscription: Subscription;
    citysSubscription: Subscription;
    //----------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //----------------------------------------------------------
    ionViewWillLoad() {
        this.createForm();
        this.validation_msg = this._msg.validate_msg();
        forkJoin(this._http.getAll('doctor'), this._http.getAll('city')).subscribe((_: any) => {
            this.doctor_list = _[0];
            this.city_list = _[1];
        });
    }
    //---------------------------------------------------------- 
    getMoreDoctors(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll, text: string }) {
        let text = (event.text || '').trim();
        if (this.page > 3) {
            event.infiniteScroll.enable(false);
            return;
        }
        this.getDoctorsAsync(this.page, 15).subscribe(res => {
            res = event.component.items.concat(res);
            if (text) {
                res = this.filterDoctors(res, text);
            }
            event.component.items = res;
            event.infiniteScroll.complete();
            this.page++;
        });
    }
    //---------------------------------------------------------- 
    getDoctorsAsync(page?: number, size?: number, timeout = 100): Observable<any[]> {
        return new Observable<any[]>(observer => {
            observer.next(this.getDoctors(page, size));
            observer.complete();
        }).pipe(delay(timeout));
    }
    //---------------------------------------------------------- 
    getDoctors(page?: number, size?: number): any[] {
        let doctors = [];
        this.doctor_list.forEach(doctor => {
            doctors.push(doctor);
        });
        if (page && size) {
            doctors = doctors.slice((page - 1) * size, ((page - 1) * size) + size);
        }
        return doctors;
    }
    //---------------------------------------------------------- 
    filterDoctors(doctors: any[], text: string) {
        return doctors.filter(doctor => {
            return doctor.doctor_name.indexOf(text) !== -1;
        });
    }
    //---------------------------------------------------------- 
    searchDoctorsInfinite(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll, text: string }) {
        let text = event.text.trim();
        event.component.startSearch();
        if (this.doctorsSubscription) {
            this.doctorsSubscription.unsubscribe();
        }
        if (!text) {
            if (this.doctorsSubscription) {
                this.doctorsSubscription.unsubscribe();
            }
            event.component.items = this.getDoctors(1, 15);
            this.page = 2;
            event.component.endSearch();
            if (event.infiniteScroll) {
                event.infiniteScroll.enable(true);
            }
            return;
        }
        this.doctorsSubscription = this.getDoctorsAsync().subscribe(ports => {
            if (this.doctorsSubscription.closed) {
                return;
            }
            event.component.items = this.filterDoctors(ports, text);
            event.component.endSearch();
        });
    }
    //---------------------------------------------------------- 
    getMoreCitys(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll, text: string }) {
        let text = (event.text || '').trim();
        if (this.page > 3) {
            event.infiniteScroll.enable(false);
            return;
        }
        this.getDoctorsAsync(this.page, 15).subscribe(res => {
            res = event.component.items.concat(res);
            if (text) {
                res = this.filterCitys(res, text);
            }
            event.component.items = res;
            event.infiniteScroll.complete();
            this.page++;
        });
    }
    //---------------------------------------------------------- 
    getCitysAsync(page?: number, size?: number, timeout = 100): Observable<any[]> {
        return new Observable<any[]>(observer => {
            observer.next(this.getCitys(page, size));
            observer.complete();
        }).pipe(delay(timeout));
    }
    //---------------------------------------------------------- 
    getCitys(page?: number, size?: number): any[] {
        let citys = [];
        this.city_list.forEach(city => {
            citys.push(city);
        });
        if (page && size) {
            citys = citys.slice((page - 1) * size, ((page - 1) * size) + size);
        }
        return citys;
    }
    //---------------------------------------------------------- 
    filterCitys(citys: any[], text: string) {
        return citys.filter(city => {
            return city.city_name.indexOf(text) !== -1;
        });
    }
    //---------------------------------------------------------- 
    searchCitysInfinite(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll, text: string }) {
        let text = event.text.trim();
        event.component.startSearch();
        if (this.citysSubscription) {
            this.citysSubscription.unsubscribe();
        }
        if (!text) {
            if (this.citysSubscription) {
                this.citysSubscription.unsubscribe();
            }
            event.component.items = this.getCitys(1, 15);
            this.page = 2;
            event.component.endSearch();
            if (event.infiniteScroll) {
                event.infiniteScroll.enable(true);
            }
            return;
        }
        this.citysSubscription = this.getCitysAsync().subscribe(ports => {
            if (this.citysSubscription.closed) {
                return;
            }
            event.component.items = this.filterCitys(ports, text);
            event.component.endSearch();
        });
    }
    //---------------------------------------------------------- 
    createForm() {
        this.dataForm = this.fb.group({
            _id: [''],
            matab_doctor: ['', Validators.required],
            matab_city: ['', Validators.required],
            matab_tel: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
            matab_fax: ['', Validators.compose([Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
            matab_address: ['', Validators.required]
        });
    }
}