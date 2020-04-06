import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { CurrentUserService } from '@hbx/user/data-access';
import { PermissionsService } from '@hbx/user/permissions';

import * as fromUser from './user.reducer';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.dataPersistence.fetch(UserActions.loadUser, {
      run: (
        action: ReturnType<typeof UserActions.loadUser>,
        state: fromUser.UserPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return this.userService.getCurrentUser().pipe(
          tap(currentUser => {
            const { account_name, ...permissions } = currentUser;

            this.permissionsService.setPermissions(permissions);
          }),
          map(currentUser => UserActions.loadUserSuccess({ user: currentUser }))
        );
      },

      onError: (action: ReturnType<typeof UserActions.loadUser>, error) => {
        console.error('Error', error);
        return UserActions.loadUserFailure({ error });
      },
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromUser.UserPartialState>,
    private userService: CurrentUserService,
    private permissionsService: PermissionsService
  ) {}
}
