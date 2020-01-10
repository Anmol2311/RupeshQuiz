import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';

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
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const router:Routes = [
  { path:"", component: LoginComponent },
  { path:"register/:id", component: RegisterComponent},
  { path:"exam_form", component: ExamFormComponent,canActivate:[AuthGuard]},
  { path:"dashboard", component: DashboardComponent,canActivate:[AuthGuard]},
  { path:"manage_user", component: ManageUserComponent},
  { path:"manage_exam", component: ManageExamComponent},
  { path:"exam/:ecode", component: ExamComponent},  
  { path:"manage_que_ans", component: ManageQueAnsComponent},
  { path:"manage_result", component: ManageResultComponent},
  { path:"add_que/:ecode", component: AddQueComponent},
  { path:"update_exam/:id", component: UpdateExamComponent},
  { path:"update_que/:id", component: UpdateQueComponent},
  { path:"update_stud/:id", component: UpdateStudentComponent},
  { path:"update_admin/:id", component: UpdateAdminComponent},
  { path:"forget_pass/:user", component: ForgetPasswordComponent},
  { path:"result", component: ResultComponent}
];
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
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(router),
    CollapseModule.forRoot(),
    Ng2SearchPipeModule,
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
