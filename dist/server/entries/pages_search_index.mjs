import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import { a as SEARCH_ROUTE, H as HeadDefault, L as LayoutDefault } from "../chunks/chunk-B4xYuF9Z.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { F as Feed, N as NewsCardList, P as Pagination, n as newsCardListTransformer } from "../chunks/chunk-D4N9rRO-.js";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import { g as getGuardianData } from "../chunks/chunk-CQvJ8aQM.js";
import "react";
import "clsx";
import "@headlessui/react";
import "zod";
import "vike/abort";
function Page() {
  const newsCardList = useData();
  const { urlOriginal } = usePageContext();
  const isCustomFeed = urlOriginal !== SEARCH_ROUTE;
  const title = isCustomFeed ? "Custom Feed" : "Guardian Feed";
  return /* @__PURE__ */ jsxs(Feed, { title, children: [
    /* @__PURE__ */ jsx(NewsCardList, { newsCardList: newsCardList.results }),
    /* @__PURE__ */ jsx(Pagination, {})
  ] });
}
const import_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
async function data(pageContext) {
  const guardianData = await getGuardianData({
    page: Number(pageContext.urlParsed.search.page) || 1,
    query: pageContext.urlParsed.search.q || "",
    section: pageContext.urlParsed.search.section
  });
  return newsCardListTransformer(guardianData);
}
const import_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
const configValuesImported = [
  {
    configName: "onRenderHtml",
    importPath: "vike-react/renderer/onRenderHtml",
    isValueFile: false,
    exportValue: onRenderHtml,
    exportName: "onRenderHtml"
  },
  {
    configName: "Head",
    importPath: "/src/layouts/HeadDefault.tsx",
    isValueFile: false,
    exportValue: HeadDefault,
    exportName: "default"
  },
  {
    configName: "Layout",
    importPath: "/src/layouts/LayoutDefault.tsx",
    isValueFile: false,
    exportValue: LayoutDefault,
    exportName: "default"
  },
  {
    configName: "Page",
    importPath: "/pages/search/index/+Page.tsx",
    isValueFile: true,
    exportValues: import_3
  },
  {
    configName: "data",
    importPath: "/pages/search/index/+data.ts",
    isValueFile: true,
    exportValues: import_4
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    valueSerialized: "[[],[]]",
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }]
  },
  ["title"]: {
    valueSerialized: '"Search | My Guardian Feed"',
    type: "classic",
    definedAtData: { "filePathToShowToUser": "/pages/search/+config.ts", "fileExportPathToShowToUser": ["default", "title"] }
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
