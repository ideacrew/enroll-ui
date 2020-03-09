import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAgencies from './state/agencies/agencies.reducer';
import { AgenciesEffects } from './state/agencies/agencies.effects';
import { AgenciesFacade } from './state/agencies/agencies.facade';
import { AgenciesFeatureShellComponent } from './agencies-feature-shell/agencies-feature-shell.component';
import * as fromAgencyStaff from './state/agency-staff/agency-staff.reducer';
import { AgencyStaffEffects } from './state/agency-staff/agency-staff.effects';
import { AgencyStaffFacade } from './state/agency-staff/agency-staff.facade';
import * as fromPrimaryAgents from './state/primary-agents/primary-agents.reducer';
import { PrimaryAgentsEffects } from './state/primary-agents/primary-agents.effects';
import { PrimaryAgentsFacade } from './state/primary-agents/primary-agents.facade';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        component: AgenciesFeatureShellComponent,
        children: [
          {
            path: 'agency-staff',
            loadChildren: () =>
              import('./agency-staff/agency-staff.module').then(
                m => m.AgencyStaffModule
              ),
          },
          {
            path: 'agency-staff/:personId',
            loadChildren: () =>
              import('./agency-staff-detail/agency-staff-detail.module').then(
                m => m.AgencyStaffDetailModule
              ),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'agency-staff',
          },
        ],
      },
    ]),

    // NgRx Feature Module Setup
    StoreModule.forFeature(
      fromAgencies.AGENCIES_FEATURE_KEY,
      fromAgencies.reducer
    ),
    EffectsModule.forFeature([AgenciesEffects]),

    StoreModule.forFeature(
      fromAgencyStaff.AGENCYSTAFF_FEATURE_KEY,
      fromAgencyStaff.reducer
    ),
    EffectsModule.forFeature([AgencyStaffEffects]),
    StoreModule.forFeature(
      fromPrimaryAgents.PRIMARYAGENTS_FEATURE_KEY,
      fromPrimaryAgents.reducer
    ),
    EffectsModule.forFeature([PrimaryAgentsEffects]),
  ],
  providers: [AgenciesFacade, AgencyStaffFacade, PrimaryAgentsFacade],
  declarations: [AgenciesFeatureShellComponent],
})
export class AdminAgenciesFeatureModule {}
