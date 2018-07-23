import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { SelectSearchableComponent } from "ionic-select-searchable";
import { InfiniteScroll } from "ionic-angular";
import { delay } from "rxjs/operators";
import { Matab } from "../../util/global.class";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";

@Component({
    selector: 'matab-more-page',
    templateUrl: 'matab.more.html'
})
export class MatabMorePage {
    dataForm: FormGroup;
    matab_list: any[] = [];
    counter_list: any[] = [];
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    validation_msg: any;
    idx: any = -1;
    //----------------------------------------------------------
    page = 2;
    doctorsSubscription: Subscription;
    current_matab: any;
    days: any[] = [];
    //------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //------------------------------------------------------
    ionViewWillLoad() {
        this.days = this._msg.days;
        this.createForm();
        this._http.getAll('matab_base').subscribe((_: any) => {
            this.matab_list = _;
        });
    }
    //------------------------------------------------------
    getMoreMatabs(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll, text: string }) {
        let text = (event.text || '').trim();
        if (this.page > 3) {
            event.infiniteScroll.enable(false);
            return;
        }
        this.getMatabsAsync(this.page, 15).subscribe(res => {
            res = event.component.items.concat(res);
            if (text) {
                res = this.filterMatabs(res, text);
            }
            event.component.items = res;
            event.infiniteScroll.complete();
            this.page++;
        });
    }
    //---------------------------------------------------------- 
    getMatabsAsync(page?: number, size?: number, timeout = 100): Observable<any[]> {
        return new Observable<any[]>(observer => {
            observer.next(this.getMatabs(page, size));
            observer.complete();
        }).pipe(delay(timeout));
    }
    //---------------------------------------------------------- 
    getMatabs(page?: number, size?: number): any[] {
        let matabs = [];
        this.matab_list.forEach(matab => {
            matabs.push(matab);
        });
        if (page && size) {
            matabs = matabs.slice((page - 1) * size, ((page - 1) * size) + size);
        }
        return matabs;
    }
    //---------------------------------------------------------- 
    filterMatabs(matabs: any[], text: string) {
        return matabs.filter(matab => {
            return matab.matab_base.matab_doctor.doctor_name.indexOf(text) !== -1;
        });
    }
    //---------------------------------------------------------- 
    searchMatabsInfinite(event: { component: SelectSearchableComponent, infiniteScroll: InfiniteScroll, text: string }) {
        let text = event.text.trim();
        event.component.startSearch();
        if (this.doctorsSubscription) {
            this.doctorsSubscription.unsubscribe();
        }
        if (!text) {
            if (this.doctorsSubscription) {
                this.doctorsSubscription.unsubscribe();
            }
            event.component.items = this.getMatabs(1, 15);
            this.page = 2;
            event.component.endSearch();
            if (event.infiniteScroll) {
                event.infiniteScroll.enable(true);
            }
            return;
        }
        this.doctorsSubscription = this.getMatabsAsync().subscribe(ports => {
            if (this.doctorsSubscription.closed) {
                return;
            }
            event.component.items = this.filterMatabs(ports, text);
            event.component.endSearch();
        });
    }
    //---------------------------------------------------------- 
    createForm() {
        this.dataForm = this.fb.group({
            matab_start_time: ['', Validators.required],
            matab_end_time: ['', Validators.required],
            matab_number_bed: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            matab_close_day: ['', Validators.required],
            matab_date_close_start: [''],
            matab_date_close_end: [''],
            matab_is_enable: [true],
        });
    }
    //---------------------------------------------------------- 
    // doInfinite(infiniteScroll) {
    //     this.totalPage = this.page * 10;
    //     setTimeout(() => {
    //         let result = this.counter_list.slice(this.page * 10);
    //         for (let i = 1; i < this.perPage; i++) {
    //             if (result[i] != undefined) {
    //                 this.data_list.push(result[i])
    //             }
    //         }
    //         this.page += 1;
    //         infiniteScroll.complete();
    //     }, 500);
    // }
    //---------------------------------------------------------- 
}