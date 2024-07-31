export { capitalize }

function capitalize(str: string): string {
  if (!str.length) return ''
  return str[0].toUpperCase().concat(str.slice(1))
}
