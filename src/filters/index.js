import Vue from "vue";
import moment from "moment";

Vue.filter('formatDate', function (str) {
  if (!str) return "";
  const date = moment(str).format("DD-MM-YYYY");
  return date == "Invalid date" ? "" : date;
})

Vue.filter('formatDateTime', function (str) {
  if (!str) return "";
  const date = moment(str).format("DD-MM-YYYY HH:mm");
  return date;
})


