import React from 'react'
import {Link} from 'react-router-dom'

export const Failure = () => {
  return (
    <div>
      <p>
        Failed
      </p>
      <p>
        <Link to={'/'}>Try Again???</Link>
      </p>
      <p>
        <Link to={'/dashboard'}>See Dashboard</Link>
      </p>
    </div>
  )
}
