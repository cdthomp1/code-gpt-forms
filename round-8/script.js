// get the form and output divs
const form = document.getElementById('form');
const output = document.getElementById('output');

// create a file input and add it to the form
const fileInput = document.createElement('input');
fileInput.setAttribute('type', 'file');
fileInput.setAttribute('accept', 'application/json');
form.appendChild(fileInput);

// create a submit button and add it to the form
const submitButton = document.createElement('button');
submitButton.textContent = 'Convert to Form';
form.appendChild(submitButton);

// add an event listener to the submit button
submitButton.addEventListener('click', () => {
    // get the file from the file input
    const file = fileInput.files[0];

    // create a file reader to read the file
    const reader = new FileReader();

    // add an event listener to the reader
    reader.addEventListener('load', () => {
        // parse the JSON data
        const data = JSON.parse(reader.result);

        // create a form element and add it to the output div
        const formElement = document.createElement('form');
        output.appendChild(formElement);

        // loop through the properties of the JSON object
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                // create a label and input element for each property
                const label = document.createElement('label');
                label.textContent = key;
                const input = document.createElement('input');
                input.setAttribute('name', key);
                input.setAttribute('type', 'text');
                input.setAttribute('value', value);
                formElement.appendChild(label);
                formElement.appendChild(input);

                // handle nested JSON objects
                if (typeof value === 'object' && value !== null) {
                    // recursively call the function to handle nested objects
                    const nestedFormElement = createFormFromJson(value, `${key}_`);
                    formElement.appendChild(nestedFormElement);
                }
            }
        }

        // add a submit button to the form
        const submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.textContent = 'Submit';
        formElement.appendChild(submit);

        // add an event listener to the form submit event
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();

            // create an object to hold the form data
            const formData = {};

            // loop through the form inputs and add them to the form data object
            const inputs = formElement.querySelectorAll('input');
            for (const input of inputs) {
                formData[input.name] = input.value;
            }

            // make an API call to save the form data
            // replace "http://example.com/api" with the URL of your API
            // fetch('http://example.com/api', {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         // display the response data in the output div
            //         output.textContent = JSON.stringify(data, null, 2);
            //     })
            //     .catch(error => {
            //         // display the error message in the output div
            //         output.textContent = `Error: ${error.message}`;
            //     });

            output.textContent = JSON.stringify(data, null, 2);
        });

    });

    // read the file as text
    reader.readAsText(file);
});

function createFormFromJson(jsonObj, prefix = '') {
    const formElement = document.createElement('form');

    for (const key in jsonObj) {
        if (jsonObj.hasOwnProperty(key)) {
            const value = jsonObj[key];
            const inputName = prefix + key;

            const label = document.createElement('label');
            label.textContent = key;

            let input;
            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    if (typeof value[i] === 'object' && value[i] !== null) {
                        const nestedFormElement = createFormFromJson(value[i], `${inputName}_${i}_`);
                        nestedFormElement.classList.add('indent');
                        formElement.appendChild(nestedFormElement);
                    } else {
                        input = document.createElement('input');
                        input.setAttribute('name', `${inputName}_${i}`);
                        input.setAttribute('type', 'text');
                        input.setAttribute('value', value[i]);
                        formElement.appendChild(label);
                        formElement.appendChild(input);
                    }
                }
            } else if (typeof value === 'object' && value !== null) {
                const nestedFormElement = createFormFromJson(value, `${inputName}_`);
                nestedFormElement.classList.add('indent');
                formElement.appendChild(nestedFormElement);
            } else {
                input = document.createElement('input');
                input.setAttribute('name', inputName);
                input.setAttribute('type', 'text');
                input.setAttribute('value', value);
                formElement.appendChild(label);
                formElement.appendChild(input);
            }
        }
    }

    return formElement;
}



