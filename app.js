let board = document.querySelector('#board')

class Peice {
    constructor(name, color) {
        this.name = name
        this.color = color
    }

    move() {

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
    let backRank = ['Rook', 'Bishop', 'Knight', 'Queen', 'King', 'Knight', 'Bishop', 'Rook']

    for (let rank = 0; rank < grid.length; rank++) {
        for (let column = 0; column < grid[rank].length; column++) {
            if (rank >= 2 && rank <= 5) continue
            if (rank == 1 || rank == 6) {
                let card = new Peice('Pawn', 'BLACK')
                grid[rank][column] = card
                continue
            }
            let card = new Peice(backRank[column], 'BLACK')
            grid[rank][column] = card

        }
    }
}

let drawBoard = () => {

    for (let rank = 0; rank < grid.length; rank++) {
        for (let column = 0; column < grid[rank].length; column++) {
            let box = document.createElement('div')
            box.classList.add('box')
            box.style.backgroundColor = column % 2 == 0 ? 'tan' : 'brown'
            if (grid[rank][column] === '') {
                board.append(box)
                continue
            }
            let image = document.createElement('img')
            image.src = `./images/${grid[rank][column].name}.png`
            box.append(image)
            board.append(box)

        }
    }
}

setBoard()
drawBoard()