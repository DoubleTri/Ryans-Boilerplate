import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {  Button, Row, Col  } from 'antd';

import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';

class App extends Component {
  render() {

    let division = 'Div 1';
    let dept = 'Dept 1'
    let description = 'Here is a new description to continue testing React OrgChart...'

    const initechOrg = {
      name: "Bill Lumbergh",
      actor: "Gary Cole",

      children: [
        {
          name: 
          <Col span={24}>
            <h3>{division}</h3>
            <hr/>
            <Row>
              <Col span={12} className='v1'>
                <div style={{ fontWeight: 'bold' }}>{dept}</div>
                <hr />
                <p style={{ textAlign: 'left'}}>{description}</p>
              </Col>
              <Col span={12} className='v2'>
                <div style={{ fontWeight: 'bold' }}>{dept}</div>
                <hr />
                <p style={{ textAlign: 'left'}}>{description}</p>
              </Col>
            </Row>
          </Col>,
          actor: "Ron Livingston",
        },
        {
          name: <div><h3>{division}</h3>
          <p style={{ padding: '10px' }}>{description}</p></div>,
          actor: "Ron Livingston",
        },
        {
          name: "Milton Waddams",
          actor: "Stephen Root"
        },
        {
          name: "Bob Slydell",
          actor: "John C. McGi..."
        },
      ]

    };

    const MyNodeComponent = ({node}) => {
      return (
        <div className="initechNode" onClick={() => alert("Hi my real name is: " + node.actor)}>{ node.name }</div>
      );
    };

    return (
      <div className="App" id="initechOrgChart">
        <OrgChart tree={initechOrg} NodeComponent={MyNodeComponent} />
      </div>
    );
  }
}

export default App;