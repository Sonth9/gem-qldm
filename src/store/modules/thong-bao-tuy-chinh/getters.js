const danhSachQuanLyLoai = state => state.danhSachQuanLyLoai;
const danhSachQuanLyNguon = state => state.danhSachQuanLyNguon;
const danhSachQuanLyThongBao = state => state.danhSachQuanLyThongBao;
const loaiThongBao = state => state.loaiThongBao;
const lichSuThaoTac = state => state.lichSuThaoTac;

// THÔNG BÁO TÙY CHỈNH
const danhSachThongBao = state => state.danhSachThongBao;
const chiTietThongBao = state => state.chiTietThongBao;

export default {
  danhSachQuanLyLoai,
  danhSachQuanLyNguon,
  danhSachQuanLyThongBao,
  loaiThongBao,
  lichSuThaoTac,

  // THÔNG BÁO TÙY CHỈNH
  danhSachThongBao,
  chiTietThongBao,
};
