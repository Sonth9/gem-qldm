import { DOMAIN } from "@/constants/constants";
import { FILE_FIELDS } from "@/constants/uploadFiles";
import mime from "mime-types";
import _isEmpty from "lodash/isEmpty";

export const transformAttachFilesData = attachFilesData => {
  return attachFilesData.map(attachFileData =>
    Object.assign({}, attachFileData, {
      name: attachFileData.Ten,
      ext: attachFileData.Ext,
      size: attachFileData.KichThuoc,
      sizeText: attachFileData.NoiDungKichThuoc,
      url: `${DOMAIN}/${attachFileData.DuongDan}`,
      type: attachFileData.KieuDinhKem
        ? attachFileData.KieuDinhKem
        : mime.lookup(attachFileData.Ext)
    })
  );
};

export const formatAttachFilesData = (
  file,
  index,
  formData,
  attachFileField
) => {
  if (file.Id) {
    FILE_FIELDS.forEach(fileKey => {
      if (file[fileKey]) {
        formData.append(
          `${attachFileField}[${index}].${fileKey}`,
          file[fileKey]
        );
      }
    });
  } else {
    formData.append(`${attachFileField}[${index}].Ten`, file.file.name);
    formData.append(`${attachFileField}[${index}].DinhKem`, file.file);
    formData.append(`${attachFileField}[${index}].Ext`, file.ext);
    formData.append(`${attachFileField}[${index}].KieuDinhKem`, file.type);
    formData.append(`${attachFileField}[${index}].KichThuoc`, file.size);
    formData.append(
      `${attachFileField}[${index}].NoiDungKichThuoc`,
      file.sizeText
    );
  }

  return formData;
};

export const checkUploadFilesError = uploadFiles => {
  if (uploadFiles) {
    return (
      uploadFiles.filter(
        uploadFile => uploadFile.error && uploadFile.error !== false
      ).length > 0
    );
  }
  return true;
};

export const checkMaxSizeFile = fileArray => {
  let tongKichThuoc = 0;
  const GIA_TRI_CHUYEN_DOI_BYTE = 1024;
  const MAX_SIZE_20_MB = 20 * GIA_TRI_CHUYEN_DOI_BYTE;
  if (!_isEmpty(fileArray)) {
    fileArray.forEach(file => {
      tongKichThuoc += file.size;
    });
  }
  if (tongKichThuoc / GIA_TRI_CHUYEN_DOI_BYTE > MAX_SIZE_20_MB) {
    return true;
  }
  return false;
};
