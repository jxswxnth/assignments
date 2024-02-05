import React, { useEffect, useState, useMemo } from "react";

const words = ["hi", "my", "name", "is", "for", "to", "random", "word"];
const TOTAL_LINES = 1000;
const ALL_WORDS = [];
for (let i = 0; i < TOTAL_LINES; i++) {
    let sentence = "";
    for (let j = 0; j < words.length; j++) {
        sentence += (words[Math.floor(words.length * Math.random())])
        sentence += " "
    }
    ALL_WORDS.push(sentence);
}

export function Assignment2() {
    const [sentences, setSentences] = useState(ALL_WORDS);
    const [filter, setFilter] = useState("");
    const [count, setCount] = useState(0);

    const filteredSentences = useMemo(() => {
        console.log('expensive operation');
        return sentences.filter(s => s.includes(filter));
    }, [filter, sentences]);

    const highlightSearch = (sentence) => {
        if (filter === "") {
            return sentence;
        } else {
            const parts = sentence.split(new RegExp(`(${filter})`, "gi"));
            return (
                <span>
                    {parts.map((part, index) =>
                        part.toLowerCase() === filter.toLowerCase() ? (
                            <span key={index} style={{ backgroundColor: "yellow" }}>
                                {part}
                            </span>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    )}
                </span>
            );
        }
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e) => setFilter(e.target.value)}
            ></input>
            <button
                onClick={() => {
                    setCount(count + 1);
                    console.log('other renders');
                }}
            >
                {count}
            </button>
            {filteredSentences.map((sentence, index) => (
                <div key={index}>{highlightSearch(sentence)}</div>
            ))}
        </div>
    );
}
