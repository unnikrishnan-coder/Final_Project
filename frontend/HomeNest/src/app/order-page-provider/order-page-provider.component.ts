import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth.service';
import { User } from '../entity/userprofile.model';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookingStatus } from '../entity/bookingStatus.model';


@Component({
  selector: 'app-orders',
  templateUrl: './order-page-provider.component.html',
  imports: [FormsModule, NgFor, NgIf, FontAwesomeModule, DatePipe],
  standalone: true,
  styleUrls: ['./order-page-provider.component.css']
})
export class ProviderOrdersComponent implements OnInit {
  changeOrderStatus(status: string) {
    let validStatus = true;
    let confirmationString;
    let bookingStatus: BookingStatus = BookingStatus.ACCEPTED;
    switch (status) {
      case "DECLINE":
        bookingStatus = BookingStatus.DECLINED;
        confirmationString = "Do you really want to decline your order?";
        break;
      case "ACCEPT":
        bookingStatus = BookingStatus.ACCEPTED;
        confirmationString = "Confirm if you want to accept this order?";
        break;
      case "COMPLETED":
        bookingStatus = BookingStatus.COMPLETED;
        confirmationString = "Verify if the order is fully completed!";
        break;
      default:
        console.error("Bad status");
        validStatus = false;
        break;
    }

    let confirmation = confirm(confirmationString);
    if (validStatus && confirmation) {
      this.orderService.updateBookingStatus(this.selectedOrder.id, bookingStatus).subscribe({
        next: (data) => {
          console.log(data);
          alert(`Order ${bookingStatus.toString()} Successfully`);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          alert(`Error ${bookingStatus.toString()} order!`)
        }
      })
    }
  }

  orders: any[] = [];
  selectedOrder: any;
  searchQuery: string = '';
  selectedLocation: string = '';
  selectedPaymentStatus: string = '';
  selectedOrderStatus: string = '';
  user: User | null = null;
  showProviderModal: boolean = false;
  closeIcon: any = faClose;
  serviceProviderBasicProfile: User | null = null;

  constructor(private orderService: BookingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.user != null && this.user.role == "USER") {
      this.orderService.getBookingsByUserId(this.user?.id).subscribe(data => {
        this.orders = data;
      });
    } else if (this.user != null && this.user.role == "SERVICE_PROVIDER") {
      this.orderService.getBookingsByProviderUserId(this.user?.id).subscribe(data => {
        this.orders = data;
      });
    }
  }

  selectOrder(orderId: number): void {
    this.orderService.getBookingById(orderId).subscribe(data => {
      this.selectedOrder = data;
      this.authService.getUserByUserId(data.userId).subscribe((providerData) => {
        this.serviceProviderBasicProfile = providerData;
      })
    });

  }

  applyFilters(): void {
    // Apply filters to the orders list based on searchQuery, selectedLocation, etc.
    // This is a placeholder function, implement as needed
  }

  contactCustomer(): void {
    // Implement contact functionality
    this.showProviderModal = !this.showProviderModal;
  }
}