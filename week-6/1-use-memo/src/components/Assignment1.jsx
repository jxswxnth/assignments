import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(1);
    // Your solution starts here
    const expensiveValue = useMemo(() => {
        let res = 1;
        console.log('bef', res);
        for (let i = input; i > 0; i--) {
            console.log('loop', res);
            res *= i;
        }
        return res;
    }, [input]);


    return (
        <div>
            <input
                type="number"
                value={input}
                onChange={(e) => {
                    setInput(Number(e.target.value));
                    console.log(input);
                    console.log(expensiveValue);
                }}
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}