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
    <p class="color-gray-1">Tìm thấy {{ danhSachNhomChucVu.length }} kết quả</p>
    <p class="drag-note">※ Kéo thả để thay đổi thứ tự hiển thị nhóm chức vụ.</p>
    <table class="table b-table table-striped table-bordered">
      <thead class="center">
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên nhóm chức vụ</th>
        <th scope="col">Thao tác</th>
      </tr>
      </thead>
      <draggable @change="capNhatThuTuNhomChucVu" @end="drag=false" @start="drag=true" element="tbody" handle=".handle"
                 v-model="items">
        <tr :key="item.name" class="draggable" role="row" v-for="(item,index) in items">
          <td class="center fit-column" role="cell">{{ index + 1 }}</td>
          <td role="cell">{{ item.tenNhom }}</td>
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
                  title="Cập nhật nhóm chức vụ"
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
                  title="Xóa nhóm chức vụ"
                />
              </b-button>
            </div>
          </td>
        </tr>
      </draggable>
    </table>

    <ModalCapNhatNhomChucVu :data="nhomChucVuDaChon"
                            :is-edit.sync="isEdit"
                            @hidden="isEdit=false"
                            ref="modalCapNhatNhomChucVu"/>
    <ModalConfirm :title="nhomChucVuDaChon.tenNhom" @confirmed="xoaHeThong"/>

  </div>
</template>

<script>
import ModalCapNhatNhomChucVu from "./modalCapNhatNhomChucVu";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { NO_RESULTS_TEXT, ROUTE_NAME } from "@/constants/constants";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "DanhSachChucVu",
  components: {
    ModalCapNhatNhomChucVu,
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
      sortableOptions: { chosenClass: "is-selected" },
      nhomChucVuDaChon: {},
      isEdit: false,
      fieldName: [
        {
          key: "stt",
          label: "STT",
          class: "center"
        },
        {
          key: "tenNhom",
          label: "Tên nhóm chức vụ"
        },
        {
          key: "thuTu",
          label: "Thứ tự"
        },
        {
          key: "thaoTac",
          label: "Thao Tác",
          class: "center"
        }
      ],
      items: [],
      openModalDelete: false
    };
  },
  created() {
    this.layDanhSachNhomChucVu();
  },
  computed: {
    ...mapGetters({
      danhSachNhomChucVu: "nhomChucVu/danhSachNhomChucVu"
    })
  },
  methods: {
    layDanhSachNhomChucVu() {
      this.$store.dispatch("nhomChucVu/layDanhSachNhomChucVu");
    },
    openCreate() {
      this.isEdit = false;
      this.$refs["modalCapNhatNhomChucVu"].$refs.modalCapNhatNhomChucVu.show();
    },
    openEdit(item) {
      this.nhomChucVuDaChon = item;
      this.isEdit = true;
      this.$refs["modalCapNhatNhomChucVu"].$refs.modalCapNhatNhomChucVu.show();
    },
    openDelete(item) {
      this.nhomChucVuDaChon = item;
      this.$bvModal.show("modal-confirm");
    },
    xoaHeThong(confirm) {
      if (confirm) {
        this.$store.dispatch("nhomChucVu/xoaNhomChucVu", {
          data: { id: this.nhomChucVuDaChon.id },
          onSuccess: this.onSuccess
        });
        this.$bvModal.hide("modal-confirm");
      }
    },
    onSuccess() {
      this.layDanhSachNhomChucVu();
    },
    capNhatThuTuNhomChucVu() {
      let listUpdate = [];
      this.items.forEach(function(item, index) {
        listUpdate.push({ Id: item.id, ThuTu: index + 1 });
      });
      let payload = new FormData();
      payload.append("arrangeRequest", JSON.stringify(listUpdate));
      this.$store.dispatch("nhomChucVu/capNhatThuTu", {
        data: payload
        // onSuccess: null
      });
    }
  },
  watch: {
    danhSachNhomChucVu: {
      handler() {
        this.items = this.danhSachNhomChucVu;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
