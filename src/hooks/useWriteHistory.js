import { useEffect, useRef, useState } from "react";

export default function useWriteHistory(histories=[]) {
    const [output, setOutput] = useState(histories);

    // useEffect(() => {
    //     console.log(`output: ${JSON.stringify(output)}`);
    // });

    const setHistories = (values) => {
        setOutput(values);
    };

    return [output, setHistories];
}