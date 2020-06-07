# Reversi

This application is a reversi (also known as Othello) game that you can play against computer. The objective is to have
more pieces than your opponent at the end. The game ends when there are no valid moves. Each move reverts (thus the name)
all enemy pieces between your pieces and your new piece. A move is valid when it reverts at least one enemy piece.

# New Game Form
Filling your name is required. You can choose from three computer players with different difficulty. You can also choose
whether you want to play as white or black. The colors are not limited to black and white though. You can drag and drop a picture
to the designated area and the picture will appear on your pieces. ou can also draw a simple svg picture for your opponent's
pieces. Although the colors won't be black and white anymore, the rules apply as if the colors were as you chose in the form
(position of initial pieces, white starts)

# The game
The board is green. The squares, where you can move, are blue. When hovering over the valid move square, enemy squares that would be reverted
become light blue. While playing, you can always end the game and go back to the New game form via the 'New Game' button.

# Stats
You can always display your stats. These contain the number of games played, number of games won, number of pieces that
you had at the end of your games overall and the name of the player that played the most.