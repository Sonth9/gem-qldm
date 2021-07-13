<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pb-3">
        <b-col align="end">
          <b-button @click="openCreate" variant="info">
            <b-icon icon="plus"></b-icon>
            Thêm mới
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <p class="color-gray-1">Tìm thấy {{ danhSachChucVu.length }} kết quả</p>
    <p class="drag-note">※ Kéo thả để thay đổi thứ tự hiển thị chức vụ.</p>
    <table class="table b-table table-striped table-bordered">
      <thead class="center">
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên chức vụ</th>
        <th scope="col">Nhóm chức vụ</th>
        <th scope="col">Thao tác</th>
      </tr>
      </thead>
      <draggable @change="capNhatThuTu" @end="drag=false" @start="drag=true" element="tbody" handle=".handle"
                 v-model="items">
        <tr :key="item.name" class="draggable" role="row" v-for="(item,index) in items">
          <td class="center fit-column" role="cell">{{ index + 1 }}</td>
          <td role="cell">{{ item.chucVu }}</td>
          <td role="cell">{{ hienThiNhomChucVu(item.iD_NhomChucVu) }}</td>
          <td class="fit-column" role="cell">
            <div class="text-center">
              <b-button class="handle" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'move',
                    marginLeft: '5px',
                  }"
                  icon="align-justify"
                  title="Thay đổi thứ tự"
                />
              </b-button>
              <b-button @click="openEdit(item)" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="edit"
                  title="Cập nhật chức vụ"
                />
              </b-button>
              <b-button @click="openDelete(item)" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="trash"
                  title="Xóa chức vụ"
                />
              </b-button>
            </div>
          </td>
        </tr>
      </draggable>
    </table>
    <ModalCapNhatChucVu :data="chucVuDaChon" :is-edit.sync="isEdit" @hidden="isEdit=false" ref="modalCapNhatChucVu"/>
    <ModalConfirm :title="chucVuDaChon.chucVu" @confirmed="xoaChucVu"/>
  </div>
</template>

<script>
import ModalCapNhatChucVu from "./modalCapNhatChucVu";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { NO_RESULTS_TEXT, ROUTE_NAME } from "@/constants/constants";
import { mapGetters } from "vuex";
import { isEmpty } from "lodash";
import draggable from "vuedraggable";

export default {
  name: "DanhSachChucVu",
  components: {
    ModalCapNhatChucVu,
    ModalConfirm,
    draggable
  },
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      NO_RESULTS_TEXT: NO_RESULTS_TEXT,
      requestInformation: {
        filterBy: "",
        pageSize: 10,
        pageIndex: 1
      },
      chucVuDaChon: {},
      isEdit: false,
      openModalDelete: false,
      items: []
    };
  },
  created() {
    if (isEmpty(this.danhSachNhomChucVu)) {
      this.$store.dispatch("nhomChucVu/layDanhSachNhomChucVu");
    }
    this.layDanhSachChucVu();
  },
  computed: {
    ...mapGetters({
      danhSachChucVu: "chucVu/danhSachChucVu",
      danhSachNhomChucVu: "nhomChucVu/danhSachNhomChucVu"
    })
  },
  methods: {
    layDanhSachChucVu() {
      this.$store.dispatch("chucVu/layDanhSachChucVu");
    },
    hienThiNhomChucVu(id) {
      const index = this.danhSachNhomChucVu.findIndex(
        obj => obj.id === parseInt(id)
      );
      return (
        (this.danhSachNhomChucVu[index] &&
          this.danhSachNhomChucVu[index].tenNhom) ||
        ""
      );
    },
    openCreate() {
      this.isEdit = false;
      this.$refs["modalCapNhatChucVu"].$refs.modalCapNhatChucVu.show();
    },
    openEdit(item) {
      this.chucVuDaChon = item;
      this.isEdit = true;
      this.$refs["modalCapNhatChucVu"].$refs.modalCapNhatChucVu.show();
    },
    openDelete(item) {
      this.chucVuDaChon = item;
      this.$bvModal.show("modal-confirm");
    },
    xoaChucVu(confirm) {
      if (confirm) {
        this.$store.dispatch("chucVu/xoaChucVu", {
          data: { id: this.chucVuDaChon.id },
          onSuccess: this.onSuccess
        });
        this.$bvModal.hide("modal-confirm");
      }
    },
    onSuccess() {
      this.layDanhSachChucVu();
    },
    capNhatThuTu() {
      let listUpdate = [];
      this.items.forEach(function(item, index) {
        listUpdate.push({ Id: item.id, ThuTu: index + 1 });
      });
      let payload = new FormData();
      payload.append("arrangeRequest", JSON.stringify(listUpdate));
      this.$store.dispatch("chucVu/capNhatThuTu", {
        data: payload
        // onSuccess: null
      });
    }
  },
  watch: {
    danhSachChucVu: {
      handler() {
        this.items = this.danhSachChucVu;
      }
    }
  }
};
</script>

<style scoped>
</style>
