// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btns = document.querySelectorAll(".btn_cam_1, .btn_cam_2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns.forEach(function(btn) {
    btn.onclick = function() {
        modal.style.display = "block";
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



// Get the modal
// Get the theme-selector element
var themeSelector = document.getElementById("themeSelector"); // Ensure you have an element with this id in your HTML

// Get the button that opens the theme-selector
var themeButton = document.querySelector(".button_theme");

// Get the element that closes the theme-selector
var closeTheme = document.querySelector(".theme-close");

// Define themes
var themes = {
    'Светлая': {
        'backgroundColors': {'head_main': '#50078C', 'div_head_2': '#5E1996', 'main': '#C8C8C8'},
        'textColors': '#FFFFFF',
        'borderColors': {'div_head_2': 'transparent'},
        'imageSources': {
            'schema_img': 'image/schema_default.svg',
            'img_head_l': 'image/sirius.svg',
            'button_theme': "url('image/theme.svg')"
        },
        'modalBackground': '#FFFFFF',
        'videoTextColor': '#474747'
    },
    'Темная': {
        'backgroundColors': {'head_main': '#333', 'div_head_2': '#444', 'main': '#1C191E'},
        'textColors': '#FFFFFF',
        'borderColors': {'div_head_2': 'transparent'},
        'imageSources': {
            'schema_img': 'image/schema_black.svg',
            'img_head_l': 'image/sirius.svg',
            'button_theme': "url('image/theme.svg')"
        },
        'modalBackground': '#424242',
        'videoTextColor': '#FFFFFF'
    },
    'Черно-белая': {
        'backgroundColors': {'head_main': '#000000', 'div_head_2': '#000000', 'main': '#FFFFFF'},
        'textColors': '#FFFFFF',
        'borderColors': {'div_head_2': '#FFFFFF'},
        'imageSources': {
            'schema_img': 'image/schema_dark.svg',
            'img_head_l': 'image/sirius.svg',
            'button_theme': "url('image/theme.svg')"
        },
        'modalBackground': '#000000',
        'videoTextColor': '#FFFFFF'
    },
    'Бело-черная': {
        'backgroundColors': {'head_main': '#FFFFFF', 'div_head_2': '#FFFFFF', 'main': '#000000'},
        'textColors': '#000000',
        'borderColors': {'div_head_2': '#000000'},
        'imageSources': {
            'schema_img': 'image/schema_white.svg',
            'img_head_l': 'image/sirius_white.svg',
            'button_theme': "url('image/theme_white.svg')"
        },
        'modalBackground': '#FFFFFF',
        'videoTextColor': '#000000'
    },
    'Синяя': {
        'backgroundColors': {'head_main': '#1C337C', 'div_head_2': '#1C337C', 'main': '#1C337C'},
        'textColors': '#9DD1FF',
        'borderColors': {'div_head_2': '#9DD1FF'},
        'imageSources': {
            'schema_img': 'image/schema_blue.svg',
            'img_head_l': 'image/sirius_blue.svg',
            'button_theme': "url('image/theme_blue.svg')"
        },
        'modalBackground': '#142C7B',
        'videoTextColor': '#9DD1FF'
    }
};

function applyTheme(themeName) {
    var theme = themes[themeName];
    if (theme) {
        // Apply background colors
        for (var element in theme.backgroundColors) {
            document.querySelector('.' + element).style.backgroundColor = theme.backgroundColors[element];
        }

        // Apply text colors
        document.querySelectorAll('.p_head, .p_count_hum, .p_count_hum_num, .p_load, .p_load_num, .video_text')
            .forEach(el => el.style.color = theme.textColors);

        // Apply border colors
        document.querySelector('.div_head_2').style.borderTop = "3px solid " + theme.borderColors.div_head_2;
        document.querySelector('.div_head_2').style.borderBottom = "3px solid " + theme.borderColors.div_head_2;

        // Apply image sources
        document.querySelector('.schema_img').src = theme.imageSources.schema_img;
        document.querySelector('.img_head_l').src = theme.imageSources.img_head_l;
        document.querySelector('.button_theme').style.backgroundImage = theme.imageSources.button_theme;

        // Modal content background color
        document.querySelector('.modal-content').style.backgroundColor = theme.modalBackground;

        // Close the theme selector
        document.getElementById("themeSelector").style.display = "none";
    }
}

themeButton.onclick = function() {
    themeSelector.style.display = "block";
}

document.querySelectorAll(".theme-selector-list-item").forEach(function(item) {
    item.onclick = function() {
        applyTheme(this.textContent);
    }
});

document.querySelector(".theme-close").onclick = function() {
    document.getElementById("themeSelector").style.display = "none";
};
