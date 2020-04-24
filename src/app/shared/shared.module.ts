import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MkButtonComponent } from './mk-button/mk-button.component';

@NgModule({
	declarations: [MkButtonComponent],
	imports: [CommonModule],
	exports: [MkButtonComponent],
})
export class SharedModule {}
