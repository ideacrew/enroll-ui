import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AgencyProfile,
  AgencyStaff,
  PrimaryAgent,
  AgencyStaffWithDetail,
  DemographicsUpdate,
  EmailUpdate,
} from '@hbx/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AgenciesApiService {
  private api = `//${window.location.host}/api/v1`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all agencies (broker and general)
   *
   * Includes their "primary" agent
   */
  getAllAgencies(): Observable<AgencyProfile[]> {
    return this.http.get<AgencyProfile[]>(`${this.api}/agencies`);
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
    return this.http.get<PrimaryAgent[]>(
      `${this.api}/agencies/primary_agency_staff`
    );
  }

  getStaffDetail(personId: string): Observable<AgencyStaffWithDetail> {
    return this.http.get<AgencyStaffWithDetail>(
      `${this.api}/agencies/agency_staff/${personId}`
    );
  }

  /**
   * Terminates the targeted role on the staff
   * @param agencyStaffId The id of the person being changed
   * @param agencyRoleId The id of the role being terminated
   */
  terminateAgencyRole({
    agencyStaffId,
    agencyRoleId,
  }: {
    agencyStaffId: string;
    agencyRoleId: string;
  }): Observable<any> {
    return this.http.post(
      `${this.api}/agencies/agency_staff/${agencyStaffId}/terminate/${agencyRoleId}`,
      {}
    );
  }

  updateStaffDemographics(personId: string, update: DemographicsUpdate) {
    return this.http.patch(
      `${this.api}/agencies/agency_staff/${personId}`,
      update
    );
  }

  updateStaffEmail(personId: string, update: EmailUpdate[]) {
    return this.http.patch(
      `${this.api}/agencies/agency_staff/${personId}/email`,
      { emails: update }
    );
  }
}
