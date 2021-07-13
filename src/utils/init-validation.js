import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, numeric, required, max } from "vee-validate/dist/rules";
import {
  cmtnd,
  EMAIL_INVALID,
  minxMax,
  NEW_CMTND_NUMBER,
  NUMERIC,
  OLD_CMTND_NUMBER,
  phoneNumber,
  REQUIRED,
  REQUIRED_FIELD,
  REQUIRED_SELECT,
  TOM_TAT_THONG_BAO_MAX_LENGTH
} from "@/constants/validateMessages";
import { lowerCase } from "bootstrap-vue/esm/utils/string";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

extend("required", {
  validate(value, { input }) {
    if (["", null, undefined].indexOf(value) === -1) {
      return true;
    }
    let message = REQUIRED;
    if (input === "select") message = REQUIRED_SELECT;

    return message;
  },
  params: ["input"],
  computesRequired: true
});
extend("email", {
  ...email,
  message: EMAIL_INVALID
});
extend("numeric", {
  ...numeric,
  message: NUMERIC
});
extend("minmax", {
  validate(value, args) {
    const length = value.length;

    if (length >= args.min && length <= args.max) {
      return true;
    }

    return minxMax(args.min, args.max);
  },
  params: ["min", "max"]
});
extend("phone_number", {
  validate(value, args) {
    const length = value.length;

    if (length >= args.min && length <= args.max && !isNaN(value)) {
      return true;
    }

    return phoneNumber(args.min, args.max);
  },
  params: ["min", "max"]
});
extend("cmtnd", {
  validate(value) {
    const length = value.length;

    if (length === OLD_CMTND_NUMBER || length === NEW_CMTND_NUMBER) {
      return true;
    }

    return cmtnd();
  }
});
extend("required_field", {
  validate(value, args) {
    if (value !== "") {
      return true;
    }

    return args.fieldName
      ? REQUIRED_FIELD(lowerCase(args.fieldName))
      : REQUIRED;
  },
  params: ["fieldName"],
  computesRequired: true
});
extend("max", {
  ...max,
  message: TOM_TAT_THONG_BAO_MAX_LENGTH
});
