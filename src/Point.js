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

export default Point;