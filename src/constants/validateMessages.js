export const OLD_CMTND_NUMBER = 9;

export const NEW_CMTND_NUMBER = 12;

export const REQUIRED = "Vui lòng nhập {_field_}";

export const REQUIRED_SELECT = "Vui lòng chọn {_field_}";

export const EMAIL_INVALID = "Vui lòng nhập đúng định dạng email";

export const NUMERIC = "Chỉ bao gồm số";

export function minxMax(min, max) {
  return `Tối thiểu ${min} ký tự, tối đa ${max} ký tự`;
}

export function cmtnd() {
  return `Chứng minh thư nhân dân phải là số có ${OLD_CMTND_NUMBER} ký tự hoặc ${NEW_CMTND_NUMBER} ký tự`;
}

export function phoneNumber(min, max) {
  return `Số điện thoại tối thiểu ${min} ký tự, tối đa ${max} ký tự . Số điện thoại chỉ bao gồm số`;
}

export const REQUIRED_FIELD = fieldName => {
  return `Vui lòng nhập ${fieldName}`;
};

export const TAO_MOI_LOAI = "Tạo mới loại thông báo thành công";

export const TAO_MOI_THUOC_TINH = "Tạo mới thuộc tính thành công";

export const SUA_THONG_TIN_BO_TRO = "Sửa thông tin bổ trợ thành công";

export const SUA_CHI_TIEU = "Sửa chỉ tiêu thành công";

export const SUA_NGUON = "Sửa nguồn nhận thông báo thành công";

export const SUA_LOAI = "Sửa loại thông báo thành công";

export const TAO_NGUON = "Tạo nguồn nhận thông báo thành công";

export const TAO_LOAI = "Tạo loại thông báo thành công";

export const XOA_NGUON = "Xóa nguồn nhận thông báo thành công";

export const XOA_LOAI = "Xóa loại thông báo thành công";
export const TOM_TAT_THONG_BAO_MAX_LENGTH =
  "Nội dung tóm tắt thông báo dài tối đa 250 kí tự.";
