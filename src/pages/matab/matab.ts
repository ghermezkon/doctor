import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { HttpService } from "../../http/HttpService";
import { MessageUtil } from "../../util/message.util";
import { map } from "rxjs/operators";
import * as _ from 'lodash';
import { FormControl } from "@angular/forms";
import { ViewChild } from "@angular/core";
import { List } from "ionic-angular";

@Component({
    selector: 'matab-page',
    templateUrl: 'matab.html'
})
export class MatabPage {
    dataForm: FormGroup;
    data_list: any[] = [];
    counter_list: any[] = [];
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    validation_msg: any;
    input_search: any;
    doctor_list: any[] = [];
    doctor_list1: any[] = [];
    ostan_select: any = undefined;
    ostanOption: any;
    idx: any = -1;
    doctor_name: any;
    queryField: FormControl = new FormControl();
    @ViewChild(List) test1: List;
    //----------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public _msg: MessageUtil) { }
    //----------------------------------------------------------
    ionViewWillLoad() {
        this.validation_msg = this._msg.validate_msg();
        this.ostanOption = {
            title: 'استان های کشور',
            subTitle: 'انتخاب استان',
            mode: 'ios'
        };
        this._http.getAll('doctor').subscribe((_: any) => {
            this.doctor_list1 = _;
        })
    }
    //----------------------------------------------------------
    search_doctor(event) {
        this.test1.setElementStyle('display', 'block');
        this.doctor_list = _.filter(this.doctor_list1, o => {
            return (o.doctor_name.includes(this.queryField.value))
        })

    }
    test(data) {
        this.test1.setElementStyle('display', 'none')
        this.queryField.setValue(data.doctor_name);
    }
}