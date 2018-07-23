import { Component } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { map, delay, take } from "rxjs/operators";
import { ViewChild } from "@angular/core";
import { List, InfiniteScroll } from "ionic-angular";
import { SelectSearchableComponent } from "ionic-select-searchable";
import { Observable, Subscription, forkJoin } from "rxjs";
import { Matab } from "../../util/global.class";
import * as _ from 'lodash';

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
    page = 2;
    doctorsSubscription: Subscription;
    citysSubscription: Subscription;
    //----------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //----------------------------------------------------------
    ionViewWillLoad() {
        this.createForm();
        this.validation_msg = this._msg.validate_msg();
        forkJoin(
            this._http.getAll('doctor'),
            this._http.getAll('city'),
            this._http.getAll('matab_base')).subscribe((_: any) => {
                this.doctor_list = _[0];
                this.city_list = _[1];
                if (_[2].length > 11) {
                    this.counter_list = _[2];
                    for (let i = 0; i < 11; i++) {
                        this.data_list.push(_[2][i]);
                    }
                    this.perPage = 10;
                    this.totalData = _[2].length;
                    this.totalPage = Math.ceil(this.totalData / this.perPage);
                } else {
                    this.data_list = _[2];
                }
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
        this.dataForm = this.fb.group({ ...Matab });
    }
    doInfinite(infiniteScroll) {
        this.totalPage = this.page * 10;
        setTimeout(() => {
            let result = this.counter_list.slice(this.page * 10);
            for (let i = 1; i < this.perPage; i++) {
                if (result[i] != undefined) {
                    this.data_list.push(result[i])
                }
            }
            this.page += 1;
            infiniteScroll.complete();
        }, 500);
    }
    set_data(data, idx) {
        this.dataForm.patchValue(data);
        this.idx = idx;
        return true;
    }
    save(data) {
        if (this.idx != -1) {
            this.edit(data);
        }
        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.matab_base.matab_doctor.doctor_name == data.matab_base.matab_doctor.doctor_name &&
                o.matab_base.matab_city.city_code == data.matab_base.matab_city.city_code);
        });
        if (find_index != -1) {
            this._msg.showMessage('double');
            return;
        }
        else if (this.dataForm.get('matab_base').status == 'VALID') {
            delete data._id;
            this._http.save(data).subscribe((json: any) => {
                if (json.result.n >= 1) {
                    this._msg.showMessage('save_ok');
                    this.data_list.push(json.ops[0]);
                } else {
                    this._msg.showMessage('save_error');
                }
            });
        } else {
            this._msg.showMessage('error');
        }
        this.dataForm.reset();
    }
    edit(data) {
        let list = [...this.data_list];

        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.matab_base.matab_doctor.doctor_name == data.matab_base.matab_doctor.doctor_name &&
                o.matab_base.matab_doctor.city_code == data.matab_base.matab_doctor.city_code);
        });
        if (find_index != -1 && find_index != this.idx) {
            this.dataForm.reset();
            this._msg.showMessage('double');
            return;
        } else {
            this._http.updateMatab(data).pipe(take(1)).subscribe((json: any) => {
                if (json.nModified >= 1) {
                    this._msg.showMessage('update_ok');

                    let index = _.findIndex(this.data_list, function (o) { return o._id == data._id; });
                    list[index] = data;
                    this.data_list = list;
                } else {
                    this._msg.showMessage('update_error');
                }
            });
        }
        this.dataForm.reset();
        this.idx = -1;
    }
}