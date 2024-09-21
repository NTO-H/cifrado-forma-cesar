<template>
  <div class="container">
    <h2>Cifrado de César</h2>
    <p>
      En criptografía, el cifrado César, también conocido como cifrado por desplazamiento...
    </p>
    <div class="img-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2b/Caesar3.svg" alt="cifrado de cesar">
    </div>
    <form @submit.prevent="onSubmit" id="exer17">
      <div class="form-item">
        <label for="txt">Texto: a cifrar</label>
        <input type="text" v-model="inputText" id="txt" />
      </div>
      <div class="form-item">
        <input class="button" type="submit" value="Cifrar" />
      </div>
    </form>
    <br />
    <div id="exe17response" hidden ref="containerDat"></div>
    <br />
    <div>
      <p><b>Texto normal:</b> <span id="exe17txtNormal">{{ inputText }}</span></p>
      <p><b>Texto cifrado:</b> <span id="exe17response2">{{ cifradoOutput }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      cifradoOutput: '',
      alfabeto: 'abcdefghijklmnopqrstuvwxyz',
    };
  },
  methods: {
    onSubmit() {
      this.cifradoOutput = '';
      this.printedLetters = []; // Reset printed letters
      this.cifradoCesar(this.inputText, this.alfabeto, 5);
      this.inputText = ''; // Limpiar el campo de entrada
    },
    cifradoCesar(txt, alfabeto, movimientos) {
      let cifrado = '';
      let time = 0;

      for (let i = 0; i < txt.length; i++) {
        const cr = txt.charAt(i);
        const index = alfabeto.indexOf(cr) !== -1 ? alfabeto.indexOf(cr) : alfabeto.toUpperCase().indexOf(cr);
        const aux = index !== -1 ? (alfabeto.indexOf(cr) !== -1 ? alfabeto : alfabeto.toUpperCase()) : null;

        const caracterCifrado = aux ? this.nextPost(aux, index, movimientos) : cr;
        cifrado += caracterCifrado;

        setTimeout(() => {
          this.printLetter(caracterCifrado);
        }, time);

        time += 1000;
      }

      return cifrado;
    },
    nextPost(abc, index, movimientos) {
      index += movimientos;
      if (index >= abc.length) {
        index -= abc.length;
      }
      return abc.charAt(index);
    },
    printLetter(caracterCifrado) {
      const div = document.createElement('div');
      div.style.display = 'inline-block';
      div.style.position = 'relative';

      const span1 = document.createElement('span');
      span1.classList.add('animate-letter');
      span1.innerHTML = caracterCifrado;

      const span2 = document.createElement('span');
      span2.innerHTML = caracterCifrado;
      span2.classList.add('text');

      this.$refs.containerDat.appendChild(div);
      div.appendChild(span1);
      div.appendChild(span2);

      this.cifradoOutput += caracterCifrado;
    },
  },
};
</script>

<style>
.container {
  margin: 0;
  /* background: linear-gradient(0deg, #ffffff 0%, #9efdff 100%); */
}

/* Agrega estilos según sea necesario */
</style>
