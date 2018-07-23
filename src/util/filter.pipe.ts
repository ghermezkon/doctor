import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterOstan',
})
export class FilterOstan implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.ostan_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}
//--------------------------------------------------------
@Pipe({
    name: 'filterCity',
})
export class FilterCity implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.city_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}
//--------------------------------------------------------
@Pipe({
    name: 'filterTypeDoctor',
})
export class FilterTypeDoctor implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.td_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}
//--------------------------------------------------------
@Pipe({
    name: 'filterTypeWork',
})
export class FilterTypeWork implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.tw_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}
//--------------------------------------------------------
@Pipe({
    name: 'filterCaptionDoctor',
})
export class FilterCaptionDoctor implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.cd_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}
@Pipe({
    name: 'filterDoctor',
})
export class FilterDoctor implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.doctor_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}
//--------------------------------------------------------
@Pipe({
    name: 'filterMatab',
})
export class FilterMatab implements PipeTransform {
    transform(value: any, input?: string) {
        if (input) {
            return value.filter((el: any) => {
                return el.matab_base.matab_doctor.doctor_name.indexOf(input) > -1;
            })
        }
        return value;
    }
}