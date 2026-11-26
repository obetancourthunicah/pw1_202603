document.addEventListener("DOMContentLoaded", ()=>{
    const registerForm = document.getElementById("registerForm");
    validateForm(registerForm);
});

const isEmptyRegex = /^\s*$/;
function validateForm(formToValidate){
    const inputs = [];
    if (!formToValidate) {
        throw new Error("No se encontró formulario.");
    }
    [...formToValidate.querySelectorAll("input")].forEach(
        (input) => {
            inputs.push(input);
        }
    );
    console.log("Inputs Detected", JSON.stringify(inputs, null,2));
    formToValidate.addEventListener("submit", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        console.log("Listo para validar");
        const errors = inputs.map(
            (inp)=>{
                const errorObject = {
                    name: inp.name,
                    input: inp,
                    field: inp.parentNode,
                    errors: []
                };
                errorObject.field.classList.remove("error");
                const errorList = errorObject.field.querySelectorAll(".errorList");
                if (errorList) {
                    errorList.forEach(
                        (el)=>{
                            errorObject.field.removeChild(el);
                        }
                    );
                }
                if(inp.hasAttribute("required")) {
                    if (isEmptyRegex.test(inp.value)) {
                        errorObject.errors.push("Campo es requerido!");
                    }
                }
                if (inp.hasAttribute("pattern")) {
                    const patterText = inp.getAttribute("pattern");
                    const customRegex = new RegExp(patterText);
                    if(!customRegex.test(inp.value)) {
                        errorObject.errors.push(inp.dataset.error ?? "No se puede validar este campo!");
                    }
                }
                if (inp.hasAttribute("min")) {
                    const numericValue = Number(inp.value);
                    const minValue = Number(inp.getAttribute("min"));
                    if (numericValue < minValue ) {
                        errorObject.errors.push(inp.dataset.error ?? "El valor es menor a lo establecido!");
                    }
                }
                if (inp.hasAttribute("max")) {
                    const numericValue = Number(inp.value);
                    const maxValue = Number(inp.getAttribute("max"));
                    if (numericValue > maxValue ) {
                        errorObject.errors.push(inp.dataset.error ?? "El valor es mayor a lo establecido!");
                    }
                }
                if (!errorObject.errors.length) {
                    return null;
                }

                return errorObject;
            }
        );
        const netErrors = errors.filter(e=>e&&true);
        console.log("Net Errors", JSON.stringify(netErrors, null, 2));
        let alreadyFocused = false;
        if (netErrors.length) {
            netErrors.forEach(
                (err) => {
                    err.field.classList.add("error");
                    const info = document.createElement("DIV");
                    info.innerHTML = err.errors.join('</br>');
                    info.classList.add("errorList");
                    err.field.appendChild(info);
                    if (!alreadyFocused) {
                        alreadyFocused = true;
                        err.input.focus();
                    }
                }
            );
        }else {
            formToValidate.submit();
        }
    });
}