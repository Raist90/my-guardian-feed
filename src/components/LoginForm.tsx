export { LoginForm }

import { TOAST_TYPES } from '@/constants'
import React, { useState } from 'react'
import { Button } from './Button'
import { Toast } from './Toast'

function LoginForm() {
  let [isOpen, setIsOpen] = useState<boolean>(false)
  let [toastProps, setToastProps] = useState<{
    msg: string
    type: Lowercase<keyof typeof TOAST_TYPES>
  }>({ msg: '', type: TOAST_TYPES['ERROR'] })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpen(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const body = JSON.stringify({ email, password })

    const res = await fetch('/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    const msg = await res.json()

    if ('error' in msg) {
      setToastProps({
        msg: msg.error,
        type: TOAST_TYPES['ERROR'],
      })
      setIsOpen(true)
    }
  }

  const closeDialog = () => setIsOpen(false)

  return (
    <section className='px-4 py-[200px]'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto max-w-md rounded-md bg-black/30 p-6 shadow-xl shadow-white/10'
      >
        <h2 className='mb-4 text-xl'>Log in</h2>

        <div className='space-y-6'>
          <div className='flex flex-col justify-center gap-2'>
            <label className='text-sm font-bold' htmlFor='email'>
              Email
            </label>
            <input
              required
              className='py-2 pl-4 text-black'
              id='email'
              type='email'
              name='email'
            />
          </div>

          <div className='flex flex-col justify-center gap-2'>
            <label className='text-sm font-bold' htmlFor='password'>
              Password
            </label>
            <input
              required
              className='py-2 pl-4 text-black'
              id='password'
              type='password'
              name='password'
            />
          </div>

          <Button className='w-full font-bold' type='submit'>
            Submit
          </Button>
        </div>
      </form>

      <Toast
        isOpen={isOpen}
        closeDialog={closeDialog}
        message={toastProps?.msg || ''}
        type={toastProps?.type || 'error'}
      />
    </section>
  )
}
