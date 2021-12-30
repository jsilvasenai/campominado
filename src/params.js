// parâmetros do jogo
import { Dimensions } from "react-native";
// apesar de ser uma constante, os valores de dentro podem ser alterados
const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15, 
    headerRatio: 0.15, // Proporção do cabeçalho em relação a tela
    difficultLevel: 0.1, // Percentual sobre a quantidade de campos na tela (10% com mina)
    // método para calcular a quantidade de colunas que cabe na tela
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blockSize)
    },
    // método para calcular a quantidade de linhas que cabe na tela
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRatio)
        return Math.floor(boardHeight / this.blockSize)
    },
}

export default params