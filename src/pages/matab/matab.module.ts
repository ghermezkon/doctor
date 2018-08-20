import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatabPage } from './matab';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { PipesModule } from '../../util/pipes.module';

@NgModule({
    declarations: [MatabPage],
    imports: [ IonicPageModule.forChild(MatabPage), PipesModule, SelectSearchableModule],
    providers:[]
})
export class MatabModule { }