<template>
  <section class="src-components-lista-tareas">
    <div class="jumbotron">
        <h1>Lista de tareas</h1>

          <div class="table-responsive ">

              <table class="table">
                  <tr class="bg-dark text-white ">
                      <th>Tarea</th>
                      <th>Descripción</th>
                      <th>Nombre</th>
                      <th>Email hacia quien va dirigida</th>
                      <th>Fecha de creacion</th>
                  </tr>
                  <tr
                      class="bg-white text-black"
                      v-for="(tarea, index) in tareas"
                      :key="index"
                  >   
                      <td>{{ tarea.tarea }}</td>
                      <td>{{ tarea.descripcion }}</td>
                      <td>{{ tarea.nombre }}</td>
                      <td>{{ tarea.email }}</td>
                      <td>{{formatoFecha(tarea.fechaDeCreacion)}}</td>
                  </tr>
              </table>

          </div>
       
    </div>
  </section>
</template>

<script>
export default {
  name: "src-components-lista-tareas",
  props: [],
  mounted() {
    this.getDatos()
  },
  data() {
    return {
        url : 'https://5f96610111ab98001603a8ef.mockapi.io/tareas',
        tareas: []
    };
  },
  methods: {
    async getDatos() {
            try {
                let res = await this.axios(this.url)
                console.log(res.data);
                this.tareas = res.data

            }
            catch(error) {
                console.log('HTTP GET ERROR', error)
            }
        },
        formatoFecha(fecha){
          return new Date(fecha).toLocaleString()
        }
  },
  computed: {

  },
};
</script>

<style scoped lang="css">

    .jumbotron {
    background-color: rgb(39, 52, 167);
    color: white;
    }
    h1{
      color: black;
    }
    hr {
    background-color: #ddd;
    }

    .table td, .table th {
        vertical-align: middle;
    }
</style>
