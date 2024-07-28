export { Dashboard }

type DashboardProps = {
  user: string | null
}

function Dashboard({ user }: DashboardProps) {
  return (
    <section className='p-4'>
      <div>
        <h2 className='text-xl'>Dashboard</h2>
        <p>Welcome back, {user}</p>
      </div>
    </section>
  )
}
