export { removeHTMLTags }

/**
 * Regular expression to identify HTML tags in the input string. Replacing the
 * identified HTML tag with a null string
 */
function removeHTMLTags(str: string | null): string | false {
  if (str === null || str === '') return false
  else str = str.toString()

  return str.replace(/(<([^>]+)>)/gi, '')
}
