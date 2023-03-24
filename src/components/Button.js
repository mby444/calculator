import { Image, Pressable, StyleSheet, Text } from 'react-native';

export default function Button({ name="number", value="", iconName="", icon=null, onPress }) {
    // const getPressableStyles = () => {
    //     const output = [styles[name]];
    //     return output;
    // };
    
    // const pressableStyles = getPressableStyles();
    const styleObj = {
        pressable() {
            const output = [styles[name]];
            iconName && icon ? output.push(styles[iconName + "IconContainer"]) : 0;
            return output;
        }
    };

    return (
        <Pressable
            style={styleObj.pressable()}
            onPress={() => {onPress(value)}}
        >
            {
                iconName && icon ? (
                    <Image style={styles[iconName + "Icon"]} source={icon} /> 
                    ) : (
                    <Text style={styles[name + "Text"]}>{value}</Text>
                )
            }
            {/* <Text style={styles[name + "Text"]}>{value}</Text> */}
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

    parenthesis: {
        backgroundColor: "#a8a8a8",
        paddingVertical: 22,
        width: "25%"
    },

    remover: {
        backgroundColor: "#a8a8a8",
        paddingVertical: 22,
        width: "25%",
    },

    backspaceIconContainer: {
        alignItems: "center"
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
    },

    parenthesisText: {
        color: "#000",
        textAlign: "center",
        fontSize: 22
    },

    backspaceIcon: {
        width: 30,
        height: 30
    }
});