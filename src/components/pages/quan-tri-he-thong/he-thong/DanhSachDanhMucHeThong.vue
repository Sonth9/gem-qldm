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
    <p class="color-gray-1">Tìm thấy {{ danhSachDanhMucHeThong.length }} kết quả</p>
    <p class="drag-note">※ Kéo thả để thay đổi thứ tự hiển thị danh mục hệ thống.</p>
    <table class="table b-table table-striped table-bordered">
      <thead class="center">
      <tr>
        <th scope="col">STT</th>
        <th scope="col">Tên danh mục hệ thống</th>
        <th scope="col">Thao tác</th>
      </tr>
      </thead>
      <draggable @change="capNhatThuTu" @end="drag=false" @start="drag=true" element="tbody" handle=".handle"
                 v-model="items">
        <tr :key="item.name" class="draggable" role="row" v-for="(item,index) in items">
          <td class="center fit-column" role="cell">{{ index + 1 }}</td>
          <td role="cell">{{ item.heThong }}</td>
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
                  title="Cập nhật danh mục hệ thống"
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
                  title="Xóa danh mục hệ thống"
                />
              </b-button>
            </div>
          </td>
        </tr>
      </draggable>
    </table>
    <ModalCapNhatDanhMucHeThong :data="heThongDaChon"
                                :is-edit.sync="isEdit"
                                @hidden="isEdit=false"
                                ref="modalCapNhatDanhMucHeThong"/>
    <ModalConfirm :title="heThongDaChon.heThong" @confirmed="xoaHeThong"/>
  </div>
</template>

<script>
import ModalCapNhatDanhMucHeThong from "./modalCapNhatDanhMucHeThong";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { NO_RESULTS_TEXT, ROUTE_NAME } from "@/constants/constants";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "DanhSachDanhMucHeThong",
  components: {
    ModalCapNhatDanhMucHeThong,
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
      heThongDaChon: {},
      isEdit: false,
      fieldName: [
        {
          key: "stt",
          label: "STT",
          class: "center"
        },
        {
          key: "heThong",
          label: "Tên danh mục hệ thống"
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
      openModalDelete: false,
      items: []
    };
  },
  created() {
    this.layDanhSachDanhMucHeThong();
  },
  computed: {
    ...mapGetters({
      danhSachDanhMucHeThong: "dmHeThong/danhSachDanhMucHeThong"
    })
  },
  methods: {
    layDanhSachDanhMucHeThong() {
      this.$store.dispatch("dmHeThong/layDanhSachdmHeThong");
    },
    openCreate() {
      this.isEdit = false;
      this.$refs[
        "modalCapNhatDanhMucHeThong"
      ].$refs.modalCapNhatDanhMucHeThong.show();
    },
    openEdit(item) {
      this.heThongDaChon = item;
      this.isEdit = true;
      this.$refs[
        "modalCapNhatDanhMucHeThong"
      ].$refs.modalCapNhatDanhMucHeThong.show();
    },
    openDelete(item) {
      this.heThongDaChon = item;
      this.$bvModal.show("modal-confirm");
    },
    xoaHeThong(confirm) {
      if (confirm) {
        this.$store.dispatch("dmHeThong/xoaDanhMucHeThong", {
          data: { id: this.heThongDaChon.id },
          onSuccess: this.onSuccess
        });
        this.$bvModal.hide("modal-confirm");
      }
    },
    onSuccess() {
      this.layDanhSachDanhMucHeThong();
    },
    capNhatThuTu() {
      let listUpdate = [];
      this.items.forEach(function(item, index) {
        listUpdate.push({ Id: item.id, ThuTu: index + 1 });
      });
      let payload = new FormData();
      payload.append("arrangeRequest", JSON.stringify(listUpdate));
      this.$store.dispatch("dmHeThong/capNhatThuTu", {
        data: payload
        // onSuccess: null
      });
    }
  },
  watch: {
    danhSachDanhMucHeThong: {
      handler() {
        this.items = this.danhSachDanhMucHeThong;
      }
    }
  }
};
</script>

<style scoped>
</style>
