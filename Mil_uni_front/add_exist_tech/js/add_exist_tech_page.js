
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('.form');
        const saveButton = document.querySelector('button[type="submit"]');

        saveButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the form from submitting

            // Validate required fields
            const requiredFields = ['techName', 'category', 'regNumber'];
            let isValid = true;

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    field.classList.add('required-field');
                    isValid = false;
                } else {
                    field.classList.remove('required-field');
                }
            });

            if (!isValid) {
                alert('Будь ласка, заповніть обов\'язкові поля.');
                return;
            }

            // Continue with form submission
            // Generate a random Id (combination of letters and digits)
            const randomId = generateRandomId();

            // Collect form data
            const formData = {
                id: randomId,
                name: getValueOrNullable('techName'),
                contact: getValueOrNullable('contact'),
                number: getValueOrNullable('regNumber', true), // Parse as integer
                category: getValueOrNullable('category'),
                condition: getValueOrNullable('techStatus'),
                location: getValueOrNullable('location'),
                specifications: getValueOrNullable('techSpecs'),
                weight: getValueOrNullable('techWeight'),
                technicalInspection: getValueOrNullable('lastCheck'), // Parse as date
                notes: getValueOrNullable('notes')
            };

            console.log(formData);


            // Send data to the server
            fetch('https://localhost:7088/api/vehicles', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Optionally, handle success response here
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Optionally, handle error here
                });
        });

        function generateRandomId() {
            // Generate a random integer between 1 and 100000
            return Math.floor(Math.random() * 100000) + 1;
        }

        function getValueOrNullable(id, parseAsInt = false) {
            const element = document.getElementById(id);
            const value = element ? element.value : null;

            if (value === '' || value === undefined || value === null) {
                return null;
            }

            return parseAsInt ? parseInt(value, 10) : value;
        }
    });

