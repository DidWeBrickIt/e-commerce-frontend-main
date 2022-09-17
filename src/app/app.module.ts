import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';

import { ShippingComponent } from './components/shipping/shipping.component';

import { PaymentComponent } from './components/payment/payment.component';
import { ErrorPopupComponent } from './components/error-popup/error-popup.component';
import { EpochToDatePipe } from './pipes/epoch-to-date.pipe';
import { StarRatingPipe } from './pipes/star-rating.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    DisplayProductsComponent,
    ProfileComponent,
    ShippingComponent,
    PaymentComponent,
    ErrorPopupComponent,
    EpochToDatePipe,
    StarRatingPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
