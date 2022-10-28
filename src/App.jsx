import React from 'react'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    let condition = dice.every(
      (die) => die.isHeld && die.value === dice[0].value
    )
    if (condition) {
      setTenzies(true)
      console.log('WIN')
    }
  }, [dice])

  function allNewDice() {
    const dicesArr = [...Array(10)].map((e, i) => generateNewDie())
    return dicesArr
  }

  function generateNewDie() {
    const randNum = Math.ceil(Math.random() * 6)
    const obj = { value: randNum, isHeld: false, key: nanoid() }
    return obj
  }

  function rollDice() {
    setDice((prevDices) =>
      prevDices.map((dice, i) => (dice.isHeld ? dice : generateNewDie()))
    )
  }

  function holdDice(id) {
    setDice((prevDices) =>
      prevDices.map((dice) =>
        dice.key === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    )
  }

  function startNewGame() {
    setDice(allNewDice())
    setTenzies(false)
  }

  const newDiceElements = dice.map((die) => (
    <Dice
      value={die.value}
      key={die.key}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.key)}
    />
  ))

  return (
    <>
      {tenzies && <Confetti />}
      <main className="main">
        <div className="inner">
          <div className="text">
            <h1 className="heading">Tenzies</h1>
            <h3 className="sub-heading">
              Roll until all dice are the same. Click each die to freeze it at
              its current value between rolls.
            </h3>
          </div>
          <div className="numbers">{newDiceElements}</div>
          <button
            className="roll-btn"
            onClick={tenzies ? startNewGame : rollDice}
          >
            {tenzies ? 'New Game' : 'Roll'}
          </button>
        </div>
      </main>
    </>
  )
}

export default App
