import { Injectable } from '@angular/core';

import { HbxPermissions } from '@hbx/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  hbxPermissions: HbxPermissions = {};

  setPermissions(permissions: HbxPermissions): void {
    this.hbxPermissions = permissions;
  }
}
