import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerJdbc, ServerDeploy } from './model';

@Injectable({
  providedIn: 'root',
})
export class WlstService {
  constructor(private http: HttpClient) {}

  getServerJdbc(): Observable<ServerJdbc> {
    return this.http.get<ServerJdbc>(environment.apiUrl + 'getServerJdbc');
  }

  exePython(data: ServerJdbc): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'exePython', data);
  }

  getServerDeploy(): Observable<ServerDeploy> {
    return this.http.get<ServerDeploy>(environment.apiUrl + 'getServerDeploy');
  }

  exeDeploy(data: ServerDeploy): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + 'exeDeploy', data);
  }
}
