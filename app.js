let board = document.querySelector('#board')

let moveKey = {
    'pawn': {
        1: {
            x: 1,
            y: 0
        },
        2: {
            x: 2,
            y: 0
        }
    }
}

let drawBoard = () => {
    console.log('drawing board')
    board.innerHTML = ''
    for (let rank = 0; rank < grid.length; rank++) {
        for (let column = 0; column < grid[rank].length; column++) {
            let box = document.createElement('div')
            box.classList.add('box')
            box.id = `A${rank}-${column}`
            box.style.backgroundColor = rank % 2 == 0 ? column % 2 == 0 ? 'tan' : 'brown' : column % 2 == 0 ? 'brown' : 'tan'
            if (grid[rank][column] === '') {
                board.append(box)
                continue
            }

            box.addEventListener('click', grid[rank][column].posibleMoves.bind(grid[rank][column]))
            let image = document.createElement('img')
            image.src = `./images/${grid[rank][column].name}.png`
            box.append(image)
            board.append(box)

        }
    }
}

class Peice {
    constructor(name, color, x, y) {
        this.name = name
        this.color = color
        this.location = [x, y]
    }

    posibleMoves() {
        let moves = []
        let [x, y] = this.location
        console.log(this)
        for (let key in moveKey[this.name]) {

            moves.push([parseInt(x) + moveKey[this.name][key].x, parseInt(y) + moveKey[this.name][key].y])
        }
        drawBoard()
        console.log(moves)
        for (let cordinates of moves) {
            let [x, y] = cordinates
            let [currX, currY] = this.location
            console.log(cordinates, x, y)
            let box = document.querySelector(`#A${x}-${y}`)
            box.style.backgroundColor = 'yellow'
            box.addEventListener('click', (e) => {
                this.move(`${x}-${y}`, `${currX}-${currY}`)
            })
        }
        return moves
    }

    move(newCoordinates, oldCoordinates) {
        let newLocation = document.querySelector(`A${newCoordinates}`)
        let oldLocation = document.querySelector(`A${oldCoordinates}`)
        let [newX, newY] = newCoordinates.split('-')
        let [oldX, oldY] = oldCoordinates.split('-')

        this.location = newCoordinates.split('-')
        grid[this.location[0]][this.location[1]] = this
        grid[oldX][oldY] = ''
            // console.log(grid);
        drawBoard()
    }
}

let grid = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '']

]

let setBoard = () => {
    let backRank = ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook']

    for (let rank = 0; rank < grid.length; rank++) {
        for (let column = 0; column < grid[rank].length; column++) {
            if (rank >= 2 && rank <= 5) continue
            if (rank == 1 || rank == 6) {
                let card = new Peice('pawn', 'BLACK', rank, column)
                grid[rank][column] = card
                continue
            }
            let card = new Peice(backRank[column], 'BLACK', rank, column)

            grid[rank][column] = card

        }
    }
}



setBoard()
drawBoard()