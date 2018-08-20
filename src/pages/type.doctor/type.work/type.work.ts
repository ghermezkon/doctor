import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageUtil } from "../../../util/message.util";
import { HttpService } from "../../../http/HttpService";
import { map, take } from "rxjs/operators";
import { TD } from "../../../util/global.class";
import * as _ from 'lodash';

@IonicPage()
@Component({
    selector: 'type-work-page',
    templateUrl: 'type.work.html'
})
export class TypeWorkPage {
    dataForm: FormGroup;
    data_list: any[] = [];
    counter_list: any[] = [];
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    validation_msg: any;
    input_search: any;
    td_list: any[] = [];
    td_select: any = undefined;
    tdOption: any;
    idx: any = -1;
    //------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil){}
    //------------------------------------------------------
    ionViewWillLoad(){
        this.validation_msg = this._msg.validate_msg();
        this.createForm();
        this.tdOption = {
            title: 'نوع پزشک',
            subTitle: 'انتخاب نوع پزشک',
            mode: 'ios'
        };
        this._http.getAll('typedoctor').pipe(map(res => _.orderBy(res, ['td_code']))).subscribe((_: any) => {
            this.td_list = _;
        })
    }
    //------------------------------------------------------
    tdSelectChange(event) {
        this._http.get_tw_of_td(event.td_name).pipe(take(1)).subscribe((res: any) => {
            if (res.length > 11) {
                this.counter_list = res;
                for (let i = 0; i < 11; i++) {
                    this.data_list.push(res[i]);
                }
                this.perPage = 10;
                this.totalData = res.length;
                this.totalPage = Math.ceil(this.totalData / this.perPage);
            } else {
                this.data_list = res;
            }
        })
    }
    //-----------------------------------------------    
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
    //-----------------------------------------------    
    compareFnTD(e1: any, e2: any): boolean {
        return e1 && e2 ? e1._id === e2._id : e1 === e2;
    }
    //------------------------------------------------------------
    createForm() {
        this.dataForm = this.fb.group({
            _id: [''],
            tw_code: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            tw_name: ['', Validators.required],
            tw_time: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            td: this.fb.group({ ...TD }),
        });
    }
    set_data(data, idx) {
        this.dataForm.patchValue(data);
        this.td_select = data.td;
        this.idx = idx;
        return true;
    }
    save(data) {
        if(this.idx != -1){
            this.edit(data);
        }
        data.td = this.td_select;
        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.td.td_name == data.td.td_name && o.tw_code == data.tw_code) ||
                (o.td.td_name == data.td.td_name && o.tw_name == data.tw_name);
        });
        if (find_index != -1) {
            this._msg.showMessage('double');
            return;
        }
        else if (this.dataForm.status == 'VALID') {
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
    //------------------------------------------------------------
    edit(data) {
        let list = [...this.data_list];
        data.td = this.td_select;
        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.td.td_name == data.td.td_name && o.tw_code == data.tw_code) ||
                (o.td.td_name == data.td.td_name && o.tw_name == data.tw_name);
        });
        if (find_index != -1 && find_index != this.idx) {
            this.dataForm.reset();
            this._msg.showMessage('double');
            return;
        } else {
            this._http.update(data).pipe(take(1)).subscribe((json: any) => {
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