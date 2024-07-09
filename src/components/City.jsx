import React from 'react'

export default function City({city, removeCity}) {
  return (
    <div>
        {city.name}
        <button onClick={() => {removeCity(city)}}>Delete</button>
    </div>
  )
}
