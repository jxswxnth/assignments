function counter(){
    let count = 5;
    const interval = setInterval(()=>{
        console.log(count)
        count--;
        if(count<0) clearInterval(interval);
    }, 1000);
}

counter();