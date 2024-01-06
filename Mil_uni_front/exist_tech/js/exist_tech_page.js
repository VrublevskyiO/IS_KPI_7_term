

// Замініть URL на свій власний API URL
const apiUrl = 'https://localhost:7088/api/vehicles';

// Використовуємо fetch для завантаження даних з API
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(jsonData => {
        // Отриманий об'єкт JSON знаходиться в змінній 'jsonData'
        console.log(jsonData);

        // Отримати посилання на tbody таблиці
        const tableBody = document.getElementById('equipmentTable')?.getElementsByTagName('tbody')[0];

        // Проходження по кожному об'єкту в масиві та створення рядків в таблиці
        jsonData.forEach(item => {
            const row = tableBody.insertRow(-1);

// Додавання клітинок для кожного поля, крім id
const keys = Object.keys(item).filter(key => key !== 'id');
keys.forEach(key => {
    const cell = row.insertCell(-1);
    cell.textContent = item[key];
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
                window.location.href = '/edit_exist_tech/edit_exist_tech_page.html';
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
                // Питання користувача для підтвердження видалення
                const shouldDelete = confirm('Ви впевнені, що хочете видалити цей запис?');

                if (shouldDelete) {
                    console.log(item.id);
                    // Тут ви повинні викликати API для видалення запису на сервері методом DELETE
                    fetch(apiUrl + `/${item.id}`, { method: 'DELETE' })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Network response was not ok: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(deletedItem => {
                            // Видалення рядка з таблиці
                            tableBody.removeChild(row);
                        })
                        .catch(error => {
                            console.error('Error deleting item:', error);
                        });
                }
            });

            // Додавання іконки видалення до комірки
            deleteCell.appendChild(deleteIcon);
        });
    })
    .catch(error => {
        console.error('Виникла помилка під час завантаження даних з API:', error);
    });



    document.getElementById('addTechBtn').addEventListener('click', function () {
        window.location.href = '/add_exist_tech/add_exist_tech_page.html';
    });

    function convertJsonToCsv(jsonData) {
        const header = Object.keys(jsonData[0]).join(',');
        const rows = jsonData.map(obj => Object.values(obj).join(',')).join('\n');
        return `${header}\n${rows}`;
    }

    function downloadData() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => {
                const csvData = convertJsonToCsv(jsonData);

                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.csv';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const downloadButton = document.getElementById('dwnldDataBtn');
    downloadButton.addEventListener('click', downloadData);