import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
//import { ReactiveFormsModule} from '@angular/forms';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { AdminScreenComponent } from './screens/admin-screen/admin-screen.component';
import { BarraLateralAdminComponent } from './components/barra-lateral-admin/barra-lateral-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { FormularioAgregarClienteComponent } from './components/formulario-agregar-cliente/formulario-agregar-cliente.component';
import { FormularioAgregarServicioComponent } from './components/formulario-agregar-servicio/formulario-agregar-servicio.component';
import { FormularioAgregarRecintoComponent } from './components/formulario-agregar-recinto/formulario-agregar-recinto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginScreenComponent,
    FormularioLoginComponent,
    FormularioRegistroComponent,
    RegistroScreenComponent,
    AdminScreenComponent,
    BarraLateralAdminComponent,
    FormularioAgregarClienteComponent,
    FormularioAgregarServicioComponent,
    FormularioAgregarRecintoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDividerModule
    // NgModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
