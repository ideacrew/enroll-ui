import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as fromPrimaryAgents from './primary-agents.reducer';
import * as PrimaryAgentsActions from './primary-agents.actions';
import { AgenciesApiService } from '@hbx/admin/agencies/data-access';

@Injectable()
export class PrimaryAgentsEffects {
  loadPrimaryAgents$ = createEffect(() =>
    this.dataPersistence.fetch(PrimaryAgentsActions.loadPrimaryAgents, {
      run: (
        _action: ReturnType<typeof PrimaryAgentsActions.loadPrimaryAgents>,
        _state: fromPrimaryAgents.PrimaryAgentsPartialState
      ) => {
        return this.agenciesApiService.getAllPrimaryAgents().pipe(
          map(primaryAgents =>
            PrimaryAgentsActions.loadPrimaryAgentsSuccess({
              primaryAgents,
            })
          )
        );
      },

      onError: (
        _action: ReturnType<typeof PrimaryAgentsActions.loadPrimaryAgents>,
        error
      ) => {
        console.error('Error', error);
        return PrimaryAgentsActions.loadPrimaryAgentsFailure({ error });
      },
    })
  );

  constructor(
    private agenciesApiService: AgenciesApiService,
    private dataPersistence: DataPersistence<
      fromPrimaryAgents.PrimaryAgentsPartialState
    >
  ) {}
}
