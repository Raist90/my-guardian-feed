import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";
const appleTouchIcon = "/assets/static/apple-touch-icon.fXBmBo3g.png";
const favicon16 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAXxJREFUOE+tk73LQWEYxn+HHINSRpOcP0FRSMpmMMhsMVtM1CkGzuI/sBh8lFJGrMwGmWxmYqRen2/PU8R7nLfej7ue7bp/z3Vfz/0omqaVAR1Q+VkdAUPRNO3jF833q44CcLO6WFEUfD4fLpeL1WrF4XAwSS0B4XCYarWK3++XTfv9nlKpxHA4fIG8BQSDQdrtNsvlkmazicPhoFgsYrfbCYVCXC6XB8QEELZHo5FsSqVSD9u6rpPL5SRgt9tZAwKBAP1+H9HQ6/UeQmE/kUiQTCa/d5DP5ykUCkSjUbbb7cu81+sVcZ7LNEKn08Hr9VIul2m1Wi/ier1Oo9GwBthsNhaLBePxmG63SyQSkWIRaiwWI5PJMJ/PrQEej4fZbIZwUalUpFCEORgM5D6IfM7nszVAPJMACFGtVuN0OpHNZmXyk8lEvsLXMmWQTqcxDAOn08ntdmM6nRKPx3k3v4C9XSS32y03cLPZsF6vUVVVunleoLuTf/lMf/rOn/qeolOF0Jq8AAAAAElFTkSuQmCC";
const favicon32 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0VJREFUWEfVV0sodGEYfs645NLsyCzkMidFFElMjZUNuWTlkhQLpfwlFkqTsZFZWAyz+Guk7FCUklyaYSMUC2lyDVuXXGoSijh/71vnhDHnnDF/5v/fms353nne571/nwDAIIqiTZKkXwBM+Bm5FATh99nZmUMQRbFPkqSBn7H70YogCHbBbDZf/KDnn/28JAJSJLyXbf7fBKKiopCXlwdRFJGYmIj7+3scHh7i+PhYd1C/FYH4+Hi0tbWhubkZSUlJAcb29/dhs9mwt7enSSRkApmZmRgdHWWv1eTh4QH19fU4OjpS1QuJQFpaGqanp5GcnKyAkrf0EwQBxcXFSE9PV87W19fR0tLydwhER0djdnYWubm5DHh7e4vu7m5sbGwoBkhneHgYlZWV/O3t7Q2FhYVcG8FEdwRaW1tht9sZ5+npCXV1dVxwnyUrKwvLy8vK56qqKtU06CJAnq2trSElJYWBh4aGuA6+EqPRiN3dXeWooqICJycn4UWgrKwMY2NjDOL3+2G1WjkKXwkVp8fjUVKQn5+Px8fH8AgMDg6isbGRQWZmZtDb2xsUkMh1dHTw+fn5OXp6esIvwtXVVWRkZDBQZ2cnFhYWVEFDOdSsAZPJpFS6JEmwWCy4u7tDTEyMpp3n52fQf9REk0BtbS2cTidjnJ6eory8HE1NTRgYUN/g1IJFRUVcM2ERcDgcaGhoYIyJiQn09/fD5XKhurpaFfjg4AA1NTWaUdKMgNfrhdlsZqCuri7Mz89zS76fhrIVSgtNRJLx8XFQ8WqJKgFaOj6fDwaDgXHUhgptxs3NTWU5tbe3Y2VlRcs+VAlQ5VMHyFJaWoqLC7pABQqFe2RkhA/05p90VQm8HyqkTON3Z2cnwDqt5Lm5OVDHkOjNvyYBumTQWJVTsLS0xHOAPJQlJyeHi/L9etabf00CpDA5OYmSkhLFILXi1tYWXl9fkZ2dza0mE5SV9OZfF4GCggJMTU0hNjY2aEHd3NwoxRdK/nURICWa7zQPUlNTP5CgKNBYXlxchNvtDjn/ugmQIrUZXS5o38fFxeH6+hrb29u4urri6CQkJDCBl5cX0HVMr2gOIr1A39X7JwhE9mkW8cdppJ/nfwBHqWHa7H+VpgAAAABJRU5ErkJggg==";
const manifest = "data:application/manifest+json;base64,eyJuYW1lIjoiIiwic2hvcnRfbmFtZSI6IiIsImljb25zIjpbeyJzcmMiOiIvYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmciLCJzaXplcyI6IjE5MngxOTIiLCJ0eXBlIjoiaW1hZ2UvcG5nIn0seyJzcmMiOiIvYW5kcm9pZC1jaHJvbWUtNTEyeDUxMi5wbmciLCJzaXplcyI6IjUxMng1MTIiLCJ0eXBlIjoiaW1hZ2UvcG5nIn1dLCJ0aGVtZV9jb2xvciI6IiNmZmZmZmYiLCJiYWNrZ3JvdW5kX2NvbG9yIjoiI2ZmZmZmZiIsImRpc3BsYXkiOiJzdGFuZGFsb25lIn0=";
function HeadDefault() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: "My Guardian Feed" }),
    /* @__PURE__ */ jsx("link", { rel: "apple-touch-icon", sizes: "180x180", href: appleTouchIcon }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32 }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16 }),
    /* @__PURE__ */ jsx("link", { rel: "manifest", href: manifest })
  ] });
}
const HOMEPAGE_ROUTE = "/";
const SEARCH_ROUTE = "/search";
const PAGE_ROUTE_PREFIX = "search?page=";
const SECTION_ROUTE_PREFIX = "search?section=";
const TEN_MINUTES = 6e5;
const ONE_HOUR = 36e5;
const FEED_KEY = "feedURL";
const TOAST_MESSAGES = {
  SAVE_FILTERS: "Your filters were correctly saved!"
};
const TOAST_TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error"
};
const IMAGE_PLACEHOLDER = "https://placehold.co/600x400";
const HARDCODED_SECTION_LIST = [
  "world",
  "sport",
  "culture",
  "books",
  "artanddesign",
  "environment",
  "technology"
];
const SITE_TITLE = "My Guardian Feed";
function useCustomFeed() {
  let [customFeed, setCustomFeed] = useState();
  useEffect(() => {
    const feed = localStorage.getItem(FEED_KEY);
    setCustomFeed(feed);
  }, []);
  return customFeed;
}
function Link({
  href,
  children
}) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return /* @__PURE__ */ jsx("a", { href, className: isActive ? "is-active" : void 0, children });
}
const links = [{ label: "Guardian Feed", href: HOMEPAGE_ROUTE }];
function Navigation() {
  const customFeed = useCustomFeed();
  return (
    /**
     * @todo This style is also used on Feed component. Make sure to make it a
     *   css variable if used across other components
     */
    /* @__PURE__ */ jsx("div", { className: "mx-auto mt-4 w-full p-4 xl:w-8/12", children: /* @__PURE__ */ jsxs("nav", { className: "mb-4 inline-flex flex-wrap gap-8", children: [
      links.map((link) => {
        const { label, href } = link;
        return /* @__PURE__ */ jsx(Link, { href, children: label }, label);
      }),
      customFeed && /* @__PURE__ */ jsx(Link, { href: customFeed, children: "Your Feed" })
    ] }) })
  );
}
function LayoutDefault({
  children
}) {
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    children
  ] });
}
export {
  FEED_KEY as F,
  HeadDefault as H,
  IMAGE_PLACEHOLDER as I,
  LayoutDefault as L,
  ONE_HOUR as O,
  PAGE_ROUTE_PREFIX as P,
  SITE_TITLE as S,
  TOAST_TYPES as T,
  SEARCH_ROUTE as a,
  Link as b,
  HOMEPAGE_ROUTE as c,
  HARDCODED_SECTION_LIST as d,
  SECTION_ROUTE_PREFIX as e,
  TOAST_MESSAGES as f,
  TEN_MINUTES as g,
  useCustomFeed as u
};
