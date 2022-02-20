import React from "react"
import Die from "./Components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import './App.css';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  function allNewDice() {
      const newDice = []
      for(let i = 0; i < 10; i++) {
        newDice.push({
          "value": Math.ceil(Math.random() * 6),
          "id": nanoid(),
          "isHold": false
        })
      }
    return newDice
  }
  React.useEffect(() => {
    if(dice.every(die => die.isHold === true)) {
      const firstValue = dice[0].value
      if(dice.every(die => die.value === firstValue)) {
        setTenzies(true)
      }
    }
  }, [dice])
  console.log(tenzies)
  function generateDice() {
    return ({
      "value": Math.ceil(Math.random() * 6),
      "id": nanoid(),
      "isHold": false
    })
  }
  function handleIsHold(id) {
    setDice(dice.map(die => die.id === id ? {...die, "isHold": !die.isHold} : die))
  }
  function updateDice() {
    if(tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } else {
      setDice(dice.map(die => {
        return die.isHold ? die : generateDice()
      }))
    }
  }
  return (
    <main className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <div className="tenzies-des">
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="App-dices">
        {dice.map(die => <Die value={die.value} key={die.id} handleIsHold={() => handleIsHold(die.id)} isHold={die.isHold}/>)}
      </div>
      <button className="roll-btn" onClick={() => updateDice()}>{!tenzies ? "Roll" : "New Game"}</button>
    </main>
  );
}

export default App;
