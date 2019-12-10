import React from 'react';
import { Container, Header, Grid, Form } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import './customcss/app.css'

import Reader from './Components/reader'
import Filer from './Components/filer'
import CoolTabs from 'react-cool-tabs';
import { Provider } from "react-redux"
import Store from "./Components/Redux/store"

class App extends React.Component {


  render() {
    

    return (
      <Provider store={Store}>




        <div className="" >
          <div>
            <CoolTabs className="Tabs"
              tabKey={'1'}

              activeTabStyle={{ background: '#4374e8', color: 'white' }}
              unActiveTabStyle={{ background: '#279fd0', color: 'black' }}

              leftTabTitle={'Visualizar Archivo'}
              rightTabTitle={'Visualizar Tabla'}
              leftContent={<Filer></Filer>}
              rightContent={<Reader></Reader>}
              contentTransitionStyle={'transform 0.6s ease-in'}
              borderTransitionStyle={'all 0.6s ease-in'} />
          </div>



        </div>
      </Provider>
    );
  }
}

export default App;