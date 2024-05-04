// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btns = document.querySelectorAll("[class^='btn_cam_']");  // Селектор выбирает все элементы, класс которых начинается на 'btn_cam_'

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns.forEach(function(btn) {
    btn.onclick = function() {
        var classList = btn.className.split(/\s+/);  // Разбиваем классы кнопки на массив
        var cameraClass = classList.find(function(cl) {
            return cl.startsWith("btn_cam_");  // Находим класс, который начинается с 'btn_cam_'
        });
        if (cameraClass) {
            var cameraNumber = cameraClass.replace("btn_cam_", "");  // Извлекаем номер камеры
            document.querySelector('#videoPlayer').src = 'http://127.0.0.1:8000/video' + cameraNumber;
            modal.style.display = "block";
        }
    }
});


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var themeSelector = document.getElementById("themeSelector"); // Ensure you have an element with this id in your HTML

// Get the button that opens the theme-selector
var themeButton = document.querySelector(".button_theme");

// Get the element that closes the theme-selector
var closeTheme = document.querySelector(".theme-close");

// Define themes
var themes = {
    'Светлая': {'head_main': '#50078C', 'div_head_2': '#5E1996', 'main': '#C8C8C8', 'src': 'static/image/schema_default.svg'},
    'Темная': {'head_main': '#50078C', 'div_head_2': '#5E1996', 'main': '#1C191E', 'src': 'static/image/schema_black.svg'},
    'Черно-белая': {'head_main': '#000000', 'div_head_2': '#000000', 'main': '#000000', 'src': 'static/image/schema_dark.svg'},
    'Бело-черная': {'head_main': '#FFFFFF', 'div_head_2': '#FFFFFF', 'main': '#FFFFFF', 'src': 'static/image/schema_white.svg'},
    'Синяя': {'head_main': '#1C337C', 'div_head_2': '#1C337C', 'main': '#142C7B', 'src': 'static/image/schema_blue.svg'},
};

// Function to apply theme
function applyTheme(themeName) {
    var themeColors = themes[themeName];
    if (themeColors) {
        document.querySelector(".head_main").style.backgroundColor = themeColors['head_main'];
        document.querySelector(".main").style.backgroundColor = themeColors['main'];

        document.querySelector(".schema_img").src = themeColors['src'];
        // Close the theme-selector after theme selection
        themeSelector.style.display = "none";

        if (themeName === 'Бело-черная') {
            document.querySelector(".p_head").style.color = '#000000';

            document.querySelector(".img_head_l").src = 'static/image/sirius_white.svg';
            document.querySelector(".button_theme").style.backgroundImage = "url('static/image/theme_white.svg')";
            document.querySelector(".modal-content").style.backgroundColor = '#FFFFFF';
            document.querySelector(".video_text").style.color = '#000000';
            document.querySelector(".theme-content").style.backgroundColor = '#FFFFFF';
            document.querySelectorAll('.theme-header, .theme-close, .theme-title, .theme-selector-list, .theme-selector-list-item').forEach(el => el.style.color = '#000000');
            document.querySelectorAll(".theme-selector-list-item").forEach(el => el.style.borderBottom = '1px solid #000000');
            document.querySelector('.popup-content').style.backgroundColor = '#FFFFFF'
            document.querySelector('.popup-content').style.backgroundColor = '#FFFFFF';
            document.querySelector('.popup-content').style.color = '#000000';

            document.querySelector(".audioPlayer").style.backgroundImage = "url('static/image/microphone-black.svg')";
        }
        else if (themeName === 'Черно-белая') {
            document.querySelector(".p_head").style.color = '#FFFFFF';

            document.querySelector(".img_head_l").src = 'static/image/sirius.svg';
            document.querySelector(".button_theme").style.backgroundImage = "url('static/image/theme.svg')";
            document.querySelector(".modal-content").style.backgroundColor = '#000000';
            document.querySelector(".video_text").style.color = '#FFFFFF';
            document.querySelector(".theme-content").style.backgroundColor = '#000000';
            document.querySelectorAll('.theme-header, .theme-close, .theme-title, .theme-selector-list, .theme-selector-list-item').forEach(el => el.style.color = '#FFFFFF');
            document.querySelectorAll(".theme-selector-list-item").forEach(el => el.style.borderBottom = '1px solid #FFFFFF');
            document.querySelector('.popup-content').style.backgroundColor = '#000000';
            document.querySelector('.popup-content').style.color = '#FFFFFF';
            document.querySelector(".audioPlayer").style.backgroundImage = "url('static/image/microphone.svg')";
        }
        else if (themeName === 'Синяя') {
            document.querySelector(".p_head").style.color = '#9DD1FF';

            document.querySelector(".img_head_l").src = 'static/image/sirius_blue.svg';
            document.querySelector(".button_theme").style.backgroundImage = "url('static/image/theme_blue.svg')";
            document.querySelector(".modal-content").style.backgroundColor = '#142C7B';
            document.querySelector(".video_text").style.color = '#9DD1FF';
            document.querySelector(".theme-content").style.backgroundColor = '#142C7B';
            document.querySelectorAll('.theme-header, .theme-close, .theme-title, .theme-selector-list, .theme-selector-list-item').forEach(el => el.style.color = '#9DD1FF');
            document.querySelectorAll(".theme-selector-list-item").forEach(el => el.style.borderBottom = '1px solid #9DD1FF');
            document.querySelector('.popup-content').style.backgroundColor = '#1C337C';
            document.querySelector('.popup-content').style.color = '#9DD1FF';

            document.querySelector(".audioPlayer").style.backgroundImage = "url('static/image/microphone-blue.svg')";
        }
        else if (themeName === 'Темная') {
            document.querySelector(".p_head").style.color = '#FFFFFF';


            document.querySelector(".img_head_l").src = 'static/image/sirius.svg';
            document.querySelector(".button_theme").style.backgroundImage = "url('static/image/theme.svg')";
            document.querySelector(".modal-content").style.backgroundColor = '#424242';
            document.querySelector(".video_text").style.color = '#FFFFFF';
            document.querySelector(".theme-content").style.backgroundColor = '#752DAF';
            document.querySelectorAll('.theme-header, .theme-close, .theme-title, .theme-selector-list, .theme-selector-list-item').forEach(el => el.style.color = '#FFFFFF');
            document.querySelectorAll(".theme-selector-list-item").forEach(el => el.style.borderBottom = '1px solid #FFFFFF');
            document.querySelector('.popup-content').style.backgroundColor = '#424242';
            document.querySelector('.popup-content').style.color = '#FFFFFF';

            document.querySelector(".audioPlayer").style.backgroundImage = "url('static/image/microphone.svg')";
        }
        else {
            document.querySelector(".p_head").style.color = '#FFFFFF';
            document.querySelector(".img_head_l").src = 'static/image/sirius.svg';
            document.querySelector(".button_theme").style.backgroundImage = "url('static/image/theme.svg')";
            document.querySelector(".modal-content").style.backgroundColor = '#FFFFFF';
            document.querySelector(".video_text").style.color = '#474747';
            document.querySelector(".theme-content").style.backgroundColor = '#752DAF';
            document.querySelectorAll('.theme-header, .theme-close, .theme-title, .theme-selector-list, .theme-selector-list-item').forEach(el => el.style.color = '#FFFFFF');
            document.querySelectorAll(".theme-selector-list-item").forEach(el => el.style.borderBottom = '1px solid #FFFFFF');
            document.querySelector('.popup-content').style.backgroundColor = '#FFFFFF';
            document.querySelector('.popup-content').style.color = '#000000';

            document.querySelector(".audioPlayer").style.backgroundImage = "url('static/image/microphone.svg')";
            }
    }
}

// When the user clicks on the theme button, open the theme-selector
themeButton.onclick = function() {
    themeSelector.style.display = "block";
}

// Attach the theme application function to each theme list item
document.querySelectorAll(".theme-selector-list-item").forEach(function(item) {
    item.onclick = function() {
        applyTheme(this.textContent);
    }
});

// When the user clicks on the close button, hide the theme-selector
closeTheme.onclick = function() {
    themeSelector.style.display = "none";
}

document.getElementById('triggerArea').addEventListener('click', function() {
    // Отображение всплывающего окна
    var popup = document.getElementById('infoPopup');
    popup.style.display = 'block';

    // Запрос информации с сервера
    fetch('http://127.0.0.1:8000/get_queue_info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('queueCount').textContent = data.peopleInQueue + ' человек';
            document.getElementById('waitTime').textContent = data.estimatedWaitTime + ' минут';
            document.getElementById('predict').textContent = data.peopleQueue
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('queueCount').textContent = 'Ошибка загрузки';
            document.getElementById('waitTime').textContent = 'Ошибка загрузки';
        });
});

// Закрытие всплывающего окна при клике на крестик
document.querySelector('.close-button').addEventListener('click', function() {
    var popup = document.getElementById('infoPopup');
    popup.style.display = 'none';
});

// Закрытие всплывающего окна при клике вне его
window.addEventListener('click', function(event) {
    var popup = document.getElementById('infoPopup');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
});


