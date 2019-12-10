import React from 'react';
import { Container, Header, Grid, Form } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import '../customcss/app.css'

import { UncontrolledCarousel, Modal, ModalBody, ModalFooter, ModalHeader, Alert, Button } from "reactstrap";

import { connect } from 'react-redux';
import { runInThisContext } from 'vm';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';



class Filer extends React.Component {

    state = {
        file: null,
        numPages: 0,
        pageNumber: 1,
        URl: "http://172.19.15.45:5000/",
        rows: [],
        modalIsopen: false,
        open: false

    }

    onFileChange = (event) => {

        try {
            this.setState({
                file: event.target.files[0]
            });
            this.props.cambiarFile(event.target.files[0], event.target.files[0].name)

        } catch (error) {

        }



    }

    onDocumentLoadSuccess = ({ numPages }) => {
        console.log("total paginas " + numPages)
        this.setState({ numPages: numPages });
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





    DrawFile() {

        return <div>  <Container>


            <br />
            <Header textAlign="center" className="Title_filer">PDF Preview</Header>
            <Form>
                <input type="file" onChange={this.onFileChange}>
                </input>
                <button type="button" id="digitalñFile" className="btn btn-success" onClick={this.sendServer.bind(this)} >Digitalizar Archivo  </button>
                {this.loaderbar()}




            </Form>
            <Grid centered columns={2}>
                <Grid.Column textAlign="center" onClick={this.nextPage}>

                    <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} noData={<h4 className="please">Please select a file</h4>}>
                        <Page pageNumber={this.state.pageNumber} />
                    </Document>

                    {this.state.file ? <p>Page {this.state.pageNumber} of {this.state.numPages}</p> : null}
                </Grid.Column>
            </Grid>
        </Container></div>

    }



    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };




    toggleModal = value => {
        this.setState({
            modalIsopen: !this.state.modalIsopen
        });


    }







    sendServer() {



        if (this.props.filer !== null) {


            const that = this

            const data = new FormData();
            data.append('file', this.props.filer);


            /**that.props.habilitarTable(false)*/

            /** ----------------------Fetch1 Almacena datos en servidor--------------------------- */
            fetch(that.state.URl + 'upload', {
                method: 'POST',
                body: data,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((response) => response.json())

                .then(function (responseJson) {

                    if (responseJson["results"] === "success") {
                        that.props.cambiarState1("success")


                        /** ----------------------Fetch2 Almacena datos en  el bucket de S3 en AWS --------------------------- */
                        let options = {
                            method: 'POST',
                            body: JSON.stringify({ "name": that.props.nameFile }),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*'
                            },

                        }
                        fetch(that.state.URl + 'send', options)
                            .then((response) => response.json())
                            .then((responseJson) => {



                                if (responseJson["results"] === "success") {
                                    that.props.cambiarState2("success")
                                    console.log("textract " + that.props.nameFile)
                                    let options = {
                                        method: 'POST',
                                        body: JSON.stringify({ "name": that.props.nameFile }),
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Origin': '*'
                                        },

                                    }
                                    /** ---------------------- Fetch3 Consulta el Textract de Aws para digitalizar la Factura --------------------------- */

                                    fetch(that.state.URl + 'textract', options)
                                        .then((response) => response.json())
                                        .then((responseJson) => {

                                            if (responseJson["results"] === "success") {
                                                that.props.cambiarState3("success")


                                                fetch(that.state.URl + 'generateTable', options)
                                                    .then((response) => response.json())
                                                    .then((responseJson) => {
                                                        that.props.cambiarState4("success")
                                                        NotificationManager.success('Success message', 'Se ha digitalizado el archivo correctamente');


                                                        that.props.cambiarFileTable(responseJson, false)


                                                        /*that.props.habilitarTable(true)*/

                                                    }).catch(error => console.log(error))


                                                console.log("Ya estamos con Textract")


                                            }



                                        }).catch(error => console.log(error))






                                }

                            }).catch(error => console.log(error))
                        console.log("careVerga")
                    }


                }).catch(error => console.log(error))

        } else if (this.props.filer === null) {
            NotificationManager.warning('Warning message', 'Seleccione un archivo', 3000);

        }


    }


    loader() {
        return <div>
            <h1 className="loader"> Loading... 25%</h1>
            <div className="loader2"></div>
        </div>
    }


    loaderbar() {

        if (this.props.state1 === "success") {
            return <div>
                <h1 className="loader"> Loading... 25%</h1>
                <div className="loader2"></div>

            </div>
        }

        if (this.props.state2 === "success") {
            return <div>
                <h1 className="loader"> Loading.. 50%</h1>

                <div className="loader2"></div>
            </div>

        }
        if (this.props.state3 === "success") {
            return <div>
                <h1 className="loader"> Loading... 75%</h1>
                <div className="loader2"></div>

            </div>

        }
        if (this.props.state4 === "success") {
            return <div>
                <h1 className="loader"> Complete 100%</h1>
                <div className="loader2"></div>


            </div>

        }

        if (this.props.loader === false) {
            return <div>

            </div>

        }


    }


    render() {

        return (

            <div className="">
                {this.DrawFile()}
                <NotificationContainer />



                <Modal isOpen={this.state.open}>
                    <ModalHeader >Digitalización de Factura</ModalHeader>
                    <ModalBody>
                        <h3 style={{ fontSize: 20 }}>
                            Estamos digitalizando la factura, por favor espere un momento....
                                        </h3>
                        {this.loaderbar()}

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCloseModal}>Ok</Button>
                    </ModalFooter>
                </Modal>





            </div>
        );
    }
}



const mapStateProps = state => ({

    prueba: state.prueba,
    filer: state.filer,
    nameFile: state.nameFile,
    state1: state.state1,
    state2: state.state2,
    state3: state.state3,
    state4: state.state4,
    loader: state.loader

})

const mapDispatchToProps = dispactch => ({
    cambiarFile(e, e1) {
        dispactch({
            type: "Change_File",
            File: e,
            nameFile: e1
        })
    },

    cambiarFileTable(e, e2) {
        dispactch({
            type: "File_Table",
            input: e,
            input1: e2
        })

    },


    cambiarState1(e) {
        dispactch({
            type: "Change_state1",
            state1: e
        })

    }
    ,
    cambiarState2(e) {
        dispactch({
            type: "Change_state2",
            state2: e
        })

    }
    ,
    cambiarState3(e) {
        dispactch({
            type: "Change_state3",
            state3: e
        })

    }

    ,
    cambiarState4(e) {
        dispactch({
            type: "Change_state4",
            state4: e
        })

    },

    cambiarLoader(e) {
        dispactch({
            type: "CambiarLoader",
            input: e
        })


    }




})

export default connect(mapStateProps, mapDispatchToProps)(Filer);