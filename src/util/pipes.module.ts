import { NgModule } from '@angular/core';
import { FilterOstan, FilterCity, FilterTypeDoctor, FilterTypeWork, FilterCaptionDoctor, FilterDoctor } from './filter.pipe';
@NgModule({
	declarations: [FilterOstan, FilterCity, FilterTypeDoctor, FilterTypeWork, FilterCaptionDoctor, FilterDoctor],
	imports: [],
	exports: [FilterOstan, FilterCity, FilterTypeDoctor, FilterTypeWork, FilterCaptionDoctor, FilterDoctor]
})
export class PipesModule { }
