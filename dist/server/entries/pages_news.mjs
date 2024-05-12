import { onRenderHtml } from "vike-react/renderer/onRenderHtml";
import { jsxs, jsx } from "react/jsx-runtime";
import { a as assert, i as isArray, b as getGuardianDataById } from "../chunks/chunk-CQvJ8aQM.js";
import { useData } from "vike-react/useData";
import { I as IMAGE_PLACEHOLDER, S as SITE_TITLE, H as HeadDefault, L as LayoutDefault } from "../chunks/chunk-B4xYuF9Z.js";
import * as sanitizeHTML from "sanitize-html";
import "zod";
import "vike/abort";
import "react";
import "vike-react/usePageContext";
function Page() {
  const news = useData();
  const isImage = news.type === "image";
  const isVideo = news.type === "video";
  assert(isImage || isVideo);
  let videoSrc;
  if (isVideo) {
    const regex = /<iframe .*?src="(.*?)".*?><\/iframe>/;
    videoSrc = news.media.src.split(regex)[1];
  } else
    videoSrc = news.media.src;
  return /* @__PURE__ */ jsxs("section", { className: "grid gap-8 md:p-8", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-xl lg:text-3xl", children: news.title }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid w-full gap-4 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsx("div", { className: "relative aspect-video w-full lg:col-span-7", children: isImage ? /* @__PURE__ */ jsx(
        "img",
        {
          className: "absolute h-full w-full object-cover",
          src: news.media.src,
          alt: news.media.alt
        }
      ) : /* @__PURE__ */ jsx(
        "iframe",
        {
          className: "absolute h-full w-full object-cover",
          src: videoSrc
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm lg:col-span-5", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-1 text-xs", children: news.publishedOn }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 hidden text-xl italic", children: news.excerpt }),
        /* @__PURE__ */ jsx("p", { className: "mb-1", children: news.caption }),
        /* @__PURE__ */ jsx("p", { className: "mb-4 text-xs", children: news.credit }),
        /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-x-2 gap-y-1 text-xs", children: isArray(news.tags) && news.tags.map((tag) => {
          const { id, title: title2 } = tag;
          return /* @__PURE__ */ jsxs("li", { className: "italic", children: [
            "#",
            title2.toLowerCase()
          ] }, id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "my-8 lg:mx-auto lg:w-8/12", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "[&_a]:underline [&_div]:mb-12 [&_p]:mb-4",
        dangerouslySetInnerHTML: { __html: news.body }
      }
    ) })
  ] });
}
const import_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
function newsCardTransformer(data2) {
  var _a;
  const {
    response: {
      content: {
        elements,
        fields,
        id,
        tags: contentTags,
        webPublicationDate,
        webTitle
      }
    }
  } = data2;
  const assets = (_a = elements == null ? void 0 : elements.find(
    (element) => element.relation === "main" || element.relation === "body"
  )) == null ? void 0 : _a.assets;
  const isImage = !!(elements == null ? void 0 : elements.find((element) => element.relation === "main"));
  const isVideo = !!(elements == null ? void 0 : elements.find((element) => element.relation === "body"));
  const metaData = isImage ? assets == null ? void 0 : assets.find((asset) => asset.typeData.width === "1000") : assets == null ? void 0 : assets.find((asset) => asset.typeData.iframeUrl);
  fields.body = sanitizeHTML.default(fields.body);
  const tags = contentTags.map((tag) => {
    const { id: id2, webTitle: webTitle2 } = tag;
    return { id: id2, title: webTitle2 };
  });
  if (!metaData) {
    return {
      body: fields.body,
      publishedOn: webPublicationDate,
      excerpt: fields.trailText,
      id,
      media: {
        alt: "placeholder image",
        src: IMAGE_PLACEHOLDER
      },
      tags,
      title: webTitle,
      type: "image"
    };
  }
  assert(isImage || isVideo);
  const { typeData } = metaData;
  assert(metaData);
  assert(typeData.altText);
  if (isImage) {
    return {
      body: fields.body,
      caption: typeData.caption,
      credit: typeData.credit,
      publishedOn: webPublicationDate,
      excerpt: fields.trailText,
      id,
      media: {
        alt: typeData.altText,
        src: metaData.file
      },
      tags,
      title: webTitle,
      type: "image"
    };
  } else {
    return {
      body: fields.body,
      excerpt: fields.trailText,
      id,
      media: {
        alt: typeData.altText,
        src: fields.main
      },
      publishedOn: webPublicationDate,
      tags,
      title: webTitle,
      type: "video"
    };
  }
}
async function data(pageContext) {
  const guardianDataById = await getGuardianDataById(
    pageContext.routeParams["*"]
  );
  return newsCardTransformer(guardianDataById);
}
const import_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  data
}, Symbol.toStringTag, { value: "Module" }));
function title(pageContext) {
  return `${pageContext.data.title} | ${SITE_TITLE}`;
}
const import_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  title
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
    configName: "Page",
    importPath: "/pages/news/+Page.tsx",
    isValueFile: true,
    exportValues: import_1
  },
  {
    configName: "data",
    importPath: "/pages/news/+data.ts",
    isValueFile: true,
    exportValues: import_2
  },
  {
    configName: "title",
    importPath: "/pages/news/+title.ts",
    isValueFile: true,
    exportValues: import_3
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
  }
];
const configValuesSerialized = {
  ["passToClient"]: {
    valueSerialized: "[[],[]]",
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }, { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }]
  }
};
export {
  configValuesImported,
  configValuesSerialized
};
