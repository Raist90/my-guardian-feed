import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useCustomFeed, b as Link, c as HOMEPAGE_ROUTE, a as SEARCH_ROUTE, T as TOAST_TYPES, d as HARDCODED_SECTION_LIST, e as SECTION_ROUTE_PREFIX, F as FEED_KEY, f as TOAST_MESSAGES, P as PAGE_ROUTE_PREFIX, I as IMAGE_PLACEHOLDER } from "./chunk-B4xYuF9Z.js";
import { c as isString, a as assert, d as isBrowser } from "./chunk-CQvJ8aQM.js";
import { usePageContext } from "vike-react/usePageContext";
import clsx from "clsx";
import React, { useState } from "react";
import { Transition, Dialog, TransitionChild, DialogPanel } from "@headlessui/react";
function Feed({ title, children, ...rest }) {
  const customFeed = useCustomFeed();
  const { urlOriginal } = usePageContext();
  const { className } = rest;
  if (typeof customFeed === "undefined")
    return;
  const hasCustomFeed = !!customFeed && (urlOriginal === HOMEPAGE_ROUTE || urlOriginal === SEARCH_ROUTE);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: isString(className) && className || "mx-auto w-full p-4 xl:w-8/12",
      children: [
        title && /* @__PURE__ */ jsx("h1", { className: "mb-4 text-3xl font-bold", children: title }),
        hasCustomFeed && /* @__PURE__ */ jsxs("p", { className: "mb-7 inline-block rounded-r-md border-l-2 border-yellow-500 bg-gray-700 p-2 text-sm", children: [
          "Hey! You are now seeing the default Guardian Feed. Click",
          " ",
          /* @__PURE__ */ jsx(Link, { href: customFeed, children: /* @__PURE__ */ jsx("span", { className: "underline", children: "here" }) }),
          " ",
          "to reach your custom feed instead!"
        ] }),
        children
      ]
    }
  );
}
function removeHTMLTags(str) {
  if (str === null || str === "")
    return false;
  else
    str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}
function NewsCard({ newsCard }) {
  const {
    excerpt,
    id,
    media: { alt, thumbnail },
    publishedOn,
    title
  } = newsCard;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 p-4 md:flex-row", children: [
    /* @__PURE__ */ jsx("div", { className: "relative aspect-video max-h-[200px] md:h-[100px]", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "absolute h-full w-full object-cover",
        src: thumbnail,
        alt
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Link, { href: `news/${id}`, children: /* @__PURE__ */ jsx("h2", { className: "mb-1 text-xl hover:underline", children: title }) }),
      /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm", children: removeHTMLTags(excerpt) }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs", children: [
        "Published on ",
        publishedOn.split("T")[0]
      ] })
    ] })
  ] }, id);
}
function isHomepage(currentUrl) {
  assert(isBrowser());
  return currentUrl === HOMEPAGE_ROUTE || currentUrl === SEARCH_ROUTE;
}
function capitalize(str) {
  return str[0].toUpperCase().concat(str.slice(1));
}
function Button(props) {
  const customFeed = useCustomFeed();
  if ("isButtonGroup" in props) {
    const { buttonGroup, isDisabled: isDisabled2, handlers } = props;
    return /* @__PURE__ */ jsx(Fragment, { children: buttonGroup.map((button) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handlers[`handle${capitalize(button)}`],
        className: "border p-2 disabled:opacity-75",
        disabled: button !== "load" ? isDisabled2 : !customFeed,
        children: `${capitalize(button)} filters`
      },
      button
    )) });
  }
  const { children, isDisabled, handler } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "border p-2 disabled:opacity-75",
      disabled: isDisabled || false,
      onClick: handler,
      children
    }
  );
}
const Toast = ({ isOpen, closeDialog, message, type }) => {
  const borderColor = {
    error: "border-red-500",
    success: "border-green-500",
    warning: "border-yellow-500"
  };
  return /* @__PURE__ */ jsx(Transition, { appear: true, show: isOpen, as: React.Fragment, children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      className: "fixed inset-y-10 grid w-full items-end justify-center",
      open: isOpen,
      onClose: closeDialog,
      children: [
        /* @__PURE__ */ jsx(
          TransitionChild,
          {
            as: React.Fragment,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[-1] bg-black/25" })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `border-l-2 bg-gray-700 p-4 text-sm ${borderColor[type]}`,
            children: /* @__PURE__ */ jsx(
              TransitionChild,
              {
                as: React.Fragment,
                enter: "ease-out duration-300",
                enterFrom: "opacity-0 scale-95",
                enterTo: "opacity-100 scale-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100 scale-100",
                leaveTo: "opacity-0 scale-95",
                children: /* @__PURE__ */ jsxs(DialogPanel, { children: [
                  /* @__PURE__ */ jsx("p", { children: message }),
                  /* @__PURE__ */ jsx("button", { className: "text-sm", onClick: closeDialog, children: "Dismiss" })
                ] })
              }
            )
          }
        )
      ]
    }
  ) });
};
function SectionList() {
  var _a;
  const { urlOriginal, urlParsed } = usePageContext();
  let [isOpen, setIsOpen] = useState(false);
  let [toastProps, setToastProps] = useState({ msg: "", type: TOAST_TYPES["ERROR"] });
  const sections = HARDCODED_SECTION_LIST;
  let selectedSections;
  if ((_a = urlParsed.searchAll.section) == null ? void 0 : _a.length) {
    selectedSections = urlParsed.searchAll.section[0].split("|");
  } else {
    selectedSections = [];
  }
  const handleAddFilter = (isActive, id) => {
    if (isActive) {
      const updatedSelection = selectedSections.filter(
        // removing current id from selection
        (selectedSection) => selectedSection !== id
      );
      if (!updatedSelection.length) {
        location.href = HOMEPAGE_ROUTE;
      } else
        location.href = `${SECTION_ROUTE_PREFIX}${updatedSelection.join("|")}`;
    } else {
      if (selectedSections.length) {
        const sections2 = urlParsed.searchAll.section.join("|");
        location.href = `${SECTION_ROUTE_PREFIX}${sections2}|${id}`;
      } else {
        location.href = `${SECTION_ROUTE_PREFIX}${id}`;
      }
    }
  };
  const handleSave = () => {
    const currentURL = urlOriginal.split("&page")[0];
    const hasStoredURL = !!localStorage.getItem(FEED_KEY);
    if (hasStoredURL) {
      localStorage.removeItem(FEED_KEY);
    }
    localStorage.setItem(FEED_KEY, currentURL);
    setToastProps({
      msg: TOAST_MESSAGES["SAVE_FILTERS"],
      type: TOAST_TYPES["SUCCESS"]
    });
    setIsOpen(true);
  };
  const handleLoad = () => {
    const storedURL = localStorage.getItem(FEED_KEY);
    if (storedURL) {
      location.href = storedURL;
    }
  };
  const handleReset = () => {
    location.href = HOMEPAGE_ROUTE;
  };
  const closeDialog = () => setIsOpen(false);
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-wrap justify-between gap-4 text-xs", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: sections.map((section) => {
      const isActive = selectedSections.includes(section);
      return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            checked: isActive,
            className: clsx(isActive && "bg-purple-500", "border p-2"),
            id: section,
            onChange: () => handleAddFilter(isActive, section),
            type: "checkbox"
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: section, children: section })
      ] }, section);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: /* @__PURE__ */ jsx(
      Button,
      {
        isButtonGroup: true,
        buttonGroup: ["load", "reset", "save"],
        isDisabled: isHomepage(urlOriginal),
        handlers: { handleLoad, handleReset, handleSave }
      }
    ) }),
    /* @__PURE__ */ jsx(
      Toast,
      {
        isOpen,
        closeDialog,
        message: (toastProps == null ? void 0 : toastProps.msg) || "",
        type: (toastProps == null ? void 0 : toastProps.type) || "error"
      }
    )
  ] });
}
function NewsCardList({ newsCardList }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SectionList, {}),
    /* @__PURE__ */ jsx("section", { className: "grid gap-6", children: newsCardList.map((newsCard) => /* @__PURE__ */ jsx(NewsCard, { newsCard }, newsCard.id)) })
  ] });
}
function Pagination() {
  const {
    data: { currentPage, pages },
    urlOriginal
  } = usePageContext();
  let prevPageUrl;
  let nextPageUrl;
  if (urlOriginal.includes("search")) {
    prevPageUrl = `${urlOriginal}&page=${currentPage - 1}`;
    nextPageUrl = `${urlOriginal}&page=${currentPage + 1}`;
  } else {
    prevPageUrl = `${PAGE_ROUTE_PREFIX}${currentPage - 1}`;
    nextPageUrl = `${PAGE_ROUTE_PREFIX}${currentPage + 1}`;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clsx(
          currentPage > 1 && "justify-between",
          "my-4 flex justify-end"
        ),
        children: [
          currentPage > 1 && /* @__PURE__ */ jsx(Link, { href: prevPageUrl, children: "Prev page" }),
          /* @__PURE__ */ jsx(Link, { href: nextPageUrl, children: "Next page" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("p", { className: "mt-8 text-center text-xs", children: [
      "Page ",
      currentPage,
      " of ",
      pages
    ] })
  ] });
}
function newsCardListTransformer(data) {
  const {
    response: { currentPage, pages, results }
  } = data;
  return {
    currentPage,
    pages,
    results: results.map((result) => {
      const {
        id,
        webPublicationDate,
        webTitle,
        fields: { thumbnail, trailText }
      } = result;
      return {
        excerpt: trailText,
        id,
        media: {
          thumbnail: thumbnail || IMAGE_PLACEHOLDER,
          /** @todo Figure out how to extract this from `results` */
          alt: ""
        },
        publishedOn: webPublicationDate,
        title: webTitle
      };
    })
  };
}
export {
  Feed as F,
  NewsCardList as N,
  Pagination as P,
  newsCardListTransformer as n
};
