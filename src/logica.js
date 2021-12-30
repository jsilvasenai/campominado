// cria uma matriz (array de array) com um objeto dentro de cada posição
const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                // equivale a row: row, 
                row,
                // equivale a column: column, 
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

// espalha as minas no tabuleiro
const spreadMines = (board, minesAmount) => {
    // qtd de linhas
    const rows = board.length
    // qtd de colunas
    const cols = board[0].length
    // minas plantadas
    let minesPlanted = 0
    // enquanto a qtd de minas plantadas for menor que a quantidade a ser plantada
    while (minesPlanted < minesAmount) {
        // gerando um valor aleatório entre 0 e a quantidade de linhas e colunas
        const rowSel = parseInt(Math.random() * rows, 10)
        const colSel = parseInt(Math.random() * cols, 10)
        // tenta plantar uma bomba no campo
        if (!board[rowSel][colSel].mined) {
            // planta a mina
            board[rowSel][colSel].mined = true
            // incrementa a qtd de minas plantadas
            minesPlanted++
        }
    }
}

// cria o tabuleiro com as minas plantadas
const createMinedBoard = (rows, columns, minesAmount) => {
    // chama o método que cria o tabuleiro
    const board = createBoard(rows, columns)
    // chama o método que espalha as minas
    spreadMines(board, minesAmount)
    // retorna o tabuleiro com as minas
    return board
}

// clona o tabuleiro
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

// pega os vizinhos
const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r != row || c != column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

// verifica se a vizinhança é segura
const safeNeighborhood = (board, row, column) => {
    const safes = (result, neighbor) => result && !neighbor.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

// abrir um campo
const openField = (board, row, column) => {
    const field = board[row][column]
    // se estiver fechado
    if (!field.opened) {
        field.opened = true
        // se estiver minado
        if (field.mined) {
            field.exploded = true
            // se a vizinhança for segura
        } else if (safeNeighborhood(board, row, column)) {

            // abre os vizinhos recursivamente
            getNeighbors(board, row, column)
                .forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

// transforma os fields em um array só
const fields = board => [].concat(...board)

// verifica se o campo é explodido
const hadExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0

// verifica se existem campos pendentes
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

// verifica se o usuário ganhou o jogo
const wonGame = board => fields(board).filter(pendding).length === 0

// mostrar as minas
const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

// inverte a bandeira
const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

// conta quantas flags foram usadas
const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length

// exporta as funções
export { createMinedBoard, cloneBoard, openField, hadExplosion, wonGame, showMines, invertFlag, flagsUsed}