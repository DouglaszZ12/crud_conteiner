
import axios from "axios";
import { connectionPage } from "dataFixed";

import { SetShowData } from "interface/data";

export function Reg_Deleter(type, id){

    const data = new FormData();
    data.append('edit_data', type);  
    data.append('type_data', 'delete');   

    data.append('id', id);

    axios({
        url    : connectionPage + "php/register.php",
        mode   : "no-cors",
        method : "POST",
        data   : data
    })
    .then(response=>{
        console.log(type);
        if(type == 'edit_or_register_conteiner'){

            SetShowData('conteiner', response.data);

        }else if(type == 'edit_or_register_movement'){

            SetShowData('movement', response.data);

        }

    }).catch((error)=>{

    })

}

export function Reg_Register(id, client, numb, type, status, category){

    const data = new FormData();
    data.append('edit_data', 'edit_or_register_conteiner');  
    data.append('type_data', 'register');   

    data.append('id', id);
    data.append('client', client);
    data.append('numb', numb);
    data.append('type', type);
    data.append('status', status);
    data.append('category', category);

    axios({
        url    : connectionPage + "php/register.php",
        mode   : "no-cors",
        method : "POST",
        data   : data
    })
    .then(response=>{
        console.log(response.data);
        SetShowData('conteiner', response.data);

    }).catch((error)=>{

    })

}

export function Reg_Movement(id, client, type, dateStart, dateEnd){

    const data = new FormData();
    data.append('edit_data', 'edit_or_register_movement');  
    data.append('type_data', 'register');   

    data.append('id', id);
    data.append('client', client);
    data.append('type', type);
    data.append('start', dateStart);
    data.append('end', dateEnd);

    axios({
        url    : connectionPage + "php/register.php",
        mode   : "no-cors",
        method : "POST",
        data   : data
    })
    .then(response=>{
        console.log(response.data);
        SetShowData('movement', response.data);

    }).catch((error)=>{

    })

}