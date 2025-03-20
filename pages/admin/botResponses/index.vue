<script setup>

definePageMeta({
  middleware: ['auth', 'only-admins'],
  layout: 'admin',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})

const { $api } = useNuxtApp()

const modal = useModal()
const toast = useToast()

const entries = ref([])
const page = ref(1)
const pageCount = ref(10)
const totalEntries = ref(0)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/admin/bot-responses', {
  server: false,
  query: {
    page,
    limit: pageCount,
  },
  watch: [page],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    entries.value = response._data.rows.map((entry) => {
      return {
        ...entry,
        label: `${entry.success ? 'Éxito' : 'Fallo'} | Tipo: ${entry.type.toUpperCase()} | Fecha ${formatDate(entry.createdAt)}`,
        icon: entry.success ? 'i-heroicons-check' : 'i-heroicons-x-mark',
        color: entry.success ? 'green' : 'red',
      }
    })
    totalEntries.value = response._data.count
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})


// watch(() => page, (newValue, oldValue) => {
//   if (newValue != oldValue) {
//     refresh()
//   }
// })

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Respuestas de Bot</h1>
    <p>Aquí podrá ver las respuestas que el bot de Whatsapp ha recibido y el estado del procesamiento de las mismas.</p>
    <br>
    <UAccordion :items="[{label: 'Acerca de',icon: 'i-heroicons-information-circle',defaultOpen: false,slot: 'acerca-de'}]">
      <template #acerca-de>
        <div class="px-2">
          <p>Las inciativas o reportes de desafíos que se procesan tienen 2 estados: </p>
          <p><b class="text-green-500">Éxito</b> - Indica que fue procesado correctamente.</p>
          <p><b class="text-red-500">Fallo</b> - Indica que hubo un error en el procesamiento. La razón del error puede variar, pero cuando esto ocurre, la persona que interactuó con el bot no recibe un error. Los administradores pueden revisar los datos que el usuario le ingresó al bot, y además ver el mensaje de error que el servidor devuelve. Un administrador luego puede revisar los datos y crear la iniciativa o el reporte de desafío manualmente en el caso de que sea necesario.</p>
          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">type:</code> Indica si la respuesta es una iniciativa o un desafio.</p>
          <p><code class="text-cyan-500">iniciativa</code> - Iniciativa</p>
          <p><code class="text-cyan-500">desafio</code> - Desafio</p>
          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">axis:</code> A qué línea temática corresponde tu iniciativa/desafio?</p>
          <p><code class="text-cyan-500">A</code> - Educación de calidad</p>
          <p><code class="text-cyan-500">B</code> - Empleo digno</p>
          <p><code class="text-cyan-500">C</code> - Espacios públicos seguros</p>
          <p><code class="text-cyan-500">D</code> - Salud Integral</p>
          <p><code class="text-cyan-500">E</code> - Participación política juvenil</p>
          <p><code class="text-cyan-500">F</code> - Transporte público digno</p>
          <p><code class="text-cyan-500">G</code> - Ambiente sano</p>
          <p><code class="text-cyan-500">H</code> - Ocio y cultura</p>

          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">city:</code>Selecciona la ciudad</p>
          <p><code class="text-cyan-500">A</code> - Cali</p>
          <p><code class="text-cyan-500">B</code> - Bogotá</p>
          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">locality_cali:</code> Selecciona qué tipo de localidad de Cali es:</p>
          <p><code class="text-cyan-500">A</code> - Comuna</p>
          <p><code class="text-cyan-500">B</code> - Corregimiento</p>
          <p><code class="text-cyan-500">C</code> - Indiferente o aplica a todas</p>
          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">comuna_cali:</code> Ingrese el numero de la comuna (de 1 a 22). Si no sabe, responda con 0.</p>
          <p class="italic">Si es 0 y <code class="text-mindaro">city</code> es A (Cali), se procesará sin especificar la sublocalidad.</p>
          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">corregimiento_cali:</code> Selecciona en que corregimiento se ubica:</p>
          <p><code class="text-cyan-500">A</code> - El Hormiguero</p>
          <p><code class="text-cyan-500">B</code> - El Saladito</p>
          <p><code class="text-cyan-500">C</code> - Felidia</p>
          <p><code class="text-cyan-500">D</code> - Golondrinas</p>
          <p><code class="text-cyan-500">E</code> - La Buitrera</p>
          <p><code class="text-cyan-500">F</code> - La Castilla</p>
          <p><code class="text-cyan-500">G</code> - La Elvira</p>
          <p><code class="text-cyan-500">H</code> - La Leonera</p>
          <p><code class="text-cyan-500">I</code> - La Paz</p>
          <p><code class="text-cyan-500">J</code> - Los Andes</p>
          <p><code class="text-cyan-500">K</code> - Montebello</p>
          <p><code class="text-cyan-500">L</code> - Navarro</p>
          <p><code class="text-cyan-500">M</code> - Pance</p>
          <p><code class="text-cyan-500">N</code> - Pichindé</p>
          <p><code class="text-cyan-500">O</code> - Villacarmelo</p>
          <hr class="my-2 border-gray-500">
          <p><code class="text-mindaro">locality_bogota:</code> Localidad de Bogotá donde se ubica (Puede ser vacio si )</p>
          <p><code class="text-cyan-500">A</code> - Usaquén</p>
          <p><code class="text-cyan-500">B</code> - Chapinero</p>
          <p><code class="text-cyan-500">C</code> - Santa Fe</p>
          <p><code class="text-cyan-500">D</code> - San Cristóbal</p>
          <p><code class="text-cyan-500">E</code> - Usme</p>
          <p><code class="text-cyan-500">F</code> - Tunjuelito</p>
          <p><code class="text-cyan-500">G</code> - Bosa</p>
          <p><code class="text-cyan-500">H</code> - Kennedy</p>
          <p><code class="text-cyan-500">I</code> - Fontibón</p>
          <p><code class="text-cyan-500">J</code> - Engativá</p>
          <p><code class="text-cyan-500">K</code> - Suba</p>
          <p><code class="text-cyan-500">L</code> - Barrios Unidos</p>
          <p><code class="text-cyan-500">M</code> - Teusaquillo</p>
          <p><code class="text-cyan-500">N</code> - Los Mártires</p>
          <p><code class="text-cyan-500">O</code> - Antonio Nariño</p>
          <p><code class="text-cyan-500">P</code> - Puente Aranda</p>
          <p><code class="text-cyan-500">Q</code> - Candelaria</p>
          <p><code class="text-cyan-500">R</code> - Rafael Uribe</p>
          <p><code class="text-cyan-500">S</code> - Ciudad Bolívar</p>
          <p><code class="text-cyan-500">T</code> - Indiferente o aplica a todas</p>
          <hr class="my-2 border-gray-500">
          <p><b><span class="text-mindaro">Campos especificos de inciativa</span></b></p>
          <p><span class="text-mindaro">* <code>title</code></span> - Nombre de la iniciativa</p>
          <p><span class="text-mindaro">* <code>resume</code></span> - Descripción de la iniciativa</p>
          <p><span class="text-mindaro">* <code>offer</code></span> - Que ofrece o comparte a la red de jóvenes la iniciativa</p>
          <p><span class="text-mindaro">* <code>author (name/email/phone)</code></span> - Datos del referente de la iniciativa</p>
          <hr class="my-2 border-gray-500">
          <p><b><span class="text-mindaro">Campos especificos de un reporte de desafio</span></b></p>
          <p><span class="text-mindaro">* <code>resume</code></span> - Descripcion del desafio</p>
          <p><span class="text-mindaro">* <code>offer</code></span> - Alguna propuesta frente a esta situación</p>
          <p><span class="text-mindaro">* <code>keywords</code></span> - Resumen del desafio, descripta en hasta dos palabras</p>
        </div>
      </template>
    </UAccordion>
    <br>
    <UAccordion v-if="!isLoading" :items="entries" color="white" variant="solid" multiple>
      <template #item="{ item }">
        <div class="ml-3 border-l border-gray-700 pl-3 py-2">
          <p class="font-bold">Respuesta</p>
          <pre class="whitespace-pre-wrap">{{ item.payload }}</pre>
        </div>
        <div class="ml-3 border-l border-gray-700 pl-3 py-2">
          <p class="font-bold">Stack Error</p>
          <pre v-if="item.errorTrace" class="whitespace-pre-wrap">{{ item.errorTrace }}</pre>
          <p v-else class="text-gray-500">No hay información de error</p>
        </div>
        </template>
    </UAccordion>
    <div v-else class="space-y-2">
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
    </div>
    <br>
    <div class="flex justify-between items-center">
      <p class="text-gray-600 text-sm">Total: {{ totalEntries }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalEntries" />
    </div>
  </div>

</template>
