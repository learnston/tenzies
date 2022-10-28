import React from 'react'
import Example from './Example'

function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59e391' : '#fff',
  }

  return (
    <div className="number" style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  )
}

export default Dice
