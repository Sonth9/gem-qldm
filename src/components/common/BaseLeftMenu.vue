<template>
  <div id="left-menu">
    <ul class="menus">
      <li
        :id="route.name"
        :key="index"
        class="border-bottom-menu"
        v-for="(route, index) in routes"
        v-show="checkAuth(route)"
      >
        <router-link
          :active-class="route.children ? '' : 'is-selected'"
          :aria-controls="route.name"
          :aria-expanded="route.expand ? 'true' : 'false'"
          :class="route.expand ? null : 'collapsed'"
          :id="`${route.name}${index}`"
          :to="route.children ? '' : route.path"
          @click.native="onClickItemMenu(index, route.children)"
          data-toggle="collapse"
        >
          <div class="menu-icon">
            <font-awesome-icon :icon="route.icon" />
          </div>
          <span>{{ route.menuName }}</span>
          <div class="down-up-icon" v-if="route.expand && route.children">
            <font-awesome-icon icon="angle-down" />
          </div>
          <div class="down-up-icon" v-else>
            <font-awesome-icon icon="angle-right" />
          </div>
        </router-link>
        <b-collapse :id="route.menuName" v-model="route.expand">
          <div>
            <ul>
              <li
                :key="idx"
                @mouseleave="onMouseleaveRouteChild(route.name, index)"
                @mouseover="onMouseoverRouteChild(route.name, index)"
                v-for="(routeChild, idx) in route.children"
                v-show="checkAuth(routeChild)"
              >
                <router-link
                  :to="`${route.path}${routeChild.path}`"
                  @click.native="onClickChildItemMenu()"
                  active-class="is-selected"
                  v-show="routeChild.isShowLeftMenu !== false"
                >
                  <span>{{ routeChild.menuName }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </b-collapse>
      </li>
      <li>
        <BaseHeaderAccount />
      </li>
    </ul>
  </div>
</template>

<script>
  import { removeLeftMenuAndOverlayClass } from "@/utils/headerUtils";
  import { hasPermission } from "@/utils/permissionUtils";
  import { getValueFromStorageByKey } from "@/utils/localStorage";

  import BaseHeaderAccount from "@/components/common/BaseHeaderAccount";
  import _isNil from "lodash/isNil";

  export default {
    name: "BaseLeftMenu",
    components: {
      BaseHeaderAccount
    },
    data() {
      return {
        PERMISSIONS: getValueFromStorageByKey("permissions"),
        routes: this.$router.options.routes.filter(x => x.isShowLeftMenu === true)
      };
    },
    created() {
      this.$router.onReady(() => {
        this.routes.forEach(item => {
          item.children &&
          item.children.forEach(childItem => {
            if (childItem.name === this.$route.name) {
              item.expand = true;
            }
          });
        });
      });
    },
    methods: {
      onClickItemMenu(index, Childroute) {
        if (_isNil(Childroute)) {
          removeLeftMenuAndOverlayClass();
        }
        this.routes.forEach((item, i) => {
          item.expand = !item.expand;
          if (i !== index) {
            item.expand = false;
          }
        });
      },
      onClickChildItemMenu() {
        removeLeftMenuAndOverlayClass();
      },
      onMouseoverRouteChild(routeName, routeIndex) {
        document
          .getElementById(`${routeName}${routeIndex}`)
          .classList.add("is-selected");
      },
      onMouseleaveRouteChild(routeName, routeIndex) {
        document
          .getElementById(`${routeName}${routeIndex}`)
          .classList.remove("is-selected");
      },
      checkAuth(route) {
        let valid = true;

        if (route.meta && route.meta.permissionName) {
          valid = hasPermission(this.PERMISSIONS, route.meta.permissionName);
        }
        if (route.meta && route.meta.permissions) {
          valid = hasPermission(this.PERMISSIONS, route.meta.permissions);
        }

        return valid
      }
    }
  };
</script>

<style scoped>
</style>
