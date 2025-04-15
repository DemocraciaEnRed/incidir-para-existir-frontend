import MobileDetect from "mobile-detect";
import { defineNuxtPlugin, useRequestHeaders } from "#app";

export default defineNuxtPlugin(nuxtApp => {
    // let headers = useRequestHeaders();
    const md = new MobileDetect(navigator.userAgent)
    const isIphone = md.os() === 'iOS' && md.mobile() === 'iPhone'
    return {
      provide: {
        isIphone: () => isIphone,
      },
    };
})
