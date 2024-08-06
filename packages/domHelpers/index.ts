export {
  findIndexByArrayField,
  generateKeyMovements,
  getArrowFocusableElemsByActiveElemId,
  getCurrentKeyTargetAsString,
  getNodeListFromReactRef,
  isFirstFocusable,
  isLastFocusable,
}

import { assert } from '@/helpers/assert'

/**
 * Find the index of an element in an array of objects by a specific field
 *
 * @example
 *   const idx = findIndexByArrayField('foo', [{ foo: 'foo' }], 'foo')
 *
 * @param el - The element to find
 * @param arr - The array of objects to search
 * @param field - The field to match
 */
function findIndexByArrayField<A extends Record<string, unknown>>(
  el: string,
  arr: A[],
  field: keyof A,
): number {
  return arr.findIndex((i) => i[field] === el)
}

/**
 * Activate navigation with arrow keys inside `dropdowns` and `dialogs`
 *
 * @example
 *   generateKeyMovements(e, {
 *     arr,
 *     currentActiveElemIdx,
 *     dialogButton,
 *     handler,
 *     nodeList,
 *   })
 *
 * @param e - The React.KeyboardEvent event
 * @param arr - The Array of objects to match with `nodeList`
 * @param currentActiveElemIdx - Index of the current focused element
 * @param dialogButton - The button which controls the dialog rendering and
 *   which take focus when `Escape` key gets pressed
 * @param handler - The handler which toggles the dialog appearence
 * @param nodeList - Node list of focusable elements
 */
function generateKeyMovements<
  A extends Record<string, unknown>,
  E extends HTMLElement,
>(
  e: React.KeyboardEvent,
  {
    arr,
    currentActiveElemIdx,
    dialogButton,
    handler,
    nodeList,
  }: {
    arr: A[]
    currentActiveElemIdx: number
    dialogButton: HTMLButtonElement
    handler: () => void
    nodeList: NodeListOf<E>
  },
): void {
  const { firstElem, lastElem, nextElem, prevElem } =
    getArrowFocusableElemsByActiveElemId(nodeList, currentActiveElemIdx)

  const isFirst = isFirstFocusable(currentActiveElemIdx)
  const isLast = isLastFocusable(currentActiveElemIdx, arr)

  switch (e.key) {
    case 'ArrowDown': {
      e.preventDefault()

      if (isLast) {
        firstElem.focus()
      } else {
        nextElem.focus()
      }

      break
    }

    case 'ArrowUp': {
      e.preventDefault()

      if (isFirst) {
        lastElem.focus()
      } else {
        prevElem.focus()
      }

      break
    }

    case 'Tab': {
      e.preventDefault()

      handler()

      break
    }

    case 'Escape': {
      e.preventDefault()

      handler()
      dialogButton.focus()

      break
    }

    // prevent space key to handle scroll
    case ' ': {
      e.preventDefault()

      break
    }

    default: {
      break
    }
  }
}

/**
 * Get the focusable elements by the active element id.
 *
 * @example
 *   const elems = getArrowFocusableElemsByActiveElemId(nodeList)
 *
 * @param node - The node list of focusable elements
 * @param activeElem - The index of the active element
 */
function getArrowFocusableElemsByActiveElemId<E extends HTMLElement>(
  node: NodeListOf<E>,
  activeElem?: number,
): Record<keyof typeof elems, E> {
  if (!activeElem) activeElem = 0

  const firstElem = node[0]
  const lastElem = node[node.length - 1]
  const nextElem = node[activeElem + 1]
  const prevElem = node[activeElem - 1]

  const elems = { firstElem, lastElem, nextElem, prevElem }
  return elems
}

/**
 * Get the current keyboard event target as a string
 *
 * @example
 *   const key = getCurrentKeyTargetAsString(e)
 */
function getCurrentKeyTargetAsString(e: React.KeyboardEvent): string {
  const el = e.currentTarget.textContent
  const errMsg = 'Element not found'
  assert(el, errMsg)

  return el
}

/**
 * Generates a node list from a React ref
 *
 * @example
 *   const nodeList = getNodeListFromReactRef(ref, 'button')
 *
 * @param el - The React ref object
 * @param selector - The selector to match
 */
function getNodeListFromReactRef<
  E extends HTMLElement,
  S extends keyof HTMLElementTagNameMap,
>(el: React.RefObject<E>, selector: S): NodeListOf<HTMLElementTagNameMap[S]> {
  const htmlEl = el.current
  const errMsg = 'Element not found'
  assert(htmlEl, errMsg)

  return htmlEl.querySelectorAll(selector)
}

function isFirstFocusable(idx: number): boolean {
  return idx === 0
}

function isLastFocusable(idx: number, arr: Record<string, unknown>[]): boolean {
  return idx === arr.length - 1
}
