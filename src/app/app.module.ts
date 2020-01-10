import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';
import { CountdownModule } from 'ngx-countdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {NgPipesModule} from 'ngx-pipes';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamComponent } from './exam/exam.component';
import { ManageExamComponent } from './manage-exam/manage-exam.component';
import { ManageQueAnsComponent } from './manage-que-ans/manage-que-ans.component';
import { AddQueComponent } from './add-que/add-que.component';
import { ManageResultComponent } from './manage-result/manage-result.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { UpdateQueComponent } from './update-que/update-que.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth/auth.guard';
import { DataService } from './service/data.service';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { ResultComponent } from './result/result.component';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VoucherComponent } from './voucher/voucher.component';
import { FeedbackComponent } from './feedback/feedback.component';

// const router:Routes = [
 
// ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ManageUserComponent,
    ExamFormComponent,
    ExamComponent,
    ManageExamComponent,
    ManageQueAnsComponent,
    AddQueComponent,
    ManageResultComponent,
    UpdateExamComponent,
    UpdateQueComponent,
    NavbarComponent,
    UpdateStudentComponent,
    UpdateAdminComponent,
    ResultComponent,
    DemoComponent,
    HeaderComponent,
    AddstudentComponent,
    AddadminComponent,
    PagenotfoundComponent,
    VoucherComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ShowHidePasswordModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    CountdownModule ,
    NgPipesModule,
    RecaptchaModule,
    RecaptchaFormsModule

  ],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
