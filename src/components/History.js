import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function History({ values=[] }) {
    const eq = "=";

    const putSymbol = (value="") => {
        const symbolObj = {
            "/": "÷",
            "*": "×"
        };
        const newValue = value.split("").map((v) => {
            if (!(v in symbolObj)) return v;
            return symbolObj[v]; 
        }).join("");
        return newValue;
    };

    return (
        <ScrollView style={styles.container}>
            {values.map((pair, i) => (
                <View style={styles.subcontainer} key={i}>
                    <Text style={styles.text}>{putSymbol(pair[0])}</Text>
                    <Text style={styles.text}>{eq} {pair[1]}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: "30%"
    },
    subcontainer: {
        paddingVertical: 2
    },
    text: {
        color: "#fff",
        fontSize: 24,
        textAlign: "right",
        paddingHorizontal: 8
    }
});