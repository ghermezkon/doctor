import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";

export const Ostan = {
    _id: '',
    ostan_code: '',
    ostan_name: '',
}
export const TD = {
    _id: '',
    td_code: '',
    td_name: '',
    td_icon: ''
}
export const CD = {
    _id: '',
    cd_code: '',
    cd_name: '',
}
export const Matab = {
    _id: [''],
    matab_base: new FormGroup({
        matab_doctor: new FormControl('', Validators.required),
        matab_city: new FormControl('', Validators.required),
        matab_tel: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
        matab_fax: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
        matab_address: new FormControl('', Validators.required),
    }),
    matab_more: new FormGroup({
        matab_start_time: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
        matab_end_time: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
        matab_number_bed: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
        matab_close_day: new FormControl('', Validators.required),
        matab_date_close_start: new FormControl(''),
        matab_date_close_end: new FormControl(''),
        matab_is_enable: new FormControl(true),
    }),
}
