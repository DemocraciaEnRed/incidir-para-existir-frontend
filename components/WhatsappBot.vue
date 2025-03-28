<template>
  <a href="https://wa.me/+5715110567" target="_blank">
  <div class="wp-body speech-wrapper shadow-[0px_0px_10px_2px_rgba(34,_197,_94,_0.5)] my-20 rounded-2xl">
    <div class="flex flex-col md:flex-row items-center md:gap-3">
      <div class="w-full md:w-4/12 gap-6 flex flex-col">
        <div class="bubble">
          <div class="txt">
            <p class="name text-electricViolet-700">Juventudes que transforman</p>
            <p class="message">Hola! 👋🏻 Soy el BOT de Incidir para Existir. <br><br><b>¿Tienes una iniciativa juvenil o quieres reportar una situación que afecta a las juventudes en Cali o Bogotá?</b></p>
              <span class="timestamp">10:20 pm</span>
          </div>
          <div class="bubble-arrow"/>
        </div>
        <div class="bubble">
          <div class="txt">
            <p class="name text-electricViolet-700">Juventudes que transforman</p>
            <p class="message">¡Agregame a tus contactos al número +5715110567 y llevame a todas partes!</p>
              <span class="timestamp">10:20 pm</span>
          </div>
          <div class="bubble-arrow"/>
        </div>
      </div>
      <div class="w-full md:w-8/12 md:text-right mt-5 md:mt-0 text-center">
        <!-- <h1 class="text-xl">¿Tienes una iniciativa juvenil o quieres reportar una situación que afecta a las juventudes en Cali o Bogotá? </h1> -->
        <p class="text-4xl text-[#25d366] font-oswald font-medium uppercase">Escríbenos por WhatsApp y hazlo de manera rápida y sencilla</p>
        <div class="flex gap-2 items-center justify-center md:justify-end mt-5">
          <p class="text-3xl font-semibold">¡Haz que tu voz cuente!</p><UIcon name="i-heroicons-arrow-right-16-solid" class="text-2xl"/> <UIcon name="fa-brands-whatsapp" class="text-5xl text-[#25d366]" />
        </div>
      </div>
    </div>
    <!--  Speech Bubble alternative -->
    <!-- <div class="bubble alt">
      <div class="txt">
        <p class="name alt">+353 87 1234 567<span> ~ John</span></p>
        <p class="message">Nice... this will work great for my new project.</p>
        <span class="timestamp">10:22 pm</span>
      </div>
      <div class="bubble-arrow alt"></div>
    </div>
    <div class="bubble">
      <div class="txt">
        <p class="name">Benni</p>
        <p class="message">Hey, check out this Pure CSS speech bubble...</p>
        <span class="timestamp">10:20 pm</span>
      </div>
      <div class="bubble-arrow"></div>
    </div> -->
    <!--  Speech Bubble alternative -->
    <!-- <div class="bubble alt">
      <div class="txt">
        <p class="name alt">+353 87 1234 567<span> ~ John</span></p>
        <p class="message">Nice... this will work great for my new project.</p>
        <span class="timestamp">10:22 pm</span>
      </div>
      <div class="bubble-arrow alt"></div>
    </div> -->
  </div>
</a>
</template>

<style lang="css" scoped>
.wp-body{
  font-family: Arial, Helvetica, sans-serif;
  background: url('/img/wp-bg.jpg');
}

.speech-wrapper {
  padding: 30px 40px;
}
.speech-wrapper .bubble {
  display: block;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 2px 8px 5px #000;
  position: relative;
  margin: 0 0 0px;
}
.speech-wrapper .bubble.alt {
  margin: 0 0 0 60px;
}
.speech-wrapper .bubble .txt {
  padding: 8px 55px 8px 14px;
}
.speech-wrapper .bubble .txt .name {
  font-weight: 600;
  /* font-size: 12px; */
  margin: 0 0 4px;
}
.speech-wrapper .bubble .txt .name span {
  font-weight: normal;
  color: #b3b3b3;
}
.speech-wrapper .bubble .txt .name.alt {
  color: #2ecc71;
}
.speech-wrapper .bubble .txt .message {
  /* font-size: 12px; */
  margin: 0;
  color: #2b2b2b;
}
.speech-wrapper .bubble .txt .timestamp {
  font-size: 11px;
  position: absolute;
  bottom: 8px;
  right: 10px;
  text-transform: uppercase;
  color: #999;
}
.speech-wrapper .bubble .bubble-arrow {
  position: absolute;
  width: 0;
  bottom: 42px;
  left: -16px;
  height: 0;
}
.speech-wrapper .bubble .bubble-arrow.alt {
  right: -2px;
  bottom: 40px;
  left: auto;
}
.speech-wrapper .bubble .bubble-arrow:after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 9px solid #f5f5f5;
  border-radius: 0 20px 0;
  width: 15px;
  height: 30px;
  transform: rotate(145deg);
}
.speech-wrapper .bubble .bubble-arrow.alt:after {
  transform: rotate(45deg) scaleY(-1);
}
</style>
