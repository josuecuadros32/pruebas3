// notificacion y animaciones y demas
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// componentes
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ContactoComponent } from './contacto/contacto.component';
import { EquipoComponent } from './equipo/equipo.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { RegistroComponent } from './registro/registro.component';
import { ProfileComponent } from './profile/profile.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';

// servicios
import {EquipoService} from './equipo/equipo.service';
import { AuthService } from './model/auth.service';
import { ComentariosService } from './model/comentarios.service';

// Base de datos
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken  } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';

// Logins
import { AngularFireAuth } from '@angular/fire/auth';
import { GuardGuard} from './guard/guard.guard';
import { NewempleadoComponent } from './newempleado/newempleado.component';

const routes: Routes = [
{path: 'administrator', component: AdministratorComponent, canActivate: [GuardGuard] },
{path: '', redirectTo: '/login', pathMatch: 'full'},
{path: 'profile', component: ProfileComponent, canActivate: [GuardGuard]},
{path: 'inicio', component: InicioComponent},
{path: 'nosotros', component: NosotrosComponent},
{path: 'contacto', component: ContactoComponent, canActivate: [GuardGuard]},
{path: 'login', component: LoginComponent},
{path: 'registro', component: RegistroComponent},
{path: 'equipo/:id', component: EquipoComponent, canActivate: [GuardGuard]},
{path: 'empleado', component: NewempleadoComponent, canActivate: [GuardGuard]},
{path: '**', component: Error404Component }





];

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    ContactoComponent,
    EquipoComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    RegistroComponent,
    LoginComponent,
    AdministratorComponent,
    ProfileComponent,
    NewempleadoComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireDatabaseModule
  ],
  providers: [
    EquipoService,
    { provide: FirestoreSettingsToken, useValue: {} },
    AuthService,
    AngularFireAuth,
   ComentariosService,
   GuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
