import { g as TEN_MINUTES, O as ONE_HOUR } from "./chunk-B4xYuF9Z.js";
import z from "zod";
import { render } from "vike/abort";
const isString = (value) => typeof value === "string";
const isArray = (value) => Array.isArray(value);
function isBrowser() {
  return typeof window !== "undefined";
}
function assert(condition, msg) {
  if (condition)
    return;
  throw render(500);
}
const TagSchema = z.object({
  apiUrl: z.string(),
  id: z.string(),
  sectionId: z.string().optional(),
  sectionName: z.string().optional(),
  type: z.string(),
  webTitle: z.string(),
  webUrl: z.string()
});
const NewsCardSchema = z.object({
  id: z.string(),
  type: z.string(),
  sectionId: z.string(),
  sectionName: z.string(),
  webPublicationDate: z.string(),
  webTitle: z.string(),
  webUrl: z.string(),
  apiUrl: z.string(),
  isHosted: z.boolean(),
  pillarId: z.string(),
  pillarName: z.string(),
  fields: z.object({
    thumbnail: z.string().optional(),
    trailText: z.string()
  }),
  tags: z.array(TagSchema)
});
const GuardianAPIDataSchema = z.object({
  response: z.object({
    status: z.string(),
    userTier: z.string(),
    total: z.number(),
    startIndex: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    pages: z.number(),
    orderBy: z.string(),
    results: z.array(NewsCardSchema)
  })
});
const NewsSchema = NewsCardSchema.omit({ fields: true }).extend({
  fields: z.object({
    body: z.string(),
    main: z.string(),
    trailText: z.string()
  })
});
const GuardianAPIDataByIDSchema = z.object({
  response: z.object({
    content: NewsSchema.extend({
      elements: z.array(
        z.object({
          relation: z.union([
            z.literal("body"),
            z.literal("main"),
            z.literal("thumbnail")
          ]),
          assets: z.array(
            z.object({
              file: z.string(),
              typeData: z.object({
                altText: z.string().optional(),
                caption: z.string().optional(),
                credit: z.string().optional(),
                iframeUrl: z.string().optional(),
                width: z.union([
                  z.literal("1000"),
                  z.literal("500"),
                  z.literal("100"),
                  z.string()
                ]).optional()
              })
            })
          )
        })
      )
    }),
    status: z.string(),
    total: z.number(),
    userTier: z.string()
  })
});
const cache = /* @__PURE__ */ new Map();
async function fetchWithCache(url, ttl) {
  var _a;
  const currentTime = Date.now();
  if (cache.has(url)) {
    const timer = (_a = cache.get(url)) == null ? void 0 : _a.timer;
    assert(timer);
    if (timer > currentTime) {
      return cache.get(url);
    } else {
      cache.delete(url);
    }
  }
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, { ...data, timer: currentTime + ttl });
  return data;
}
async function getGuardianData(options) {
  assert(!isBrowser());
  const { page, query, section } = options;
  const sectionQuery = section ? `section=${section}&` : ``;
  const guardianData = await fetchWithCache(
    `${"https://content.guardianapis.com"}/search?q=${query}&show-fields=trailText,thumbnail&show-tags=all&${sectionQuery}order-by=newest&page=${page}&api-key=${"fb5f4d2d-571f-4423-96d1-d6096afde3ff"}`,
    TEN_MINUTES
  );
  const { data, success, error } = GuardianAPIDataSchema.safeParse(guardianData);
  assert(success);
  return data;
}
async function getGuardianDataById(id) {
  assert(!isBrowser());
  const guardianDataById = await fetchWithCache(
    `${"https://content.guardianapis.com"}/${id}?api-key=${"fb5f4d2d-571f-4423-96d1-d6096afde3ff"}&show-fields=all&show-elements=all&show-tags=all`,
    ONE_HOUR
  );
  const { data, success, error } = GuardianAPIDataByIDSchema.safeParse(guardianDataById);
  assert(success);
  return data;
}
export {
  assert as a,
  getGuardianDataById as b,
  isString as c,
  isBrowser as d,
  getGuardianData as g,
  isArray as i
};
