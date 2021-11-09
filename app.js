let board = document.querySelector('#board')

let moveKey = {
    'pawn': { 
        1: {
            x: 0,
            y: 1
        }
    }
}

class Peice {
    constructor(name, color, x, y) {
        this.name = name
        this.color = color
        this.location = [x,y]
    }

    posibleMoves(){
        let moves = []
        let [x,y] = this.location
        console.log(this)
        for( let key in moveKey[this.name]){
            moves.push([x + moveKey[this.name][key].x, y + moveKey[this.name][key].y])
        }
        console.log(moves)
        return moves
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
                let card = new Peice('pawn', 'BLACK', rank, column)
                grid[rank][column] = card
                continue
            }
            let card = new Peice(backRank[column], 'BLACK', rank, column)
            
            grid[rank][column] = card

        }
    }
}

let drawBoard = () => {

    for (let rank = 0; rank < grid.length; rank++) {
        for (let column = 0; column < grid[rank].length; column++) {
            let box = document.createElement('div')
            box.classList.add('box')
            box.style.backgroundColor = rank % 2 == 0 ? column % 2 == 0  ? 'tan' : 'brown' : column % 2 == 0  ? 'brown' : 'tan' 
            if (grid[rank][column] === '') {
                board.append(box)
                continue
            }

            box.addEventListener('click', grid[rank][column].posibleMoves.bind(grid[rank][column]) )
            let image = document.createElement('img')
            image.src = `./images/${grid[rank][column].name}.png`
            box.append(image)
            board.append(box)

        }
    }
}

setBoard()
drawBoard()