import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    useEffect,
    useRef,
    useState
} from 'react';
import useField from '../hooks/useField';
import useWriteHistory from '../hooks/useWriteHistory';
import History from './History';
import Button from './Button';

export default function Calculator(): JSX.Element {
    const [field, symbolicField, fields, setField]: any = useField([]);
    const [histories, setHistories]: any = useWriteHistory([]);

    const checkEvaluateError = (value: any) => {
        const errorValues = [Infinity, -Infinity, NaN, null, undefined];
        const isError = errorValues.includes(value);
        return !isError;
    };

    const evaluate = (value: any) => {
        const evaluated = Function(`return ${value}`)();
        const fixedEvaluated = Math.round(evaluated * 1e15) / 1e15;
        if (!checkEvaluateError(fixedEvaluated)) throw new Error("Error");
        const output = String(fixedEvaluated);
        const outputs = value.split("");
        return [output, outputs];
    };

    const solution = () => {
        try {
            const [value, values] = evaluate(field);
            addHistory(symbolicField, value);
            setField(values);
        } catch (err) {
            Alert.alert("Error", "Invalid math expression!");
            setField([]);
        }
    };

    const solve = () => {
        solution();
    };

    const addNumber = (number: string) => {
        const values = [...fields, number];
        setField(values);
    };

    const delNumber = () => {
        const values = fields.slice(0, fields.length - 1);
        setField(values);
    };
 
    const clearNumber = () => {
        const values: any = [];
        setField(values);
    };

    const addHistory = (expression: any, answer: any) => {
        const pair = [expression, answer];
        const values = [...histories, pair];
        setHistories(values);
    };

    return (
        <View style={styles.calculatorContainer}>
            <History values={histories} />
            <View style={styles.outputContainer}>
                <Text style={styles.output}>{symbolicField}</Text>
            </View>
            <View>
                <View style={styles.btnRow}>
                    <Button name="remover" value="AC" onPress={clearNumber} />
                    <Button name="remover" value="DEL" onPress={delNumber} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="7" onPress={() => {addNumber("7")}} />
                    <Button name="number" value="8" onPress={() => {addNumber("8")}} />
                    <Button name="number" value="9" onPress={() => {addNumber("9")}} />
                    <Button name="operator" value="&divide;" onPress={() => {addNumber("/")}} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="4" onPress={() => {addNumber("4")}} />
                    <Button name="number" value="5" onPress={() => {addNumber("5")}} />
                    <Button name="number" value="6" onPress={() => {addNumber("6")}} />
                    <Button name="operator" value="&times;" onPress={() => {addNumber("*")}} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="1" onPress={() => {addNumber("1")}} />
                    <Button name="number" value="2" onPress={() => {addNumber("2")}} />
                    <Button name="number" value="3" onPress={() => {addNumber("3")}} />
                    <Button name="operator" value="&minus;" onPress={() => {addNumber("-")}} />
                </View>
                <View style={styles.btnRow}>
                    <Button name="number" value="." onPress={() => {addNumber(".")}} />
                    <Button name="number" value="0" onPress={() => {addNumber("0")}} />
                    <Button name="operator" value="=" onPress={() => {solve()}} />
                    <Button name="operator" value="+" onPress={() => {addNumber("+")}} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calculatorContainer: {
        width: "100%"
    },

    outputContainer: {
        paddingVertical: 5,
        paddingHorizontal: 4
    },

    output: {
        color: "#fff",
        fontSize: 50,
        textAlign: "right"
    },

    btnRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});