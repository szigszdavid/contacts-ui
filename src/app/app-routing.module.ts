import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { GetContactByIdComponent } from './get-contact-by-id/get-contact-by-id.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent
  },
  {
    path: "contacts",
    component: AdminComponent
  },
  {
    path: "contacts/add",
    component: EditContactComponent
  },
  {
    path: "contacts/:id",
    component: GetContactByIdComponent,
  },
  {
    path: 'contacts/:id/edit',
    component: EditContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
