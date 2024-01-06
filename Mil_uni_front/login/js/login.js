document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);

        const loginData = {
            email: formData.get('username'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('https://localhost:7088/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);

            if (response.ok) {
                const users = await response.json();
                const user = users.find(u => u.email === loginData.email && u.password === loginData.password);

                if (user) {
                    console.log(user)
                    alert('Вхід успішний!');
                    // Перенаправлення на сторінку після успішного входу
                    window.location.href = '/main/main_page.html';
                } else {
                    console.log(user)
                    alert('Неправильний логін або пароль.');
                }
            } else {
                const errorData = await response.json();
                alert(`Помилка під час входу: ${errorData.title}`);
            }
        } catch (error) {
            console.error('Помилка під час взаємодії з сервером:', error);
        }
    });
});
