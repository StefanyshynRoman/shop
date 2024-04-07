import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, HttpClientModule, RouterLink, RouterLinkActive],
  exports: [HeaderComponent],
})
export class CoreModule {}
