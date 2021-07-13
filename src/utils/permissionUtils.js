// import { getValueFromStorageByKey } from "@/utils/localStorage";

/**
 * Check the user has permission to access the control button, ... with permissionPolicy and permissionRole
 *
 * @param permissions = [{CapNhat: true, Permission: "QuanLyVaiTro", PermissionId: 12, Ten: "Quản lý vai trò", Xem: true}, {}]
 * @param permissionPolicy = "QuanLyVaiTro"
 * @param permissionRole CapNhat|Xem
 * @returns {*|boolean}
 */

export const hasPermission = (permissions, permissionPolicy) => {
  const filteredPermission =
    permissions &&
    permissions.filter(
      permissionItem => {
        if (Array.isArray(permissionPolicy)) {
          return permissionPolicy.includes(permissionItem.policy)
        } else {
          return permissionItem.policy === permissionPolicy
        }
      }
    );

  return filteredPermission && filteredPermission.length > 0;
};
