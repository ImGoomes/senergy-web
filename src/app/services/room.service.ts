import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private _http: HttpClient) { }

  getRooms(): Observable<any[]> {
    return this._http.get<any[]>(environment.jsonServerAPI + "rooms");
  }
}
