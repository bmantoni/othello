import React, { useState, useEffect } from "react";

function Square(props) {

    function getBgClass() {
        if (props.ownedBy === 0) return "dotEmpty";
        return props.ownedBy === 1 ? "dotPlayer1" : "dotPlayer2";
    }

    function tryPlacePiece(ownedBy, currentPlayer, piecePlaced, checkIfValidMove, x, y) {
        if (ownedBy === 0 && checkIfValidMove(x, y, currentPlayer)) {
            piecePlaced(x, y, currentPlayer);
        }
    }

    return (
        <span className={`dot ${getBgClass()}`} onClick={(e) => 
            tryPlacePiece(props.ownedBy, props.currentPlayer, props.piecePlaced, props.checkIfValidMove, props.x, props.y)}></span>
    );
}

export default Square;