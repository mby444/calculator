import { Alert, StyleSheet, View } from 'react-native';
import useField from '../hooks/useField';
import useWriteHistory from '../hooks/useWriteHistory';
import History from './History';
import Field from './Field';
import Button from './Button';

export default function Calculator() {
    const [field, symbolicField, fields, setField] = useField([]);
    const [histories, setHistories] = useWriteHistory([]);

    const checkEvaluateError = (value=null) => {
        const errorValues = [Infinity, -Infinity, NaN, null, undefined];
        const isError = errorValues.includes(value);
        return !isError;
    };

    const checkInitialValue = (value="") => {
        if (fields.length) return value;
        const forbiddenInitials = ["0"];
        const leadingZeroInitials = ["/", "*", "+", "."];
        const output = forbiddenInitials.includes(value) ? [""] :
        leadingZeroInitials.includes(value) ? ["0", value] :
        [value];
        return output;
    };

    const checkOperator = (fieldValues, number) => {
        const operators = ["/", "*", "-", "+", "."];
        const lastIndexOfFieldValues = fieldValues.length - 1;
        const isOperator1 = operators.includes(fieldValues[lastIndexOfFieldValues]);
        const isOperator2 = operators.includes(number);
        const isBothOperator = isOperator1 && isOperator2;
        const newFieldValues = [...fieldValues];
        isBothOperator ? newFieldValues.pop() : 0;
        return newFieldValues;
    };

    const checkInitFieldValues = (values, number) => {
        const operators = ["/", "*", "-", "+", "."];
        const checkIsOperator = (v) => operators.includes(v);
        const isEverythingZero = values.every((v) => v === "0");
        const output = isEverythingZero ? checkIsOperator(number) ? ["0"] : [] : values;
        return output;
    };

    const getInputs = (number) => {
        const fieldValues = [...fields];
        const checkedOperatorFieldValues = checkOperator(fieldValues, number);
        const checkedInitFieldValues = checkInitFieldValues(checkedOperatorFieldValues, number);
        const checkedInitialNumber = checkInitialValue(number);
        const values = [...checkedInitFieldValues, ...checkedInitialNumber];
        return values;
    };

    const evaluate = (value) => {
        const evaluated = Function(`return ${value}`)();
        const fixedEvaluated = Math.round(evaluated * 1e5) / 1e5;
        if (!checkEvaluateError(fixedEvaluated)) throw new Error("Error");
        const output = String(fixedEvaluated);
        return output;
    };

    const solution = () => {
        try {
            const value = evaluate(field);
            const values = value.split("");
            addHistory(symbolicField, value);
            setField(values);
        } catch (err) {
            Alert.alert("Error", "Invalid math expression!");
        }
    };

    const solve = () => {
        solution();
    };

    const addNumber = (number) => {
        const values = getInputs(number);
        setField(values);
    };

    const delNumber = () => {
        const values = fields.slice(0, fields.length - 1);
        setField(values);
    };
 
    const clearNumber = () => {
        const values = [];
        mightClearHistory();
        setField(values);
    };

    const addHistory = (expression, answer) => {
        const pair = [expression, answer];
        const values = [...histories, pair];
        setHistories(values);
    };

    const mightClearHistory = () => {
        if (field) return;
        clearHistory();
    };

    const clearHistory = () => {
        setHistories([]);
    };

    return (
        <View style={styles.calculatorContainer}>
            <History values={histories} />
            <Field value={symbolicField} placeholder="0" />
            <View style={styles.btnContainer}>
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

    btnRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});