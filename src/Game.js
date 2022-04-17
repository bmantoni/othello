import Point from './Point'

const DIRECTION = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP_RIGHT: [1, -1],
    UP_LEFT: [-1, -1],
    DOWN_RIGHT: [1, 1],
    DOWN_LEFT: [-1, 1]
}

class OthelloGame {

    constructor(size, notifyWin) {
        this.SIZE = size
        this.notifyWin = notifyWin

        this.numPlaced = 0
        this.board = []
        this.createBoard()
    }

    createBoard() {
        //console.log(`Creating a board of size ${this.SIZE}`)
        for (var x = 0; x < this.SIZE; ++x) {
            this.board[x] = new Array(this.SIZE)
            for (var y = 0; y < this.SIZE; ++y) {
                this.board[x][y] = 0
            }
        }
    }

    set(p, v) { this.board[p.x][p.y] = v }

    getXY(x, y) { return this.get(new Point(x, y)) }
    get(p) { return this.board[p.x][p.y] }
    
    isEmpty(p) { return this.get(p) === 0 }

    isOnBoard(p) {
        return p.x < this.SIZE && p.x >= 0 && p.y < this.SIZE && p.y >= 0
    }

    otherPlayer(v) { 
        if (v === 0 || v > 2) throw("Invalid player ID")
        return v === 1 ? 2 : 1 
    }

    placeXY(x, y, player) {
        this.place(new Point(x, y), player)
    }
    
    place(p, v) {
        if (!this.isEmpty(p)) throw("Spot is already taken")
        if (!this.isOnBoard(p)) throw("Out of bounds!")
        
        this.set(p, v)
        this.doFlips(p, v)

        this.checkForWin()
    }

    checkForWin() {
        ++this.numPlaced
        const totalSpots = Math.pow(this.SIZE, 2)

        if (this.numPlaced >= totalSpots) {
            console.log("Somebody won!")
            const player1pieces = this.countPieces(1)
            if (player1pieces > (totalSpots - player1pieces)) {
                this.notifyWin(1)
            } else if (player1pieces === totalSpots - player1pieces) {
                this.notifyWin(0)
            } else {
                this.notifyWin(2)
            }
        }
    }

    countPieces(player) {
        return this.board.reduce((p, q) => p.concat(q)).filter(p => p == player).length
    }

    doFlips(p, v) {
        for (const d in DIRECTION) {
            this.flipInDirection(p, DIRECTION[d], v)
        }
    }

    flipInDirection(_p, d, v) {
        var p = _p.copy()
        p.move(d)
        if (!this.isOnBoard(p) || this.isEmpty(p)) return false
        if (this.get(p) === this.otherPlayer(v)) {
            var doFlip = this.flipInDirection(p, d, v)
            if (doFlip) {
                this.set(p, v)
            }
            return doFlip
        } else {
            return true
        }
    }

    printBoard() {
        console.log("----------")
        this.board.forEach(p => console.log(p.join('')) )
    }
}

export default OthelloGame