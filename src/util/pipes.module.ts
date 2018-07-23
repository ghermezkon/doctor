import { NgModule } from '@angular/core';
import { FilterOstan, FilterCity, FilterTypeDoctor, FilterTypeWork, FilterCaptionDoctor, FilterDoctor, FilterMatab } from './filter.pipe';
@NgModule({
	declarations: [FilterOstan, FilterCity, FilterTypeDoctor, FilterTypeWork, FilterCaptionDoctor, FilterDoctor, FilterMatab],
	imports: [],
	exports: [FilterOstan, FilterCity, FilterTypeDoctor, FilterTypeWork, FilterCaptionDoctor, FilterDoctor, FilterMatab]
})
export class PipesModule { }
