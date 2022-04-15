//import React, { useState, useEffect } from "react";
import { useState } from 'react';
import OthelloGame from './Game';
import Square from './Square';

function Board(props) {

  const SIZE = 5;

  const [ currentPlayer, setCurrentPlayer ] = useState(1);
  const [ game, setGame] = useState(new OthelloGame(SIZE));
  //const game = new OthelloGame(SIZE);

  function togglePlayer() {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  }

  function piecePlaced(x, y, player) {
    game.placeXY(x, y, player);
    togglePlayer();
  }

  return (
    <table>
      <tbody>
      {[...Array(SIZE)].map((o1, y) =>
        <tr key={`${y}`}>
          {[...Array(SIZE)].map((o2, x) =>
            <td key={`${x}${y}`}><Square 
              x={x} y={y} 
              ownedBy={game.getXY(x, y)}
              currentPlayer={currentPlayer} 
              piecePlaced={piecePlaced} /></td>
          )}
        </tr>
      )}
      </tbody>
    </table>
  );
}

export default Board;