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
    },
    bishop: {
        moves: {
            1: {
                x: 1,
                y: -1
            },
        },
        attacks: {
            1: {
                x: 1,
                y: -1
            }
        }
    },
    rook: {
        moves: {
            1: {
                x: 1,
                y: -1
            },
        },
        attacks: {
            1: {
                x: 1,
                y: -1
            }
        }
    },
    queen: {
        moves: {
            1: {
                x: 1,
                y: -1
            },
        },
        attacks: {
            1: {
                x: 1,
                y: -1
            }
        }
    },
    king: {
        moves: {
            1: {
                x: 1,
                y: 0
            },
            2: {
                x: -1,
                y: 0
            },
            3: {
                x: 0,
                y: 1
            },
            4: {
                x: 0,
                y: -1
            },
            5: {
                x: 1,
                y: -1
            },
            6: {
                x: 1,
                y: 1
            },
            7: {
                x: -1,
                y: 1
            },
            8: {
                x: -1,
                y: -1
            },

        },
        attacks: {
            1: {
                x: 1,
                y: 0
            },
            2: {
                x: -1,
                y: 0
            },
            3: {
                x: 0,
                y: 1
            },
            4: {
                x: 0,
                y: -1
            },
            5: {
                x: 1,
                y: -1
            },
            6: {
                x: 1,
                y: 1
            },
            7: {
                x: -1,
                y: 1
            },
            8: {
                x: -1,
                y: -1
            },
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

        this.check = {
            WHITE: false,
            BLACK: false
        }
    }

    setBoard() {
        let backRank = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']

        for (let rank = 0; rank < this.grid.length; rank++) {
            for (let column = 0; column < this.grid[rank].length; column++) {
                if (rank >= 2 && rank <= 5) continue
                if (rank == 1 || rank == 6) {
                    this.grid[rank][column] = new Peice('pawn', rank == 1 ? 'BLACK' : 'WHITE', rank, column)
                    continue
                }
                this.grid[rank][column] = new Peice(backRank[column], rank >= 6 ? 'WHITE' : 'BLACK', rank, column)

            }
        }
    }

    drawBoard() {
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
        this.turn = this.turn == "WHITE" ? "BLACK" : "WHITE"
    }

    findPath(king, attacker) {
        let path = []
        let curr = king
            // right diagnal check
        while (curr.location[0] < 8 && curr.location[1] >= 0) {
            path.push(curr)
            if (curr == attacker) {
                return path
            }
            if (curr.location[1] == 0) break
            curr = this.grid[curr.location[0] + 1][curr.location[1] - 1] == "" ? { location: [curr.location[0] + 1, curr.location[1] - 1] } : this.grid[curr.location[0] + 1][curr.location[1] - 1]
        }
        if (path.includes(attacker)) {
            return path
        }
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
        let attacks = new Set()
        let [x, y] = this.location
            // get open moves
        for (let key in moveKey[this.name]['moves']) {
            if (this.name == 'pawn' && this.moves >= 1 && key == 2) continue
            let newX, newY
            if (this.color == 'BLACK') {
                if (this.name == 'pawn' && this.moves == 0 && game.grid[x + 1][y] !== '') continue

                newX = parseInt(x) + moveKey[this.name]['moves'][key].x
                newY = parseInt(y) + moveKey[this.name]['moves'][key].y
                if (this.name === 'bishop') {
                    let diagnals = this.getDiagnals()
                    moves = [...moves, ...diagnals]
                    continue
                }
                if (this.name === 'rook') {
                    let horizontals = this.getHorizontals()
                    moves = [...moves, ...horizontals]
                    continue
                }
                if (this.name === 'queen') {
                    let horizontals = this.getHorizontals()
                    let diagnals = this.getDiagnals()
                    moves = [...moves, ...horizontals, ...diagnals]
                    continue
                }
            } else {
                newX = parseInt(x) - moveKey[this.name]['moves'][key].x
                newY = parseInt(y) - moveKey[this.name]['moves'][key].y
                if (this.name == 'pawn' && this.moves == 0 && game.grid[x - 1][y] !== '') continue

                if (this.name === 'bishop') {
                    let diagnals = this.getDiagnals()
                    moves = [...moves, ...diagnals]
                    continue
                }
                if (this.name === 'rook') {
                    let horizontals = this.getHorizontals()
                    moves = [...moves, ...horizontals]
                    continue
                }
                if (this.name === 'queen') {
                    let horizontals = this.getHorizontals()
                    let diagnals = this.getDiagnals()
                    moves = [...moves, ...horizontals, ...diagnals]
                    continue
                }
            }
            if (newX >= 8 || newY >= 8 || newX < 0 || newY < 0 || game.grid[newX][newY] !== '') continue

            moves.push([newX, newY])
        }
        // get attacks
        for (let key in moveKey[this.name]['attacks']) {
            let newX, newY
            if (this.color == 'BLACK') {
                newX = parseInt(x) + moveKey[this.name]['attacks'][key].x
                newY = parseInt(y) + moveKey[this.name]['attacks'][key].y

                if (this.name === 'bishop') {
                    let diagnals = this.getDiagnals()
                        // set diagnal attacks
                    diagnals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })
                    break
                }

                if (this.name === 'rook') {
                    let horizontals = this.getHorizontals()
                        // set horizontals attacks
                    horizontals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })
                    break
                }

                if (this.name === 'queen') {
                    let horizontals = this.getHorizontals()
                    let diagnals = this.getDiagnals()

                    // set horizontals attacks
                    horizontals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })

                    diagnals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })

                    break
                }
            } else {
                newX = parseInt(x) - moveKey[this.name]['attacks'][key].x
                newY = parseInt(y) - moveKey[this.name]['attacks'][key].y

                if (this.name === 'bishop') {
                    let diagnals = this.getDiagnals()
                        // set diagnal attacks
                    diagnals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }
                    })
                    break
                }

                if (this.name === 'rook') {
                    let horizontals = this.getHorizontals()
                        // set diagnal attacks
                    horizontals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })
                    break
                }

                if (this.name === 'queen') {
                    let horizontals = this.getHorizontals()
                    let diagnals = this.getDiagnals()

                    // set diagnal attacks
                    horizontals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })

                    diagnals.forEach(pair => {
                        let [dx, dy] = pair
                        let squareToAttack = game.grid[dx][dy]
                        if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                            attacks.add(`${dx}-${dy}`)
                        }

                    })

                    break
                }
            }

            if (newX > 7 || newY > 7 || newX < 0 || newY < 0) continue

            let squareToAttack = game.grid[newX][newY]
            if (squareToAttack && squareToAttack !== '' && squareToAttack.color !== this.color) {
                moves.push([newX, newY])
                attacks.add(`${newX}-${newY}`)
            }

        }
        if (game.check[this.color] && this.name !== 'king' && !moves.includes(game.check[this.color])) {
            // need to enable move to peices that can block check
            console.log('You are in check please move your king')
            return
        }
        game.drawBoard()
        for (let cordinates of moves) {
            let [x, y] = cordinates
            let [currX, currY] = this.location
            let attackKey = `${x}-${y}`
            let box = document.querySelector(`#A${x}-${y}`)
            box.style.backgroundColor = attacks.has(attackKey) ? 'blue' : 'yellow'
            box.addEventListener('click', (e) => {
                this.move(`${x}-${y}`, `${currX}-${currY}`)
            })
        }
        return moves
    }

    move(newCoordinates, oldCoordinates) {
        let [newX, newY] = newCoordinates.split('-')
        let [oldX, oldY] = oldCoordinates.split('-')
        this.moves += 1
        this.location = [parseInt(newX), parseInt(newY)]
        game.grid[newX][newY] = this
        game.grid[oldX][oldY] = ''
            // check if next moves are possible checks
        let nextMoves = this.posibleMoves()
        for (let move in nextMoves) {
            let [x, y] = nextMoves[move]
            if (game.grid[x][y] !== "" && game.grid[x][y].name == 'king') {
                this.color == 'WHITE' ? game.check['BLACK'] = [x, y] : game.check['WHITE'] = [x, y]
                console.log(game.findPath(game.grid[x][y], this))
            }
        }

        game.switchTurn()
        game.drawBoard()
    }

    getDiagnals() {
        let moves = []

        let [nextX, nextY] = this.location
        while (nextX > 0 && nextY > 0) {
            nextX -= 1
            nextY -= 1

            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }

            moves.push([nextX, nextY])

        }

        [nextX, nextY] = this.location
        while (nextX > 0 && nextY < 7) {
            nextX -= 1
            nextY += 1
            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }

            moves.push([nextX, nextY])

        }

        [nextX, nextY] = this.location
        while (nextX < 7 && nextY > 0) {
            nextX += 1
            nextY -= 1
            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }
            moves.push([nextX, nextY])
        }

        [nextX, nextY] = this.location
        while (nextX < 7 && nextY < 7) {
            nextX += 1
            nextY += 1
            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }
            moves.push([nextX, nextY])
        }

        return moves
    }

    getHorizontals() {
        let moves = []

        let [nextX, nextY] = this.location
        while (nextX > 0) {
            nextX -= 1

            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }

            moves.push([nextX, nextY])

        }

        [nextX, nextY] = this.location
        while (nextX >= 0 && nextX < 7) {
            nextX += 1
            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }

            moves.push([nextX, nextY])

        }

        [nextX, nextY] = this.location
        while (nextY > 0) {
            nextY -= 1
            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }
            moves.push([nextX, nextY])
        }

        [nextX, nextY] = this.location
        while (nextY < 7) {
            nextY += 1
            if (game.grid[nextX][nextY] !== "") {
                if (game.grid[nextX][nextY].color == this.color) {
                    break
                } else {
                    moves.push([nextX, nextY])
                    break
                }

            }
            moves.push([nextX, nextY])
        }

        return moves
    }
}

const game = new GameBoard()


game.setBoard()
game.drawBoard()