DIRECTION = {
    UP: [0, -1],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP_RIGHT: [1, -1],
    UP_LEFT: [-1 -1],
    DOWN_RIGHT: [1, 1],
    DOWN_LEFT: [-1, 1]
}

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    move(direction) {
        this.x += direction[1]
        this.y += direction[0]
    }
    copy() {
        return new Point(this.x, this.y)
    }
}

class Othello {
    
    SIZE = 6;

    constructor() {
        this.board = []
        this.createBoard()
    }

    createBoard() {
        for (var x = 0; x < this.SIZE; ++x) {
            this.board[x] = new Array(this.SIZE)
            for (var y = 0; y < this.SIZE; ++y) {
                this.board[x][y] = 0
            }
        }
    }

    set(p, v) { this.board[p.x][p.y] = v }

    get(p) { return this.board[p.x][p.y] }
    
    isEmpty(p) { return this.get(p) === 0 }

    isOnBoard(p) {
        return p.x < this.SIZE && p.x >= 0 && p.y < this.SIZE && p.y >= 0
    }

    otherPlayer(v) { 
        if (v === 0 || v > 2) throw("Invalid player ID")
        return v === 1 ? 2 : 1 
    }
    
    place(p, v) {
        if (!this.isEmpty(p)) throw("Spot is already taken")
        if (!this.isOnBoard(p)) throw("Out of bounds!")
        this.set(p, v)
        this.doFlips(p, v)
    }

    doFlips(p, v) {
        for (const d in DIRECTION) {
            this.flipInDirection(p, DIRECTION[d], v)
        }
    }

    flipInDirection(p, d, v) {
        p.move(d)
        if (!this.isOnBoard(p) || this.isEmpty(p)) return false
        if (this.get(p) === this.otherPlayer(v)) {
            var doFlip = this.flipInDirection(p.copy(), d, v)
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

let game = new Othello()
game.place(new Point(1,1), 1)
game.place(new Point(2,1), 2)
game.place(new Point(3,1), 2)
game.printBoard()
game.place(new Point(4,1), 1)
game.printBoard()
game.place(new Point(4,2), 2)
game.place(new Point(4,3), 2)
game.printBoard()
game.place(new Point(4,4), 1)
game.printBoard()

module.exports.Othello = Othello
module.exports.Point = Point