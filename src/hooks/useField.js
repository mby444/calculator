import { useEffect, useRef, useState } from 'react';

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

export default function useField(values=[]) {
    const numberList = useRef(values);
    const [output, setOutput] = useState("");
    const field = output;
    const symbolicField = putSymbol(output);
    const fields = numberList.current;
    
    useEffect(() => {
        toOutput();
    }, [values]);

    const toOutput = () => {
        const value = numberList.current.join("");
        setOutput(value);
    };

    const setField = (inputs=[]) => {
        numberList.current = inputs;
        toOutput();
    };

    return [field, symbolicField, fields, setField];
}