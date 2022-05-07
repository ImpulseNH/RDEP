import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginScreenComponent,
    FormularioLoginComponent,
    FormularioRegistroComponent,
    RegistroScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    // NgModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
