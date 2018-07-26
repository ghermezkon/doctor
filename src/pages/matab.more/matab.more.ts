import { Component } from "@angular/core";
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { SelectSearchableComponent } from "ionic-select-searchable";
import { InfiniteScroll } from "ionic-angular";
import { delay, take } from "rxjs/operators";
import { Matab } from "../../util/global.class";

import * as _ from 'lodash';
@Component({
    selector: 'matab-more-page',
    templateUrl: 'matab.more.html'
})
export class MatabMorePage {
    dataForm: FormGroup;
    data_list: any[] = [];
    counter_list: any[] = [];
    perPage = 0;
    totalData = 0;
    totalPage = 0;
    page = 1;
    validation_msg: any;
    //----------------------------------------------------------
    current_matab: any = null;
    matab_name: any = null;
    days: any[] = [];
    dayOptions = {
        title: 'روزهای هفته',
        subTitle: 'انتخاب روزهای تعطیل',
        mode: 'md'
    };
    //------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //------------------------------------------------------
    ionViewWillLoad() {
        this.days = this._msg.days;
        this.validation_msg = this._msg.validate_msg();
        this.createForm();
        this._http.getAll('matab').subscribe((_: any) => {
            if (_.length > 11) {
                this.counter_list = _;
                for (let i = 0; i < 11; i++) {
                    this.data_list.push(_[i]);
                }
                this.perPage = 10;
                this.totalData = _.length;
                this.totalPage = Math.ceil(this.totalData / this.perPage);
            } else {
                this.data_list = _;
            }
        });
    }
    //------------------------------------------------------
    createForm() {
        this.dataForm = this.fb.group({
            matab_start_time: ['', Validators.required],
            matab_end_time: ['', Validators.required],
            matab_number_bed: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            matab_close_day: [''],
            matab_date_close_start: [''],
            matab_date_close_end: [''],
            matab_is_enable: [true],
        });
    }
    //------------------------------------------------------
    compareFn(e1: any, e2: any): boolean {
        return e1 && e2 ? e1.day_value === e2.day_value : e1 === e2;
    }
    //------------------------------------------------------
    set_data(data, idx) {
        this.dataForm.patchValue({
            matab_start_time: data.matab_more.matab_start_time,
            matab_end_time: data.matab_more.matab_end_time,
            matab_number_bed: data.matab_more.matab_number_bed,
            matab_close_day: data.matab_more.matab_close_day,
            matab_date_close_start: data.matab_more.matab_date_close_start,
            matab_date_close_end: data.matab_more.matab_date_close_end,
            matab_is_enable: data.matab_more.matab_is_enable
        });
        this.current_matab = data;
        this.matab_name = data.matab_base.matab_doctor.doctor_name + "(" + data.matab_base.matab_doctor.cd.cd_name + ") - " +
            data.matab_base.matab_city.city_name;
        return true;
    }
    //------------------------------------------------------
    edit(data) {
        let matab_form: FormGroup;
        matab_form = this.fb.group({ ...Matab });
        matab_form.get('_id').setValue(this.current_matab._id);
        matab_form.get('matab_base').setValue(this.current_matab.matab_base);
        matab_form.get('matab_more').setValue(data);

        let list = [...this.data_list];

        this._http.update(matab_form.value).pipe(take(1)).subscribe((json: any) => {
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
    //---------------------------------------------------------- 
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
    //----------------------------------------------------------     
}