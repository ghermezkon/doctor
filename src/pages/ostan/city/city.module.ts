import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityPage } from './city';
import { PipesModule } from '../../../util/pipes.module';

@NgModule({
    declarations: [CityPage],
    imports: [ IonicPageModule.forChild(CityPage), PipesModule],
    providers:[]
})
export class CityModule { }