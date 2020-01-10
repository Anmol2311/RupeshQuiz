import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageExamComponent } from './manage-exam/manage-exam.component';
import { ExamComponent } from './exam/exam.component';
import { ManageQueAnsComponent } from './manage-que-ans/manage-que-ans.component';
import { ManageResultComponent } from './manage-result/manage-result.component';
import { AddQueComponent } from './add-que/add-que.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { ResultComponent } from './result/result.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { UpdateQueComponent } from './update-que/update-que.component';
import { HeaderComponent } from './header/header.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AdminguardGuard } from './auth/adminguard.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VoucherComponent } from './voucher/voucher.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path:"feedback",component: FeedbackComponent},
  { path: "exam_form", component: ExamFormComponent,canActivate:[AuthGuard] },

  {
    path: "dashboard", component: DashboardComponent, children: [
      { path: '', redirectTo: 'manage_user', pathMatch: 'full' },
      { path: "addStudent", component: AddstudentComponent,canActivate:[AdminguardGuard] },
      { path: "addAdmin", component: AddadminComponent,canActivate:[AdminguardGuard]  },
      { path: "manage_user", component: ManageUserComponent,canActivate:[AdminguardGuard]  },
      { path: "manage_exam", component: ManageExamComponent,canActivate:[AdminguardGuard]  },
      { path: "manage_que_ans", component: ManageQueAnsComponent,canActivate:[AdminguardGuard]  },
      { path: "manage_result", component: ManageResultComponent,canActivate:[AdminguardGuard]  },
      { path: "manage_voucher", component: VoucherComponent,canActivate:[AdminguardGuard]  },
      
      { path: "add_que", component: AddQueComponent,canActivate:[AdminguardGuard]  },
      { path: "header", component: HeaderComponent,canActivate:[AdminguardGuard]  },
      { path: "update_exam/:id", component: UpdateExamComponent,canActivate:[AdminguardGuard]  },
      { path: "update_que/:id", component: UpdateQueComponent,canActivate:[AdminguardGuard]  },
      { path: "update_stud/:id", component: UpdateStudentComponent,canActivate:[AdminguardGuard]  },
      { path: "update_admin/:id", component: UpdateAdminComponent,canActivate:[AdminguardGuard]  },
      
    ],canActivate:[AdminguardGuard]
  },
  { path: "exam/:ecode", component: ExamComponent,canActivate:[AuthGuard] },
  { path: "result", component: ResultComponent,canActivate:[AuthGuard] },
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
