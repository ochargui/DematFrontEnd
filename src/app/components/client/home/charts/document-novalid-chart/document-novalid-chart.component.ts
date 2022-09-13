import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-document-novalid-chart',
  templateUrl: './document-novalid-chart.component.html',
  styleUrls: ['./document-novalid-chart.component.css'],
})
export class DocumentNovalidChartComponent implements OnInit {
  //BarChart variables Nvalid
  n_series: ApexAxisChartSeries;
  n_chart: ApexChart;
  n_plotOptions: ApexPlotOptions;
  n_dataLabels: ApexDataLabels;
  n_xaxis: ApexXAxis;
  n_fill: ApexFill;
  constructor() {}

  ngOnInit(): void {
    this.intializationBarChartNonValid();
  }
  intializationBarChartNonValid(): void {
    this.n_series = [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ];
    this.n_chart = {
      type: 'bar',
      height: 350,
    };
    this.n_plotOptions = {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    };
    this.n_dataLabels = {
      enabled: false,
    };
    this.n_xaxis = {
      categories: ['Menze temime', 'Dawar hicher', 'Borj Cedria', 'Kef'],
    };
    this.n_fill = {
      colors: ['#F24E3C'],
    };
  }
}
