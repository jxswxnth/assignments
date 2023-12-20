function counter() {
    for (let i = 5; i > 0; i--) {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    }
}
counter();