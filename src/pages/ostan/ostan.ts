import { Component } from "@angular/core";
import { IonicPage, ToastController, List } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { HttpService } from "../../http/HttpService";
import { Observable, from } from "rxjs";
import { filter, map, tap, findIndex, find, take, merge, combineLatest, combineAll, flatMap, distinctUntilChanged, concat } from 'rxjs/operators';
import { ViewChild } from "@angular/core";

interface Ostan {
    ostan_code: any,
    ostan_name: any
}

//@IonicPage()
@Component({
    selector: 'ostan-page',
    templateUrl: 'ostan.html'
})
export class OstanPage {
    dataForm: FormGroup;
    data_list: any[] = [];
    data_list1: any[] = [];
    page = 1;
    perPage = 0;
    totalData = 0;
    totalPage = 0;

    @ViewChild(List) ostanList: List;
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
        this._http.getAllOstan().subscribe((_: any) => {
            this.data_list1 = _;
            for(let i = 0; i < 10; i++){
                this.data_list.push(_[i]);
            }
            this.perPage = 10;
            this.totalData = _.length;
            this.totalPage = Math.ceil(this.totalData / this.perPage);
        });
    }
    doInfinite(infiniteScroll) {
        this.totalPage = this.page * 10;
        setTimeout(() => {
          let result = this.data_list1.slice(this.page * 10);
          for (let i = 1; i <= this.perPage; i++) {
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
            ostan_code: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
            ostan_name: ['', Validators.required],
        });
    }
    save_ostan(data) {

        // this.data_list.pipe(
        //     findIndex((ev: Ostan, idx) => { if (ev.ostan_code) return ev[idx].ostan_code === data.ostan_code }),
        // ).subscribe((res: any) => {
        //     if (res != -1) {
        //         let toast = this.toastCtrl.create({
        //             message: 'اطلاعات این استان قبلا در سیستم ثبت شده است',
        //             duration: 2000,
        //             cssClass: 'toastCss'
        //         });
        //         toast.present();
        //         this.dataForm.reset();
        //     } else {
                if (this.dataForm.status == 'VALID') {
                    delete data._id;
                    this._http.save_ostan(data).subscribe((json: any) => {
                        if (json.result.n >= 1) {
                            let toast = this.toastCtrl.create({
                                message: 'ذخیره اطلاعات انجام گردید',
                                duration: 2000,
                                cssClass: 'toastCss'
                            });
                            this.data_list.push(json.ops[0]);
        
                            toast.present();
                            this.dataForm.reset();
                        } else {
                            let toast = this.toastCtrl.create({
                                message: 'خطا در ذخیره اطلاعات',
                                duration: 2000,
                                cssClass: 'toastCss'
                            });
                            toast.present();
                            this.dataForm.reset();
                        }
                    });
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'خطا در بارگذاری برنامه',
                        duration: 2000,
                        cssClass: 'toastCss'
                    });
                    toast.present();
                    this.dataForm.reset();
                }
            
        //});
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