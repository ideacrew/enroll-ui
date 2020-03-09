export interface WorkflowStateTransition<T> {
  _id: string;
  comment?: string;
  from_state: T;
  to_state: T;
  event?: string;
  transition_at: string;
  updated_at?: string;
  created_at?: string;
  user_id?: string;
}
