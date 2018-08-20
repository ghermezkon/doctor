import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { MatabMorePage } from './matab.more';
import { PipesModule } from '../../util/pipes.module';

@NgModule({
    declarations: [MatabMorePage],
    imports: [IonicPageModule.forChild(MatabMorePage), PipesModule],
    providers: []
})
export class MatabMoreModule { }