<script setup>
  import { Marker, Icon } from 'leaflet';
  
  const selectedCoordinates = defineModel({
    type: [Array, null],
    required: true,
    default: () => null
  })
  
  const props = defineProps({
    selectedSubdivision: {
      type: Object,
      required: true,
      default: () => null
    }
  })

  const map = ref(null)
  const marker = ref(null)
  const defaultZoom = 15
  const zoom = ref(defaultZoom)
  const mapReady = ref(false)
  const originalCoordinates = ref(null)

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

  // When the map is ready
  const onMapReady = () => {
    // Access the Leaflet map instance
    // console.log(map.value.leafletObject)

    if(selectedCoordinates.value && selectedCoordinates.value.length > 0) {
      originalCoordinates.value = selectedCoordinates.value
      marker.value = new Marker(selectedCoordinates.value, { icon: customIcon })
      marker.value.addTo(map.value.leafletObject)
      map.value.leafletObject.setView(selectedCoordinates.value, defaultZoom)
    } else {
      map.value.leafletObject.setView([props.selectedSubdivision.latitude, props.selectedSubdivision.longitude], defaultZoom)
    }

    // set mapReady to true
    mapReady.value = true

    map.value.leafletObject.on('click', (e) => {
      if(marker.value) {
        map.value.leafletObject.removeLayer(marker.value)
      }
      selectedCoordinates.value = [e.latlng.lat, e.latlng.lng]
      marker.value = new Marker([e.latlng.lat, e.latlng.lng], { icon: customIcon })
      marker.value.addTo(map.value.leafletObject)
      // center the map to the selected coordinates
      map.value.leafletObject.setView([e.latlng.lat, e.latlng.lng], zoom.value)
    })
  }

  const restoreOriginalCoordinates = () => {
    if(marker.value) {
      map.value.leafletObject.removeLayer(marker.value)
    }
    if(originalCoordinates.value) {
      selectedCoordinates.value = originalCoordinates.value
      marker.value = new Marker(originalCoordinates.value, { icon: customIcon })
      marker.value.addTo(map.value.leafletObject)
      map.value.leafletObject.setView(originalCoordinates.value, zoom.value)
    }
  }

  const clearMarker = () => {
    if(marker.value) {
      map.value.leafletObject.removeLayer(marker.value)
    }
    selectedCoordinates.value = null
  }
  
  const latitude = computed(() => {
    return selectedCoordinates.value ? selectedCoordinates.value[0] : ''
  })

  const longitude = computed(() => {
    return selectedCoordinates.value ? selectedCoordinates.value[1] : ''
  })

</script>

<template>
  <div>
    <div class="w-full h-[400px] rounded-lg bg-slate-700">
      <LMap
        ref="map"
        v-model:zoom="zoom"
        class="rounded-lg"
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
    <div class="flex items-center mt-4" :class="selectedCoordinates ? 'justify-between' : 'justify-end'">
      <span v-if="selectedCoordinates" class="text-gray-600 text-xs">¡Pin posicionado!<br>Latitud: {{ latitude }} - Longitud: {{ longitude }}</span>
      <div class="flex gap-2">
        <UButton v-if="originalCoordinates" variant="ghost" color="mindaro" @click="restoreOriginalCoordinates">Restaurar pin original</UButton>
        <UButton variant="outline" color="mindaro" :disabled="!selectedCoordinates" @click="clearMarker">Quitar pin</UButton>
      </div>
    </div>
  </div>
</template>
