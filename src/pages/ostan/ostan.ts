import { Component } from "@angular/core";
import { IonicPage, ToastController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { HttpService } from "../../http/HttpService";
import { Observable, from } from "rxjs";
import { filter, map, tap, findIndex } from 'rxjs/operators';

@IonicPage()
@Component({
    selector: 'ostan-page',
    templateUrl: 'ostan.html'
})
export class OstanPage {
    dataForm: FormGroup;
    data_list: Observable<Object>;
    validation_msg = {
        'ostan': [
            { type: 'required', message: 'الزامی' },
            { type: 'pattern', message: 'فقط عدد وارد نمائید' },
            { type: 'minlength', message: 'حداقل 11 کاراکتر وارد نمائید' },
            { type: 'maxlength', message: 'حداکثر 11 کاراکتر وارد نمائید' },
        ],
    }
    //------------------------------------------------------------
    constructor(public fb: FormBuilder, public _http: HttpService, public toastCtrl: ToastController) { }
    //------------------------------------------------------------
    ionViewWillLoad() {
        this.createForm();
        this.data_list = this._http.getAllOstan();
    }
    //------------------------------------------------------------
    createForm() {
        this.dataForm = this.fb.group({
            _id: [''],
            ostan_code: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            ostan_name: ['', Validators.required],
        });
    }
    save_ostan(data) {
        this.data_list.pipe(
            findIndex((o: any)=> o.ostan_code == '12')
            ,tap((p)=> console.log(p))
        );
        // let find_index = _.findIndex(this.data_list, function (o) {
        //     return o.ostan_code == data.ostan_code || o.ostan_name == data.ostan_name;
        // });
        // console.log(find_index);
        // if (find_index != -1) {            
        //     let toast = this.toastCtrl.create({
        //         message: 'اطلعات این استان قبلا در سیستم ثبت شده است',
        //         duration: 2000,
        //         cssClass: 'toastCss'
        //     });
        //     toast.present();
        //     return;
        // }
        // else if (this.dataForm.status == 'VALID') {
        //     delete data._id;
        //     this._http.save_ostan(data).subscribe((json: any) => {
        //         if (json.result.n >= 1) {
        //             let toast = this.toastCtrl.create({
        //                 message: 'ذخیره اطلاعات انجام گردید',
        //                 duration: 2000,
        //                 cssClass: 'toastCss'
        //             });
        //             toast.present();
        //             this.dataForm.reset();
        //         } else {
        //             let toast = this.toastCtrl.create({
        //                 message: 'خطا در ذخیره اطلاعات',
        //                 duration: 2000,
        //                 cssClass: 'toastCss'
        //             });
        //             toast.present();
        //             this.dataForm.reset();
        //         }
        //     });
        // } else {
        //     let toast = this.toastCtrl.create({
        //         message: 'خطا در بارگذاری برنامه',
        //         duration: 2000,
        //         cssClass: 'toastCss'
        //     });
        //     toast.present();
        //     this.dataForm.reset();
        // }
    }
}