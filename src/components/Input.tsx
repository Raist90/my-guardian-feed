export { Input }

import { capitalize } from '@/helpers/capitalize'

/** @todo Add classname as optional param and then use clsx */
type InputProps = {
  id: string
  required?: boolean
}

function Input({ id, required }: InputProps) {
  return (
    <>
      <label className='text-sm font-bold' htmlFor={id}>
        {capitalize(id)}
      </label>

      <input
        required={required}
        className='py-2 pl-4 text-black'
        id={id}
        type={id}
        name={id}
      />
    </>
  )
}
