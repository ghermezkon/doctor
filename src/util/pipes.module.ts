import { NgModule } from '@angular/core';
import { FilterOstan, FilterCity } from './filter.pipe';
@NgModule({
	declarations: [FilterOstan, FilterCity],
	imports: [],
	exports: [FilterOstan, FilterCity]
})
export class PipesModule { }
