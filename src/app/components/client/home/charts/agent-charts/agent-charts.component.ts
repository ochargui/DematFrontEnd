import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexMarkers,
} from 'ng-apexcharts';
import { RawDocumentService } from 'src/app/services/raw-document.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agent-charts',
  templateUrl: './agent-charts.component.html',
  styleUrls: ['./agent-charts.component.css'],
})
export class AgentChartsComponent implements OnInit {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  selectedOperator: any;
  users: any[];

  documents: any[];

  constructor(
    private userService: UserService,
    private rawDocument: RawDocumentService
  ) {}

  ngOnInit() {
    //this.intializationColumnChart();
    this.getAllUsers();
    this.getAllRawDocuments();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
        console.log('liste:', this.users);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllRawDocuments() {
    this.rawDocument.GetAllRawDocuments().subscribe(
      (res: any) => {
        this.documents = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDocumentsBycreatedByEmail(email: string) {
    let listOfDocuments: any[];
    listOfDocuments = this.documents.filter((document) => {
      return document.controledBy === email;
    });

    let listOfChecks = listOfDocuments.filter((document) => {
      return document.documentType === 1;
    });

    let listOfWithdrawals = listOfDocuments.filter((document) => {
      return document.documentType === 2;
    });

    let listOfCashPayments = listOfDocuments.filter((document) => {
      return document.documentType === 3;
    });

    let listOfCheckRemittanceSlips = listOfDocuments.filter((document) => {
      return document.documentType === 4;
    });

    let listOfPaymentOrders = listOfDocuments.filter((document) => {
      return document.documentType === 5;
    });

    let listOfVarious = listOfDocuments.filter((document) => {
      return document.documentType === 6;
    });

    let stat = {
      check: listOfChecks.length,
      withdrawl: listOfWithdrawals.length,
      cashPayment: listOfCashPayments.length,
      checkRemittanceSlip: listOfCheckRemittanceSlips.length,
      paymentOrder: listOfPaymentOrders.length,
      various: listOfVarious.length,
    };

    return stat;
  }

  intializationColumnChart(email: string): void {
    let stat = this.getDocumentsBycreatedByEmail(email);
    this.series = [
      stat?.check,
      stat?.withdrawl,
      stat?.cashPayment,
      stat?.checkRemittanceSlip,
      stat.paymentOrder,
    ];
    this.chart = {
      width: 380,
      type: 'pie',
    };
    this.labels = ['Chéque', 'Versement ', 'Virement ', 'Retrait', 'Borderau'];
    this.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
            height: 500,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];
    this.fill = {
      colors: ['#1DB2B2', '#1A33D5', '#707070', '#e74c3c', '#0D1A6B'],
    };
  }
  onSelectOperator(selectedOperator: any) {
    this.intializationColumnChart(selectedOperator.email);
  }
}
