import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { AgenciesApiService } from '@hbx/admin/agencies/data-access';

import * as fromAgencies from './agencies.reducer';
import * as AgenciesActions from './agencies.actions';
import { ApiError } from '@hbx/api-interfaces';

@Injectable()
export class AgenciesEffects {
  loadAgencies$ = createEffect(() =>
    this.dataPersistence.fetch(AgenciesActions.loadAgencies, {
      run: (
        // action contains the payload if any
        _action: ReturnType<typeof AgenciesActions.loadAgencies>,
        // state is brought in just in case we need anything from it
        _state: fromAgencies.AgenciesPartialState
      ) => {
        return this.agenciesApiService
          .getAllAgencies()
          .pipe(
            map(agencies => AgenciesActions.loadAgenciesSuccess({ agencies }))
          );
      },

      onError: (
        _action: ReturnType<typeof AgenciesActions.loadAgencies>,
        error: ApiError
      ) => {
        console.error('Error', error);

        return AgenciesActions.loadAgenciesFailure({ error });
      },
    })
  );

  constructor(
    private dataPersistence: DataPersistence<fromAgencies.AgenciesPartialState>,
    private agenciesApiService: AgenciesApiService
  ) {}
}
