import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable({
    providedIn: 'root',
})
export class MessageUtil {
    msg = [
        { type: "double", message: 'اطلاعات این رکورد قبلاً در سیستم ثبت شده است' },
        { type: 'save_ok', message: 'ذخیره اطلاعات با موفقیت انجام گردید' },
        { type: 'save_err', message: 'خطا در ذخیره اطلاعات' },
        { type: 'update_ok', message: 'ویرایش اطلاعات با موفقیت انجام گردید' },
        { type: 'update_error', message: 'خطا در ویرایش اطلاعات' },
        { type: 'error', message: 'خطا در بارگذاری برنامه' }
    ]
    days = [
        { day_name: 'شنبه', day_value: 1 },
        { day_name: 'یکشنبه', day_value: 2 },
        { day_name: 'دوشنبه', day_value: 3 },
        { day_name: 'سه شنبه', day_value: 4 },
        { day_name: 'چهارشنبه', day_value: 5 },
        { day_name: 'پنجشنبه', day_value: 6 },
        { day_name: 'جمعه', day_value: 7 }
    ]
    constructor(public toastCtrl: ToastController) { }
    //----------------------------------------------
    validate_msg() {
        return {
            'global': [
                { type: 'required', message: 'الزامی' },
                { type: 'pattern', message: 'فقط عدد وارد نمائید' },
            ],
            'mobile': [
                { type: 'required', message: 'الزامی' },
                { type: 'pattern', message: 'فقط عدد وارد نمائید' },
                { type: 'minlength', message: 'حداقل 11 کاراکتر وارد نمائید' },
                { type: 'maxlength', message: 'حداکثر 11 کاراکتر وارد نمائید' },
            ],
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