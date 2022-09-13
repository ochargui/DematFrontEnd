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
  selector: 'app-document-valid-chart',
  templateUrl: './document-valid-chart.component.html',
  styleUrls: ['./document-valid-chart.component.css']
})
export class DocumentValidChartComponent implements OnInit {
  //BarChart variables
  _series: ApexAxisChartSeries;
  _chart: ApexChart;
  _plotOptions: ApexPlotOptions;
  _dataLabels: ApexDataLabels;
  _xaxis: ApexXAxis;
  _fill: ApexFill;
  constructor() { }

  ngOnInit(): void {
    
    this.intializationBarChart();
  }
  intializationBarChart(): void {
    this._series = [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ];
    this._chart = {
      type: 'bar',
      height: 350,
    };
    this._plotOptions = {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    };
    this._dataLabels = {
      enabled: false,
    };
    this._xaxis = {
      categories: ['Menze temime', 'Dawar hicher', 'Borj Cedria', 'Kef'],
    };
    this._fill = {
      colors: ['#1931CF'],
    };
  }
}
