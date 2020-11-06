import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'app/layouts/admin-layout/dashboard.service';
import Chart from 'chart.js';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  private restaurantId;
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public totalOrderCount;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
      this.getTotalCountOfOrder('R0022');
    }

    getTotalCountOfOrder(restaurantId: string) {
      this.dashboardService.getTotalCountForOrders(restaurantId).subscribe( result => {
        console.log(result, 'resslt');
        this.totalOrderCount = result;
      },
      error => {
        this.toastr.error('Something went wrong, Please try again. ');
      })
    }
}
