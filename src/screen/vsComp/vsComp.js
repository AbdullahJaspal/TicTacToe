import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
const {width, height} = Dimensions.get('screen');
const VsComp = ({navigation}) => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const sheet = useRef();

  var Sound = require('react-native-sound');
  Sound.setCategory('Playback');
  var gameOverSound = new Sound('gameover.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  var reset = new Sound('reset.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  var looser = new Sound('looser.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  var draw = new Sound('draw.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  var win = new Sound('winner.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  var click = new Sound('click.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  useEffect(() => {
    if (currentPlayer === 'O' && !gameOver) {
      const computerMove = makeComputerMove();
      handleMove(computerMove);
      computerMove === undefined && sheet.current.open();
    }
  }, [currentPlayer, winner]);

  useEffect(() => {
    winner === 'X' ? win.play() : winner === 'O' ? looser.play() : draw.play();
  }, [winner, board]);

  // Function to handle a player's move
  const handleMove = index => {
    click.play();
    if (board[index] === '' && winner === '') {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      const winner = checkWin(newBoard, currentPlayer);
      if (winner) {
        console.log(winner);
        sheet.current.open();
        setWinner(currentPlayer);
        winner === 'X' && win.play();
        winner === 'O' && looser.play();
        winner === 'draw' && draw.play();
      }
    }
  };

  // const makeComputerMove = () => {
  //   const emptyCells = board.reduce((acc, cell, index) => {
  //     if (cell === '') {
  //       acc.push(index);
  //     }
  //     return acc;
  //   }, []);

  //   // Check for winning moves
  //   for (let i = 0; i < emptyCells.length; i++) {
  //     const index = emptyCells[i];
  //     board[index] = 'O';
  //     if (checkWin(board, 'O')) {
  //       return index;
  //     }
  //     board[index] = '';
  //   }

  //   // Check for blocking moves
  //   for (let i = 0; i < emptyCells.length; i++) {
  //     const index = emptyCells[i];
  //     board[index] = 'X';
  //     if (checkWin(board, 'X')) {
  //       return index;
  //     }
  //     board[index] = '';
  //   }

  //   // Choose a random empty cell
  //   const randomIndex = Math.floor(Math.random() * emptyCells.length);
  //   const computerMove = emptyCells[randomIndex];

  //   handleMove(computerMove);
  // };

  // const makeComputerMove = () => {
  //   const emptyCells = board.reduce((acc, cell, index) => {
  //     if (cell === '') {
  //       acc.push(index);
  //     }
  //     return acc;
  //   }, []);

  //   // Check for winning moves
  //   for (let i = 0; i < emptyCells.length; i++) {
  //     const index = emptyCells[i];
  //     const newBoard = [...board]; // Create a copy of the board
  //     newBoard[index] = 'O'; // Modify the copy
  //     if (checkWin(newBoard, 'O')) {
  //       return index; // Return the winning move
  //     }
  //   }

  //   // If there are no winning moves, make a random move
  //   const randomIndex = Math.floor(Math.random() * emptyCells.length);
  //   const computerMove = emptyCells[randomIndex];

  //   handleMove(computerMove);
  // };

  const makeComputerMove = () => {
    const emptyCells = board.reduce((acc, cell, index) => {
      if (cell === '') {
        acc.push(index);
      }
      return acc;
    }, []);

    // Check for winning moves
    for (let i = 0; i < emptyCells.length; i++) {
      const index = emptyCells[i];
      const newBoard = [...board]; // Create a copy of the board
      newBoard[index] = 'O'; // Modify the copy
      if (checkWin(newBoard, 'O')) {
        return index; // Return the winning move
      }
    }

    // Check for blocking player's winning moves
    for (let i = 0; i < emptyCells.length; i++) {
      const index = emptyCells[i];
      const newBoard = [...board]; // Create a copy of the board
      newBoard[index] = 'X'; // Modify the copy
      if (checkWin(newBoard, 'X')) {
        return index; // Return the blocking move
      }
    }

    // If there are no winning or blocking moves, make a random move
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };
  // Function to check if a player has won
  const checkWin = (board, player) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] === player && board[b] === player && board[c] === player) {
        return player;
        // break;
      }
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
    setGameOver(false);
    reset.play();
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFE087', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: '#735C00',
          height: 50,
          width: 220,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          position: 'absolute',
          top: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 22,
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Casual-Regular',
          }}>
          TIC TAC TOE
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <View style={styles.board}>
          {board.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              onPress={() => handleMove(index)}
              disabled={cell !== '' || winner !== ''}>
              {/* <Text style={styles.cellText}>{cell}</Text> */}
              {cell === 'X' && (
                <Image
                  source={require('../../assets/icons/X.png')}
                  style={{width: '100%', width: '100%', resizeMode: 'contain'}}
                />
              )}

              {cell === 'O' && (
                <Image
                  source={require('../../assets/icons/O.png')}
                  style={{width: '100%', width: '100%', resizeMode: 'contain'}}
                />
              )}
              {cell === '' && (
                <Image
                  source={require('../../assets/icons/empty.png')}
                  style={{width: '100%', width: '100%', resizeMode: 'contain'}}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={sheet}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            height: height / 2,
          },
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
            paddingVertical: 20,
            height: '90%',
            justifyContent: 'space-around',
          }}>
          <Image
            source={
              winner === 'O'
                ? require('../../assets/icons/loser.png')
                : winner === ''
                ? require('../../assets/images/log.png')
                : require('../../assets/images/cup.png')
            }
            style={{width: 120, height: 120}}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'Casual-Regular',
              color:
                winner === 'X'
                  ? '#5A4900'
                  : winner === 'O'
                  ? '#B1293C'
                  : '#FFE087',
            }}>
            {winner === ''
              ? `It’s a Draw!`
              : winner === 'O'
              ? 'You loose'
              : `${winner} is winner.`}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Casual-Regular',
              textAlign: 'center',
              color: 'black',
            }}>
            {winner === ''
              ? 'Congrats to both of you for equally excelling in the art of not winning.'
              : winner === 'O'
              ? "It seems like luck wasn't on your side this time. You've lost the game. But don't worry, it's all part of the fun! "
              : 'Congrats on being the undisputed champion of pressing buttons like a pro.'}
          </Text>

          <TouchableOpacity
            style={{
              ...styles.resetButton,
              backgroundColor:
                winner === 'X'
                  ? '#FFE087'
                  : winner === 'O'
                  ? '#E7A3A9'
                  : 'lightgray',
            }}
            onPress={() => {
              sheet.current.close();
              resetGame();
            }}>
            <Text style={styles.resetButtonText}>Reset Game</Text>
          </TouchableOpacity>
        </View>
        {/* <YourOwnComponent /> */}
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Casual-Regular',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
    width: width / 1.3,
    alignItems: 'center',
    alignSelf: 'center',
  },
  cell: {
    width: width / 4,
    height: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
  },
  cellText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  winnerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Casual-Regular',
  },
});

export default VsComp;
