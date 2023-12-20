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

const VsHuman = ({navigation}) => {
  const [board, setBoard] = useState(Array(9).fill(''));

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');

  const sheet = useRef();
  const explosion = useRef();
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
    } else {
    }
  });

  var looser = new Sound('looser.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
    }
  });

  var draw = new Sound('draw.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
    }
  });

  var win = new Sound('winner.wav', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
    } else {
    }
  });
  var click = new Sound('click.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  useEffect(() => {
    const isBoardFull = board.every(cell => cell !== '');
    if (isBoardFull === true) {
      sheet.current.open();
    }
  }, [board, winner]);

  const handlePress = index => {
    click.play();
    if (board[index] === '' && winner === '') {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      const winner = checkWinner(newBoard, currentPlayer);
      if (winner) {
        sheet.current.open();
        setWinner(winner);
        (winner === 'X' || winner === 'O') && win.play();
        winner === 'draw' && draw.play();
      }
    }
  };

  const checkWinner = (board, player) => {
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
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setWinner('');
    reset.play();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FAE093', alignItems: 'center'}}>
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
              onPress={() => handlePress(index)}
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

        {/* {winner !== '' && (
          <Text style={styles.winnerText}>{`Winner: ${winner}`}</Text>
        )} */}
        {/* {winner === '' && board.every(cell => cell !== '') && (
          <Text style={styles.winnerText}>It's a draw!</Text>
        )} */}
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Text style={styles.resetButtonText}>Reset Game</Text>
        </TouchableOpacity>
      </View>
      {/*Cannon which will fire whenever shoot is true*/}

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
              winner === ''
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
                  : '#FAE093',
            }}>
            {winner === '' ? `It’s a Draw!` : `${winner} is winner.`}
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
              : 'Congrats on being the undisputed champion of pressing buttons like a pro.'}
          </Text>

          <TouchableOpacity
            style={{
              ...styles.resetButton,
              backgroundColor:
                winner === 'X'
                  ? '#FAE093'
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '90%',
  },
  cell: {
    width: 100,
    height: 100,
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
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VsHuman;
