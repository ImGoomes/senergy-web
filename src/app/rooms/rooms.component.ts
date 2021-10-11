import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public rooms: any;
  constructor(
    private _service: RoomService,
    private _router: Router) { }

  ngOnInit(): void {
    this._service.getRooms().subscribe(
      (dados) => {
        this.rooms = dados;
      });
  }
}
