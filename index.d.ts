declare global {
  namespace Vike {
    interface PageContext {
      // Type of pageContext.token
      token: {
        session: boolean
        user: string | null
      }
      userFeeds: {
        customFeedURL: string | null
      }
      urlClient: string
      // Refine type of pageContext.Page (it's `unknown` by default)
      Page: () => JSX.Element
    }
  }
}

// If you define Vike.PageContext in a .d.ts file then
// make sure there is at least one export/import statment.
// Tell TypeScript this file isn't an ambient module:
export { PageContext }
