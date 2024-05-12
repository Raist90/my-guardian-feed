import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import { H as HeadDefault, L as LayoutDefault } from "../chunks/chunk-B4xYuF9Z.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { usePageContext } from "vike-react/usePageContext";
import "react";
function Page() {
  const { abortReason, is404 } = usePageContext();
  if (is404) {
    return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h1", { children: "404 Page Not Found" }),
      /* @__PURE__ */ jsx("p", { children: "This page could not be found." })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h1", { children: "500 Internal Server Error" }),
      /* @__PURE__ */ jsx("p", { children: "Something went wrong." })
    ] });
  }
}
const import_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
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
    importPath: "/pages/_error/+Page.tsx",
    isValueFile: true,
    exportValues: import_3
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    valueSerialized: "[[]]",
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }]
  },
  ["title"]: {
    valueSerialized: '"My Guardian Feed"',
    type: "classic",
    definedAtData: { "filePathToShowToUser": "/pages/+config.ts", "fileExportPathToShowToUser": ["default", "title"] }
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
