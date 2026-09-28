import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/log";
import { renderToPipeableStream } from "react-dom/server";
import { WINNING_COMBINATIONS } from "../winning-combinations";


function deriveActivePlayer(gameTurns){
 let currntPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currntPlayer = 'O';
    }
  return currntPlayer
}
const initalGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
];

function App() {
const [gameTurns , setgameTurns] = useState([]);     
// const [ActivePlayer, setActivePlayer] = useState('X');
 const ActivePlayer = deriveActivePlayer(gameTurns);
let GameBoard = initalGameBoard.map(row => [...row]);

  for (const turn of gameTurns){
    const { squry, player } = turn;
    const { row, cal } = squry;
    GameBoard[row][cal] = player;
    }
    let winner;
 for (const combination of WINNING_COMBINATIONS){
  const firstSquareSymbol = [combination[0].row] [combination[0].col];
  const secondSquareSymbol = [combination[1].row] [combination[1].col];
  const thirdSquareSymbol = [combination[2].row] [combination[2].col];
  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
    winner = firstSquareSymbol
  }
 }
function handelselectsquiry (rowIndex , calIndex){
  // setActivePlayer((curActivePlayer)=> curActivePlayer === 'X' ? 'O' : 'X')
  setgameTurns(prevTurns => {
    const currntPlayer = deriveActivePlayer(prevTurns);
    const updatturns = [
      {squry : { row : rowIndex , cal : calIndex} , player : currntPlayer} , ...prevTurns
    ];
    return updatturns;
  })
}
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initiaName="Player 1" symbol="X" isActive={ActivePlayer === 'X'} />
          <Player initiaName="Player 2" symbol="O" isActive={ActivePlayer === 'O'}/>
        </ol>
        {winner && <p>You won , {winner}!</p>}
        <GameBoard 
        onSelectSquare ={handelselectsquiry} 
        board = {GameBoard}
        />
      </div>
      <Log  truns = {gameTurns}/>
    </main>
  )
}

export default App
