import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { map, take } from "rxjs/operators";
import { TD, CD } from "../../util/global.class";
import { forkJoin } from "rxjs";

@IonicPage()
@Component({
    selector: 'doctor-page',
    templateUrl: 'doctor.html'
})
export class DoctorPage {
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

    cd_list: any[] = [];
    cd_select: any = undefined;
    cdOption: any;

    idx: any = -1;
    //-------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //-------------------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._msg.validate_msg();
        this.createForm();
        this.tdOption = {
            title: 'نوع پزشک',
            subTitle: 'انتخاب نوع پزشک',
            mode: 'ios'
        };
        this.cdOption = {
            title: 'تخصص',
            subTitle: 'انتخاب نوع تخصص',
            mode: 'ios'
        };
        forkJoin(
            this._http.getAll('typedoctor').pipe(map(res => _.orderBy(res, ['td_code']))),
            this._http.getAll('captiondoctor').pipe(map(res => _.orderBy(res, ['cd_code']))))
            .subscribe((_: any) => {
                this.td_list = _[0];
                this.cd_list = _[1];
            })
    }
    //-------------------------------------------------------
    tdSelectChange(event) {
        this._http.get_doctor_of_td(event.td_name).pipe(take(1)).subscribe((res: any) => {
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
    compareFnCD(e1: any, e2: any): boolean {
        return e1 && e2 ? e1._id === e2._id : e1 === e2;
    }
    //------------------------------------------------------------
    createForm() {
        this.dataForm = this.fb.group({
            _id: [''],
            doctor_code: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            doctor_name: ['', Validators.required],
            doctor_pic: [''],
            doctor_sub_caption: [''],
            doctor_mobile: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(11), Validators.maxLength(11)])],
            td: this.fb.group({ ...TD }),
            cd: this.fb.group({ ...CD }),
        });
    }
    //------------------------------------------------------------
    set_data(data, idx) {
        this.dataForm.patchValue(data);
        this.td_select = data.td;
        this.cd_select = data.cd;
        //this.dataForm.get('doctor_pic').setValue(data.doctor_pic);
        this.idx = idx;
        return true;
    }
    //------------------------------------------------------------
    readFile(input) {
        var reader = new FileReader();
        var self = this;
        reader.onload = function (e) {
            self.dataForm.controls['doctor_pic'].setValue(reader.result);
        };
        var file = (<HTMLInputElement>document.getElementById('fileImport')).files[0];
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    //------------------------------------------------------------
    save(data) {
        if (this.idx != -1) {
            this.edit(data);
        }
        data.td = this.td_select;
        data.cd = this.cd_select;

        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.td.td_name == data.td.td_name && o.doctor_code == data.doctor_code) ||
                (o.td.td_name == data.td.td_name && o.doctor_name == data.doctor_name);
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
        this.dataForm.reset({
            doctor_pic: ''
        });  
    }
    //------------------------------------------------------------
    edit(data) {
        let list = [...this.data_list];
        data.td = this.td_select;
        data.cd = this.cd_select;

        let find_index = _.findIndex(this.data_list, function (o) {
            return (o.td.td_name == data.td.td_name && o.doctor_code == data.doctor_code) ||
                (o.td.td_name == data.td.td_name && o.doctor_name == data.doctor_name);
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
        this.dataForm.reset({
            doctor_pic: ''
        });        
        this.idx = -1;
    }
}