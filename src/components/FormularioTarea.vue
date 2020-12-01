<template>

  <section class="src-components-formulario-tarea">

    <div class="jumbotron">
      <h2>Formulario </h2>
      <hr />

          <form novalidate autocomplete="off" @submit.prevent="enviar()">

          <!-- Tarea -->
          <div class="form-group">
              <label for="tarea">Tarea</label>
              <input 
                  type="text"
                  id="tarea"
                  class="form-control"
                  v-model="$v.f.tarea.$model"
              >

              <div v-if="$v.f.tarea.$error && $v.f.tarea.$dirty" class="alert alert-danger mt-1">
                  <div v-if="$v.f.tarea.required.$invalid">Este campo es requerido</div>
              </div>
          </div>

          <!-- Descripción -->
         <div class="form-group">
                <label for="descripcion">Descripcion</label>
                <input 
                    type="text"
                    id="descripcion"
                    class="form-control"
                    v-model="$v.f.descripcion.$model"
                >

                <div v-if="$v.f.descripcion.$error && $v.f.descripcion.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.descripcion.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.descripcion.minLength.$invalid">Este campo debe ser de al menos {{$v.f.descripcion.minLength.$params.length}} caracteres</div>
                    <div v-if="$v.f.descripcion.maxLength.$invalid">Este campo debe ser de máximo {{$v.f.descripcion.maxLength.$params.max}} caracteres</div>
                </div>
          </div>

          <!-- Nombre -->
          <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    id="nombre"
                    class="form-control"
                    v-model="$v.f.nombre.$model"
                >

                <div v-if="$v.f.nombre.$error && $v.f.nombre.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.nombre.required.$invalid">Este campo es requerido</div>
                </div>
          </div>

          <!-- Email -->
          <div class="form-group">
                <label for="email">Email hacia quien va dirigida</label>
                <input 
                    type="email"
                    id="email"
                    class="form-control"
                    v-model="$v.f.email.$model"
                >

                <div v-if="$v.f.email.$error && $v.f.email.$dirty" class="alert alert-danger mt-1">
                    <div v-if="$v.f.email.required.$invalid">Este campo es requerido</div>
                    <div v-if="$v.f.email.email.$invalid">Email invalido</div>
                </div>
          </div>

          <!-- Enviar -->
          <div class="form-group">
                <input 
                    type="submit"
                    :disabled="$v.$invalid"
                    class="btn btn-success mt-4"
                    value="Enviar"
                >
          </div>
      </form> 

      <!-- <p>{{$v}}</p> -->

    </div>

  </section>

</template>

<script>
  import { required, minLength, maxLength, email } from '@vuelidate/validators'

  export default  {
    name: 'src-components-formulario-tarea',
    props: [],
    mounted () {
        this.getDatos()
    },
    data () {
      return {
          f: this.resetForm(),
          url : 'https://5f96610111ab98001603a8ef.mockapi.io/tareas'
      }
    },
    validations: {
      f: {
        tarea: { 
          required,
        },
        descripcion: { 
          required,
          minLength: minLength(10),
          maxLength: maxLength(50)
        },
        nombre: { 
          required,
        },
        email: { 
          required,
          email
        }
      }
    },
    methods: {

        async sendDatos(datos) {
            try {
              let res = await this.axios.post(this.url, datos, {'content-type': 'application/json'})
              console.log(res.data)
            }
            catch(error) {
              console.log('Error post', error)
            }
        },

        async getDatos() {
            try {
              let res = await this.axios(this.url)
              console.log(res.data)
            }
            catch(error) {
              console.log('HTTP GET ERROR', error)
            }
        },

        async enviar() {
            this.$v.$touch()
            if(!this.$v.$invalid) {              
              let datos = this.f
              console.log(datos)
              await this.sendDatos(datos)
              this.f = this.resetForm()
              this.$v.$reset()
            }
        },
        
        resetForm() {
            return {
              tarea: '',
              descripcion: '',
              nombre: '',
              email : ''
            }
        }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  .jumbotron {
    background-color: rgb(62, 114, 19);
    color: white;
  }

  hr {
    background-color: #ddd;
  }

  pre {
    color: white;
  }

</style>
