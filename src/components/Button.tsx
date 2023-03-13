import { Pressable, StyleSheet, Text } from 'react-native';

export default function Button({ name="number", value="", onPress }: any): JSX.Element {
    return (
        <Pressable
            style={styles[name]}
            onPress={() => {onPress(value)}}
        >
            <Text style={styles[name + "Text"]}>{value}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    number: {
        backgroundColor: "#333333",
        paddingVertical: 24,
        width: "25%"
    },

    operator: {
        backgroundColor: "#fd9425",
        paddingVertical: 24,
        width: "25%"
    },

    remover: {
        backgroundColor: "#a8a8a8",
        paddingVertical: 22,
        width: "50%",
    },

    numberText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 30
    },

    operatorText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 30
    },

    removerText: {
        color: "#000",
        textAlign: "center",
        fontSize: 22
    }
});