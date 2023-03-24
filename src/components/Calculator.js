import { Alert, StyleSheet, View } from 'react-native';
import useField from '../hooks/useField';
import useWriteHistory from '../hooks/useWriteHistory';
import History from './History';
import Field from './Field';
import Button from './Button';
import backspaceIcon from "../../assests/images/backspace.png";

export default function Calculator() {
    const [field, symbolicField, fields, setField] = useField([]);
    const [histories, setHistories, addHistory, clearHistories] = useWriteHistory([]);

    const checkEvaluateError = (value=null) => {
        const errorValues = [Infinity, -Infinity, NaN, null, undefined];
        const isError = errorValues.includes(value);
        return !isError;
    };

    const checkInitNumber = (value="") => {
        const operators = ["/", "*", "+", "."];
        const singleOperators = ["-"];
        const checkOperator = (v) => operators.includes(v);
        const checkSingleOperator = (v) => singleOperators.includes(v);
        const fieldsLength = fields.length;
        if (!((!fieldsLength) || (fieldsLength === 1 && checkSingleOperator(fields[fieldsLength - 1])))) return value;
        const forbiddenInitials = ["0"];
        const output = forbiddenInitials.includes(value) ? [""] :
        checkOperator(value) ? ["0", value] :
        [value];
        return output;
    };

    const checkLastOperatorFieldValues = (fieldValues, number) => {
        const operators = ["/", "*", "-", "+", "."];
        const lastIndexOfFieldValues = fieldValues.length - 1;
        const isOperatorFieldValue = operators.includes(fieldValues[lastIndexOfFieldValues]);
        const isOperatorNumber = operators.includes(number);
        const isBothOperator = isOperatorFieldValue && isOperatorNumber;
        const newFieldValues = [...fieldValues];
        if (isBothOperator) {
            newFieldValues.pop();
        }
        return newFieldValues;
    };

    const checkInitFieldValues = (values, number) => {
        const operators = ["/", "*", "+", "."];
        const checkIsOperator = (v) => operators.includes(v);
        const isEverythingZero = values.every((v) => v === "0");
        const output = isEverythingZero ? checkIsOperator(number) ? values : [] : values;
        return output;
    };

    const getInputs = (number) => {
        const fieldValues = [...fields];
        const checkedOperatorFieldValues = checkLastOperatorFieldValues(fieldValues, number);
        const checkedInitFieldValues = checkInitFieldValues(checkedOperatorFieldValues, number);
        const checkedInitialNumber = checkInitNumber(number);
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
            const input = !!field.length ? field : "0";
            const value = evaluate(input);
            const values = value.split("");
            addHistory(field, value, true);
            setField(values);
        } catch (err) {
            Alert.alert("Error", "Invalid math expression!");
            console.log(err);
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
        mightClearHistories();
        setField(values);
    };

    const mightClearHistories = () => {
        const isZeroField = field.split("").every((v) => v === "0");
        if (!isZeroField) return;
        clearHistories();
    };

    return (
        <View style={styles.calculatorContainer}>
            <History values={histories} />
            <Field value={symbolicField} placeholder="0" />
            <View style={styles.btnContainer}>
                <View style={styles.btnRow}>
                    <Button name="parenthesis" value="(" onPress={() => {addNumber("(")}} />
                    <Button name="parenthesis" value=")" onPress={() => {addNumber(")")}} />
                    <Button name="remover" value="AC" onPress={clearNumber} />
                    <Button name="remover" value="DEL" iconName="backspace" icon={backspaceIcon} onPress={delNumber} />
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