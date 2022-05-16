import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraLateralAdminComponent } from './components/barra-lateral-admin/barra-lateral-admin.component';
import { FormularioAgregarClienteComponent } from './components/formulario-agregar-cliente/formulario-agregar-cliente.component';
import { FormularioAgregarRecintoComponent } from './components/formulario-agregar-recinto/formulario-agregar-recinto.component';
import { FormularioAgregarServicioComponent } from './components/formulario-agregar-servicio/formulario-agregar-servicio.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';



const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginScreenComponent},
  {path:'registro', component: RegistroScreenComponent},
  {path:'admin', component: BarraLateralAdminComponent},
  {path:'admin/agregarc', component: FormularioAgregarClienteComponent},
  {path:'admin/agregarr', component: FormularioAgregarRecintoComponent},
  {path: 'admin/agregars', component: FormularioAgregarServicioComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
