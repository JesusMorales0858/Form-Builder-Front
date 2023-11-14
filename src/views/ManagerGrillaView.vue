<template>
    <barra-navegacion></barra-navegacion>
    <spinner :visible="MostrarSpinner"></spinner>
    <div v-if="!MostrarSpinner">
        <div class="col p-3 ">
      <h6 class="text-center h5">Grilla dinamica</h6>
    </div>
        <div class="row p-3">
            <div class="col">
                <router-link :to="`/modules/${idConfigForm}`" class="btn btn-outline-primary btn-sm custom-margin-botonN" title="Nuevo" v-if="$store.state.permisos.includes(9)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                    </svg>
                    Nuevo
                </router-link>
            </div>
        </div>

        <!-- mostrar mensaje si la api no tiene registros -->
        <div class="text-center" v-if="NoHayRegistros">
            <h3>
                <small class="text-muted">No hay datos cargados en este formulario</small>
            </h3>
        </div>
    
        <div class="container-sm">
        <div class="table-container" v-if="$store.state.permisos.includes(11) & !NoHayRegistros">
            <table class="table align-middle mx-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th scope="col" v-for="Encabezados of dataHeaders">{{ Encabezados }}</th>
                        <th scope="col"> Acciones </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Datos in dataValues">
                        <td>{{ Datos[0] }}</td>
                        <td scope="col" v-for="valor in Datos.slice(1)">{{ valor.value }}</td>
                        <td class="nowrap">
                            <div class="row">
                                <div class="col-auto"> 
                                    <button class="btn btn-outline-warning mx-1 btn-sm" title="Editar" @click="mostrarModalEdicion(Datos)" v-if="$store.state.permisos.includes(10)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                        </svg>
                                    Editar</button>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-outline-danger mx-1 btn-sm" title="Eliminar"
                                        @click="mostrarConfirmacionEliminar(Datos[0])" v-if="$store.state.permisos.includes(12)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    Eliminar</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            <!-- Alerta de confirmación personalizada -->
        <div v-if="mostrarAlertaEliminar" class="alert alert-primary d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:">
                <use xlink:href="#info-fill" />
            </svg>
            <div>
                ¿Estás seguro de que deseas eliminar este registro?
                <button class="btn btn-danger btn-sm ms-3" @click="eliminarFila(idFilaAEliminar)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
            <path
              d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          Confirmar</button>
                <button class="btn btn-secondary btn-sm ms-2" @click="cancelarEliminacion">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill"
            viewBox="0 0 16 16">
            <path
              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>
          Cancelar</button>
            </div>
        </div><!--fin alerta confirmacion-->
        <!-- Componente Alerta de suceso -->
        <AlertaSuceso  :visible = "mostrarAlertaSuceso" :mensaje = "mensajeAlertaSuceso"/>
        </div>

        <!-- Componente modal de edición -->
        <EditarFilaModal v-if="mostrarModal" :fila="filaAEditar" :idConfigForm="filaAEditar.id_ConfigForm"
            :idAnswer="filaAEditar.id_Answer" :idField="filaAEditar.id_Field" @edicion-guardada="guardarEdicion"
            @cerrar-modal="cerrarModalEdicion" />
    </div>
</template>
<script>
import BarraNavegacion from '@/components/BarraNavegacion.vue';
import EditarFilaModal from '../components/EditarFilaModal.vue';
import AlertaSuceso from '../components/AlertaSuceso.vue';
import Spinner from '@/components/Spinner.vue';
export default {
    name: 'ManagerGrillaView',
    components: {
        'barra-navegacion': BarraNavegacion,
        EditarFilaModal,
        AlertaSuceso,
        'spinner': Spinner,

    },
    data() {
        return {
            idConfigForm: null, // Inicializa idConfigForm en null
            dataHeaders: [], //inicializar arreglo para almacenar los encabezados
            dataValues: [], //inicializar arreglo para almacenar los datos table
            mostrarAlertaEliminar: false, // Controla la visibilidad de la alerta
            idFilaAEliminar: null, // Almacena el ID de la fila a eliminar
            mostrarAlertaSuceso: false, // Controla la visibilidad de la alerta
            mostrarModal: false,
            mensajeAlertaSuceso: "",//mensaje alerta de suceso vacio
            NoHayRegistros: false,
            MostrarSpinner : false
        };
    },
    mounted() {
        this.fetch();
    },
    watch: {
    '$route.params.idConfigForm': function(newVal, oldVal) {
        this.fetch();
        this.refrescarPagina();
    }
  },
    methods: {
        async refrescarPagina() {
        // Recarga la página actual
        window.location.reload();
    },
        async fetch() {
            this.MostrarSpinner = true;
            const idFormulario = this.$route.params.idConfigForm;
            this.idConfigForm = idFormulario;
            await this.axios.get(`/api/ConfigForm/ListaRespuestas/${idFormulario}`)
                .then((respuesta) => {
                    let data = []; //declarar la variable data
                    data = respuesta.data.lista; //signarle a data el array de objetos recibidos de la api
                    
                    if (data.length === 0) {
                        this.NoHayRegistros = true;}

                    // Objeto para almacenar los encabezados de columna
                    const columnHeaders = {};
                    // Objeto para almacenar las filas de la matriz
                    const matrix = {};

                    // Itera sobre los objetos
                    data.forEach(item => {
                        const rowId = item.identificador_fila;  // Usa el identificador_fila como identificador de fila
                        const columnId = item.id_Field; // Usa el id_Field como identificador de columna
                        const columnName = item.nombre; // Usa el nombre como encabezado de columna
                        const columnValue = item.valor; // Valor que se colocará en la matriz
                        const idDeValor = item.id_Answer; //identificador del valor que servira para poder editar un valor especifico

                        // Agrega el nombre de columna a los encabezados
                        columnHeaders[columnId] = columnName;

                        // Crea una fila si no existe
                        if (!matrix[rowId]) {
                            matrix[rowId] = {};
                        }

                        // Asigna el valor a la columna correspondiente en la fila
                        matrix[rowId][columnName] = columnValue;

                        // Agrega también el identificador de fila
                        matrix[rowId]['identificador_fila'] = rowId;
                        matrix[rowId][`${columnName}_id_Field`] = item.id_Field;
                        matrix[rowId][`${columnName}_id_Answer`] = item.id_Answer;
                        matrix[rowId][`${columnName}_id_ConfigForm`] = item.id_ConfigForm;

                    });

                    //iteracion de los encabezados
                    const headers = [...new Set(data.map(item => item.nombre))];

                    const matrixArray = Object.values(matrix).map(row => {
                        const rowWithIds = [row.identificador_fila];

                        headers.forEach(header => {
                            const cellData = {
                                id_ConfigForm: row[`${header}_id_ConfigForm`],
                                id_Field: row[`${header}_id_Field`],
                                id_Answer: row[`${header}_id_Answer`],
                                value: row[header] || null
                            };

                            rowWithIds.push(cellData);
                        });

                        return rowWithIds;
                    });

                    this.dataHeaders = headers;  //Encabezados de columna
                    this.dataValues = matrixArray;  //Matriz de datos

                })
                .catch(err => {
                    console.log(err);
                });
                this.MostrarSpinner = false;
        },
        mostrarConfirmacionEliminar(id_fila) {
            this.idFilaAEliminar = id_fila;
            this.mostrarAlertaEliminar = true;
        },

        eliminarFila(id_fila) {
            //solicitud a la api mediante axios
            this.axios.put(`/api/ConfigForm/Respuestas/Eliminar/${id_fila}`, {
                headers: {
                    //tipo de contenido enviado a la api
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    //manejo de respuesta del servidor ok
                    this.mostrarAlertaEliminar = false;
                    this.mostrarAlertaSuceso = true;
                    this.mensajeAlertaSuceso = "Eliminado exitosamente";
                    this.fetch();
                    //sacar alerta de suceso despues de los 2000 milisegundos
                    setTimeout(() => {
                     this.mostrarAlertaSuceso = false;
                    }, 2000);

                })
                .catch(error => {
                    //manejo de respuesta del servidor error
                    console.error(error);
                });
        },
        cancelarEliminacion() {
            this.mostrarAlertaEliminar = false;
        },
        mostrarModalEdicion(Datos) {
            this.filaAEditar = Datos;
            this.mostrarModal = true;
        },
        guardarEdicion() {
            // Lógica para guardar la edición en la vista principal
            this.mostrarModal = false;
        },
        cerrarModalEdicion() {
            this.mostrarModal = false;
            this.fetch();
            this.mostrarAlertaSuceso = true;
                    this.mensajeAlertaSuceso = "Modificado exitosamente";
                    //sacar alerta de suceso despues de los 1000 milisegundos
                    setTimeout(() => {
                        this.mostrarAlertaSuceso = false;
                    }, 3000);

        }
    }
};
</script>
<style>
.custom-margin-botonN{
  margin-left: 115px; /* Ajusta el valor según tus necesidades */
}
.table-container {
  max-height: 320px; /* ajusta la altura máxima según tus necesidades */
  overflow-y: auto;
}
</style>