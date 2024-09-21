import React from 'react'

export default function Poll({title, time, option1, option2, option3}) {
  return (
    <div>
        <h2>POLL TIME</h2>
      <p>QUess : {title}</p>
    </div>
  )
}
