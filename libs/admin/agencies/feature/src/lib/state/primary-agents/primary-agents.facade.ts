import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromPrimaryAgents from './primary-agents.reducer';
import * as PrimaryAgentsSelectors from './primary-agents.selectors';

@Injectable()
export class PrimaryAgentsFacade {
  loaded$ = this.store.pipe(
    select(PrimaryAgentsSelectors.getPrimaryAgentsLoaded)
  );
  allPrimaryAgents$ = this.store.pipe(
    select(PrimaryAgentsSelectors.getAllPrimaryAgents)
  );
  selectedPrimaryAgents$ = this.store.pipe(
    select(PrimaryAgentsSelectors.getSelected)
  );

  constructor(
    private store: Store<fromPrimaryAgents.PrimaryAgentsPartialState>
  ) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
