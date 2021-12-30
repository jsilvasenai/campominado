import React from "react"
import { View, StyleSheet } from "react-native"
import Field from './Field'

export default props => {
    // constante para receber o board e mapear as linhas e colunas
    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            // para cada campo é criado um <Field>
            return <Field {...field} key={c} 
                onOpen = {() => props.onOpenField(r, c)}
                onSelect={() => props.onSelectField(r,c)}/>
        })
        // cada linha tem um conjunto de fields
        return <View key={r} style={{ flexDirection: 'row' }}>{columns}</View>
    })
    // aqui são todas as linhas do tabuleiro
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
    }
})