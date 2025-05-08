window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        let errorMessages = [];

        inputs.forEach(input => {
            const value = input.value.trim();
            const label = input.previousElementSibling.textContent;

            // Üres mező ellenőrzés
            if (value === '') {
                isValid = false;
                errorMessages.push(`${label} mező kötelező.`);
            }

            // Szöveges mezők (legalább 10 karakter)
            if (input.type === 'text' || input.tagName.toLowerCase() === 'textarea') {
                if (value.length < 10) {
                    isValid = false;
                    errorMessages.push(`${label} mező legalább 10 karakter hosszú kell legyen.`);
                }
            }

            // Email ellenőrzés
            if (input.type === 'email') {
                if (!validateEmail(value)) {
                    isValid = false;
                    errorMessages.push(`${label} mező nem érvényes email cím.`);
                }
            }

            // Telefonszám ellenőrzés
            if (input.type === 'tel') {
                if (!validatePhone(value)) {
                    isValid = false;
                    errorMessages.push(`${label} mező nem érvényes telefonszám.`);
                }
            }
        });

        if (isValid) {
            alert('Az űrlap sikeresen elküldhető!');
            form.submit();
        } else {
            alert('Hibák találhatók:\n' + errorMessages.join('\n'));
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?\d{8,15}$/;
    return re.test(phone);
}
