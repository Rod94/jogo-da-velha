import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JogoDaVelhaComponent } from './jogo-da-velha.component';
import { JogoDaVelhaService } from './shared';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JogoDaVelhaComponent
  ],
   exports: [
    JogoDaVelhaComponent
   ],
    imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    JogoDaVelhaService
  ]
  
})
export class JogoDaVelhaModule { }
