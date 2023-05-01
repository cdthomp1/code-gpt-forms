// Helper function to create input elements
function createInputElement(type, name, value) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = value || '';
    input.addEventListener('input', function () {
        outputData();
    });
    return input;
}

// Helper function to create label elements
function createLabelElement(text) {
    const label = document.createElement('label');
    label.textContent = text;
    return label;
}

// Helper function to validate the form inputs
function validateForm() {
    const inputs = document.querySelectorAll('#form-container input[type="text"]');
    let isValid = true;
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });
    return isValid;
}

// Helper function to convert the form data to a JSON object
function formDataToJSON(form) {
    const data = new FormData(form);
    const json = {};
    for (let [key, value] of data.entries()) {
        if (value.trim() !== '') {
            const keys = key.split('.');
            let obj = json;
            keys.forEach((k, i) => {
                if (!obj.hasOwnProperty(k)) {
                    obj[k] = {};
                }
                if (i === keys.length - 1) {
                    obj[k] = value;
                } else {
                    obj = obj[k];
                }
            });
        }
    }
    return json;
}


// Example JSON object
const json = {
    name: '',
    email: '',
    address: {
        street: '',
        city: '',
        state: '',
        zip: ''
    }
};

// Create the form and append it to the DOM
const formContainer = document.getElementById('form-container');
formContainer.appendChild(formDataToJSON(json));

// Call the outputData function whenever the form inputs change
const inputs = document.querySelectorAll('#form-container input[type="text"]');
inputs.forEach((input) => {
    input.addEventListener('input', function () {
        outputData();
    });
});
