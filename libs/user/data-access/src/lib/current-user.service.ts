import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CurrentUser } from '@hbx/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private api = `//${window.location.host}/api/v2`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.api}/users/current`);
  }
}
