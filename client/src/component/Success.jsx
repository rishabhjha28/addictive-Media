import React from 'react'
import {Link} from 'react-router-dom'
export const Success = () => {
  return (
    <div>
      <p>
        Success
      </p>
      <p>
        <Link to={'/'}>Add More people</Link>
      </p>
      <p>
        <Link to={'/dashboard'}>See Dashboard</Link>
      </p>
    </div>
  )
}
