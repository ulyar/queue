// Функция для отправки запроса и обновления текста
function fetchDataAndUpdateText() {
    fetch('http://194.67.67.236:8002/get_text_head')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Array.from(document.getElementsByClassName('p_count_hum_num')).forEach(el => {
                el.textContent = data['people'];
            });

            Array.from(document.getElementsByClassName('p_load_num')).forEach(el => {
                el.textContent = data['loads'];
            });
        })
}


setInterval(fetchDataAndUpdateText, 10000); // 10 секунд