import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-validity-chart',
  templateUrl: './document-validity-chart.component.html',
  styleUrls: ['./document-validity-chart.component.css'],
})
export class DocumentValidityChartComponent implements OnInit {
  @Input() stats: any;

  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;

  //Selected List
  zones: any[];

  statValues: any;
  observableValid: Observable<any>
  observableInvalid: Observable<any>
  observableValidInvalid: Observable<any>

  constructor() {}

  ngOnInit(): void {
    
    this.stats.subscribe((res: any) => {
      this.statValues = res;
      this.intializationColumnChart(res);
    this.creatList();
    this.observableValid=Observable.create((observer:any)=>{
      observer.next(res.totalDocumentsValidate)
    })
    this.observableInvalid=Observable.create((observer:any)=>{
      observer.next(res.totalDocumentsReject)
    })
    this.observableValidInvalid=Observable.create((observer:any)=>{
      observer.next(res.totalDocument_valid_invalid)
    })
    
    });
    
  }
  intializationColumnChart(stat:any): void {
    this.series = [
      {
        name: ' Valide',
        data: [stat?.checkValidate, stat?.withdrawlValidate, stat?.cashPaymentValidate, stat?.paymentOrderValidate
          , stat?.checkRemittanceSlipValidate],
      },
      {
        name: 'Non Valide',
        data: [stat?.checkRejected, stat?.withdrawlReject, stat?.cashPaymentReject, stat?.paymentOrderReject
          , stat?.checkRemittanceSlipReject],
      },
    ];
    this.chart = {
      type: 'bar',
      height: 350,
    };
    this.plotOptions = {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    };
    this.dataLabels = {
      enabled: false,
    };
    this.stroke = {
      show: true,
      width: 2,
      colors: ['transparent'],
    };
   
    this.yaxis = {
      title: {
        text: 'Documents',
      },
    };
    this.xaxis = {
      categories: [
        'Chéque',
        'Retrait',
        'Versement espéce',
        'Ordre de virement',
        'Borderau remise de chéque'
      ],
    };
    this.fill = {
      colors: ['#1931CF', '#F24E3C'],
    };
    this.tooltip = {
      y: {
        formatter: function (val) {
          return  val + ' document(s)';
        },
      },
    };
    this.legend = {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Valide', 'Non Valide'],
      markers: {
        fillColors: ['#1931CF', '#F24E3C'],
      },
    };
  }

  creatList(): void {
    this.zones = [
      {
        name: 'zone 1',
      },
      {
        name: 'zone 2',
      },
      {
        name: 'zone 3',
      },
    ];
  }
}
