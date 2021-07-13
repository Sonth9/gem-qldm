import { optionSelectAll } from "@/utils/commonUtils";

const chiTietDonVi = state => state.chiTietDonVi;
const danhSachDonViPhanTrang = state => state.danhSachDonViPhanTrang;
const danhSachDonVi = state =>
  optionSelectAll(
    state.danhSachDonVi.map(item => {
      return {
        id: item.id,
        value: item.id,
        text: item.tenDonVi
      };
    })
  );
const danhSachDonViSelect = state =>
  optionSelectAll(
    state.danhSachDonViCon.map(item => {
      return {
        id: item.id,
        value: item.id,
        text: item.tenDonVi
      };
    }),
    "--- Chọn đơn vị ---"
  );

const cayDonVi = state => state.cayDonVi;
const danhSachDonViCon = state => state.danhSachDonViCon;

export default {
  danhSachDonVi,
  danhSachDonViPhanTrang,
  chiTietDonVi,
  danhSachDonViSelect,
  cayDonVi,
  danhSachDonViCon
};
