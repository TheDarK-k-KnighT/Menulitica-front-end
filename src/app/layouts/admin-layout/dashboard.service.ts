import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private totalCountForOrders = 'https://simnbv6q26.execute-api.ap-south-1.amazonaws.com/Development/liveorders?restID=';
  // restaurantId = R0022
  constructor(private httpClient: HttpClient) { }

  getTotalCountForOrders(restaurantId: string): Observable <any> {
    return this.httpClient.get(this.totalCountForOrders + restaurantId);
  }
}




