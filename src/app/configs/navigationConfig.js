import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("ar", "navigation", ar);

const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: "heroicons-outline:home",
    url: "dashboard",
  },
];

export default navigationConfig;
