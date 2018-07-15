import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageUtil } from "../../../util/message.util";
import { HttpService } from "../../../http/HttpService";
import { take, map } from "rxjs/operators";
import { Ostan } from "../../../util/global.class";
import { IonicPage } from "ionic-angular";
import * as _ from 'lodash';
import { ResolvedReflectiveFactory } from "@angular/core/src/di/reflective_provider";

@IonicPage()
@Component({
    selector: 'city-page',
    templateUrl: 'city.html'
})
export class CityPage {
    dataForm: FormGroup;
    data_list: any[] = [];
    counter_list: any[] = [];
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    validation_msg: any;
    input_search: any;
    ostan_list: any[] = [];
    ostan_select: any = undefined;
    ostanOption: any;
    idx: any = -1;
    //-----------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //-----------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._msg.validate_msg();
        this.createForm();
        this.ostanOption = {
            title: 'استان های کشور',
            subTitle: 'انتخاب استان',
            mode: 'ios'
        };
        this._http.getAll('ostan').pipe(map(res => _.orderBy(res, ['ostan_code']))).subscribe((_: any) => {
            this.ostan_list = _;
        })
    }
    ostanSelectChange(event) {
        this._http.get_city_of_ostan(event.ostan_name).pipe(take(1)).subscribe((res: any) => {
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
    compareFnOstan(e1: any, e2: any): boolean {
        return e1 && e2 ? e1._id === e2._id : e1 === e2;
    }
    //------------------------------------------------------------
    createForm() {
        this.dataForm = this.fb.group({
            _id: [''],
            city_code: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            city_name: ['', Validators.required],
            ostan: this.fb.group({ ...Ostan }),
        });
    }
    set_data(data, idx) {
        this.dataForm.setValue(data);
        this.ostan_select = data.ostan;
        this.idx = idx;
        return true;
    }
    save(data) {
        if(this.idx != -1){
            this.edit(data);
        }
        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.ostan.ostan_name == data.ostan.ostan_name && o.city_code == data.city_code) ||
                (o.ostan.ostan_name == data.ostan.ostan_name && o.city_name == data.city_name);
        });
        if (find_index != -1) {
            this._msg.showMessage('double');
            return;
        }
        else if (this.dataForm.status == 'VALID') {
            delete data._id;
            data.ostan = this.ostan_select;
            this._http.save('city', data).subscribe((json: any) => {
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
        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.ostan.ostan_name == data.ostan.ostan_name && o.city_code == data.city_code) ||
                (o.ostan.ostan_name == data.ostan.ostan_name && o.city_name == data.city_name);
        });
        if (find_index != -1 && find_index != this.idx) {
            this.dataForm.reset();
            this._msg.showMessage('double');
            return;
        } else {
            data.ostan = this.ostan_select;
            this._http.update('city', data).pipe(take(1)).subscribe((json: any) => {
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