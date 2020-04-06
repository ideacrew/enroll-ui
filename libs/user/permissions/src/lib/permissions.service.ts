import { Injectable } from '@angular/core';

import { HbxPermissions } from '@hbx/api-interfaces';

import { convertPermissions } from './convertPermissions';
import { hasAllPermissions } from './hasAllPermissions';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private existingPermissions: string[];

  setPermissions(permissions: HbxPermissions) {
    this.existingPermissions = convertPermissions(permissions);
  }

  checkPermission(requiredPermission: string): boolean {
    return this.existingPermissions.includes(requiredPermission);
  }

  checkPermissions(requiredPermissions: string[]): boolean {
    return hasAllPermissions(this.existingPermissions, requiredPermissions);
  }
}
