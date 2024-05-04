// Функция для отправки запроса и обновления текста
function fetchDataAndUpdateText() {
    fetch('http://localhost:8000/get_text_head') // URL сервера, откуда вы хотите получить данные
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Предполагается, что сервер возвращает JSON
        })
        .then(data => {
            // Обновление текста для всех элементов с классом 'p_count_hum_num'
            Array.from(document.getElementsByClassName('p_count_hum_num')).forEach(el => {
                el.textContent = data['people'];
            });

            // Обновление текста для всех элементов с классом 'p_load_num'
            Array.from(document.getElementsByClassName('p_load_num')).forEach(el => {
                el.textContent = data['loads'];
            });
        })
}

// Установка интервала для регулярного выполнения функции каждые 10 секунд
setInterval(fetchDataAndUpdateText, 10000); // 10 секунд