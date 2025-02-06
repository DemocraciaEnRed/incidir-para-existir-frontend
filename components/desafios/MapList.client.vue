<script setup>
import { Marker, LatLng, LatLngBounds } from 'leaflet';
import { DesafiosDetail } from '#components'

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

const { data, status } = await useAsyncData('map-challenges', async () => {
  const [cities, challenges] = await Promise.all([
    $api('/utils/cities'),
    $api('/challenges/list/geolocalized'),
  ])

  return { cities, challenges }
})

const isLoading = computed(() => status.value === 'pending');


// When the map is ready
const onMapReady = () => {
    // Access the Leaflet map instance
    console.log(map.value.leafletObject)
    // Add a marker to the map
    data.value.challenges.forEach(challenge => {
      const marker = new Marker([challenge.latitude, challenge.longitude], { icon: customIcon })
      marker.bindTooltip(getTooltipHtml(challenge),{
        className: 'custom-tooltip'
      })
      marker.on('click', () => {
        openChallengeDetails(challenge.id)
      })
      marker.addTo(map.value.leafletObject)
    });
    centerMapToCity('Cali')
    // set mapReady to true
    mapReady.value = true
} 

const getTooltipHtml = (challenge) => {
  return `
    <div>
      <p class="font-inter text-xs text-white">Reporte <span class="text-mindaro"># ${addLeadingZeros(challenge.id)}</span></p>
      <p class="font-inter text-mindaro text-xs my-1">${challenge.dimension.name}</p>
      <h1 class="font-inter text-gray-400 leading-tight text-xs italic my-1">${challenge.needsAndChallenges}</h1>
      <p class="font-inter text-white text-xs"><span class="uppercase">${challenge.subdivision.city.name}</span> | ${challenge.subdivision.type} ${challenge.subdivision.name}</p>
    </div>
  `
}

const openChallengeDetails = (id) => {
  slideover.open(DesafiosDetail, {
    desafioId: id,
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
        <p class="text-sm my-3 font-medium">Seleccione una ciudad para ver los desafios</p>
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
