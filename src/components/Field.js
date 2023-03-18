import { StyleSheet, Text, View } from "react-native";

export default function Field({ value="", placeholder="" }) {
    const getDefaultValue = (input) => {
        return input ? input : placeholder;
    };

    return (
        <View style={styles.outputContainer}>
            <Text style={styles.output}>{getDefaultValue(value)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    outputContainer: {
        paddingVertical: 5,
        paddingHorizontal: 4
    },

    output: {
        color: "#fff",
        fontSize: 50,
        textAlign: "right"
    }
});