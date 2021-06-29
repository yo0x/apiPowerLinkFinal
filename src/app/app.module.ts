import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { HomeComponent } from './home/home.component';
import { SchedComponent } from './sched/sched.component';
import { AlterComponent } from './alter/alter.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { VerifyerComponent } from './verifyer/verifyer.component';
import { TmpSelectorComponent } from './tmp-selector/tmp-selector.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SchedComponent,
    AlterComponent,
    SignupComponent,
    LoginComponent,
    VerifyerComponent,
    TmpSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
