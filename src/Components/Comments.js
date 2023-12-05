import React from 'react'
import CommentsItem from './CommentsItem'

const initialContainerBackgroundClassNames = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
  ]

const Comments = () => {
  return (
    <div><CommentsItem commentsColor={initialContainerBackgroundClassNames}/></div>
  )
}

export default Comments