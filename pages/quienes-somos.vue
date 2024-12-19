<script setup>
definePageMeta({
  layout: 'full-width'
})
useHead({
  title: '¿Quienes Somos?'
})

const team = [
 {
   "id": 1,
   "nombre": "Alejandro Jaimes",
   "equipo": "Bogota",
   "biografia": "Soy Alejandro Jaimes Bahamón, organizador de campañas socioambientales, parte de Sihyta, de la Plataforma Colombiana de Niñez y Juventud, de la Juventud Global por la Justicia Climática y el Festival de Cine Colombia Migrante. El trabajo colectivo y territorial debe ser la base de los cambios que estamos construyendo. Participación como delegado juvenil en el ACE Youth Hub Event, espacio oficial de Naciones Unidas sobre Cambio Climático y Accoón para el Empoderamiento Climático. Lo que me apasiona de Incidir para Existir es la diversidad de causas y la confluencia de procesos por la justicia social y los derechos humanos. Les invito a participar de Incidir para Existir para articular y aprender de la interrelación de las luchas sociales desde una perspectiva intergeneracional.",
   "linkedin": "https://www.linkedin.com/in/alejandro-jaimes-he-him-010588261/",
   "twitter": "",
   "instagram": "https://instagram.com/jb_alejandro66",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/01.jpg"
 },
 {
   "id": 2,
   "nombre": "Nikol Morales",
   "equipo": "Bogota",
   "biografia": "Soy Nikol Vanessa Morales Fonseca, tengo 19 años y soy estudiante de Comunicación Social y Periodismo en UNIMINUTO. Creo firmemente que, a través de mi profesión, puedo darle voz y visibilidad a quienes no la tienen. Actualmente, me desempeño como Community Manager en una empresa del sector vending. Lo que más me apasiona de Incidir para Existir es la energía y el compromiso de la juventud por generar un cambio real. Si sientes esas ganas de transformar, pero no sabes por dónde empezar, este es el lugar perfecto para dar ese primer paso.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/niky_morales12",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/02.jpg"
 },
 {
   "id": 3,
   "nombre": "Daniel Barco",
   "equipo": "Bogota",
   "biografia": "Mi nombre es Daniel Esteban Barco Yepes, tengo 29 años, soy emprendedor social, con habilidades en formulación y gestión de proyectos, networking y me gusta la participación política. Enseño desde el año 2016 el Método Matemático DEBY, la alternativa pedagógica para la enseñanza y el aprendizaje de las matemáticas, que es un proceso donde aprenderás otra forma de operar y llenarás vacíos que tienes en matemáticas. Soy cofundador de Artemática (2017) y Red Activa Juvenil (2021), participo en instancias mixtas y autónomas desde el año 2017, participé en la reformulación de la política pública distrital de juventud (2019 - 2030), fui delegado del comité operativo local de juventud del 2018 al 2023 y presidente del Consejo de planeación local de Kennedy en el año 2021, participé en el comité coordinador de la Semana de juventud de Kennedy del 2018 al 2023 y fui candidato al Consejo local de juventud de Kennedy en el 2021. Lo que me gusta de incidir para existir es que es una red conformada por personas que quieren transformar su realidad. Te invito a que seas parte de las juventudes que transforman.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/danielbarcodeby",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/03.jpg"
 },
 {
   "id": 4,
   "nombre": "Gabriela Alejandra Solórzano",
   "equipo": "Bogota",
   "biografia": "Como politóloga egresada de la Universidad Nacional de Colombia, experimenté de primera mano las dinámicas en torno a la violencia de género en el ámbito académico. Esta realidad me consternó profundamente y despertó en mí un interés genuino por los estudios de mujer y género, dichos estudios me brindaron las herramientas necesarias para comprender y abordar estas problemáticas. Motivada por la necesidad de crear un espacio seguro y solidario, junto a mis compañeras, fundamos la Mesa de Género de mi facultad, con el objetivo de visibilizar la violencia de género, generar espacios de diálogo y promover cambios significativos en nuestra institución. He tenido la oportunidad de participar en diferentes proyectos de investigación en torno al género, uno de estos dio como fruto, la producción de un libro próximo a publicarse, del cual soy coautora, este documento ha servido como insumo en la reestructuración del Protocolo de VBG en la UN. Realicé una especialización en Políticas Públicas y Justicia de Género, y hoy formo parte de la organización Tremendas. Aquí he tenido la valiosa oportunidad de involucrarme en discusiones cruciales sobre los desafíos que enfrentan niñas, adolescentes y jóvenes, generando contenido para redes y contribuyendo a la creación de proyectos enfocados en su bienestar. Este trabajo no solo me ha permitido aprender, sino también aportar para construir un futuro más justo para las mujeres y la juventud. Durante mi vida, mi compromiso con la equidad de género ha sido constante. Hoy, como participante juvenil de Incidir Para Existir, uso mi voz y mis conocimientos para fomentar el diálogo y la participación. Te invito a creer firmemente en el poder de las acciones colectivas y a formar parte de esta red para construir sociedades más justas e inclusivas. Acompañarnos en este proceso y siguenos en redes sociales.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/Gaby_solorzano_",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/04.jpg"
 },
 {
   "id": 5,
   "nombre": "Laura Camila Muñoz Amaya",
   "equipo": "Bogota",
   "biografia": "Soy profesional en lenguas modernas con énfasis en comunicación corporativa y digital, y mi pasión es la equidad de género. He participado activamente en iniciativas en mi municipio, Facatativá, y aspiro a integrarme en una organización dedicada a este importante tema. A lo largo de mi vida, he aprendido a ser consciente del entorno en el que vivo, de las dinámicas sociales y de los privilegios que no todos tienen. Estoy convencida de que podemos contribuir al cambio social, y que este cambio requiere perseverancia y colaboración a lo largo de generaciones. Creo firmemente que Incidir Para Existir es la red ideal para los jóvenes líderes como yo, que trabajamos desde diversas perspectivas para crear mejores oportunidades para nuestra generación. Es emocionante ver cómo buscamos impactar, incidir y transformar de manera integral, generando conexiones y amistades que nos apoyan y enriquecen. ¡Te invitamos a ser parte de nosotros!",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/default.png"
 },
 {
   "id": 6,
   "nombre": "Jefferson Mauricio Vargas Mompotes",
   "equipo": "Bogota",
   "biografia": "Activista y artivista diverso andino-amazónico radicado en Bogotá, apasionado por los asuntos de género, diversidad y territorio. Profesional en derecho defensor de los derechos humanos y promotor de la participación juvenil. Movilizar el baile para la sensibilización de los derechos humanos de la población diversa. Soy abogade con experiencia en formulación de proyectos, control social y político, defensa de derechos de mujeres, personas diversas y jóvenes. Fui formulador de “Al son que me toquen bailo”, proyecto seleccionado en la convocatoria “Jóvenes por el cambio – 2023” por el Ministerio de Cultura. Me apasiona de incidir para existir la posibilidad de impactar con acciones para fomentar el cuestionamiento que conduzca a la construcción de cultura ciudadana. Mi llamado se centra en la posibilidad de “ser” es, a través, del hacer y se puede “hacer”, si somos más.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/jeff_momp",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/06.jpg"
 },
 {
   "id": 7,
   "nombre": "José Emmanuel Vergara",
   "equipo": "Bogota",
   "biografia": "Tengo 20 años y soy un joven apasionado por las causas sociales. Mi experiencia abarca tanto el sector público como el privado, lo que refleja mi dedicación a mejorar la sociedad desde diferentes frentes. Actualmente, soy Director Nacional de Juventud para Colombia en la Red Mundial de Jóvenes Políticos, donde trabajo para impulsar el protagonismo juvenil en la política y el cambio social. Además, soy asesor en Goyn Bogotá, contribuyendo a crear oportunidades para los jóvenes con alto potencial. Tuve el honor de coordinar \"Parche con el Congreso\", una innovadora iniciativa promovida por la Primera Vicepresidencia de la Cámara de Representantes, que busca estrechar lazos entre los jóvenes y los procesos legislativos. Como resultado, logramos visitar siete departamentos y redactar cuatro borradores de proyectos de ley. Fui ciclista profesional, destacándome durante cuatro años consecutivos en la \"Noche de los Mejores\". Esta experiencia me enseñó el poder transformador del deporte, lo que me llevó a fundar un equipo profesional de ciclismo femenino con el objetivo de empoderar a las mujeres a través del deporte. Soy un ejemplo de cómo la pasión por la justicia social y el compromiso con la comunidad pueden moldear una carrera prometedora, mientras busco inspirar a otros a seguir este camino.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/1Jose_vergara",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/07.jpg"
 },
 {
   "id": 8,
   "nombre": "Anyela S. Valencia E",
   "equipo": "Bogota",
   "biografia": "Describirme siempre es el reto de mi vida. Soy una joven que está aprendiendo a ser aventurera, adulta, disciplinada, líder, audaz y, sobre todo, a abrazar mi rebeldía con la convicción de que está bien incomodarse para cambiar lo que es aceptable para otros, pero no para mí. Soy la cuarta de los hijos de mi hermosa madre y la primera mujer de la familia en ingresar a la universidad para estudiar algo que yo escogí. Como el aprendizaje de la vida continúa, finalizo diciendo: soy cuasi abogada, con un diplomado en gobernanza, estrategia y gestión de proyectos, técnica en mercadeo, y muy buena para moderar conversatorios o espacios y hacer videos.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/08.jpg"
 },
 {
   "id": 9,
   "nombre": "Duver Sánchez",
   "equipo": "Bogota",
   "biografia": "¡Hola a todos! Mi nombre es Duver Sánchez, soy tan tolimense como el tamal con copete, con un firme propósito: potenciar proyectos de vida, lo cual me ha llevado a liderar proyectos de innovación social a nivel nacional e internacional. Me apasiona el liderazgo transformacional, lucho por la reducción de las desigualdades y trabajo para posibilitar más oportunidades para todos. Soy parte de INCIDIR PARA EXISTIR porque creo en el poder de la ejecución y en el arte del empoderamiento, y eso me mueve muchísimo. Si les contara cuál es mi mayor logro, les relataría las historias de varias personas que me han dado un abrazo gigante en modo de agradecimiento, mientras yo siento que cada esfuerzo ha valido la pena, así que les invito un café para disfrutar nuestras existencias.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/duversanchz",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/09.jpg"
 },
 {
   "id": 10,
   "nombre": "Alejandro Medina",
   "equipo": "Bogota",
   "biografia": "Hola soy Alejandro Medina Rubiano, me caracterizó por ser un joven preguntón, me gustan los retos y sobre todo las transformaciones, apasionado por la literatura y el diseño de modas, fiel creyente de dar el primer paso. Uno de los momentos que marcó mi camino en el liderazgo fue en 2016, cuando fui personero de mi colegio, liderando la pedagogía sobre los acuerdos de paz y organizando el plebiscito estudiantil en el marco del plebiscito nacional. En 2019 y 2021, durante las protestas sociales, participé en diálogos junto a otros líderes y activistas para construir país. Soy politólogo de profesión y he dirigido proyectos enfocados en la educación para la paz, creando oportunidades para los jóvenes. Considero como uno de mis mayores logros el intentar devolverle a la juventud, especialmente a aquellos en situación de vulnerabilidad, la capacidad de soñar. En Incidir para Existir, lo que más me inspira son las causas, las personas y la oportunidad única de construir país desde la diferencia. Mi mensaje para los jóvenes es creer en un país de oportunidades. Si dejamos de encontrarnos, dejaremos de encontrar soluciones. Al igual que Sísifo, debemos imaginar un futuro diferente y trabajar para hacerlo realidad.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/default.png"
 },
 {
   "id": 11,
   "nombre": "Jennifer Neira",
   "equipo": "Bogota",
   "biografia": "Mi nombre es Jennifer Neira, soy de Bogotá y estoy culminando mi carrera en Historia. A lo largo de mi vida he trabajado en diversos sectores (informales, formales e institucionales). Actualmente, hago seguimiento de proyectos y trabajo para el Ministerio de Defensa, además de hacer turnos en un espacio cerca del Parque de los Hippies. Lo que más me define es mi interés por el trabajo comunitario. Aunque en este momento no puedo dedicarle tanto tiempo como me gustaría, mantengo vivo el sentimiento de ayudarnos mutuamente en comunidad. He trabajado con ONG’s, fundaciones, grupos estudiantiles, juveniles, barriales y feministas, impulsando proyectos para la construcción de paz. Juntos, hemos creado espacios, organizado ollas comunitarias y desarrollado iniciativas de resolución de conflictos, entre otros. A veces no reconozco del todo mis logros personales, pero en ciertos momentos me siento orgullosa de mantenerme fiel a quien soy, con una visión crítica de la vida que no cambiaría por nada. Profesionalmente, he finalizado varios proyectos y comenzado otros nuevos. Este año, uno de mis mayores logros ha sido ingresar al Ministerio de Defensa. A pesar de no compartir muchas de las visiones de las fuerzas armadas, ha sido una experiencia enriquecedora que me ha permitido aprender de los contrastes. Participar en proyectos como el seguimiento al paro cívico de Buenaventura ha reforzado mi compromiso con la resolución de conflictos, un área a la que he dedicado gran parte de mi vida. Otro proyecto que valoro profundamente es mi participación en Incidir para Existir. Este espacio ha sido clave para abrir muchas puertas tanto en lo profesional como en lo personal, permitiéndome compartir con jóvenes que tienen una visión común. Las conversaciones y proyectos que hemos realizado han contribuido a moldear mi perspectiva, y más allá del trabajo, el ambiente de camaradería ha hecho que sea un placer formar parte de este grupo. Incidir para Existir es un espacio que amplía no solo la hoja de vida, sino también la visión de la vida y de parche. ¡Los invito a que se unan, aquí siempre abrimos la puerta!",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/11.jpg"
 },
 {
   "id": 12,
   "nombre": "Eliana González",
   "equipo": "Bogota",
   "biografia": "Soy Eliana González, Comunicadora social y Periodista de derechos humanos, activista femista y Directora de la Fundación Mamacitas en bici. He desarrollado proyectos de innovación social con mujeres víctimas de violencias basadas en género desde el reconocimiento de la movilidad del cuidado, la movilidad sostenible, la comunicación popular, las maternidades feministas, el arte y el emprendimiento. He sido ganadora de varios premios entre esos el premio distrital 'Defensores de Paz' 2022 en la categoría defensores de Derechos humanos de las mujeres, de la Secretaría de Gobierno, el premio distrital a las Gestión Cultura 2023 y el premio a la 'Publicación digital de textos, memorias e investigaciones sobre mujeres en el sector Cultural y Creativo en Bogotá' 2023 de la Secretaría de Cultura, Recreación y Deporte. Creo que incidir en nuestras comunidades es la única forma que tenemos las activistas de crear apropiación, cambiar el contexto y hacernos visibles. Hacer gestión cultural no es sencillo y requiere de la unión y motivación de jóvenes como tú, que cada día elevan sus voces por cambiar el sistema.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/jenn.aeresdegracia",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/12.jpg"
 },
 {
   "id": 13,
   "nombre": "Mateo Alejandro Vera Ramírez",
   "equipo": "Bogota",
   "biografia": "Soy Mateo Alejandro Vera Ramírez, un apasionado Administrador Público y Director de Proyecto con un firme compromiso de transformar la sociedad a través del empoderamiento de los jóvenes. \"Somos más los jóvenes que queremos transformar que figurar\" - Este lema resume mi filosofía de trabajo y mi dedicación a hacer una diferencia real en la vida de los demás. A lo largo de mi carrera, he tenido el privilegio de desempeñar diversos roles que han enriquecido mi experiencia y habilidades. He sido Practicante en la Dirección de Apoyo Fiscal del Ministerio de Hacienda y Crédito, Apoyo Distrital en la Subdirección de Parques del Instituto Distrital de Recreación y Deporte, Servidor Público en la Unidad de Gestión de Pensiones y Parafiscales, y Profesionista en el Equipo de Estadística de la Superintendencia del Subsidio Familiar. Actualmente, me desempeño como Director de Proyectos de la Fundación Verez y Saberes. Me siento orgulloso de haber recibido varios reconocimientos por mi trabajo, incluyendo el Premio Solos Juventud 2023 de la Secretaría de Integración Social, el Premio Constructores de Paz de la Secretaría de Gobierno, y haber sido electo Consejero de Juventud por la práctica organizacional Pioneros. Además, soy miembro activo de la Red Kolimbiem y del Grupo de Asesores Jóvenes de GOYN Bogotá. Me apasiona inspirar y empoderar a los jóvenes para que se conviertan en agentes de cambio positivo en sus comunidades, y contribuyan a la construcción de una sociedad más justa, equitativa y sostenible. ¡Únete a nuestra misión de transformar vidas y comunidades! Te invito a participar en nuestros proyectos e iniciativas, y a sumar tu voz a nuestra lucha por un futuro mejor. Juntos, podemos hacer la diferencia y crear un impacto duradero. ¡Conéctate conmigo en las redes sociales!",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/maverez",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/13.jpg"
 },
 {
   "id": 14,
   "nombre": "Diana Gómez",
   "equipo": "Bogota",
   "biografia": "Mi nombre es Diana Gómez, soy abogada, defensora de DDHH, trabajo por los Derechos de los sectores LGBTIQ+ y las personas que viven con Vih; mi vida cambio cuando enfoque mis conocimientos en el trabajo comunitario, me enseño que los abogados podemos hacer más cosas que estar en una oficina con traje. Actualmente hago parte del equipo de incidencia de la Corporación Red Somos y hago mis estudios en Derecho Constitucional. Incidir para existir es la oportunidad perfecta de compartir mi experiencia con otros jóvenes y lo más importante aprender de los procesos que ellos lideran, para trabajar juntos en red por las necesidades de las juventudes. Si tu eres un jóven que hoy me está leyendo, anímate a ser parte de nuestra Red, aquí todos estamos aprendiendo, y aportamos ideas, acciones, etc.  y haciendo de Colombia un mundo más amable.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/dianargr_",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/14.jpg"
 },
 {
   "id": 15,
   "nombre": "Cristian Arley Avellaneda Estupiñan",
   "equipo": "Bogota",
   "biografia": "Me llamo Cristian Arley Avellaneda Estupiñan. Soy un sociólogo apasionado por comprender las diferencias sociales que ocurren en la sociedad y soñar en transformarlas  para que haya más equidad en un país profundamente desigual y en esencia esto es incidir para existir, soñar que algún día vamos a transformar de algún modo algo de la vida de nuestra juventud. Recuerda que no hay una manera de incidir, desde tu arte, tu conciencia o tu estudio puedes aportar. Ven y hagamos equipo para cambiar nuestra realidad como jóvenes y la de los que vienen en camino.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/15.jpg"
 },
 {
   "id": 16,
   "nombre": "Alisson Castellanos",
   "equipo": "Bogota",
   "biografia": "Soy Alisson Castellanos, Trabajadora Social apasionada por el trabajo con jóvenes, especialmente en temas de inclusión laboral, salud mental y proyectos artísticos. Me encanta el rock, el metal y la electrónica, y disfruto compartir tiempo con mi familia y amigos en cualquier plan. Trabajar con jóvenes para mí significa innovación, acción, revolución, compromiso y confianza. Soy egresada de la Unimonserrate, con estudios en diseño UX en Unicafam y Google. También he participado en varios grupos de teatro, lo que ha enriquecido mi experiencia personal y profesional. De Incidir para Existir me inspira el deseo de generar un cambio real, el trabajo en colectivo, la persistencia, el compromiso y la fe en que podemos construir un mejor futuro para las juventudes. Si quieres ser parte de esta transformación, marcar la diferencia en tu generación y comunidad, te invito a unirte a Incidir para Existir. Es un espacio donde podrás alzar tu voz y sentir la libertad de impulsar el cambio que deseas ver.",
   "linkedin": "https://www.linkedin.com/in/alisson-castellanos-camargo/",
   "twitter": "",
   "instagram": "https://www.instagram.com/suis_aliz/",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/16.jpg"
 },
 {
   "id": 17,
   "nombre": "Heidy Tatiana Simbaqueva Cardenas ",
   "equipo": "Bogota",
   "biografia": "Soy Heidy Tatiana Simbaqueva Cardenas, una joven apasionada por generar cambios sociales significativos desde una edad muy temprana. Desde niña, he sentido el deseo de contribuir a un mundo con menos violencia, desigualdad y más oportunidades educativas para los niños. Con un corazón enfocado en el trabajo en equipo, siempre busco impulsar acciones que promuevan un cambio estructural en beneficio de todos.\"El cambio es colectivo. No hay nada más gratificante que un niño te abrace y dé las gracias después de una actividad educativa.\"  Actualmente, estoy cursando Derecho en la Universidad La Gran Colombia, donde obtuve una beca por mérito académico. Además, he sido becada en un programa técnico de plataformas digitales y aplicaciones, lo cual me ha permitido liderar proyectos que benefician a diversas comunidades. Uno de mis logros más importantes ha sido representar a mi localidad como delegada de la Plataforma Distrital de Juventud por San Cristóbal Sur, liderando acciones en pro de la juventud. También cuento con un curso en derechos humanos, un diplomado liderazgo comunitario y otro en participación política para las juventudes , así mismo formo parte de la Plataforma Local de Juventud La Candelaria desde 2023. Mi experiencia en Incidir para Existir ha sido transformadora, ya que me ha permitido no solo materializar mis ideas, sino también motivar a otros jóvenes a tomar acción. Aquí, he encontrado un espacio donde puedo demostrar y así mismo darme cuenta que, tengo mucho que aportar para construir un futuro mejor. Me apasiona saber que, con cada pequeño paso, estamos contribuyendo a un cambio mayor.  Te invito a unirte a Incidir para Existir y ser parte de este movimiento. No te conformes con ser solo un espectador, sé un agente activo de cambio en tu comunidad y en la sociedad.",
   "linkedin": "https://www.linkedin.com/in/simbaquevacardenas/ ",
   "twitter": "",
   "instagram": "https://instagram.com/tatta_2002_25",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/17.jpg"
 },
 {
   "id": 18,
   "nombre": "Santiago Rodríguez Vásquez",
   "equipo": "Bogota",
   "biografia": "Creo firmemente en la capacidad humana para crear futuros valiosos. La juventud, que enfrenta y supera los retos, transforma las dificultades en oportunidades para mejorar, habilitando condiciones para una existencia en paz. A pesar del constante asedio de la guerra, prevalece la voluntad de los jóvenes de decir \"nunca más\", mostrando con su ejemplo y persistencia que otro camino es posible. Mi formación comenzó en el movimiento social desde la secundaria, donde me enfoqué en la Educación para la Paz. Hoy, sigo en el proceso de profesionalización en Ciencia Política, comprometido con este propósito. El mayor logro de la juventud colombiana es Existir. En Incidir para Existir, me he encontrado con personas poderosas, y esa juntanza es testimonio de las verdades que este país necesita escuchar. Esa unión me apasiona profundamente. Si la marcha se vuelve dura, los duros seguimos adelante. Siempre en defensa de la Paz y la Vida.",
   "linkedin": "",
   "twitter": "https://x.com/Santiago_RVlta",
   "instagram": "https://www.instagram.com/santiago_rogvaz/",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/18.jpg"
 },
 {
   "id": 19,
   "nombre": "Daniela Silva Solano",
   "equipo": "Bogota",
   "biografia": "Politóloga de la Universidad Jorge Tadeo Lozano. Exrepresentante de la Carrera de Ciencia Política y Gobierno. Actualmente trabajo como asesora legislativa en temas de juventud y ambiente. Activista ambiental y por los derechos de las mujeres desde el 2018. Posteriormente integré la Veeduría de Emergencia Climática de Bogotá, en la cual, en el año 2022 fuimos ganadores del Premio al Control Social de Bogotá. La participación incidente es la puerta de entrada para exigir el resto de nuestros derechos. Hoy mas que nunca es necesario que el movimiento social, barrial, feminista, ambiental y popular continue luchando en las calles, pero también en las instancias de interlocución con actores institucionales. \"Hay muchos caminos posibles por andar para construir el futuro que soñamos\"",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/19.jpg"
 },
 {
   "id": 20,
   "nombre": "Cindy Giovanna Jiménez Pulido",
   "equipo": "Bogota",
   "biografia": "Soy Cindy Giovanna Jiménez Pulido (Gio), una líder juvenil, firmante legataria de la Comisión de la Verdad, vestuarista y actriz del grupo Nemkatacoa Teatro. A través de los oficios, utilizo un enfoque pedagógico para trabajar en proyectos clave de agendas ciudadanas como la Red \"Somos Generación de Verdad\" en Bogotá, Soacha y Sumapaz, y la Red \"Generación V+\" a nivel nacional. He colaborado con diversas poblaciones en contextos con un enfoque diferencial. Mi trayectoria incluye la participación en la consulta nacional de niñas, niños, adolescentes y jóvenes con la Comisión de la Verdad, la creación del \"Telar del Gran Latido de la Verdad\", y la facilitación de talleres de memoria viva. Además, soy estudiante universitaria, con formación en serigrafía y cocina. Me apasiona la fuerza de las juventudes y su capacidad para transformar el mundo. ¡Te invito a unirte a esta gran familia de cambio y movilización por lo que es justo!",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/ivanna_invertebrada",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/20.jpg"
 },
 {
   "id": 21,
   "nombre": "Juana Fuentes",
   "equipo": "Bogota",
   "biografia": "Soy Juana Fuentes boyacense, egresada de la U. Nacional y viviendo actualmente en Bogotá. Me inspira trabajar por el impacto que tiene la voz de la gente en las decisiones de carácter público. Trilingüe y experiencia como Project Manager de más de 3 años en proyectos de impacto social en salud sexual y reproductiva y salud comunitaria en los territorios. Ex Representante Estudiantil de la Universidad Nacional y Coordinadora de Proyectos de la Organización Autogestionada Voces en Red.  Me apasiona visualizar y ejecutar los alcances que la co -creación logra donde varias personas con distintas ideas e iniciativas buscan un objetivo en común. Si te indignan los problemas diarios de la juventud y la sociedad y has intentado buscar un lugar en donde tus ideas incidan y se conecten con iniciativas creadas por líderes sociales con experiencia, Incidir para Existir es el lugar indicado.",
   "linkedin": "",
   "twitter": "https://x.com/Juanafuemar",
   "instagram": "https://instagram.com/Juanafuemar",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/21.jpg"
 },
 {
   "id": 22,
   "nombre": "Cristian Sinisterra",
   "equipo": "Cali",
   "biografia": "Soy abogado bilingüe con dominio del inglés y una firme pasión por los Derechos Humanos y la participación política juvenil. Mi formación incluye un diplomado en Litigio Estratégico con énfasis en Derechos Humanos, lo que me ha permitido consolidarme como un líder social independiente, comprometido con transformar mi entorno. Colaboro con diversas ONGs, como De Frente por Jamundí, el Colectivo Baraste, fundación Generación Restauradores y la Fundación Bochinche. Mi principal motivación surge de las profundas desigualdades educativas que he visto. He participado en proyectos y programas clave, como el Programa de Fortalecimiento de la Función Pública en América Latina, el Modelo de Congreso Estudiantil Universitario 2022, Jóvenes Veedores y Métele Pedal a Tu Futuro. Mi experiencia internacional incluye formación en instituciones como The George Washington University, Universidade da Beira Interior y la Universidad Nacional, donde me especialicé en Enfoque Étnico Diferencial y Pluralismo Jurídico. Durante los últimos 3 a 6 años, he impactado directamente a entre 31 y 60 personas, trabajando en la promoción del liderazgo juvenil, la participación ciudadana y la educación, enfocándome especialmente en jóvenes y comunidades étnicas. Mi visión es clara: la unión y el trabajo en conjunto son el camino para enfrentar los desafíos que nuestra juventud y sociedad enfrentan. Creo en \"incidir para existir\", y mi pasión radica en sumar fuerzas para construir un presente y futuro mejor para todos. Te invito a unirte a esta misión y dar lo mejor de nosotros para transformar nuestras comunidades. Juntos podemos marcar la diferencia.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/22.jpg"
 },
 {
   "id": 23,
   "nombre": "Valeria Riaños Correa",
   "equipo": "Cali",
   "biografia": "Soy profesional en estudios políticos y resolución de conflictos. Investigadora, con experiencia en procesos de construcción de gobernanzas territoriales, formación ciudadana, apropiación social del conocimiento e incidencia política. Mucho más que esto, soy todos los mundos que me habitan. Soy mujer, soy jamundeña, soy joven. Convencida de que solos podríamos hacer las cosas más rápido, pero que juntos llegamos más lejos por eso hago parte Incidir para existir; porque sé que nadie es más inteligente que todos nosotros juntos y porque entiendo que, \"el mundo es eso. Un montón de gente, un mar de fueguitos”. Si al igual que yo crees que no todo está perdido, que aún tenemos mucho por construir en nuestra región y sientes que lo harías mejor en equipo, te invito a que caminemos juntos en Incidir para Existir.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/23.jpg"
 },
 {
   "id": 24,
   "nombre": "Marlon Smith Panameño Mosquera",
   "equipo": "Cali",
   "biografia": "Soy Marlon Smith Panameño Mosquera, un joven que se piensa la posibilidad de soñarse un mundo mejor, y que ese mundo sea a través del tejido comunitario. Crecí en una comunidad amable y responsable que apela por el bien y el cuidado de los demás, he de allí mi buen carisma y respeto por quien está al lado mío. Durante mi juventud he crecido en espacios que han marcado mi vida y me han convertido enquien soy ahora. Soy un enamorado por la fotografía y las producciones audiovisuales, me gusta expresar los sentimientos a través y humanizar aquello que calla ante nuestros ojos. ",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://instagram.com/smith_stelyphotos",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/24.jpg"
 },
 {
   "id": 25,
   "nombre": "Sebastián Maya Aguirre",
   "equipo": "Cali",
   "biografia": "Soy líder social y ambiental, de formación trabajador social, con más de 10 años de experiencia en la promoción de la participación juvenil y la transformación territorial en contextos rurales. Desde joven, he trabajado por la protección ambiental y el fortalecimiento de la identidad cultural en el corregimiento de Pichindé y los Farallones de Cali. He liderado el Grupo Juvenil Bichos, con el que organizamos el primer Festival Ambiental y Cultural Farallones, y he trabajado en proyectos clave como Tejiendo Rural y Cali Incluyente, donde promovimos el arte y la participación comunitaria en zonas rurales.  Además, he sido seleccionado para representar procesos de educación ambiental a nivel nacional, participando en la Cumbre Nacional de Educación Ambiental. Me apasiona Incidir Para Existir porque brinda la oportunidad de fortalecer la incidencia política juvenil y generar soluciones reales para nuestras comunidades desde el liderazgo juvenil. Haz parte de Incidir Para Existir y transforma junto a nosotros las realidades de nuestras comunidades, creando un futuro lleno de oportunidades.",
   "linkedin": "https://co.linkedin.com/in/sebastian-maya",
   "twitter": "https://x.com/Sebas_Mayaa",
   "instagram": "https://www.instagram.com/sebas.maya",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/25.jpg"
 },
 {
   "id": 26,
   "nombre": "Luis Javier Tovar Murillo",
   "equipo": "Cali",
   "biografia": "Luis Javier Tovar Murillo es un joven de 22 años de Cali, Valle del Cauca. Estudiante de la carrera de Administración Pública en la Universidad del Valle. Activamente trabaja en proyectos comunitarios enfocados en el desarrollo de la juventud y la resolución de conflictos, aportando positivamente en la participación e incidencia de sectores históricamente vulnerados.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/26.jpg"
 },
 {
   "id": 27,
   "nombre": "Alexandra Zapata González",
   "equipo": "Cali",
   "biografia": "Hola, soy Alexandra Zapata González, Profesional en Filosofía y Trabajadora Social de la Universidad del Valle. Me dedico a la investigación y la intervención comunitaria y educativa con una profunda pasión por la equidad y la justicia social. Soy fundadora y representante legal de la Fundación Melchor Zapata e integrante de la Colectiva Feminista Cristina Bautista. A lo largo de mi trayectoria, he participado como ponente en eventos académicos y formado parte de grupos de teatro a nivel local. Como docente de secundaria, me enfoco en diversas asignaturas relacionadas con las Ciencias Sociales. Me esfuerzo por crear un ambiente en el que mis estudiantes puedan reflexionar profundamente sobre su vida y su contexto. Además, he trabajado para fortalecer el liderazgo y la defensa de derechos de mujeres campesinas y reincorporadas, y he implementado estrategias para apoyar a estudiantes universitarios en su desarrollo académico y personal. Entre mis logros se destacan haber obtenido un trabajo de grado meritorio en Filosofía y haber sido becaria de la Fundación Carolina. Lo que más me apasiona de “Incidir para existir” es colaborar con jóvenes diversos para construir una sociedad más justa y equitativa. Creo que nuestra juntanza no solo enriquece nuestras perspectivas, sino que también fortalece nuestro compromiso con el cambio social. Cada uno de nosotros aporta experiencias y conocimientos únicos que, al combinarse, nos permiten abordar de manera innovadora los desafíos que enfrentamos. Juntos, estamos creando un espacio en el que nuestras voces son escuchadas y nuestras ideas tienen el poder de transformar nuestras comunidades hacia un futuro más inclusivo y equitativo. Vení, te invitamos a unirte a esta juntanza para que continuemos transformando nuestros territorios.",
   "linkedin": "https://www.linkedin.com/in/alexazgmn/",
   "twitter": "",
   "instagram": "https://www.instagram.com/alexazgmn/",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/27.jpg"
 },
 {
   "id": 28,
   "nombre": "Luis Carlos Meluk Ulabarri",
   "equipo": "Cali",
   "biografia": "Soy Luis Carlos Meluk Ulabarri, un joven líder de Buenaventura, Colombia. Me defino como una persona proactiva y comprometida con el cambio social y la justicia. Mi pasión por la gestión y el liderazgo me impulsa a buscar siempre soluciones innovadoras y efectivas en cada desafío que enfrento. Soy abogado de la Universidad Santiago de Cali, con formación adicional en Justicia Transicional y Protección de los Derechos de las Víctimas, y un diplomado en Liderazgo en Cultura Democrática y Gobernanza Estratégica. Mi educación se complementa con estudios en la Universidad de Salamanca y la Universidad de los Andes. He trabajado en proyectos comunitarios, demostrando habilidades de gestión y un fuerte compromiso ético. Fui elegido como uno de los 10 mejores congresistas estudiantiles del país en el XXXVII Modelo Congreso de la República Estudiantil 2023. Participé activamente en la Clínica Jurídica en Derechos Humanos de la Universidad Santiago de Cali, contribuyendo con observaciones a la Corte Interamericana de Derechos Humanos sobre la reelección presidencial indefinida. He sido becario Martin Luther King por la Embajada de los Estados Unidos y el Colombo-Americano, y formo parte de la Red de Servidores Públicos en Latinoamérica de la Fundación Botín. Lo que me apasiona de incidir para existir es el potencial transformador de las herramientas y estrategias que tenemos a nuestra disposición. Creo firmemente que los cambios significativos en la sociedad no se logran de manera individual, sino en colaboración con jóvenes igualmente apasionados y comprometidos. Juntos, podemos utilizar nuestras habilidades y conocimientos para crear un impacto real y positivo.",
   "linkedin": "https://co.linkedin.com/in/luis-carlos-meluk-ulabarri-417014207",
   "twitter": "https://x.com/melukcarlos",
   "instagram": "https://www.instagram.com/carlosmeluk",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/28.jpg"
 },
 {
   "id": 29,
   "nombre": "Carolina Caicedo Restrepo",
   "equipo": "Cali",
   "biografia": "Trabajadora Social Especialista en Educación en Derechos Humanos. Directora de la Fundación Siembra Comunidad y Delegada Departamental de la Plataforma Distrital de Juventudes. Soy una mujer joven, negra Activista por la defensa de los derechos de las mujeres y los niños, apasionada por ayudar a las poblaciones más vulnerables, apasionada por el servicio, la lectura, los Viajes y soy si a todo aunque estoy cambiando. Hace más de 12 años vivimos un episodio de violencia muy fuerte que nos llevó a desplazarnos de nuestro hogar, desde ese momento me dije y me propuse que lucharía para que ningún niño tuviera que pasar por lo mismo ni sus familias, por eso hoy soy Trabajadora Social la profesión que me ha permitido ayudar a otros. Aparte de ser profesional Especializada he realizado diferentes diplomados y cursos que fortalecen mis capacidades y los conocimientos que tengo. Laboralmente me he desempeñado tanto en el sector Público como en el Privado y actualmente trabajo en una Fundación como directora y para un proyecto en la alcaldía. Entre mis logros más preciados está culminar la universidad, ser reconocida como Egresada destacada, ganarnos con mi dirección en la Fundación Siembra Comunidad el premio Cívico por una Ciudad Mejor, Lograr llegar a la delegación departamental de juventudes. Me apasiona la capacidad que tenemos para trabajar en equipo, las ideas que nos surgen pero sobre todo la diversidad y la experiencia que tenemos cada una de las personas que somos parte de Incidir para Existir. Mi llamado a la acción es que se unan a está red que está dejando huellas en el caminar a través de cada acción en calle y Territorio y que la invitación es que más personas se unan para seguir construyendo y avanzando en colectivo.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/29.jpg"
 },
 {
   "id": 30,
   "nombre": "Giovanni Alfredo Narváez Jiménez",
   "equipo": "Cali",
   "biografia": "Soy Giovanni Alfredo Narváez Jiménez, estudiante de Derecho en la Universidad Santiago de Cali, actualmente en proceso de especialización en contratación estatal. Trabajo en la Gobernación del Valle, en la Secretaría de Desarrollo Social y Participación, y tengo una profunda vocación por ayudar. Me apasiona contribuir al bienestar de las personas, especialmente de la juventud, y busco incidir positivamente en nuestras comunidades y políticas. Estoy comprometido con utilizar el Derecho como una herramienta para generar cambios reales y construir un futuro más equitativo. Creo en el poder de la acción colectiva y en la importancia de estar presentes para aquellos que más nos necesitan.",
   "linkedin": "https://www.linkedin.com/in/giovanni-alfredo-narvaez-jimenez-a54177282",
   "twitter": "",
   "instagram": "https://www.instagram.com/giovanni.nvz23",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/default.png"
 },
 {
   "id": 31,
   "nombre": "Lian Ghelly Montealegre",
   "equipo": "Cali",
   "biografia": "Soy una joven caleña apasionada por la política y el activismo, comprometida con transformar mi comunidad desde la participación ciudadana y el liderazgo. Creo profundamente que podemos recuperar la alegría sin perder la indignación, manteniendo la convicción de que un cambio es posible. Actualmente soy estudiante de Ciencia Política en la Pontificia Universidad Javeriana de Cali, además de ser egresada del programa de liderazgo Ignaciano AUSJAL. Como Consejera de Juventud de Santiago de Cali y fundadora de la Corporación ALEGRE, trabajo cada día para empoderar a los jóvenes y fomentar su participación activa en la construcción de un mejor futuro. Para mí, Incidir para Existir significa enamorarse del servicio y adquirir las herramientas necesarias para materializar ese compromiso. Creo firmemente que los jóvenes no solo soñamos con una Cali diferente, ¡la estamos construyendo!",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://www.instagram.com/lianmontealegre",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/default.png"
 },
 {
   "id": 32,
   "nombre": "Angela Maria Del Carmen Portilla León",
   "equipo": "Cali",
   "biografia": "También conocida como Amatista. Tengo 26 años,  nacida en Pasto, Nariño, soy Trabajadora Social de la Universidad del Valle y tallerista en perspectiva y enfoque de género; formo parte de la Colectiva Feminista Cristina Bautista, soy activista feminista y defensora de derechos sexuales y reproductivos. Desde muy pequeña, la labor comunitaria de mis padres me inspiró y desde ahi mi trayectoria incluye experiencias en grupos artísticos y sociales. En 2017 llego a la ciudad de Cali y a lo largo de mi carrera empiezo mi lucha por la defensa de la universidad pública; y como sobreviviente de violencia basada en género, empiezo a trabajar como defensora de los derechos de las mujeres. He participado en foros y conferencias sobre violencias basadas en género, salud mental, trabajo comunitario, y derechos sexuales y reproductivos. También he facilitado talleres informativos y pedagógicos sobre violencia de género en diversas comunidades de Pasto y Cali. Me apasiona de \"Incidir para Existir\", la oportunidad de trabajar con juventudes diversas que aportan perspectivas frescas y amplias a la hora de plantear nuestras necesidades. Me motiva la energía y el compromiso de quienes conforman esta red, y la apuesta por un futuro y un presente más justo y digno.",
   "linkedin": "https://www.linkedin.com/in/angela-portilla-leon-/",
   "twitter": "",
   "instagram": "https://www.instagram.com/a_matist_a/",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/32.jpg"
 },
 {
   "id": 33,
   "nombre": "Hingry Lizetd Dagua Restrepo",
   "equipo": "Cali",
   "biografia": "Soy trabajadora social, me gusta la naturaleza, los animales, hacer ejercicio. Desde mi profesión puedo trabajar con todas las poblaciones y desde diferentes enfoques. Me gusta mucho la salud mental enfoque en el que me desempeño actualmente, también he realizado curso en formulación de proyectos. De Incidir para Existir me gusta lo amables que son los compañeros, que hay una diversidad de profesionales, las reuniones que son de aprendizaje y de bienestar. Invito a las personas que se den la oportunidad de conocer  las actividades que realiza Incidir para Existir, donde un grupo de personas buscan aportar al bienestar de los jóvenes, donde es posible expresar ideas y realizar iniciativas para aportar a la Ciudad.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://www.instagram.com/lizrestrepo",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/33.jpg"
 },
 {
   "id": 34,
   "nombre": "Daniela Valencia-Valor",
   "equipo": "Cali",
   "biografia": "Soy Daniela Valencia-Valor y creo que la formación académica debe servir a la justicia social. De lo contrario, es sólo una acumulación de conocimiento sin ética, ni sensibilidad.  En la universidad, cofundo el Grupo Estudiantil de Sociología - GES para traducir el lenguaje sociológico en uno que todas las personas podamos usar para dar sentido a la experiencia social y para visibilizar todas las formas de opresión, especialmente raciales y de género. Desde ahí, todo lo que he construido con mi profesión ha buscado crear impacto para la justicia social. En ese camino, he conseguido financiación para que jóvenes talentosos en situación de vulnerabilidad estudien en una universidad, y he implementado procesos de incidencia en escuelas con estudiantes. En IPX ahora tengo una red con la cual puedo continuar amplificando ese impacto y en la que he hecho amigos y amigas con un profundo interés en contribuir con la justicia no sólo social, sino también ambiental. He aprendido tanto aquí y sé que otras personas también podrán hacerlo. ¡Bienvenidxs!",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/34.jpg"
 },
 {
   "id": 35,
   "nombre": "Valeria Castañeda Rojas",
   "equipo": "Movilizatorio",
   "biografia": "Disfruto mucho leer, cocinar y viajar, y siempre estoy dispuesta a aprender algo nuevo. Me encanta inscribirme en cursos de todo tipo; el año pasado tomé uno de cocina, este año hice uno de cerámica, y estoy a punto de comenzar uno sobre panadería. También me gusta caminar, especialmente en la naturaleza, y me considero muy paciente y una buena escuchando a los demás. Posdata me encantan los gatos. Politóloga con énfasis en Integración al Sistema Internacional y especialización en Cooperación y Gestión Cultural Internacional, actualmente cursando maestría en Ciencias Políticas y Gestión Pública, con más de 3 años de experiencia trabajando en el sector público y privado. Me emociona trabajar junto a personas tan fuertes y con ideales tan sólidos. Cada día aprendo más sobre mi ciudad y sobre quienes forman parte de este proyecto. Compartir un espacio con visiones diversas pero que, al final, persiguen un mismo objetivo, es algo que realmente me apasiona. Les invito a que hagan parte de incidir para existir porque más que una red de trabajo somos una red de apoyo y hemos hecho un trabajo muy potente durante más de un año así que te invitamos a que te movilices con nosotros.",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/35.jpg"
 },
 {
   "id": 36,
   "nombre": "Andrés Esteban Lozano Hidalgo",
   "equipo": "Movilizatorio",
   "biografia": "Soy Andrés Esteban Lozano Hidalgo. Psicólogo - Magister en Ciencias Sociales e intervención social; Músico, cocinero, viajero y papá empírico. Soy un hombre apasionado por el trabajo con juventudes en diferentes contextos urbanos y rurales, en donde el objetivo de fondo ha estado en el cuidado de la esperanza y de la certeza del poder de transformación que recide en el interior de cada, y en la capacidad de estar juntes. También, me apasiona la escucha activa y el acompañamiento, los procesos sanadores, la salud mental, la conexión con la vida. Incidir para existir ha significado la posibilidad de seguir confiando en los procesos colectivos, en una generación atrevida de nuevas sensibilidades y sentidos de lucha, que se ha logrado organizar para concretar sus demandas ante el Estado, que terminan siendo, en todo caso, la garantía de sus Derechos Humanos y de realidades con justicia socioambiental. Es un proceso que aunque esté construído, todavía no está terminado. Todo lo contrario, es flexible, de ojos atentos a los contextos y de polifonía, de estar en la jugada; y por ende, es de puertas abiertas. Acompáñanos, únete a esta RED de jóvenes, haz de tu voz nuestra voz.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://www.instagram.com/andresito.lozano",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/36.jpg"
 },
 {
   "id": 37,
   "nombre": "Johana Hincapie",
   "equipo": "Movilizatorio",
   "biografia": "Soy Johana Hincapie, trabajadora social, especialista en Gerencia Social y magíster en Educación Inclusiva e Intercultural. Llevo más de 12 años creando y liderando proyectos que buscan transformar realidades en comunidades vulnerables. Mi pasión es el trabajo colectivo, siempre enfocada en garantizar derechos y construir territorios más justos y equitativos. A lo largo de mi camino, he trabajado con campesinos, jóvenes, estudiantes y movimientos feministas, asegurándome de que todos tengan una voz activa en las decisiones que los afectan. Mi experiencia me ha llevado a coordinar equipos, dar asesoría técnica y enseñar en la universidad, pero siempre con un enfoque transformador y feminista. En Incidir para existir, lidero este proyecto que impulsa a las juventudes a participar y ser protagonistas del cambio social. Creo firmemente que, juntos, podemos lograr que la dignidad y los derechos se sientan en cada rincón de nuestro país. Me mueve la lucha por la igualdad social y quiero que más personas se sumen a este camino. ¿Te unes para transformar realidades?",
   "linkedin": "",
   "twitter": "",
   "instagram": "",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/37.jpg"
 },
 {
   "id": 38,
   "nombre": "María José Pinzón Rodríguez",
   "equipo": "Movilizatorio",
   "biografia": "Soy María José Pinzón, socióloga y Magíster en Derechos Humanos con una amplia experiencia en la creación y ejecución de proyectos sociales enfocados en fortalecer comunidades urbanas y rurales. A lo largo de mi carrera, he desarrollado programas innovadores que integran experiencias artísticas, culturales y lúdicas para promover el bienestar y los derechos humanos en diversas poblaciones. Tengo la oportunidad de trabajar como estratega de proyectos en Movilizatorio, diseñando y acompañando estrategias que transforman realidades. Mi pasión por los derechos humanos me ha llevado a colaborar con entidades como UNICEF, Secretaría de la Mujer y Migración Colombia, donde he contribuido a mejorar las condiciones de vida de poblaciones vulnerables. Lo que más me apasiona de Incidir para Existir es su capacidad para articular a jóvenes comprometidos con la justicia social, generando un impacto significativo en sus comunidades. Te invito a ser parte de este movimiento y sumar tu voz a la construcción de un futuro más equitativo.",
   "linkedin": "",
   "twitter": "",
   "instagram": "https://www.instagram.com/majpinzon",
   "facebook": "",
   "image": "https://democraciaenred.nyc3.digitaloceanspaces.com/projects/movilizatorio/team/38.jpg"
 }
]

const cali = computed(() => {
  return team.filter((member) => member.equipo === 'Cali').sort(() => Math.random() - 0.5)
})

const bogota = computed(() => {
  return team.filter((member) => member.equipo === 'Bogota').sort(() => Math.random() - 0.5)
})

const movilizatorio = computed(() => {
  return team.filter((member) => member.equipo === 'Movilizatorio').sort(() => Math.random() - 0.5)
})

const showSection = ref(1)

</script>

<template>
  <div>
    <UContainer class="my-9">
      <p class="font-oswald text-5xl leading-tight text-[#D4F779]">JUVENTUDES QUE TRANSFORMAN</p>
      <p class="font-oswald font-thin text-2xl leading-tight mb-5">Somos una red de jóvenes activistas en Cali y Bogotá que buscan la construcción de realidades dignas para las juventudes</p>
      <p class="text-xl text-pumpkin-500 font-bold">MINI DOCUMENTAL</p>
      <!-- YouTube Video -->
      <div class="px-10 my-10">
        <div class="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg">
          <!-- <iframe src="https://www.youtube.com/embed/LvXX1St1Qac?si=cD-_eBMSGUarJLSi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/> -->
        </div>
      </div>
      <div class="flex gap-10 justify-between items-start my-10 flex-col md:flex-row">
        <div class="w-full md:w-8/12 lg:w-1/3 space-y-4">
          <div
            class="px-5 py-3 rounded-full font-semibold text-xl w-full border-solid border-2 flex items-center justify-between cursor-pointer"
            :class="{
              'text-black bg-mindaro border-mindaro': showSection === 1,
              'text-white': showSection !== 1
            }" 
          @click="showSection = 1">
            <span>Nuestra historia</span>
            <UIcon :name="showSection === 1 ? 'i-heroicons-chevron-right-solid' : 'i-heroicons-chevron-left-solid'" />
          </div>
          <div
            class="px-5 py-3 rounded-full font-semibold text-xl w-full border-solid border-2 flex items-center justify-between cursor-pointer"
            :class="{
              'text-black bg-mindaro border-mindaro': showSection === 2,
              'text-white border-white': showSection !== 2
            }" 
          @click="showSection = 2">
            <span>¿Que hemos logrado?</span>
            <UIcon :name="showSection === 2 ? 'i-heroicons-chevron-right-solid' : 'i-heroicons-chevron-left-solid'" />
          </div>
          <div
            class="px-5 py-3 rounded-full font-semibold text-xl w-full border-solid border-2 flex items-center justify-between cursor-pointer"
            :class="{
              'text-black bg-mindaro border-mindaro': showSection === 3,
              'text-white': showSection !== 3
            }" 
          @click="showSection = 3">
            <span>¿Qué nos mueve?</span>
            <UIcon :name="showSection === 3 ? 'i-heroicons-chevron-right-solid' : 'i-heroicons-chevron-left-solid'" />
          </div>
        </div>
        <div class="w-full md:w-1/3 lg:w-2/3 px-3">
          <div v-if="showSection === 1" class="space-y-3">
            <p>Durante los años 2019 y 2021 tuvo en lugar en Colombia estallidos sociales históricos, en ellos la inconformidad generalizada de diferentes gremios, sectores de la ciudadanía fue canalizada en multitudinarias movilizaciones, acciones simbólicas, tomas del espacio público, plantones y demás acciones colectivas dentro del campo online y también offline. El arte, la creatividad y resistencia gestaron grandes luchas, visibilizaron liderazgos tanto locales como nacionales y por ende, dieron un lugar a las diversas manifestaciones sociales y políticas.</p>
            <p>Sin duda la juventud tuvo un rol protagónico en los estallidos sociales, fue protagonista por su liderazgo, coraje y valentía; la juventud fue el motor de las acciones colectivas. Sin embargo, fueron los y las jóvenes uno de los sectores mayormente violentados y vulnerados en el marco de la protesta social u otras acciones de participación, sus liderazgos fueron opacados y diferentes hechos violentos contra la juventud tuvieron lugar: violencia física, sexual, desaparición forzada, tratos crueles e inhumanos.</p>
            <p>Bajo este contexto nace Incidir para Existir como un espacio para el encuentro de líderes y lideresas, como un lugar para promover el diálogo de la juventud hacia la institucionalidad y desde allí, facilitar la incidencia política desde la propuesta, la escucha y por supuesto, la exigencia de sus demandas para así, promover la dignificación de la vida y sentires de los y las jóvenes de las ciudades de Cali y Bogotá.</p>
            <p>Una vez finalizado el trabajo de definir de manera colectiva las demandas juveniles de Cali y de Bogotá, consignadas en las agendas ciudadanas a través de los bootcamps y las mentorías, dimos paso a un trabajo de incidencia y de organización interna de cada uno de los grupos establecidos en cada ciudad, pensados desde la complejidad de los procesos organizativos de trabajo ciudadano. Al observar la realidad sociopolítica de las ciudades, sumado a la intención de generar un trabajo organizado y participativo con las juventudes, el proyecto pasó a ser comprendido y ejecutado a partir de macro procesos que engloban todas las vertientes que implican nuestro objetivo inicial y nuestra teoría de cambio.</p>
          </div>
          <div v-if="showSection === 2">
            <ul class="list-disc space-y-3" >
              <li>Hemos consolidado una red de más de 60 jóvenes entre Cali y Bogotá, generando juntanza y trabajo en red.</li>
              <li>¡Nos hemos formado para incidir de manera efectiva! +50 horas de formación continua, +32 horas de mentoría que nos han llevado a fortalecer nuestras habilidades. ¡Incidir es comprender para accionar!</li>
              <li>Hemos co-creado  2 agendas ciudadanas (una para Cali y otra para Bogotá) donde se reflejan los sentires de las juventudes, sus problemáticas, exigencias y propuestas.</li>
              <li>Creemos fielmente en el diálogo y la creación de consensos. Por ello, nos hemos reunido con candidatos, tomadores de decisión, sociedad civil. ¡Nuestras demandas se mueven!</li>
              <li>Le hemos apostado por las acciones en calle y campañas online que promuevan la incidencia e involucramiento de juventudes. ¡Nuestra acción es poder! </li>
            </ul>
          </div>
          <div v-if="showSection === 3">
            <ul class="list-disc space-y-3" >
              <li>Nos mueve la pasión de tomar el control de nuestro futuro. Queremos liderar y ser parte de las decisiones que nos afectan, para construir un mundo que sea justo y cool para todos.</li>
              <li>Nos mueve la necesidad de ser escuchados. Queremos que los líderes de Bogotá y Cali se tomen en serio nuestras demandas y sentires, y los incluyan en sus planes, porque somos el presente y el futuro de estas ciudades.</li>
              <li>Nos mueve el deseo de unirnos y hacer que nuestra voz sea más fuerte. Queremos aliarnos con otros jóvenes y organizaciones para crear un movimiento que sea sostenible y que genere un impacto real en nuestras vidas y comunidades.</li>
            </ul>
          </div>
        </div>
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 pt-10 rounded-tr-2xl rounded-tl-2xl">
      <img src="/img/quienes-somos-01.png" class="w-full" alt="">
      <UContainer class="py-10">
        <p class="font-oswald text-5xl leading-tight text-[#D4F779] text-center lg:text-left mb-5">NUESTRO EQUIPO</p>
        <p class="text-3xl font-bold text-center lg:text-left my-5">CALI</p>
        <QuienesSomosReel :members="cali" />
        <p class="text-3xl font-bold text-center lg:text-left my-5">BOGOTA</p>
        <QuienesSomosReel :members="bogota" />
        <p class="text-3xl font-bold text-center lg:text-left my-5">STAFF MOVILIZATORIO</p>
        <QuienesSomosReelMovilizatorio :members="movilizatorio" />
      </UContainer>
    </div>
  </div>
</template>


<style>

</style>