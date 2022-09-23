import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';

import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressComponent } from './components/address/address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserComponent } from './components/user/user.component';
import { ErrorPopupComponent } from "./components/error-popup/error-popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { EpochToDatePipe } from './pipes/epoch-to-date.pipe';
import { StarRatingPipe } from './pipes/star-rating.pipe';
import { DisplayProductReviewsComponent } from './components/display-product-reviews/display-product-reviews.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { RatingComponent } from './components/rating/rating.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { PaypalComponent } from './components/paypal/paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CreateProductComponent } from './components/create-product/create-product.component';

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
    OrdersComponent,
    AddressComponent,
    PaymentComponent,
    UserComponent,
    ErrorPopupComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    EpochToDatePipe,
    StarRatingPipe,
    DisplayProductReviewsComponent,
    CreateReviewComponent,
    RatingComponent,
    ProfilePicComponent,
    ResetPasswordComponent,
    PaypalComponent,
    FooterComponent,
    ChatComponent,
    CreateProductComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    ScrollingModule,
    MatExpansionModule,
    MatBadgeModule,
    MatIconModule,
    NgxPayPalModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
