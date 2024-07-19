import React from 'react'

const Button = (props) => {
  return (
    <div>
        <a href={props.href} className={props.className} id={props.id} >{props.text}</a>
    </div>
  )
}

export default Button