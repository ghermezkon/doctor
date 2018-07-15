import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable({
    providedIn: 'root',
})
export class MessageUtil {
    msg = [
        {type: "double", message: 'اطلاعات این رکورد قبلاً در سیستم ثبت شده است'},
        {type: 'save_ok', message: 'ذخیره اطلاعات با موفقیت انجام گردید'},
        {type: 'save_err', message: 'خطا در ذخیره اطلاعات'},
        {type: 'update_ok', message: 'ویرایش اطلاعات با موفقیت انجام گردید'},
        {type: 'update_error', message: 'خطا در ویرایش اطلاعات'},
        {type: 'error', message: 'خطا در بارگذاری برنامه'}
    ]
    constructor(public toastCtrl: ToastController) { }
    //----------------------------------------------
    validate_msg() {
        return {
            'global': [
                { type: 'required', message: 'الزامی' },
                { type: 'pattern', message: 'فقط عدد وارد نمائید' },
                // { type: 'minlength', message: 'حداقل 11 کاراکتر وارد نمائید' },
                // { type: 'maxlength', message: 'حداکثر 11 کاراکتر وارد نمائید' },
            ]
        }
    }
    //----------------------------------------------
    showMessage(msg) {
        let toast = this.toastCtrl.create({
            message: this.msg.filter((o: any) => o.type === msg)[0].message,
            duration: 2000,
            cssClass: 'toastCss'
        });
        toast.present();
    }
}