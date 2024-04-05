// function openSubmenu() {
//   var submenu = document.querySelector('.submenu');
//   submenu.classList.add('open'); // Добавляем класс для открытия блока
// }

// function closeSubmenu() {
//   var submenu = document.querySelector('.submenu');
//   submenu.classList.remove('open'); // Удаляем класс для закрытия блока
// }


setInterval(nextSlide, slideInterval);
async function getFile(fileName) {
  let jsonValue = await fetch(fileName);
  return await jsonValue.json();
}
let mapCustomization = await getFile('./script/customization.json')
let mapBaloons = await getFile('./script/map.json')
let cities = await getFile('./script/cities.json')
let cityItems = document.querySelectorAll('.city-item')
let markersList = document.querySelectorAll('.marker__item')
let isMoscow = false

initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const { YMapClusterer, clusterByGrid } = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
  const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
  // Иницилиазируем карту
  function createMarkerItem(marker) {
    let markerItem = document.createElement('li')
    markerItem.classList.add('marker__item')


    let title = document.createElement('h2')
    title.classList.add("marker__title")
    title.textContent = marker.title

    let subtitle = document.createElement('p')
    subtitle.classList.add("marker__subtitle")
    subtitle.textContent = marker.subtitle

    let address = document.createElement('p')
    address.classList.add("marker__address")
    address.textContent = marker.address

    let phone = document.createElement('p')
    phone.classList.add("marker__phone")
    phone.textContent = marker.phone

    let markerCoordinates = document.createElement('p')
    markerCoordinates.classList.add("marker__coordinates")
    markerCoordinates.textContent = marker.coordinates

    markerItem.append(title)
    markerItem.append(subtitle)
    markerItem.append(address)
    markerItem.append(phone)
    markerItem.append(markerCoordinates)
    document.getElementById('markerList').append(markerItem)
    markerItem.onclick = function () {
      map.update({ location: { center: marker.coordinates, zoom: 18 } });
    }
  }
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
  for (let item of cityItems) {
    item.onclick = function () {
      let city = cities.find(function (city) {
        return city.id == item.id
      })
      let cityMarkers = city.markers
      document.getElementById('markerList').innerHTML = '';
      for (let marker of cityMarkers) {
        createMarkerItem(marker)

      }
      map.update({ location: { center: city.coordinates, zoom: 10 } });
      document.getElementById('map').scrollIntoView({ block: "center", behavior: "smooth" })
    }
  }
  // Add a default marker with a popup window from the package to the map
  for (let item of cities) {

    let city = item.markers
    if (item.id == 'msk') { isMoscow = true } else (isMoscow = false)

    for (let marker of city) {
      if (isMoscow) {
        createMarkerItem(marker)
      }
      map.addChild(
        new YMapDefaultMarker({
          coordinates: marker.coordinates,
          color: marker.color,
          title: marker.title,
          subtitle: marker.subtitle,
          popup: { content: marker.popup.content, position: marker.popup.position }
        })
      )
    }
  }
}

