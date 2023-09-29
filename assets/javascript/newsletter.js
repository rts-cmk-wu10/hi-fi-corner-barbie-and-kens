(function () {
    const FORM = document.querySelector(".newsletter__form")
    let success

    FORM.addEventListener("submit", submitHandler)

    function validate(element) {
        // de lodrette streger tilføjer flere betingelser til samme if sætningen. Kun en af betingelserne skal være true for at ifsætningen går i opfyldlelse.
        if (element.type === "submit" || element.type === "button" || element.type === "reset") {
            return
        }

        const FEEDBACK = element.parentElement
        const makeFeedback = message => {
            FEEDBACK.innerText = message
            FEEDBACK.className = "errorMessage"
            success = false
        }

        FEEDBACK.innerText = ""
        //Amber's and er de to && det betyder og. og alle betingelser skal være opfyldt for at ifsætningen går i opfyldelse

    
        if (element.type === "email") {
            if (!includeSymbol(element.value, "@")
                || tooManyAts(element.value)
                || hasIlligalAts(element.value)) {
                return makeFeedback("❌ Write a valid email")
            }
        }
        if (success) FORM.submit()
    }

    function submitHandler(event) {
        event.preventDefault();
        success = true

        Array.from(event.target).forEach(element => validate(element))
    }
    const includeSymbol = (string, symbol) => string.includes(symbol)
    const tooManyAts = string => string.split("@").length > 2
    const hasIlligalAts = string => string.indexOf("@") === 0 || string.indexOf("@") === string.length - 1
})()