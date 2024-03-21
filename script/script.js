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
console.log(mapBaloons)


initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const { YMapComplexEntity, YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

  const { YMapClusterer, clusterByGrid } = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
  const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');
  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById('map'),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [37.588144, 55.733842],

        // Уровень масштабирования
        zoom: 10
      }
    }
  );

  // Добавляем слой для отображения схематической карты
   map.addChild(new YMapDefaultSchemeLayer({ customization:  mapCustomization }))
  map.addChild(new YMapDefaultFeaturesLayer({}))
  map
  // Add a default marker with a popup window from the package to the map
  .addChild(
      new YMapDefaultMarker({
          coordinates: [37.9, 55.85],
          color: '#f28109',
          title: 'ЭЛЬБА мебель',
          subtitle: 'МЦ «Империя»',
          popup: {title: 'title', subtitle: 'subtitle', content: 'Дмитровское шоссе, 161 Б м.Алтуфьево, 7 (499) 380-64-39', position: 'left'}
      })
  )
  map
  // Add a default marker with a popup window from the package to the map
  .addChild(
      new YMapDefaultMarker({
          coordinates: [37.6, 55.75],
          color: '#f28109',
          title: 'МЦ «Империя»',
          subtitle: 'ЭЛЬБА мебель',
          popup: {title: 'title', subtitle: 'subtitle', content: 'Дмитровское шоссе, 161 Б м.Алтуфьево, 7 (499) 380-64-39',position: 'left'}
      })
  )
  map
  // Add a default marker with a popup window from the package to the map
  .addChild(
      new YMapDefaultMarker({
          coordinates: [37.7, 55.75],
          color: '#f28109',
          title: 'EUROSTYLE',
          subtitle: '7 (966) 195-57-96',
          popup: {title: 'title', subtitle: 'subtitle', content: 'МЦ Гранд	ул. Бутаково, 4, Химки (здание Гранд-2, вход 3, этаж 4)'}
      })
  )
};

