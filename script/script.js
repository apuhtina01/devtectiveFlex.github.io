// function openSubmenu() {
//   var submenu = document.querySelector('.submenu');
//   submenu.classList.add('open'); // Добавляем класс для открытия блока
// }

// function closeSubmenu() {
//   var submenu = document.querySelector('.submenu');
//   submenu.classList.remove('open'); // Удаляем класс для закрытия блока
// }

async function getFile(fileName) {
  let jsonValue = await fetch(fileName);
  return await jsonValue.json();
}
let mapCustomization = await getFile('./script/customization.json')
let mapBaloons = await getFile('./script/map.json')
let button = document.getElementById('button');


initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const { YMapClusterer, clusterByGrid } = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
  const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById('map'),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [37.617698, 55.755864],

        // Уровень масштабирования
        zoom: 10
      }
    }
  );

  // Добавляем слой для отображения схематической карты
  map.addChild(new YMapDefaultSchemeLayer({ customization: mapCustomization }))
  map.addChild(new YMapDefaultFeaturesLayer({}))
  map
  // Add a default marker with a popup window from the package to the map
  for (let marker in mapBaloons) {
  map.addChild(
    new YMapDefaultMarker({
      coordinates: mapBaloons[marker].coordinates,
      color: mapBaloons[marker].color,
      title: mapBaloons[marker].title,
      subtitle: mapBaloons[marker].subtitle,
      popup: { content: mapBaloons[marker].popup.content, position: mapBaloons[marker].popup.position }
    })
  )
  }
  button.onclick = function didIt (a) {
    map.update({location: {center: [ 39.200296,51.660781], zoom: 10}});
  }
}


