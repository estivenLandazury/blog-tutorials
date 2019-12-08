import React from 'react';
import { Container, Header, Grid, Form } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import './customcss/app.css'

import Reader from './Components/reader'
import CoolTabs from 'react-cool-tabs';
import { Provider } from "react-redux"
import Store from "./Components/Redux/store"

class App extends React.Component {

  state = {
    file: null,
    numPages: 0,
    pageNumber: 1,
    rows: [],

  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
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



  tab1() {
    return <div>  <Container>


      <br />
      <Header textAlign="center">PDF Preview</Header>
      <Form>
        <input type="file" onChange={this.onFileChange}>
        </input>
      </Form>
      <Grid centered columns={2}>
        <Grid.Column textAlign="center" onClick={this.nextPage}>

          <Document file={this.state.file} onLoadSuccess={this.onDocumentLoadSuccess} noData={<h4>Please select a file</h4>}>
            <Page pageNumber={this.state.pageNumber} />
          </Document>

          {this.state.file ? <p>Page {this.state.pageNumber} of {this.state.numPages}</p> : null}
        </Grid.Column>
      </Grid>
    </Container></div>

  }

  tab2() {
  return <div> {<Reader></Reader>}</div>
  }







  render() {

    return (
      <Provider store={Store}>

        <div className="">


          <div>
            <CoolTabs className="Tabs"
              tabKey={'1'}

              activeTabStyle={{ background: '#4374e8', color: 'white' }}
              unActiveTabStyle={{ background: '#279fd0', color: 'black' }}

              leftTabTitle={'Visualizar Archivo'}
              rightTabTitle={'Visualizar Tabla'}
              leftContent={this.tab1()}
              rightContent={this.tab2()}
              contentTransitionStyle={'transform 0.6s ease-in'}
              borderTransitionStyle={'all 0.6s ease-in'} />
          </div>




        </div>
      </Provider>
    );
  }
}

export default App;