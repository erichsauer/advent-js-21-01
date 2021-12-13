const verificationInputs = [...document.querySelectorAll('.fields > input[type="text"')]
const verification1 = document.querySelector('input[name="verification_1"')

verificationInputs.forEach( (input, i) => {
    console.log(input);
    input.addEventListener('keyup',e => {
        console.log(e);
        if(!e.target.value) return;

        if(i === 3) {
            return verify();
        }
        verificationInputs[i+1].focus();
    })
})

verification1.addEventListener('paste', (e) => {
    navigator.clipboard.readText()
        .then(text => {
            console.log(text);
            console.log(verificationInputs);
            verificationInputs.forEach( (input, i) => {
                console.log(text[i]);
                console.log(input);
                input.value = text[i];
            })
            verificationInputs[3].focus();
            verify();
        })
})

const verify = () => {
    const password = verificationInputs.map(input => input.value).join('')
    if(password === "1234") {
        console.log("YASS!!")
    }else {
        console.log("NOOOO!!")
    }
}