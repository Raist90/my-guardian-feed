import { Search } from 'lucide-react'

export { Searchbar }

function Searchbar() {
  const handleSubmit = () => { }
  return (
    <div className='w-full max-w-md'>
      <form className='shadow-xl shadow-white/15' onSubmit={handleSubmit}>
        <div className='flex items-center justify-between bg-white text-sm text-black'>
          <input
            className='w-full bg-transparent p-2 pl-3 leading-none'
            id='searchbar'
            placeholder='Search anything...'
          />

          <button className='px-2' type='submit'>
            <Search aria-hidden size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
