import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function History({ values=[] }) {
    const eq = "=";
    return (
        <ScrollView style={styles.container}>
            {values.map((pair, i) => (
                <View style={styles.subcontainer} key={i}>
                    <Text style={styles.text}>{pair[0]}</Text>
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