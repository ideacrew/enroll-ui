import { createReducer, on, Action } from '@ngrx/store';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';

import { AgencyStaffEntity } from './agency-staff.models';
import * as AgencyStaffActions from './agency-staff.actions';
import { changeAgencyRoleStatus } from '../../utils/changeAgencyRoleStatus';
import { AgencyStaff, AgencyStaffWithDetail } from '@hbx/api-interfaces';

export const AGENCYSTAFF_FEATURE_KEY = 'agencyStaff';

function selectAgencyStaffId(a: AgencyStaffEntity): string {
  //In this case this would be optional since primary key is id
  return a._id;
}

// Sort by last name first, then first name
function sortStaff(a: AgencyStaffEntity, b: AgencyStaffEntity): number {
  if (a.last_name.localeCompare(b.last_name) === 0) {
    return a.first_name.localeCompare(b.first_name);
  }

  return a.last_name.localeCompare(b.last_name);
}

export interface State extends EntityState<AgencyStaffEntity> {
  selectedId?: string | number; // which AgencyStaff record has been selected
  loaded: boolean; // has the AgencyStaff list been loaded
  error?: string | null; // last none error (if any)
  agencyStaffDetail?: AgencyStaffWithDetail;
}

export interface AgencyStaffPartialState {
  readonly [AGENCYSTAFF_FEATURE_KEY]: State;
}

export const agencyStaffAdapter: EntityAdapter<AgencyStaffEntity> = createEntityAdapter<
  AgencyStaffEntity
>({
  selectId: selectAgencyStaffId,
  sortComparer: sortStaff,
});

export const initialState: State = agencyStaffAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const agencyStaffReducer = createReducer(
  initialState,
  on(AgencyStaffActions.loadAgencyStaff, state => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AgencyStaffActions.loadAgencyStaffSuccess, (state, { agencyStaff }) =>
    agencyStaffAdapter.setAll(agencyStaff, { ...state, loaded: true })
  ),
  on(AgencyStaffActions.loadAgencyStaffFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AgencyStaffActions.changeAgencyRole, (state, { request }) => {
    const updatedStaff: Update<AgencyStaff> = changeAgencyRoleStatus(
      state.entities,
      request
    );

    return agencyStaffAdapter.updateOne(updatedStaff, state);
  }),
  on(AgencyStaffActions.changeAgencyRoleFailure, (state, { request }) => {
    const updatedStaff: Update<AgencyStaff> = changeAgencyRoleStatus(
      state.entities,
      request
    );

    return agencyStaffAdapter.updateOne(updatedStaff, state);
  }),
  on(
    AgencyStaffActions.loadAgencyStaffDetailSuccess,
    (state, { agencyStaff }) => ({ ...state, agencyStaffDetail: agencyStaff })
  ),
  on(AgencyStaffActions.loadAgencyStaffDetailFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return agencyStaffReducer(state, action);
}
