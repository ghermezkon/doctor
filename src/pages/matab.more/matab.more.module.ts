import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { MatabMorePage } from './matab.more';

@NgModule({
    declarations: [MatabMorePage],
    imports: [IonicPageModule.forChild(MatabMorePage)],
    providers: []
})
export class MatabMoreModule { }