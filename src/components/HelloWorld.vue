<template>
  <div class="all">
    <h2>Cifrado de César con Vue</h2>
    <div class="container">
      <div class="input-container">
        <label for="amount" class="font-bold block mb-2">número de desplazamiento</label>
        <div class="input-number">
          <button class="decrement-button" @click="decrement">
            <!-- :class="'pi pi-eraser'" -->
            <i :class="'pi pi-minus'"></i>
          </button>
          <input v-model="value" id="amount" type="text" readonly />
          <button class="increment-button" @click="increment">
            <i :class="'pi pi-plus'"></i>
          </button>
        </div>
      </div>

      <form @submit.prevent="onSubmit" id="exer17">
        <div class="form-item">
          <label for="txt">Texto: a cifrar</label>
          <input type="text" placeholder="Ingrese el texto" v-model="inputTextCifrar" id="txt" />
          <span class="err" v-if="inputTextCifrar.length == 0">campo vacío</span>
        </div>
        <div class="form-item">
          <input class="button" type="submit" value="Cifrar" />
        </div>
        <label class="r">Texto cifrado:</label>
        <span id="exe17response2" class="text-res" v-if="inputTextCifrar.length > 0">
          {{ cifradoOutput }}
          <!-- Icono cambia entre fa-copy y fa-check dependiendo si fue copiado -->
          <i :class="[copied ? 'pi pi-check' : 'pi pi-copy']" @click="copiarTextoCifrado"
            style="cursor: pointer; margin-right: 10px;" @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"></i>
          <span v-if="showTooltip" class="tooltip">{{ copied ? 'Copied!' : 'Copy' }}</span>
        </span>
        <span v-else class="err">Texto cifrado vacío</span>
      </form>
      <div id="exe17response" hidden ref="containerDat"></div>
      <form @submit.prevent="onDecifrar" id="exer17">
        <div class="form-item">
          <label for="txt">Texto: a decifrar</label>
          <input type="text" placeholder="Ingrese el texto" v-model="inputTextDecifrar" id="txt" />
          <span class="err" v-if="inputTextDecifrar.length == 0">campo vacío</span>

        </div>
        <div class="form-item">
          <input class="button" type="submit" value="decifrar" />
        </div>
        <label class="r">Texto decifrado:</label>
        <span id="exe17response2" v-if="inputTextDecifrar.length > 0">{{ decifradoOutput }}
          <i :class="[copiedDecifrado ? 'pi pi-check' : 'pi pi-copy']" @click="copiarTextoDecifrado"
            style="cursor: pointer; margin-right: 10px;" @mouseenter="showTooltipD = true"
            @mouseleave="showTooltipD = false"></i>
          <span v-if="showTooltipD" class="tooltip">{{ copiedDecifrado ? 'Copied!' : 'Copy' }}</span>
        </span>
        <span v-else class="err">Texto decifrado vacío</span>
      </form>
      <div id="exe17response" hidden ref="containerDat1"></div>
      <div>
      </div>
      <span class="clearAll">
        <i :class="'pi pi-eraser'" @click="clearInputs" style="cursor: pointer; margin-right: 10px;"
          @mouseenter="showTooltipEraser = true" @mouseleave="showTooltipEraser = false"></i> Limpiar todo
        <span v-if="showTooltipEraser" class="tooltip">Limpiar Campos</span>
      </span>
      <!-- <i :class="" -->
      <!-- <input class="button" type="submit" value="decifrar" /> -->

    </div>
  </div>
</template>

<script>

import 'primeicons/primeicons.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCopy, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'primeicons/primeicons.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
// Agregar los iconos a la librería
library.add(faCopy, faCheckCircle, faPlus, faMinus);


// import Message from 'primevue/message';
export default {
  components: {
    // FontAwesomeIcon
  },
  data() {
    return {
      copied: false, // Para controlar si ya se copió el texto
      copiedDecifrado: false, // Para controlar si ya se copió el texto
      showTooltip: false, // Controlar el estado del tooltip
      showTooltipD: false,// Controlar el estado del tooltip
      value: 0
      ,
      count: 0,
      inputText: '',
      printedLetters: [], // Para mostrar el texto cifrado en pantalla
      mostrarLetrasDecifradas: [], // Para mostrar el texto cifrado en pantalla
      verMas: false,
      inputTextCifrar: '',
      inputTextDecifrar: '',
      cifradoOutput: '',
      decifradoOutput: '',
      alfabeto: 'abcdefghijklmnopqrstuvwxyz',
    };
  },
  methods: {
    increment() {
      this.value = parseFloat(this.value) +1;
    },
    decrement() {
      if (this.value > 0) {
        this.value = parseFloat(this.value) - 1;
      }
    },

    toggleVerMas() {
      this.verMas = !this.verMas;
    },
    onDecifrar() {
      // alert("decifrado")
      this.decifradoOutput = '';
      this.mostrarLetrasDecifradas = []; // Reset printed letters
      this.decifradoCesar(this.inputTextDecifrar, this.alfabeto, -this.value);
      // this.inputText = ''; // Limpiar el campo de entrada

    },
    clearInputs() {
      this.inputTextCifrar = '';
      this.inputTextDecifrar = '';
      this.cifradoOutput = '';
      this.decifradoOutput = '';
      this.printedLetters = [];
      this.mostrarLetrasDecifradas = [];
    },
    copiarTextoDecifrado() {
      const textToCopy = this.decifradoOutput;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.copiedDecifrado = true; // Cambia el estado a copiado
        setTimeout(() => {
          this.copiedDecifrado = false; // Cambia el icono de nuevo después de 2 segundos
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar texto: ', err);
      });
    },
    copiarTextoCifrado() {
      const textToCopy = this.cifradoOutput;
      navigator.clipboard.writeText(textToCopy).then(() => {
        this.copied = true; // Cambia el estado a copiado
        setTimeout(() => {
          this.copied = false; // Cambia el icono de nuevo después de 2 segundos
        }, 2000);
      }).catch(err => {
        console.error('Error al copiar texto: ', err);
      });
    }
    ,
    onSubmit() {
      this.cifradoOutput = '';
      this.printedLetters = []; // Reset printed letters
      this.cifradoCesar(this.inputTextCifrar, this.alfabeto, this.value);
      // this.inputText = ''; // Limpiar el campo de entrada


    },

    decifradoCesar(txt, alfabeto, movimientos) {
      let decifrado = '';
      let time = 0;

      for (let i = 0; i < txt.length; i++) {
        const cr = txt.charAt(i);
        const index = alfabeto.indexOf(cr) !== -1 ? alfabeto.indexOf(cr) : alfabeto.toUpperCase().indexOf(cr);
        const aux = index !== -1 ? (alfabeto.indexOf(cr) !== -1 ? alfabeto : alfabeto.toUpperCase()) : null;

        const caracterDescifrado = aux ? this.prevPost(aux, index, movimientos) : cr;
        decifrado += caracterDescifrado;

        setTimeout(() => {
          this.printLetterDecifradas(caracterDescifrado);
        }, time);

        // time += 500;
      }

      return decifrado;
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

        // time += 500;
      }

      return cifrado;
    },

    prevPost(abc, index, movimientos) {
      index += movimientos;
      if (index >= abc.length) {
        index -= abc.length;
      }

      // Si el índice es negativo, retrocedemos circularmente desde el final del alfabeto
      if (index < 0) {
        index = abc.length + (index % abc.length);
      }

      // if (index <= abc.length) {
      //   index -= movimientos;
      //   index += abc.length;
      // }
      return abc.charAt(index);
    },

    nextPost(abc, index, movimientos) {
      index += movimientos;
      if (index >= abc.length) {
        index -= abc.length;
      }
      return abc.charAt(index);
    },


    printLetterDecifradas(caracterDescifrado) {
      const div = document.createElement('div');
      div.style.display = 'inline-block';
      div.style.position = 'relative';

      const span4 = document.createElement('span');
      span4.classList.add('animate-letter');
      span4.innerHTML = caracterDescifrado;

      const span5 = document.createElement('span');
      span5.innerHTML = caracterDescifrado;
      span5.classList.add('text');

      this.$refs.containerDat1.appendChild(div);
      div.appendChild(span4);
      div.appendChild(span5);

      this.decifradoOutput += caracterDescifrado;
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
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.8em;
  transform: translateX(-100%);
  /* Para que el tooltip aparezca a la izquierda */
  margin-right: 10px;
}

.container {

  box-shadow: 0px 0px 5px 5px #d6d6d64b;

  background-color: #eeeeee;
}

.clearAll {
  width: 100%;
  background-color: #ecfef9;
  border: #9dffe0 solid 1px;
  color: #707070;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: #008c5f;
  }
}

.pi-check {
  /* padding: 5px; */
  color: blue;
  /* border: 1px solid blue; */
}

#exe17response2,
#exe17txtNormal {
  background-color: #F6FFF3FF;
  color: #1C1C1CFF;
  border: 1px solid #B1FFB0FF;

  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
  /* border: dashed; */
  display: flex;
  justify-content: space-between;
}

/* Responsive */
@media screen and (max-width: 600px) {
  #exe17response2 font-awesome-icon {
    font-size: 1em;
    /* Ajusta el tamaño del ícono en pantallas pequeñas */
  }
}

.container {
  width: 100%;
  /* Fijar el ancho */
  height: auto;
  gap: 10px;
  /* gap: 10px; */
  /* Fijar la altura */
  /* border: 1px solid #dcdcdc; */
  /* box-shadow: 0px 5px 16px 5px rgb(217, 217, 217); */
  /* background-color: #ffffff; */
  margin: 0 auto;
  /* Centra horizontalmente */
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* Centra verticalmente el contenido */
  /* align-items: self-start; */
  /* Centra horizontalmente el contenido */
  /* border: dashed; */
  /* padding: 10px; */

  form {

    border-radius: 10px;
    border: dashed;
    background-color: #ffffff;
    border: 1px solid #B1FFB0FF;
    /* border-radius: 10px; */
    box-shadow: 0px 5px 16px 5px #1010104B;
  }
}

.r {
  border-radius: 3px;
  padding: 4px;
  color: #008c5f;
  background-color: #dbffd0;
}

.ver-mas {
  margin: 0 auto;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  /* Padding para pantallas grandes */
  box-shadow: 0px 4px 5px 4px rgb(239, 239, 239);
  background: linear-gradient(0deg, #FFF7D3FF 0%, #FFFFFFFF 100%);
  margin-bottom: 10px;
  transform: scale(1);
  /* Escala normal en pantallas grandes */
}

a {
  cursor: pointer;
  color: #9c31d9;
}

.all {
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
  /* max-width: 1200px; */
  /* padding: 14px; */
  width: 100%;
  margin-top: -125px;
  /* Ocupar todo el ancho */
  height: auto;
  /* margin: 0; */
  /* Ocupar toda la altura del contenedor padre */
  box-sizing: border-box;
  /* Incluir padding y border dentro de las dimensiones */

  /* padding: 20px; */
}

h2 {
  text-align: center;
  font-size: 2em;
  color: #008c5f;
}

p {
  font-size: 1.2em;
  line-height: 1.6;
  text-align: justify;
}

.err {
  font-size: 12px;
  /* line-height: 1.6; */
  color: red;
  text-align: justify;
}




form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-item label {
  display: flex;

  align-items: start;
  margin-bottom: 5px;


  font-size: 1.2em;
}

input[type="text"] {
  padding: 10px;
  font-size: 1.1em;
  background-color: #F0F0F0FF;
  /* container: 'Ingrese el texto'; */
  border: 1px solid #e7e7e7;
  border-radius: 2px;
  outline: none;
  color: #008c5f;
  height: 25px;
}

input[type="text"]:focus {
  border: 1px solid rgb(176, 255, 226);

}

.button {
  height: 40px;
  font-size: 1.2em;
  color: #9c31d9;
  background-color: white;
  border: none;
  border: 1px solid #f6e5ff;

  border-radius: 2px;
  cursor: pointer;
}

.button:hover {
  /* color: white; */

  background-color: #f6e5ff;
}

#exe17response {
  margin-top: 20px;
}

#exe17response2,
#exe17txtNormal {
  font-size: 1.2em;
  font-weight: bold;
}

/* Responsive design for mobile devices */
@media screen and (max-width: 768px) {

  h2 {
    font-size: 1.5em;
  }

  p {
    font-size: 12px;
  }

  input[type="text"] {
    font-size: 1em;
  }

  .button {
    font-size: 1em;
    padding: 8px 16px;
  }

  #exe17response2,
  #exe17txtNormal {
    font-size: 1em;
  }
}

/* For smaller devices like phones */
@media screen and (max-width: 600px) {
  h2 {
    font-size: 1.2em;
  }

  .all {
    margin-top: 0;

  }

  input[type="text"] {
    font-size: 0.9em;
    padding: 8px;
  }

  input[type="text"]:focus {
    border-color: green;
    /* cambia el color del borde a verde cuando el input está seleccionado */
  }

  .button {
    font-size: 0.9em;
    padding: 6px 12px;
  }

  .container {
    width: 90%;

    form {
      width: 100%;
    }

    /* Fijar el ancho */
    /* flex-direction: column; */

  }

  .ver-mas {
    padding: 10px;
    /* Reducimos más el padding para pantallas pequeñas */
    transform: scale(0.9);
    /* Escalamos ligeramente para que se vea mejor en pantallas pequeñas */
  }

  .img-container {
    padding: 10px;

    /* Ajustamos el padding de la imagen */
    img {
      width: 100%;
    }
  }

  #exe17response2,
  #exe17txtNormal {
    font-size: 0.9em;
  }
}



/*  */
.input-container {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.input-number {
  background-color: #f6e0ff;
  display: flex;
  align-items: center;
  border: 1px solid #e3d3e6;
  border-radius: 5px;
  overflow: hidden;
}

input {
  border: none;
  text-align: center;
  width: 100%;
  padding: 8px;
  font-size: 1.2em;
}

button {
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
}

.decrement-button,
.increment-button {

  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.decrement-button i,
.increment-button i {
  font-size: 1.2em;
  color: #9000ff;
  &:focus{
  color: red;
  }
}

button:focus {
  outline: none;
}
</style>
