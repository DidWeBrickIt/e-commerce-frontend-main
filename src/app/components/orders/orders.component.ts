import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderNum: number = 1;
  orders: {orderId: number, productName: string, productAmount: number, cost: number, time: string}[] = [];
  consolidatedOrders: {orderNumber: number, partsOfSameOrder: {productName: string, productAmount: number, cost: number, time: string}[], totalCost: number, matchingTime: string}[] = [];
  isLoading: boolean = true;
  orderDetails: number = 0;
  showDetails: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.formatUserOrders();
    setTimeout(()=> {
      this.consolidateOrders(this.orders);
      this.isLoading = false;
    }, 2000);
  }

  formatUserOrders(){
    this.productService.getUserId().subscribe((response) => {
      this.productService.getOrdersByUserId(response).subscribe((orders) => {
        orders.forEach((order) => {
          const orderId = order.id;
          const time = new Date(order.timePurchased * 1000).toLocaleString();
          this.productService.getSingleProduct(order.prodId).subscribe((product) => {
            const productName = product.name;
            const productAmount = order.quantity;
            const cost = product.price * order.quantity;
            this.orders.push({orderId, productName, productAmount, cost, time});
            this.orders.sort((a,b) => a.orderId - b.orderId);
          });
        });
      });
    });
  }

  consolidateOrders(orders: {orderId: number, productName: string, productAmount: number, cost: number, time: string}[]){
    while(orders.length > 0){
      let partsOfSameOrder: {orderId: number, productName: string, productAmount: number, cost: number, time: string}[] = [];
      let orderNumber = this.orderNum;
      let comparedOrder = orders.splice(0, 1);
      let totalCost = comparedOrder[0].cost;
      let matchingTime = comparedOrder[0].time;
      partsOfSameOrder.push(comparedOrder[0]);
      for(let i = 0; i < orders.length; i++){
        if(orders[i].time === comparedOrder[0].time){
          let matchingOrder = orders.splice(i, 1);
          partsOfSameOrder.push(matchingOrder[0]);
          totalCost += matchingOrder[0].cost;
          i--;
        }
      }
      this.consolidatedOrders.push({orderNumber, partsOfSameOrder, totalCost, matchingTime});
      this.orderNum++;
    }
  }

  toggleDetails(orderNumber?: number){
    if(orderNumber !== undefined){
      this.orderDetails = orderNumber;
    }
    this.showDetails = !this.showDetails;
  }

  stopProp(ev: Event) {
    ev.stopPropagation();
  }
}
