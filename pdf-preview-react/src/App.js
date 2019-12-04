import React from 'react';
import { Container, Header, Grid, Form } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import './customcss/app.css'


class App extends React.Component {

  state = {
    file: null,
    numPages: 0,
    pageNumber: 1,
    rows: [],

    json: [{
      "Item": 1,
      "FacturaNro": 21896,
      "FechaFactura": "2019/12/24",
      "Marca": "Gato",
      "NombreComercial": "San Andresito",
      "Referencia": 368741,
      "Tipo": "--",
      "Clase": "--",
      "Modelo": "--",
      "SubPartidaArancelaria": "--",
      "Valor": "--",
      "Unidad": "--",
      "Cantidad": "--",
      "CantidadDeclarar": "--",
      "PesoSistema": "--",
      "Preinspeccion": "--",
      "ConservarDatos": "eee",
      "Carpeta": "--",
      "Embarque": "--",
      "CertificadoOrigen": "--",
      "NroRegistro": "677"
    },
    {
      "Item": 2,
      "FacturaNro": 29894,
      "FechaFactura": "2019/09/03",
      "Marca": "China",
      "NombreComercial": "San Victorino",
      "Referencia": 458741,
      "Tipo": "--",
      "Clase": "--",
      "Modelo": "--",
      "SubPartidaArancelaria": "--",
      "Valor": "--",
      "Unidad": "--",
      "Cantidad": "--",
      "CantidadDeclarar": "--",
      "PesoSistema": "--",
      "Preinspeccion": "--",
      "ConservarDatos": "eee",
      "Carpeta": "--",
      "Embarque": "--",
      "CertificadoOrigen": "--",
      "NroRegistro": "444"
    }
    ]
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  nextPage = () => {

    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;

    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }

    this.setState({
      pageNumber: nextPageNumber
    });
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
    this.setState({
      json: [...this.state.json, item]
    });
  };

  handleRemoveRow = () => {
    this.setState({
      json: this.state.json.slice(0, -1)
    });
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

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div className="container">

        <button type="button" class="btn btn-success" onClick={this.handleAddRow.bind(this)}>Añadir</button>


        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">FacturaNro</th>
              <th scope="col">FechaFactura</th>
              <th scope="col">Marca"</th>

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
            {this.state.json.map((cand, index) => {
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

        <button type="button" onClick={this.exportTableToCSV.bind(this, "export.csv")}>Export HTML Table To CSV File</button>




        <Container>


          <br />
          <Header textAlign="center">PDF Preview</Header>
          <Form>
            <input type="file" onChange={this.onFileChange}>
            </input>
          </Form>
          <Grid centered columns={2}>
            <Grid.Column textAlign="center" onClick={this.nextPage}>

              <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} noData={<h4>Please select a file</h4>}>
                <Page pageNumber={pageNumber} />
              </Document>

              {this.state.file ? <p>Page {pageNumber} of {numPages}</p> : null}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;