function clock24() {
    let s = 0;
    let m = 0;
    let h = 0;
    const interval = setInterval(() => {
        s += 1

        if (s == 60) {
            s = 0;
            m += 1;
        }

        if (m == 60) {
            m = 0;
            h += 1;
        }

        let HH = h < 10 ? `0${h}` : h;
        let MM = m < 10 ? `0${m}` : m;
        let SS = s < 10 ? `0${s}` : s;

        console.log(`${HH}:${MM}:${SS}`);
    }, 10)
}

function clock12() {
    let s = 0;
    let m = 0;
    let h = 12;
    const interval = setInterval(() => {
        s += 1

        if (s == 60) {
            s = 0;
            m += 1;
        }

        if (m == 60) {
            m = 0;
            h += 1;
        }

        let HH12 = h <= 12 ? h : h - 12;

        let HH = HH12 < 10 ? `0${HH12}` : HH12;
        let MM = m < 10 ? `0${m}` : m;
        let SS = s < 10 ? `0${s}` : s;

        let ampm = h < 12 ? 'AM' : 'PM'

        console.log(`${HH}:${MM}:${SS} ${ampm}`);
    }, 1000)
}

clock12();