import { AlertTriangle } from 'lucide-react'
import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <AlertTriangle className='w-24 h-24 text-red-600 mb-5' />
      <h2 className='text-4xl font-bold text-red-600'>404 - Not Found</h2>
      <p className='text-lg mt-2 text-red-300'>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound
