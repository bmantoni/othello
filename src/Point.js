class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    move(direction) {
        this.x += direction[0]
        this.y += direction[1]
    }
    copy() {
        return new Point(this.x, this.y)
    }
}

export default Point;