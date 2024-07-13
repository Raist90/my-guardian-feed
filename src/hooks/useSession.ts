export { useSession }

import { useEffect, useState } from 'react'
import z from 'zod'

const tokenSchema = z.object({
  user: z.string().email(),
  role: z.string(),
  exp: z.number(),
})

type SessionType = {
  session: boolean
  user: string | null
  loading: boolean
}

function useSession(): SessionType {
  let [token, setToken] = useState<SessionType>({
    session: false,
    user: null,
    loading: true,
  })

  const getToken = async (): Promise<void> => {
    const res = await fetch('/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const parsedRes = await res.json()

    const { data, success } = tokenSchema.safeParse(parsedRes)

    if (!success) {
      setToken({ session: false, user: null, loading: false })
    } else {
      setToken({
        session: true,
        user: data.user,
        loading: false,
      })
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return { session: token.session, user: token.user, loading: token.loading }
}
