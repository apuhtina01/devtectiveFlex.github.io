// function openSubmenu() {
//   var submenu = document.querySelector('.submenu');
//   submenu.classList.add('open'); // Добавляем класс для открытия блока
// }

// function closeSubmenu() {
//   var submenu = document.querySelector('.submenu');
//   submenu.classList.remove('open'); // Удаляем класс для закрытия блока
// }
var customization;

function getFile (fileName) {

    var request = new XMLHttpRequest();

    request.open('GET', fileName);

    request.onloadend = function() {

        parse(request.responseText);
    }

    request.send();
}

getFile('customization.json'); //путь к файлу

function parse(obj) {

    customization = JSON.parse(obj);
}

initMap();
async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.getElementById('map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.345543, 45.733842],

                // Уровень масштабирования
                zoom: 10
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer({
      customization: customization
    }));
}

