export { LoginForm }

import { DASHBOARD_ROUTE, TOAST_TYPES } from '@/constants'
import { UserSchema } from '@/handlers/schemas'
import { useToast } from '@/hooks/useToast'
import type { AppType } from '@/index'
import { hc } from 'hono/client'
import React, { useState } from 'react'
import { navigate } from 'vike/client/router'
import { Button } from './Button'
import { Input } from './Input'
import { Toast } from './Toast'

const client = hc<AppType>(import.meta.env.BASE_URL)

function LoginForm() {
  const { isOpen, toggleToast } = useToast()
  const [toastProps, setToastProps] = useState<{
    msg: string
    type: Lowercase<keyof typeof TOAST_TYPES>
  }>({ msg: '', type: TOAST_TYPES['ERROR'] })

  /** @todo Move this elsewhere */
  const toastTypeErr = TOAST_TYPES['ERROR']
  const toastErrs = {
    emptyData: {
      msg: 'Email and password are required.',
      type: toastTypeErr,
    },
    invalidData: {
      msg: 'Invalid form data.',
      type: toastTypeErr,
    },
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email.length || !password.length) {
      setToastProps(toastErrs.emptyData)
      toggleToast()
      return
    }

    const { data: validFormData, success } = UserSchema.safeParse({
      email,
      password,
    })

    if (!success) {
      setToastProps(toastErrs.invalidData)
      toggleToast()
      return
    }

    const validEmail = validFormData.email
    const validPassword = validFormData.password

    const body = { email: validEmail, password: validPassword }
    const res = await client['auth'].$post({ json: body })

    const msg = (await res.json()) as { error: string } | { success: string }

    if ('error' in msg) {
      setToastProps({
        msg: msg.error,
        type: TOAST_TYPES['ERROR'],
      })
      toggleToast()

      return
    }

    navigate(DASHBOARD_ROUTE)
  }

  return (
    <section className='px-4 py-[200px]'>
      <form
        onSubmit={handleSubmit}
        className='mx-auto max-w-md rounded-md bg-black/30 p-6 shadow-xl shadow-white/10'
        noValidate
      >
        <h2 className='mb-4 text-xl'>Log in</h2>

        <div className='space-y-6'>
          <div className='flex flex-col justify-center gap-2'>
            <Input id='email' />
          </div>

          <div className='flex flex-col justify-center gap-2'>
            <Input id='password' />
          </div>

          <Button className='w-full font-bold' type='submit'>
            Log in
          </Button>
        </div>
      </form>

      <Toast
        isOpen={isOpen}
        closeDialog={toggleToast}
        message={toastProps.msg}
        type={toastProps.type}
      />
    </section>
  )
}
