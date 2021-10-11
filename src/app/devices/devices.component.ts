import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  public devices: any;
  constructor(
    private _service: DeviceService,
    private _router: Router) { }

  ngOnInit(): void {
    this._service.getDevices().subscribe(
      (dados) => {
        this.devices = dados;
      });
  }
}
