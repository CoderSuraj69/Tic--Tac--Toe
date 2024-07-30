/*----- constants -----*/
const COLOR_LOOKUP = {
    '1': 'Red',
    '-1': 'green',
    'null': 'white'
  };
  
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*----- app's state (variables) -----*/
  let board, turn, winner;
  
  /*----- cached element references -----*/
  const message = document.querySelector('h1');
  const playAgainBtn = document.querySelector('button');
  // Note: Could also cache the <div> elements for the squares and avoid
  //       the ids on them - like we did with the Connect-Four code-along
  
  /*----- event listeners -----*/
  document.getElementById('board').addEventListener('click', handleMove);
  playAgainBtn.addEventListener('click', initialize);
  
  /*----- functions -----*/
  initialize();
  
  // Initialize all state variables, then call render()
  function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    // OR initialize like this:
    // board = new Array(9).fill(null);
    turn = 1;
    winner = null;
    render();
  }
  
  // Update all impacted state, then call render()
  function handleMove(evt) {
    // obtain index of square
    const idx = parseInt(evt.target.id.replace('sq-', ''));
    // Guards
    if (
      // Didn't click <div> in grid
      isNaN(idx) ||
      // Square already taken
      board[idx] ||
      // Game over
      winner
    ) return;
    // Update state (board, turn, winner)
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    // Render updated state
    render();
  }
  
  function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
      if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    }
    // Less elegant approach:
    // if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];``
    // if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
    // if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
    // if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
    // if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
    // if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
    // if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
    // if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
    if (board.includes(null)) return null;
    return 'T';
  }
  
  // Visualize all state and info in the DOM
  function render() {
    renderBoard();
    renderMessage();
    // Hide/show PLAY AGAIN button
    playAgainBtn.disabled = !winner;
  }
  
  function renderBoard() {
    board.forEach(function(sqVal, idx) {
      const squareEl = document.getElementById(`sq-${idx}`);
      squareEl.style.backgroundColor = COLOR_LOOKUP[sqVal];
      // Add class if square available for hover effect
      squareEl.className = !sqVal ? 'avail' : '';
    });
  }
  
  function renderMessage() {
    if (winner === 'T') {
      message.innerHTML = 'Rats, another tie!';
    } else if (winner) {
      message.innerHTML = `Congrats <span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span>!`;
    } else {
      message.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
    }
  }