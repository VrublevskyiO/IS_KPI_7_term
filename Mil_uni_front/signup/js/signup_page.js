document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector('.login-form');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(signupForm);

        const userData = {
            fullName: formData.get('username'),
            militaryId: formData.get('text'),
            status: formData.get('languages'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Виклик функції для надсилання даних на сервер
        console.log(userData)
        createUser(userData);
    });

    async function createUser(userData) {
        try {
            const response = await fetch('https://localhost:7088/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData, null, 2)  // Визначте третій параметр - кількість пробілів для відступів
                
            });
            console.log(JSON.stringify(userData, null, 2))


            if (response.ok) {
                alert('Користувача успішно зареєстровано!');
                signupForm.reset();

                // Перенаправлення на сторінку після успішної реєстрації
                window.location.href = '/main/main_page.html';
                
                
            } else {
                console.log(userData)
                const errorData = await response.json();
                alert(`Помилка реєстрації: ${errorData.title}`);
            }
        } catch (error) {
            console.error('Помилка під час взаємодії з сервером:', error);
        }
    }
});
