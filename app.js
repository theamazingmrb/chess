let board = document.querySelector('#board')

let moveKey = {
    pawn: {
        moves: {
            1: {
                x: 1,
                y: 0
            },
            2: {
                x: 2,
                y: 0
            }
        },
        attacks: {
            1: {
                x: 1,
                y: -1
            },
            2: {
                x: 1,
                y: 1
            }
        }
    },
    knight: {
        moves: {
            1: {
                x: 2,
                y: 1
            },
            2: {
                x: 2,
                y: -1
            },
            3: {
                x: 1,
                y: -2
            },
            4: {
                x: 1,
                y: 2
            },

            5: {
                x: -1,
                y: -2
            },


            6: {
                x: -1,
                y: 2
            },

            7: {
                x: -2,
                y: -1
            },
            9: {
                x: -2,
                y: 1
            }
        },
        attacks: {
            1: {
                x: 2,
                y: 1
            },
            2: {
                x: 2,
                y: -1
            },
            3: {
                x: 1,
                y: -2
            },
            4: {
                x: 1,
                y: 2
            },

            5: {
                x: -1,
                y: -2
            },


            6: {
                x: -1,
                y: 2
            },

            7: {
                x: -2,
                y: -1
            },
            9: {
                x: -2,
                y: 1
            }
        }
    }
}

class GameBoard {
    constructor() {
        this.turn = 'WHITE'
        this.grid = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']

        ]
    }

    setBoard() {
        let backRank = ['rook', 'knight', 'bishop', 'queen', 'King', 'Bishop', 'knight', 'Rook']

        for (let rank = 0; rank < this.grid.length; rank++) {
            for (let column = 0; column < this.grid[rank].length; column++) {
                if (rank >= 2 && rank <= 5) continue
                if (rank == 1 || rank == 6) {
                    let card = new Peice('pawn', rank == 1 ? 'BLACK' : 'WHITE', rank, column)
                    this.grid[rank][column] = card
                    continue
                }
                let card = new Peice(backRank[column], rank >= 6 ? 'WHITE' : 'BLACK', rank, column)
                this.grid[rank][column] = card

            }
        }
    }

    drawBoard() {
        console.log('drawing board')
        board.innerHTML = ''
        for (let rank = 0; rank < this.grid.length; rank++) {
            for (let column = 0; column < this.grid[rank].length; column++) {
                let box = document.createElement('div')
                box.classList.add('box')
                box.id = `A${rank}-${column}`
                box.style.backgroundColor = rank % 2 == 0 ? column % 2 == 0 ? 'tan' : 'brown' : column % 2 == 0 ? 'brown' : 'tan'
                if (this.grid[rank][column] === '') {
                    board.append(box)
                    continue
                }

                box.addEventListener('click', this.grid[rank][column].posibleMoves.bind(this.grid[rank][column]))
                let image = document.createElement('img')
                let card = this.grid[rank][column]
                image.src = `./images/${card.name}.png`
                if (card.color === 'WHITE') image.style.filter = 'brightness(0) invert(1)'

                box.append(image)
                board.append(box)

            }
        }
    }

    switchTurn() {
        console.log('switching turns')
        this.turn = this.turn == "WHITE" ? "BLACK" : "WHITE"
    }
}

class Peice {
    constructor(name, color, x, y) {
        this.name = name
        this.color = color
        this.location = [x, y]
        this.moves = 0
    }

    posibleMoves() {
        if (game.turn !== this.color) return
        let moves = []
        let attacks = []
        let [x, y] = this.location
        console.log(this)
        for (let key in moveKey[this.name]['moves']) {
            if (this.name == 'pawn' && this.moves >= 1 && key == 2) continue
            let newX, newY
            console.log(moves)
            if (this.color == 'BLACK') {
                newX = parseInt(x) + moveKey[this.name]['moves'][key].x
                newY = parseInt(y) + moveKey[this.name]['moves'][key].y
            } else {
                newX = parseInt(x) - moveKey[this.name]['moves'][key].x
                newY = parseInt(y) - moveKey[this.name]['moves'][key].y
            }
            console.log(newX, newY)
            if (newX >= 8 || newY >= 8 || newX < 0 || newY < 0 || game.grid[newX][newY] !== '') continue
            moves.push([newX, newY])
        }

        for (let key in moveKey[this.name]['attacks']) {
            let newX, newY
            console.log(moveKey[this.name]['moves'])
            if (this.color == 'BLACK') {
                newX = parseInt(x) + moveKey[this.name]['attacks'][key].x
                newY = parseInt(y) + moveKey[this.name]['attacks'][key].y
            } else {
                newX = parseInt(x) - moveKey[this.name]['attacks'][key].x
                newY = parseInt(y) - moveKey[this.name]['attacks'][key].y
            }
            if (newX >= 8 || newY >= 8 || newX < 0 || newY < 0) continue

            let squareToAttack = game.grid[newX][newY]
            console.log('squareToAttack', squareToAttack)
            if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                moves.push([newX, newY])
                attacks.push(`${newX}-${newY}`)
            }

        }
        game.drawBoard()
        console.log(moves)
        for (let cordinates of moves) {
            let [x, y] = cordinates
            let [currX, currY] = this.location
            let attackKey = `${x}-${y}`
                // console.log(cordinates, x, y)
            let box = document.querySelector(`#A${x}-${y}`)
            box.style.backgroundColor = attacks.includes(attackKey) ? 'blue' : 'yellow'
            box.addEventListener('click', (e) => {
                this.move(`${x}-${y}`, `${currX}-${currY}`)
            })
        }
    }

    move(newCoordinates, oldCoordinates) {
        let [newX, newY] = newCoordinates.split('-')
        let [oldX, oldY] = oldCoordinates.split('-')
        this.moves += 1
        this.location = [newX, newY]
        game.grid[newX][newY] = this
        game.grid[oldX][oldY] = ''
        game.switchTurn()
        game.drawBoard()
    }
}

const game = new GameBoard()


game.setBoard()
game.drawBoard()