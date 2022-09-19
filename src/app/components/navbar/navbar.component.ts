import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cartCount!: number;
  subscription!: Subscription;
  isDark: Boolean = false;

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
    this.getThemePref();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  toggleDarkTheme():void{
    document.body.classList.toggle('dark-theme');
    this.isDark = !this.isDark; 
    localStorage.setItem("isDark", this.isDark.toString());
  }

  getThemePref()
  {
    console.log("getThemePref called")
    let themePref : string | null = localStorage.getItem("isDark");

    if (themePref === 'true')
    {
      document.body.classList.add('dark-theme');
      this.isDark = true;
      
    }else{
      document.body.classList.remove('dark-theme');
    }
  }


}
