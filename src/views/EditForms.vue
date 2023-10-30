<template>
    <div id="contenedor-padre">
        <div class="row mt-5">
            <div class="col-3" id="form">
                <!-- Formulario para agregar campos al formulario -->
                <div class="row g-3">
                    <div class="f"><!-- Grupo tipo de campo -->
                        <label for="field-type" class="form-label">Tipo de Campo</label>
                        <select id="field-type" class="form-select">
                            <option value="text">Texto</option>
                            <option value="textarea">Área de Texto</option>
                            <option value="select">Select</option>
                            <option value="password">Contraseña</option>
                            <option value="email">Email</option>
                            <option value="number">Numero</option>
                            <option value="checkbox">Casilla de verificacion</option>
                            <option value="submit">Boton de guardar</option>
                            <option value="reset">Boton de resetear</option>

                        </select>
                    </div>
                    <div class="" id="label-group"><!--Grupo etiqueta-->
                        <label for="field-label" class="form-label" id="label-group-label">Etiqueta del Campo</label>
                        <input type="text" id="field-label" v-model="label" class="form-control">
                    </div>
                    <div class="form-check" id="required-group" style="margin-left: 9px;"><!-- Grupo requerido -->
                        <label for="field-required" class="form-check-label" role="switch">Requerido</label>
                        <input type="checkbox" id="field-required" v-model="required" class="form-check-input">
                    </div>
                    <div class="" id="placeholder-group"><!-- Grupo placeholder -->
                        <label for="field-placeholder" class="form-label">Placeholder:</label>
                        <input type="text" id="field-placeholder" v-model="placeholder" class="form-control">
                    </div>
                    <div class="mt-4">
                        <button @click="addField" class="btn btn-primary">Agregar campo</button>
                    </div>
                </div>

                <!-- Submit -->

                <!-- Grupo etiqueta para grupos de campos
      <input type="text" id="group-name" placeholder="Nombre del grupo">
      <button onclick="addGroup()">Add group</button>
      -->
            </div>

            <!-- CANVAS -->
            <div class="col-9">
                <div id="form-builder" class="">
                    <div v-for="(field, index) in formFields" :key="index" :data-id="field.id_Field"
                        class="animacion animate__animated animate__slideInLeft animate-fast">
                        <div class="row" align-items-center>
                            <div class="col">
                                <field-component :field="field" />
                            </div>
                            <div class="col-3 col-md-1" style="margin: 0 auto; padding: 0;">
                                <div>
                                    <!-- boton de arrastrar -->
                                    <span class="draggable-handle">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="currentColor"
                                            class="bi bi-arrows-move" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 
          0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 
          0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 
          0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 
          0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 
          0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
                                        </svg>
                                    </span>
                                </div>
                                <br>
                                <div>
                                    <!-- boton de eliminar -->
                                    <span @click="deleteFields(index)" class="deletebutton"> <!-- funcion de eliminar -->
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                            class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 
    2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 
    0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 
    0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                                        </svg>
                                    </span>
                                </div>
                                <br>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-success" id="button-create-form" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">Crear Formulario</button>
                </div>
            </div>
            <br>
        </div>
        <div v-for="Lista of ListaFormulario" :key="this.$route.params.id">
            <ul>
                <li>
                    {{ Lista.titulo }}
                </li>
            </ul>
        </div>


    </div>

    <!-- MODAL -->
    <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear formulario</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Titulo:</label>
                            <input type="text" class="form-control" id="titulo" v-model="titulo">
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Descripción:</label>
                            <textarea class="form-control" id="descripcion" style="height: 80px; resize: none;"
                                v-model="descripcion"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <div class="">
                        <router-link to="/formularios">
                            <button type="button" class="btn btn-primary" @click="createForm">Guardar</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sortable from 'sortablejs'//corregir
import { ref } from 'vue';
import FieldComponent from '../components/FieldComponent.vue'; // Importa el componente
import axios from 'axios';
import 'animate.css';
import { RouterLink } from 'vue-router';

export default {
    components: {
        FieldComponent// Registra el componente
    },
    data() {
        return {
            formFields: [],
            formBuilder: null,
            titulo: '',
            descripcion: '',
            label: '',
            type: 'text',
            required: 0,
            placeholder: '',
            fieldCounter: 1,
            order: [],
            fecha_Creacion: '',
        };
    },
    mounted() {
        this.formBuilder = document.getElementById('form-builder');
        new Sortable(this.formBuilder, {
            animation: 150,
            handle: '.draggable-handle',
            dataIdAttr: "data-id",
            onEnd: () => {
                console.log("Se insertó un elemento");
            },
            group: "fieldsList",
            store: {
                set: (sortable) => {
                    this.order = sortable.toArray();
                    console.log(this.order)
                }
            }
        });

        this.editForm();
    },
    methods: {

        EliminarCampoVistaPrevia() { console.log("eliminar") },

        //Actualizar form builder segun el tipo de campo seleccionado
        miSelect: addEventListener('change', function () {
            const miSelect = document.getElementById('field-type');
            const $grupoPlaceholder = document.getElementById('placeholder-group');
            const $grupolabel = document.getElementById('label-group');
            const $gruporequired = document.getElementById('required-group');
            let opcionSeleccionada = miSelect.value;
            if (opcionSeleccionada === 'select' || opcionSeleccionada === 'checkbox'
                || opcionSeleccionada === 'submit' || opcionSeleccionada === 'reset') {
                $grupoPlaceholder.style.display = "none";
                if (opcionSeleccionada === 'submit' || opcionSeleccionada === 'reset') {
                    $grupolabel.style.display = "none";
                    $gruporequired.style.display = "none";
                }
            } else {
                $grupoPlaceholder.style.display = "block";
                $grupolabel.style.display = "block";
                $gruporequired.style.display = "block";
            }
        }),


        //    ARREGLO QUE GUARDA LOS ELEMENTOS
        addField() {
            let label = document.getElementById('field-label').value;
            let type = document.getElementById('field-type').value;
            let required = document.getElementById('field-required').checked;
            let placeholder = document.getElementById('field-placeholder').value;
            let options;

            const fieldId = this.fieldCounter;

            this.fieldCounter++;

            if (type === 'select') {
                const selectOptions = prompt('Ingrese opciones del select (separadas por coma)');
                if (!selectOptions) return; // Si no hay opciones, no agregar el campo
                options = selectOptions.split(','); // Asignamos el valor a la variable
                this.formFields.push({ id_Field: fieldId, nombre: label, label, type, required, placeholder, options });
                placeholder = '';
            } else {
                this.formFields.push({ id_Field: fieldId, nombre: label, label, type, required, placeholder });
            }

            // Resetear formulario de crear campos
            this.label = '';
            this.type = 'text';
            this.required = false;
            this.placeholder = '';
        },

        
        // Función que elimina los campos del lienzo

        deleteFields(index) {
            const fieldContainer = document.getElementsByClassName("animacion")[index];
            if (fieldContainer) {
                fieldContainer.classList.add("animate__slideOutRight");
                setTimeout(() => {
                    this.formFields.splice(index, 1);
                    this.order.splice(order, 1);
                }, 400);
            }
        },

        //MOSTRAR CAMPOS A EDITAR EN EL FORMBUILDER
        //.........

        //FUNCIÓN PARA EDITAR FORMULARIO
        editForm() {
            console.log("editar está funcionando");
            const idConfigForm = this.$route.params.id;
            axios.get(`/api/ConfigForm/MostrarFormularioCompleto/${idConfigForm}`)
            .then((response) => {
                const campos = response.data.datosField;

                campos.forEach(campo => {
                    this.formFields.push({
                        id_Field: campo.id_Field,
                        label: campo.nombre,
                        type: campo.tipo,
                        required: campo.requerido ? 1 : 0,
                        options: campo.opciones,
                    });
                });

                const datosForm = response.data.datosForm;
                this.titulo = datosForm.titulo;
                this.descripcion = datosForm.descripcion;
            })
            .catch(error => {   
                if (error.response) {
                console.error('Error de respuesta:', error.response.status);
                } else if (error.request) {
                console.error('Error de red: No se recibió respuesta');
                } else {
                console.error('Error de configuración:', error.message);
                }
            });
        },

        
    },
};


</script>


<style scoped>
#form-builder {
    width: 1000px;
    height: 550px;
    border: 3px solid #2d579a;
    padding: 40px;
    background-color: #e6e6e6;
    border-radius: 7px;
    overflow: auto;
    margin: auto;
}

#contenedor-padre {
    margin: 20px;
}

.draggable-handle {
    cursor: move;
}

.deletebutton {
    cursor: pointer;
}

#button-create-form {
    margin: 8px 50px;
}

.animate-fast {
    animation-duration: 0.2s;
}
</style>