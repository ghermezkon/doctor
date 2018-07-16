import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { take } from "rxjs/operators";
import * as _ from 'lodash';

@IonicPage()
@Component({
    selector: 'caption-doctor-page',
    templateUrl: 'caption.doctor.html'
})
export class CaptionDoctorPage {
    dataForm: FormGroup;
    data_list: any[] = [];
    counter_list: any[] = [];
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    validation_msg: any;
    input_search: any;
    idx: any = -1;
    //----------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //----------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._msg.validate_msg();
        this.createForm();
        this._http.getAll('captiondoctor').subscribe((_: any) => {
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
    //----------------------------------------------
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
    //------------------------------------------------------------
    createForm() {
        this.dataForm = this.fb.group({
            _id: [''],
            cd_code: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            cd_name: ['', Validators.required],
        });
    }
    //------------------------------------------------------------
    set_data(data, idx) {
        this.dataForm.patchValue(data);
        this.idx = idx;
        return true;
    }
    //------------------------------------------------------------
    save(data) {
        if(this.idx != -1){
            this.edit(data);
        }
        let find_index = _.findIndex(this.data_list, function (o) {
            return o.cd_code == data.cd_code || o.cd_name == data.cd_name;
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
        let find_index = _.findIndex(this.data_list, (o: any) => {
            return o.cd_name == data.cd_name || o.cd_code == data.cd_code;
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
    }
    //------------------------------------------------------------
}