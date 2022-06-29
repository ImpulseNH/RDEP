import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraLateralAdminComponent } from './components/barra-lateral-admin/barra-lateral-admin.component';
import { FormularioAgregarClienteComponent } from './components/formulario-agregar-cliente/formulario-agregar-cliente.component';
import { FormularioAgregarRecintoComponent } from './components/formulario-agregar-recinto/formulario-agregar-recinto.component';
import { FormularioAgregarServicioComponent } from './components/formulario-agregar-servicio/formulario-agregar-servicio.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { inicioScreenComponent } from './screens/inicio/inicio-screen.component';
import { FormularioEditarRecintoComponent } from './components/formulario-editar-recinto/formulario-editar-recinto.component';
import { FormularioEditarClienteComponent } from './components/formulario-editar-cliente/formulario-editar-cliente.component';
import { ReservarComponent } from './components/reservar/reservar.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginScreenComponent},
  {path:'registro', component: RegistroScreenComponent},
  {path:'admin', component: BarraLateralAdminComponent},
  {path:'inicio', component:inicioScreenComponent},
  {path:'admin/agregar-cliente', component: FormularioAgregarClienteComponent},
  {path:'admin/editar-cliente/:id', component: FormularioEditarClienteComponent},
  {path:'admin/agregar-recinto', component: FormularioAgregarRecintoComponent},
  {path:'admin/editar-recinto/:id', component: FormularioEditarRecintoComponent},
  {path:'admin/agregar-servicio', component: FormularioAgregarServicioComponent},
  {path:'admin/reservar', component: ReservarComponent},
  {path:'reservas', component: ReservasComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }