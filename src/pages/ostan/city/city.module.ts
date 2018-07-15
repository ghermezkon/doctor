import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CityPage } from './city';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [CityPage],
    imports: [ IonicPageModule.forChild(CityPage)],
    providers:[]
})
export class CityModule { }