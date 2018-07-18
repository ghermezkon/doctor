import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatabPage } from './matab';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
    declarations: [MatabPage],
    imports: [ IonicPageModule.forChild(MatabPage)],
    providers:[]
})
export class MatabModule { }