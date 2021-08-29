import store from "@/store";

type ModuleNameType = "hero" | "map";

export function setStoreState<T>(
  module: ModuleNameType,
  key: keyof T,
  value: any
) {
  store.commit({
    type: module + "/__set",
    key: key,
    val: value
  });
}

export function setHeroItem(type: string, index: number, value: any) {
  store.commit("hero/setItem", {
    type: type,
    index: index,
    value: value
  });
}
