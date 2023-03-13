import { useEffect, useRef, useState } from "react";

export default function useWriteHistory(histories=[]) {
    const [output, setOutput] = useState(histories);

    const setHistories = (values: any) => {
        setOutput(values);
    };

    return [output, setHistories];
}