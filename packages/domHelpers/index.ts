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

function findIndexByArrayField<A extends Record<string, unknown>>(
  el: string,
  arr: A[],
  field: keyof A,
): number {
  return arr.findIndex((i) => i[field] === el)
}

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

    default: {
      e.preventDefault()
      break
    }
  }
}

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

function getCurrentKeyTargetAsString(e: React.KeyboardEvent): string {
  const el = e.currentTarget.textContent
  const errMsg = 'Element not found'
  assert(el, errMsg)

  return el
}

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
