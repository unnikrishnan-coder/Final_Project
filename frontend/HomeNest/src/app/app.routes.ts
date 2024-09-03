import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServicesComponent } from './services/services/services.component';
import { ProvidersComponent } from './serviceProviders/providers/providers.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path: "login", component:LoginComponent},
    {path: "signup", component: RegistrationComponent},
    {path: "services", component: ServicesComponent},
    {path: "providers", component: ProvidersComponent},
    {path: "checkout", component: CheckoutComponent},
    { path: '\*\*', component: NotFoundComponent }
];
