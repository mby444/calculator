import { useState } from "react";

export default function useWriteHistory(histories=[]) {
    const [output, setOutput] = useState(histories);

    const getHistoryPair = (outputParam, index=0) => {
        const pair = outputParam?.[index];
        const output = Array.isArray(pair) ? pair : [null, null];
        return output;
    };

    const setHistories = (values) => {
        setOutput(values);
    };

    const addHistory = (expression, answer, unrepeatable=false) => {
        const [lastExpression, lastAnswer] = getHistoryPair(output, output.length - 1);
        
        if (unrepeatable) {
            const isRepeated = expression === lastAnswer;
            if (isRepeated) return;
        }

        const pair = [expression, answer];
        const newHistories = [...output, pair];
        setHistories(newHistories);
    };

    const clearHistories = () => {
        setOutput([]);
    };

    return [output, setHistories, addHistory, clearHistories];
}