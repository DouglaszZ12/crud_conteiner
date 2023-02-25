import React, { useState, useEffect } from "react";

import { RegisterModalData, RegisterModalObserver, SetModalState } from "interface/popup";
import { GetShowData, RegisterShowData } from "interface/data";
import { Reg_Movement } from "services";

export default function PopUp_Movement(){

    const [ modalData, setModaldata ]   = useState({});
    const [ showPopUp, setShowPopUp ]   = useState(false);
    const [ dataPage, setDataPage ]     = useState(GetShowData('movement'));
    const [ listClient, setListClient ] = useState(GetShowData('conteiner'));

    const [ client, setClient ]       = useState('');
    const [ type, setType ]           = useState('');
    const [ dateStart, setDateStart ] = useState('');
    const [ dateEnd, setDateEnd ]     = useState('');

    useEffect(()=>{
        RegisterModalData('popUpMovement', setModaldata);
        RegisterModalObserver('popUpMovement', setShowPopUp);

        RegisterShowData('movement', setDataPage);
        RegisterShowData('conteiner', setListClient);
    }, []);   
    
    useEffect(()=>{
        if(showPopUp == true){
            setClient(InitialData('id_given'));
            setType(InitialData('type'));
            setDateStart(InitialData('start'));
            setDateEnd(InitialData('end'));
        }
    }, [showPopUp]);

    function InitialData(type){
        if(modalData.id != 0){
            const newData = dataPage.find(item => item.id == modalData.id);
            return newData[type]
        }
        return '';
    }

    function SaveData(){
        Reg_Movement(modalData.id, client, type, dateStart, dateEnd);
        SetModalState('popUpMovement', false);
    }

    return (
        (showPopUp ?
            <>
                <div className="PopUp">
                    <div className="all moviment_popup">
                        <div className="div_data">
                            <div className="title title_confirmation">
                                Dados
                                <div className="popup_close" onClick={ ()=>{ SetModalState('popUpMovement', false); } }>
                                    X
                                </div>
                            </div>
                        </div>
                        <div className="div_data" style={ { paddingTop: 0 } }>
                            <div className="content">
                                <div className="div_data_popup">
                                    <div>Cliente</div> 
                                    <div>
                                        <select className="select_type" onChange={ (e)=>{ setClient(e.target.value) } } value={ client }>
                                            <option value="">#</option>
                                            {
                                                listClient.map((key, index)=>{
                                                    return(
                                                        <option value={ key.id } key={ index }>{ key.numb }</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>Tipo</div>
                                    <div>
                                        <select className="select_type" onChange={ (e)=>{ setType(e.target.value) } } value={ type }>
                                            <option value="">#</option>
                                            <option value="Embarque">Embarque</option>
                                            <option value="Descarga">Descarga</option>
                                            <option value="Gate in">Gate in</option>
                                            <option value="Gate out">Gate out</option>
                                            <option value="Reposicionamento">Reposicionamento</option>
                                            <option value="Pesagem">Pesagem</option>
                                            <option value="Scanner">Scanner</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="div_data_popup">
                                    <div>Início</div>
                                    <div>
                                        <input type="datetime-local" onChange={ (e)=>{ setDateStart(e.target.value) } } value={ dateStart } />
                                    </div>
                                    <div>Término</div>
                                    <div>
                                        <input type="datetime-local" onChange={ (e)=>{ setDateEnd(e.target.value) } } value={ dateEnd } />
                                    </div>
                                </div>
                                <div className="button_register" onClick={ ()=>{ SaveData() } }>
                                    Salvar
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        : <React.Fragment></React.Fragment>)
    );
}