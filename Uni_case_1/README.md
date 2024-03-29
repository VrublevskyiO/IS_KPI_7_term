# Uni_case_1
ASP.NET Core Web API контролери для управління користувачами та обладнанням

## Контролер користувачів (UserController)

### Методи API для користувачів

#### Завантаження користувачів з файлу
`GET /api/users`

Повертає список усіх користувачів.

#### Завантаження конкретного користувача
`GET /api/users/{id}`

Приймає ідентифікатор користувача (`id`) і повертає відповідного користувача або статус 404, якщо користувач не знайдений.

#### Додавання нового користувача
`POST /api/users`

Приймає нового користувача в форматі JSON у тілі запиту, додає його до списку користувачів і повертає створений об'єкт користувача або статус 400 у разі помилки.

#### Оновлення інформації про користувача
`PUT /api/users/{id}`

Приймає ідентифікатор користувача (`id`) і нову інформацію про користувача у тілі запиту в форматі JSON. Оновлює відповідного користувача або повертає статус 404, якщо користувач не знайдений.

#### Видалення користувача
`DELETE /api/users/{id}`

Приймає ідентифікатор користувача (`id`) і видаляє відповідного користувача або повертає статус 404, якщо користувач не знайдений.

## Контролер обладнання (VehicleController)

### Методи API для обладнання

#### Завантаження обладнання з файлу
`GET /api/vehicles`

Повертає список усіх обладнань.

#### Завантаження конкретного обладнання
`GET /api/vehicles/{id}`

Приймає ідентифікатор обладнання (`id`) і повертає відповідне обладнання або статус 404, якщо обладнання не знайдено.

#### Додавання нового обладнання
`POST /api/vehicles`

Приймає нове обладнання в форматі JSON у тілі запиту, додає його до списку обладнань і повертає створений об'єкт обладнання або статус 400 у разі помилки.

#### Оновлення інформації про обладнання
`PUT /api/vehicles/{id}`

Приймає ідентифікатор обладнання (`id`) і нову інформацію про обладнання у тілі запиту в форматі JSON. Оновлює відповідне обладнання або повертає статус 404, якщо обладнання не знайдено.

#### Видалення обладнання
`DELETE /api/vehicles/{id}`

Приймає ідентифікатор обладнання (`id`) і видаляє відповідне обладнання або повертає статус 404, якщо обладнання не знайдено.

## Збереження даних

Дані користувачів зберігаються у файлі `UsersData.json`, а дані обладнання у файлі `data.json`. Файли автоматично завантажуються при створенні екземплярів контролерів та зберігаються при змінах у відповідних списках.

## Вбудований CORS

В обох контролерах використовується вбудований CORS (Cross-Origin Resource Sharing), що дозволяє обмінюватися ресурсами між різними джерелами. Це забезпечує безпеку та контроль доступу до ресурсів у вашому веб-додатку.

## Swagger

Проект включає підтримку Swagger, інструменту для автоматичної генерації документації та взаємодії з API. Щоб скористатися Swagger, перейдіть за посиланням `/swagger` після запуску додатка. Там ви зможете переглянути та тестувати ваші API безпосередньо з веб-інтерфейсу.


## Тестування та Виявлені Баги

### Баг 1: Вразливість системи
#### Очікувана поведінка:
Система видасть попап із завищеною кількістю входу для користувача після 3-х спроб входу.
#### Фактично реалізовано:
Система не видає цей попап.
Розробник не додавав цей функціонал. Додамо при покращенні проєкту.

### Баг 2: Довжина паролю
#### Очікувана поведінка:
Довжина паролю - мінімум 8 символів.
#### Фактично реалізовано:
Перевірка на довжину пароля відсутня.

### Баг 3: Перевірка на коректність введеного імені
#### Очікувана поведінка:
Ім’я може містити апостроф.
#### Фактично реалізовано:
Система не пропускає такі імена і видає помилку валідації даних.

### Баг 4: Перевірка на коректність введеної електронної пошти
#### Очікувана поведінка:
Система для логіну використовує пошту формату mail@gmail.com.
#### Фактично реалізовано:
Система пропускає логін у форматі mail.

### Баг 5: Редагування профілю: збереження даних
#### Очікувана поведінка:
Функція редагування профілю зберігає зміни.
#### Фактично реалізовано:
Функція редагування профілю НЕ зберігає зміни.

### Баг 6: Редагування профілю: типи даних
#### Очікувана поведінка:
Функція редагування профілю має перевірку на поля вводу.
#### Фактично реалізовано:
Функція редагування профілю НЕ має перевірки на поля вводу.

### Баг 7: Некоректне отримання даних
#### Очікувана поведінка:
Система вивантажує csv файл із даними, які відображені на сторінці.
#### Фактично реалізовано:
Система вивантажує порожній csv файл.
Баг вирішився тим, що тестувальник некоректно під’єднався до бази даних.

### Баг 8: Немає переходу між сторінками наявної та необхідної техніки
#### Очікувана поведінка:
Із сторінки з наявною технікою можна перейти до сторінки з необхідною технікою.
#### Фактично реалізовано:
Даного переходу немає.

### Баг 9: Немає переходу між сторінками необхідної та наявної техніки
#### Очікувана поведінка:
Із сторінки з необхідною технікою можна перейти до сторінки з наявною технікою.
#### Фактично реалізовано:
Даного переходу немає.

### Баг 10: Вилогінення юзера
#### Очікувана поведінка:
Система повинна просити ввести пароль для кожної сесії юзера.
#### Фактично реалізовано:
Система вилогінює користувача на наступний день.

### Баг 11: Рівні доступу
#### Очікувана поведінка:
Користувачі з різними рівнями доступу мають різні можливості у системі.
#### Фактично реалізовано:
Користувачі з різними видами доступу мають рівні можливості в системі.

---
