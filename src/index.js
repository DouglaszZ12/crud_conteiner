import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import axios from 'axios';

import { connectionPage } from 'dataFixed';
import { SetShowData } from 'interface/data';

const root = ReactDOM.createRoot(document.getElementById('root'));

const data = new FormData();
data.append('show_data', 'show_data');

axios({
    url    : connectionPage + "php/list_data.php",
    mode   : "no-cors",
    method : "POST",
    data   : data
}).then(response =>{
    console.log(response.data);
    SetShowData('conteiner', response.data.conteiner);
    SetShowData('movement', response.data.movement);
    SetShowData('reports', response.data.reports);
    root.render(
        <React.Fragment>
            <App />
        </React.Fragment>
    );
})
