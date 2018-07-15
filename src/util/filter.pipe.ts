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