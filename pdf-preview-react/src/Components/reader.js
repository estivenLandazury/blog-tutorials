import React from 'react';
import '../customcss/reader.css'
import { connect } from 'react-redux';
import logop from './images/descarga.png';




class Reader extends React.Component {

    state = {
        rows: [],



    }

    componentDidMount() {

        console.log("desde REDUX " + this.props.prueba)
    }





    /**
     * Metodo que permite  añadir una fila de forma dinamica a la tabla dibujada en el componente,
     * Items: cada item seguido de la coma hace referencia a los campos de la tabla 
     */
    handleAddRow = () => {
        const item = {
            Item: "",
            FacturaNro: "",
            FechaFactura: "",
            Marca: "",
            NombreComercial: "",
            Referencia: "",
            Tipo: "",
            Clase: "",
            Modelo: "",
            SubPartidaArancelaria: "",
            Valor: "",
            Unidad: "",
            Cantidad: "",
            CantidadDeclarar: "",
            PesoSistema: "",
            Preinspeccion: "",
            ConservarDatos: "",
            Carpeta: "",
            Embarque: "",
            CertificadoOrigen: "",
            NroRegistro: "",

        };


        this.props.cambiarJson(item)


    };

    /** Metodo que permite remover una fila de la tabla que se  */

    handleRemoveRow = () => {


        this.props.eliminarFila()
    };


    /** Metodo que permite descargar el contenido de la tabla en formatao csv
     * @param: csv, parametro que hace referencia al formato csv que se desea descargar
     * @param:filename, parametro que hace referencia al nombre del archivo que se descargará
     */

    downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });

        // Download link
        downloadLink = document.createElement("a");

        // File name
        downloadLink.download = filename;

        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // Hide download link
        downloadLink.style.display = "none";

        // Add the link to DOM
        document.body.appendChild(downloadLink);

        // Click download link
        downloadLink.click();
    }


    /** Metodo que obtiene la información de la tabla de forma dinámica y almacenarla en un archivo csv
     * @param: filename, nombre del nuevo archivo que contendra la información de la tabla
     */
    exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");

        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }


    /**
     * Metodo que permite realizar el filtrado de la tabla, por el campo ubicado en la posición  indicado en la iteración
     */

    Filtrartabla() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[5];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }




    /**
     * Metodo que pinta la tabla  en el DOM del navegador 
     * 
     */


    dibijarTabla() {

        return <div >
            <div className="center_Title">


                <div className="principal">

                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                                <h1 className="Title_table"> Digitalización de Archivo</h1>
                            </div>
                            <div className="col-sm">
                                <img src={logop} className="home-logo" alt="Logo" />
                            </div>

                        </div>
                    </div>


                </div>


                <div className="containers">
                    <div className="row">
                        <div classname="col-sm">
                            <button type="button" id="añadirFila" className="btn btn-success" onClick={this.handleAddRow.bind(this)}>Añadir Fila</button>
                        </div>
                        <div classname="col-sm">
                            <input className="form-control mr-sm-2" type="search" onChange={this.Filtrartabla.bind(this)} id="myInput" placeholder="Search" aria-label="Search" />
                        </div>

                    </div>
                </div>
            </div>





            <div className="table-responsive">
                <table className="table" id="myTable">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            <th scope="col">FacturaNro</th>
                            <th scope="col">FechaFactura</th>
                            <th scope="col">Marca</th>

                            <th scope="col">NombreComercial</th>
                            <th scope="col">Referencia</th>
                            <th scope="col">Tipo</th>

                            <th scope="col">Clase</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">SubPartidaArancelaria</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Unidad</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">CantidadDeclarar</th>
                            <th scope="col">PesoSistema</th>
                            <th scope="col">Preinspeccion</th>
                            <th scope="col">ConservarDatos</th>
                            <th scope="col">Carpeta</th>
                            <th scope="col">Embarque</th>
                            <th scope="col">CertificadoOrigen</th>
                            <th scope="col">NroRegistro</th>


                        </tr>
                    </thead>
                    <tbody>
                        {this.props.json.map((cand, index) => {
                            return (
                                <tr key={index}>
                                    <td scope="row" contenteditable='true'> {index}</td>
                                    <td scope="row" contenteditable='true'> {cand['Item']}</td>
                                    <td scope="row" contenteditable='true'> {cand['FacturaNro']}</td>
                                    <td scope="row" contenteditable='true'> {cand['FechaFactura']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Marca']}</td>
                                    <td scope="row" contenteditable='true'> {cand['NombreComercial']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Referencia']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Tipo']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Clase']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Modelo']}</td>
                                    <td scope="row" contenteditable='true'> {cand['SubPartidaArancelaria']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Valor']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Unidad']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Cantidad']}</td>
                                    <td scope="row" contenteditable='true'> {cand['CantidadDeclarar']}</td>
                                    <td scope="row" contenteditable='true'> {cand['PesoSistema']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Preinspeccion']}</td>
                                    <td scope="row" contenteditable='true'> {cand['ConservarDatos']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Carpeta']}</td>
                                    <td scope="row" contenteditable='true'> {cand['Embarque']}</td>
                                    <td scope="row" contenteditable='true'> {cand['CertificadoOrigen']}</td>
                                    <td scope="row" contenteditable='true'> {cand['NroRegistro']}</td>
                                    <td scope="row" contenteditable='true'> <button type="button" class="btn btn-danger" onClick={this.handleRemoveRow.bind(this)}>Eliminar</button>
                                    </td>


                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <button type="button" id="export" className="btn btn-success" onClick={this.exportTableToCSV.bind(this, "export.csv")}>Exportar Tabla</button>



        </div>



    }







    render() {
        return (


            <div>
                {this.dibijarTabla()}
            </div>
        );
    }


}



/**
 * 
 * @param {*} state, parametro que hace referencia al estado global par ser utilizado en este componente, el state hace referencia al estado que se instanció en Redux
 */
const mapStateProps = state => ({

    prueba: state.prueba,
    json: state.json,



})

/**
 * 
 * @param {*} dispactch este parametro hace referencia al despachador que se utiliza por cada metodo instanciado para ser manejado en Redux y cambiar el estado a lo que se requiera 
 */

const mapDispatchToProps = dispactch => ({


    /**
     * 
     * @param {*} item  hace referncia al json que llega como parametro del resultado obtenido en la solicitud POS
     */
    cambiarJson(item) {

        dispactch({
            type: "cambiarJson",
            input: item
        })


    },

    /**
     * Este método pemite modificar el json que se ha obtenido al realizar la petición POS para actualizar las filas eliminadas.
     */

    eliminarFila() {

        dispactch({
            type: "EliminarFila",
        })

    }










})

export default connect(mapStateProps, mapDispatchToProps)(Reader);
