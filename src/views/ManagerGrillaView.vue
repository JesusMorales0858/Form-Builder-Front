<template>
    <div class="container">
        <div class="col p-3 ">
            <h6 class="text-center h5">Grilla dinamica</h6>
        </div>
        <div class="row p-3">
            <div class="col">
                <router-link :to="`/modules/${idConfigForm}`" class="btn btn-primary"> Nuevo </router-link>
            </div>
            <div class="col">
                <div class="d-flex justify-content-end">
                    <div class="btn btn-secondary">
                        Filter
                    </div>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table align-middle mx-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th scope="col" v-for="Encabezados of dataHeaders">{{ Encabezados }}</th>
                        <th scope="col"> Operaciones </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="Datos in dataValues">
                        <td>{{ Datos[0] }}</td>
                        <td scope="col" v-for="valor in Datos.slice(1)">{{ valor }}</td>
                        <td>
                            <button class="btn btn-warning">E</button>
                            <button class="btn btn-danger">X</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: 'ManagerGrillaView',
    data() {
        return {
            idConfigForm: null, // Inicializa idConfigForm en null
            dataHeaders: [], //inicializar arreglo para almacenar los encabezados
            dataValues: [] //inicializar arreglo para almacenar los datos table
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            const idFormulario = this.$route.params.idConfigForm;
            this.idConfigForm = idFormulario;
            let result = axios.get(`http://localhost:5045/api/ConfigForm/ListaRespuestas/${idFormulario}`)
                .then((respuesta) => {
                    let data = []; //declarar la variable data
                    data = respuesta.data.lista; //signarle a data el array de objetos recibidos de la api

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

                        // Agrega el nombre de columna a los encabezados
                        columnHeaders[columnId] = columnName;

                        // Crea una fila si no existe
                        if (!matrix[rowId]) {
                            matrix[rowId] = {};
                        }
                        // Asigna el valor a la columna correspondiente en la fila
                        matrix[rowId][columnName] = columnValue;
                    });

                    //iteracion de los encabezados
                    const headers = [...new Set(data.map(item => item.nombre))];

                    //const matrixArray = Object.values(matrix).map(row => headers.map(header => row[header] || null));
                    
                    const matrixArray = Object.values(matrix).map(row => {
                        console.log(row.identificador_fila);
                        const rowWithId = [row.identificador_fila];
                        headers.forEach(header => {
                            rowWithId.push(row[header] || null);
                        });
                        return rowWithId;
                    });

                    this.dataHeaders = headers;  //Encabezados de columna
                    this.dataValues = matrixArray;  //Matriz de datos
                    console.log(this.dataValues);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};

</script>