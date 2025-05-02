window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('myForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Ne küldje el azonnal az űrlapot

        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        let errorMessages = [];

        inputs.forEach(input => {
            const value = input.value.trim();

            if (value === '') {
                isValid = false;
                errorMessages.push(`${input.name} mező kötelező.`);
            } else if (input.type === 'text' || input.tagName.toLowerCase() === 'textarea') {
                if (value.length < 10) {
                    isValid = false;
                    errorMessages.push(`${input.name} mező legalább 10 karakter hosszú kell legyen.`);
                }
            } else if (input.type === 'email') {
                if (!validateEmail(value)) {
                    isValid = false;
                    errorMessages.push(`${input.name} mező nem érvényes email cím.`);
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