import { AgencyProfile } from '@hbx/api-interfaces';

/**
 * Interface for the 'Agencies' data
 * Eventually use this as the AgenciesEntityModel
 */
// export interface AgenciesEntityVM {
//   id: string | number; // Primary ID
//   type: string;
//   agencyId?: string;
//   entity: EntityKind;
//   fein: string;
//   dba: string;
//   legalName: string;
//   homePage?: string;
//   siteId: string;
//   hbxId: string;

//   updatedAt: Date;
//   createdAt: Date;

//   profiles: OrganizationProfile[];

//   planDesignAuthorIds?: any[];
//   planDesignSubjectIds?: any[];
// }

export type AgenciesEntity = AgencyProfile;
