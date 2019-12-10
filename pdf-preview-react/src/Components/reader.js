import React from 'react';
import '../customcss/reader.css'
import { connect } from 'react-redux';



class Reader extends React.Component {

    state = {
        rows: [],



    }

    componentDidMount() {


        console.log("desde REDUX " + this.props.prueba)
    }






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

    handleRemoveRow = () => {


        this.props.eliminarFila()
    };

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



    dibijarTabla() {

        return <div >
            <div className="center_Title">

                <h1 className="Title_table"> Digitalización de Archivo</h1>
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




const mapStateProps = state => ({

    prueba: state.prueba,
    json: state.json,



})

const mapDispatchToProps = dispactch => ({

    cambiarJson(item) {

        dispactch({
            type: "cambiarJson",
            input: item
        })


    },


    eliminarFila() {

        dispactch({
            type: "EliminarFila",
        })

    }










})

export default connect(mapStateProps, mapDispatchToProps)(Reader);
