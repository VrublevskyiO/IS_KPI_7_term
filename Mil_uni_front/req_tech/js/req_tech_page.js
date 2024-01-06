
document.getElementById('addTechBtn').addEventListener('click', function () {
    window.location.href = '/add_req_tech/add_req_tech_page.html';
});

document.getElementById('dwnldDataBtn').addEventListener('click', function () {
    window.location.href = '/';
});


// Вказати шлях до вашого JSON файлу
const jsonFilePath = '/data/data.json';

// Використовуємо fetch для завантаження JSON файлу
fetch(jsonFilePath)
    .then(response => {
        // Перетворення вмісту в об'єкт JSON
        return response.json();
    })
    .then(jsonData => {
        // Отриманий об'єкт JSON знаходиться в змінній 'data'
        console.log(jsonData);

        // Отримати посилання на tbody таблиці
        const tableBody = document.getElementById('equipmentTable')?.getElementsByTagName('tbody')[0];

        // Проходження по кожному об'єкту в масиві та створення рядків в таблиці
        jsonData.forEach(item => {
            const row = tableBody.insertRow(-1);

            // Додавання клітинок для кожного поля
            Object.values(item).forEach(value => {
                const cell = row.insertCell(-1);
                cell.textContent = value;
            });

            // Додавання стовпців для редагування
            const editCell = row.insertCell(-1);
            editCell.classList.add('edit-column');

            // Створення елемента іконки редагування
            const editIcon = document.createElement('span');
            editIcon.className = 'edit-icon';
            editIcon.textContent = '✎';

            // Додавання обробника події для натискання на іконку редагування
            editIcon.addEventListener('click', () => {
                // Перенаправлення на іншу сторінку (замініть 'новаСторінка.html' на реальний URL)
                window.location.href = '/edit_req_tech/edit_req_tech_page.html';
            });

            // Додавання іконки редагування до комірки
            editCell.appendChild(editIcon);

            // Додавання стовпців для видалення
            const deleteCell = row.insertCell(-1);
            deleteCell.classList.add('delete-column');

            // Створення елемента іконки видалення
            const deleteIcon = document.createElement('span');
            deleteIcon.className = 'delete-icon';
            deleteIcon.textContent = '❌';

            // Додавання обробника події для натискання на іконку видалення
            deleteIcon.addEventListener('click', () => {
                // Видалення рядка з таблиці
                tableBody.removeChild(row);
            });

            // Додавання іконки видалення до комірки
            deleteCell.appendChild(deleteIcon);
        });
    })
    .catch(error => {
        console.error('Виникла помилка під час завантаження JSON файлу:', error);
    });