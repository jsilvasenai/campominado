import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import params from '../params'
import Mine from "./Mine"
import Flag from "./Flag"

export default props => {
    
    // extrair os atributos de dentro do objeto props
    const { mined, opened, nearMines, exploded, flagged } = props

    const styleField = [styles.field]
    // se o campo estiver aberto, adiciona o estilo opened
    if (opened) {
        styleField.push(styles.opened)
    }
    // se o campo está explodido, adiciona o estilo exploded
    if (exploded) {
        styleField.push(styles.exploded)
    }
    // se o campo estiver marcado com a bandeira, adiciona o estilo flagged
    if (flagged) {
        styleField.push(styles.flagged)
    }

    // se não for aberto, nem explodido, adiciona o estilo regular
    if (!opened && !exploded) {
        styleField.push(styles.regular)
    }

    // cor para o texto de quantas minas estão próximas
    let color = null
    // altera a cor do texto de acordo com a quantidade de minas próximas
    if (nearMines > 0) {
        switch (nearMines) {
            case 1:
                color = '#2a28d7'
                break
            case 2:
                color = '#2b520f'
                break
            case 3:
            case 4:
            case 5:
                color = '#f9060a'
                break
            default:
                color = '#f221a9'
        }

    }



    return (
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onSelect}>
            <View style={styleField}>
                {/* Caso não exista uma mina, o campo esteja aberto e haja minas próximas, renderiza o texto */}
                {!mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, { color: color }]}>{nearMines}</Text> : false}
                {/* Caso o campo esteja minado e aberto, exibe a mina */}
                {mined && opened ?
                    <Mine /> : false}
                {/* Caso o campo esteja fechado e com a bandeira, exibe a Flag */}
                {flagged && !opened ?
                    <Flag /> : false}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#ccc',
        borderTopColor: '#ccc',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    exploded: {
        backgroundColor: '#f00',
        borderColor: '#f00'
    },
    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize,
    }
})
