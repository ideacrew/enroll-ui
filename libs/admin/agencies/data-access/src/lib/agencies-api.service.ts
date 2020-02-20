import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Agency, AgencyStaff, PrimaryAgent } from '@hbx/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AgenciesApiService {
  private api = 'api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all agencies (broker and general)
   *
   * Includes their "primary" agent
   */
  getAllAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${this.api}/agencies`);
  }

  /**
   * Retrieves all non-primary agency staff
   */
  getAllAgencyStaff(): Observable<AgencyStaff[]> {
    return this.http.get<AgencyStaff[]>(`${this.api}/agencies/agency_staff`);
  }

  /**
   * Returns all agency staff that have been identified as primary agents
   */
  getAllPrimaryAgents(): Observable<PrimaryAgent[]> {
    return this.http.get<PrimaryAgent[]>(`${this.api}/agencies/primary_agents`);
  }
}
