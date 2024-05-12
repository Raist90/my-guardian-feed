export { capitalize }

function capitalize(str: string): string {
  return str[0].toUpperCase().concat(str.slice(1))
}
