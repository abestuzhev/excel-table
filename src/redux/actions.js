import {RESIZE_TABLE} from "@/redux/types";

export function tableResize(data) {
   return {
      type: RESIZE_TABLE,
      data
   }
}