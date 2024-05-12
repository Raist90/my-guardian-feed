import { setImportBuildGetters } from "vike/__internal/loadImportBuild";
const _route = "/news/*";
const import_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _route
}, Symbol.toStringTag, { value: "Module" }));
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const isGeneratedFile = true;
const pageConfigsSerialized = [
  {
    pageId: "/pages/_error",
    isErrorPage: true,
    routeFilesystem: void 0,
    loadConfigValuesAll: () => import("./entries/pages_error.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        valueSerialized: "true",
        type: "computed",
        definedAtData: null
      },
      ["clientRouting"]: {
        valueSerialized: "true",
        type: "classic",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] }
      }
    },
    configValuesImported: []
  },
  {
    pageId: "/pages/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/", "definedBy": "/pages/index/" },
    loadConfigValuesAll: () => import("./entries/pages_index.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        valueSerialized: "true",
        type: "computed",
        definedAtData: null
      },
      ["clientRouting"]: {
        valueSerialized: "true",
        type: "classic",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] }
      }
    },
    configValuesImported: []
  },
  {
    pageId: "/pages/news",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/news", "definedBy": "/pages/news/" },
    loadConfigValuesAll: () => import("./entries/pages_news.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        valueSerialized: "true",
        type: "computed",
        definedAtData: null
      },
      ["clientRouting"]: {
        valueSerialized: "true",
        type: "classic",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] }
      }
    },
    configValuesImported: [
      {
        configName: "route",
        importPath: "/pages/news/+route.ts",
        isValueFile: true,
        exportValues: import_0
      }
    ]
  },
  {
    pageId: "/pages/search/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/search", "definedBy": "/pages/search/index/" },
    loadConfigValuesAll: () => import("./entries/pages_search_index.mjs"),
    configValuesSerialized: {
      ["isClientSideRenderable"]: {
        valueSerialized: "true",
        type: "computed",
        definedAtData: null
      },
      ["clientRouting"]: {
        valueSerialized: "true",
        type: "classic",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] }
      }
    },
    configValuesImported: []
  }
];
const pageConfigGlobalSerialized = {
  configValuesImported: []
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
const pageFiles = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isGeneratedFile,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
}, Symbol.toStringTag, { value: "Module" }));
{
  const assetsManifest = {
  "_chunk-!~{006}~.js": {
    "file": "assets/static/LayoutDefault.BiHLdDZu.css",
    "src": "_chunk-!~{006}~.js"
  },
  "_chunk-BxmkVA9C.js": {
    "file": "assets/chunks/chunk-BxmkVA9C.js",
    "name": "useData",
    "imports": [
      "_chunk-Dr1Gr7kl.js",
      "_chunk-CviHZ9Xg.js"
    ]
  },
  "_chunk-CviHZ9Xg.js": {
    "file": "assets/chunks/chunk-CviHZ9Xg.js",
    "name": "LayoutDefault",
    "css": [
      "assets/static/LayoutDefault.BiHLdDZu.css"
    ]
  },
  "_chunk-CxUV3kis.js": {
    "file": "assets/chunks/chunk-CxUV3kis.js",
    "name": "Pagination",
    "imports": [
      "_chunk-CviHZ9Xg.js",
      "_chunk-BxmkVA9C.js"
    ]
  },
  "_chunk-Dr1Gr7kl.js": {
    "file": "assets/chunks/chunk-Dr1Gr7kl.js",
    "name": "abort"
  },
  "i7dMIFZifjKcF5UAWdDRaPpZUFWaHg.woff2": {
    "file": "assets/static/i7dMIFZifjKcF5UAWdDRaPpZUFWaHg.DQ28t8ia.woff2",
    "src": "i7dMIFZifjKcF5UAWdDRaPpZUFWaHg.woff2"
  },
  "i7dMIFZifjKcF5UAWdDRaPpZUFqaHjyV.woff2": {
    "file": "assets/static/i7dMIFZifjKcF5UAWdDRaPpZUFqaHjyV.0hHzGqcB.woff2",
    "src": "i7dMIFZifjKcF5UAWdDRaPpZUFqaHjyV.woff2"
  },
  "i7dMIFZifjKcF5UAWdDRaPpZUFuaHjyV.woff2": {
    "file": "assets/static/i7dMIFZifjKcF5UAWdDRaPpZUFuaHjyV.DVvWKYIc.woff2",
    "src": "i7dMIFZifjKcF5UAWdDRaPpZUFuaHjyV.woff2"
  },
  "i7dNIFZifjKcF5UAWdDRYERMR3K_.woff2": {
    "file": "assets/static/i7dNIFZifjKcF5UAWdDRYERMR3K_.DaE23bd9.woff2",
    "src": "i7dNIFZifjKcF5UAWdDRYERMR3K_.woff2"
  },
  "i7dNIFZifjKcF5UAWdDRYERMSHK_IwU.woff2": {
    "file": "assets/static/i7dNIFZifjKcF5UAWdDRYERMSHK_IwU.CFv4pV0N.woff2",
    "src": "i7dNIFZifjKcF5UAWdDRYERMSHK_IwU.woff2"
  },
  "i7dNIFZifjKcF5UAWdDRYERMSXK_IwU.woff2": {
    "file": "assets/static/i7dNIFZifjKcF5UAWdDRYERMSXK_IwU.tqFVvC5p.woff2",
    "src": "i7dNIFZifjKcF5UAWdDRYERMSXK_IwU.woff2"
  },
  "i7dPIFZifjKcF5UAWdDRYE58RWq7.woff2": {
    "file": "assets/static/i7dPIFZifjKcF5UAWdDRYE58RWq7.C1gLLQHE.woff2",
    "src": "i7dPIFZifjKcF5UAWdDRYE58RWq7.woff2"
  },
  "i7dPIFZifjKcF5UAWdDRYE98RWq7.woff2": {
    "file": "assets/static/i7dPIFZifjKcF5UAWdDRYE98RWq7.DR7a1phP.woff2",
    "src": "i7dPIFZifjKcF5UAWdDRYE98RWq7.woff2"
  },
  "i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2": {
    "file": "assets/static/i7dPIFZifjKcF5UAWdDRYEF8RQ.Co7bH5Hm.woff2",
    "src": "i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2"
  },
  "i7dSIFZifjKcF5UAWdDRYERE_FeqEiSRV3U.woff2": {
    "file": "assets/static/i7dSIFZifjKcF5UAWdDRYERE_FeqEiSRV3U.D0IUEynt.woff2",
    "src": "i7dSIFZifjKcF5UAWdDRYERE_FeqEiSRV3U.woff2"
  },
  "i7dSIFZifjKcF5UAWdDRYERE_FeqEySRV3U.woff2": {
    "file": "assets/static/i7dSIFZifjKcF5UAWdDRYERE_FeqEySRV3U.CmuMj9R3.woff2",
    "src": "i7dSIFZifjKcF5UAWdDRYERE_FeqEySRV3U.woff2"
  },
  "i7dSIFZifjKcF5UAWdDRYERE_FeqHCSR.woff2": {
    "file": "assets/static/i7dSIFZifjKcF5UAWdDRYERE_FeqHCSR.D8Cc_Qu6.woff2",
    "src": "i7dSIFZifjKcF5UAWdDRYERE_FeqHCSR.woff2"
  },
  "node_modules/.pnpm/vike@0.4.171_vite@5.2.10/node_modules/vike/dist/esm/client/client-routing-runtime/entry.js": {
    "file": "assets/entries/entry-client-routing.DbSgz3Yf.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/.pnpm/vike@0.4.171_vite@5.2.10/node_modules/vike/dist/esm/client/client-routing-runtime/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-Dr1Gr7kl.js"
    ],
    "dynamicImports": [
      "virtual:vike:pageConfigValuesAll:client:/pages/_error",
      "virtual:vike:pageConfigValuesAll:client:/pages/index",
      "virtual:vike:pageConfigValuesAll:client:/pages/news",
      "virtual:vike:pageConfigValuesAll:client:/pages/search/index"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/_error": {
    "file": "assets/entries/pages_error.DT0S5c0L.js",
    "name": "entries/pages/_error",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/_error",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-CviHZ9Xg.js"
    ],
    "assets": [
      "assets/static/apple-touch-icon.fXBmBo3g.png"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/index": {
    "file": "assets/entries/pages_index.Cdi8pdLt.js",
    "name": "entries/pages/index",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-CviHZ9Xg.js",
      "_chunk-CxUV3kis.js",
      "_chunk-BxmkVA9C.js",
      "_chunk-Dr1Gr7kl.js"
    ],
    "assets": [
      "assets/static/apple-touch-icon.fXBmBo3g.png"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/news": {
    "file": "assets/entries/pages_news.D2cNzUUs.js",
    "name": "entries/pages/news",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/news",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-CviHZ9Xg.js",
      "_chunk-BxmkVA9C.js",
      "_chunk-Dr1Gr7kl.js"
    ],
    "assets": [
      "assets/static/apple-touch-icon.fXBmBo3g.png"
    ]
  },
  "virtual:vike:pageConfigValuesAll:client:/pages/search/index": {
    "file": "assets/entries/pages_search_index.puB-4p7g.js",
    "name": "entries/pages/search/index",
    "src": "virtual:vike:pageConfigValuesAll:client:/pages/search/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-CviHZ9Xg.js",
      "_chunk-CxUV3kis.js",
      "_chunk-BxmkVA9C.js",
      "_chunk-Dr1Gr7kl.js"
    ],
    "assets": [
      "assets/static/apple-touch-icon.fXBmBo3g.png"
    ]
  },
  "webfonts.css": {
    "file": "assets/static/webfonts.Cw3ZT71q.css",
    "src": "webfonts.css"
  }
};
  const pluginManifest = {
    "version": "0.4.171",
    "usesClientRouter": false,
    "baseServer": "/",
    "baseAssets": "/",
    "includeAssetsImportedByServer": true,
    "redirects": {},
    "trailingSlash": false,
    "disableUrlNormalization": false
  };
  setImportBuildGetters({
    pageFiles: () => pageFiles,
    getAssetsManifest: () => assetsManifest,
    pluginManifest: () => pluginManifest
  });
}
