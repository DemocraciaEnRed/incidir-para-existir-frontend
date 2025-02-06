<script setup>
import { Marker, LatLng, LatLngBounds, Icon } from 'leaflet';
import { IniciativasDetail } from '#components'

const { $api } = useNuxtApp();

const map = ref(null)

const slideover = useSlideover()
const selectedCity = ref(null)
const defaultZoom = 10
const zoom = ref(defaultZoom)
const mapReady = ref(false)

const customIcon = new Icon({
  iconUrl: "/maps/marker-icon.png",
  iconRetinaUrl: "/maps/marker-icon-2x.png",
  shadowUrl: "/maps/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

const { data, status } = await useAsyncData('map-initiatives', async () => {
  const [cities, initiatives] = await Promise.all([
    $api('/utils/cities'),
    $api('/initiatives/list/geolocalized'),
  ])

  return { cities, initiatives }
})

const isLoading = computed(() => status.value === 'pending');


// When the map is ready
const onMapReady = () => {
    // Access the Leaflet map instance
    // console.log(map.value.leafletObject)
    // Add a marker to the map
    data.value.initiatives.forEach(initiative => {
      const marker = new Marker([initiative.latitude, initiative.longitude], { icon: customIcon })
      marker.bindTooltip(getTooltipHtml(initiative),{
        className: 'custom-tooltip'
      })
      marker.on('click', () => {
        openInitiativeDetails(initiative.id)
      })
      marker.addTo(map.value.leafletObject)
    });
    centerMapToCity('Cali')
    // set mapReady to true
    mapReady.value = true
} 

const getTooltipHtml = (initiative) => {

  return `
    <div>
      <p class="font-inter text-xs text-white">Iniciativa <span class="text-mindaro"># ${addLeadingZeros(initiative.id)}</span></p>
      <p class="font-inter text-mindaro text-xs my-1">${initiative.dimensions.map(d => d.name).join(' <span class="text-purple-500">|</span> ')}</p>
      <h1 class="font-inter text-white leading-tight text-lg font-semibold my-1">${initiative.name}</h1>
      <p class="font-inter text-white text-xs"><span class="uppercase">${initiative.subdivision.city.name}</span> | ${initiative.subdivision.type} ${initiative.subdivision.name}</p>
    </div>
  `
}

const openInitiativeDetails = (id) => {
  slideover.open(IniciativasDetail, {
    iniciativaId: id,
    onClose: slideover.close
  })
}

const centerMapToCity = (city) => {
  const cityData = data.value.cities.find(c => c.name === city)
  selectedCity.value = cityData
  // map.value.leafletObject.fitBounds([southWestCoordinates, northEastCoordinates])
  const southWestCoordinates = [cityData.southWestLatitude, cityData.southWestLongitude]
  const northEastCoordinates = [cityData.northEastLatitude, cityData.northEastLongitude]
  map.value.leafletObject.setMaxBounds([southWestCoordinates, northEastCoordinates])
  map.value.leafletObject.setView([cityData.latitude, cityData.longitude], defaultZoom)
}

const getCityButtonVariant = (city) => {
  if(selectedCity.value && selectedCity.value.name === city) {
    return 'solid'
  }
  return 'outline'
}


</script>

<template>
  <div>
    <div>
      <div class="flex flex-col items-center">
        <p>Seleccione una ciudad para ver las iniciativas</p>
        <div class="flex justify-center space-x-3 my-4">
          <UButton class="text-xl" :variant="getCityButtonVariant('Cali')" size="lg" color="mindaro" :loading="!mapReady"  :disabled="!mapReady" :ui="{ rounded: 'rounded-full' }"  @click="centerMapToCity('Cali')">Cali</UButton>
          <UButton class="text-xl" :variant="getCityButtonVariant('Bogotá')" size="lg" color="mindaro" :loading="!mapReady" :disabled="!mapReady" :ui="{ rounded: 'rounded-full' }"  @click="centerMapToCity('Bogotá')">Bogotá</UButton>
        </div>
      </div>
    </div>
    <USkeleton v-if="isLoading" class="w-full h-[500px] rounded-lg" />
    <div v-else class="w-full h-[500px] rounded-lg bg-slate-700">
      <LMap
        ref="map"
        class="rounded-lg z-20"
        :zoom="zoom"
        :min-zoom="9"
        :max-bounds-viscosity="0.2"
        :use-global-leaflet="false"
        @ready="onMapReady"
      >
        <!-- <LControlZoom position="bottomright" /> -->
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Movilizatorio <a href=&quot;mailto:hola@movilizatorio.org&quot; target=&quot;blank&quot;>✉️</a> | &amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot; target=&quot;blank&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
        />

      </LMap>
    </div>
  </div>

</template>
