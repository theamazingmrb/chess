# Chess Game

![Chess Game](http://imgur.com/a/60F0U)

This is a browser-based chess game implemented in JavaScript. The game provides a playable chessboard where users can control the pieces and switch turns between white and black players. The game logic handles possible moves, captures, checks, and turn management.

## Features

- **Interactive Chessboard**: Users can click on pieces to see possible moves highlighted on the board.
- **Turn-Based Gameplay**: Switches turns between white and black automatically after each move.
- **Piece Movements**: Supports the movement rules for all chess pieces (Pawn, Knight, Bishop, Rook, Queen, King).
- **Basic Check Detection**: Identifies when a king is in check.
- **Pathfinding for Check**: Calculates the path between the attacking piece and the king to determine check scenarios.

## Setup

1. Clone this repository or download the project files.
2. Open `index.html` in your browser to start the game.

## How to Play

1. Open the chessboard in your browser.
2. Click on a piece to see its possible moves highlighted in yellow.
3. Valid attack moves are highlighted in blue.
4. Click on a highlighted square to move the selected piece.
5. The game automatically switches turns between white and black.

## Code Structure

- **`moveKey` Object**: Contains the movement and attack patterns for each piece type (Pawn, Knight, Bishop, Rook, Queen, King).
- **`GameBoard` Class**: Manages the board state, handles setting up the pieces, switching turns, and detecting checks.
- **`Peice` Class**: Represents each piece, tracks its location, and handles calculating valid moves and attacks based on its type.

## Future Improvements

- Implement more advanced chess rules (castling, en passant, promotion).
- Add checkmate detection.
- Improve the user interface with additional game controls (restart, undo moves).
- Include AI to allow playing against the computer.

## How It Works

The game uses a grid-based approach to manage the board. Each piece has defined moves and attacks based on chess rules. The `GameBoard` class handles drawing the board and updating the piece locations, while each piece class calculates its own valid moves.

## Running the Game

To run the game, simply open the `index.html` file in your browser. No additional setup is required.

Enjoy your game of chess!
