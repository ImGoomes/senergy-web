import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { DashboardService } from '../services/dashboard.service';
import { DeviceService } from '../services/device.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  public dashData: any;
  public orcadoData: Array<number> = [];
  public realizadoData: Array<number> = [];
  public roomData: any;
  public deviceData: any;

  constructor(
    private _serviceDash: DashboardService,
    private _serviceRoom: RoomService,
    private _serviceDevice: DeviceService,
    private _router: Router) { }

  ngOnInit(): void {
    //Dashboard
    this._serviceDash.getDashboard().subscribe(
      (dados: any) => {
        this.dashData = dados;

        this.dashData.series.forEach((element: any) => {
          if (element.type == 'orcado')
            this.orcadoData.push(element.value);
          else
            this.realizadoData.push(element.value);
        });
      });

    //Rooms
    this._serviceRoom.getRooms().subscribe(
      (dados: any) => {
        this.roomData = dados;
      });

    //Devices
    this._serviceDevice.getDevices().subscribe(
      (dados: any) => {
        this.deviceData = dados;
      });
  }

  optionsChart: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['Orçado', 'Realizado']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      }
    ],
    yAxis: [
      {
        type: 'value',
        boundaryGap: [0, '100%'],
      }
    ],
    series: [
      {
        name: 'Orçado',
        type: 'line',
        stack: 'counts',
        color: '#9FA2B4',
        // areaStyle: { normal: {} },
        data: this.orcadoData
      },
      {
        name: 'Realizado',
        type: 'line',
        stack: 'counts',
        color: '#FFDB00',
        // areaStyle: { normal: {} },
        data: this.realizadoData
      }
    ]
  };

  navigate(url: string) {
    this._router.navigateByUrl(url);
  }
}
