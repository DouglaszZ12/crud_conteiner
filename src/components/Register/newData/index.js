import React, { useState, useEffect } from "react";

import { RegisterModalData, RegisterModalObserver, SetModalState } from "interface/popup";
import { GetShowData, RegisterShowData } from "interface/data";
import { Reg_Register } from "services";

export default function PopUp_Register(){

    const [ modalData, setModaldata ] = useState({});
    const [ showPopUp, setShowPopUp ] = useState(false);
    const [ dataPage, setDataPage ]   = useState(GetShowData('conteiner'));

    const [ client, setClient ]    = useState('');
    const [ numb, setNumb ]         = useState('');
    const [ type, setType ]         = useState('');
    const [ status, setStatus ]     = useState('');
    const [ category, setCategory ] = useState('');

    useEffect(()=>{
        RegisterModalData('popUpRegister', setModaldata);
        RegisterModalObserver('popUpRegister', setShowPopUp);

        RegisterShowData('conteiner', setDataPage);
    }, []);   
    
    useEffect(()=>{
        if(showPopUp == true){
            setClient(InitialData('client'));
            setNumb(InitialData('numb'));
            setType(InitialData('type'));
            setStatus(InitialData('status'));
            setCategory(InitialData('category'));
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
        Reg_Register(modalData.id, client, numb, type, status, category);
        SetModalState('popUpRegister', false);
    }

    return (
        (showPopUp ?
            <>
                <div className="PopUp">
                    <div className="all register_popup">
                        <div className="div_data">
                            <div className="title title_confirmation">
                                Dados
                                <div className="popup_close" onClick={ ()=>{ SetModalState('popUpRegister', false); } }>
                                    X
                                </div>
                            </div>
                        </div>
                        <div className="div_data" style={ { paddingTop: 0 } }>
                            <div className="content">
                                <div className="div_data_popup">
                                    <div>Cliente</div> 
                                    <div>
                                        <input type="text" onChange={ (e)=>{ setClient(e.target.value) } } value={ client } />
                                    </div>
                                </div>
                                <div className="div_data_popup">
                                    <div>Número do contêiner </div>
                                    <div>
                                        <input type="text" onChange={ (e)=>{ setNumb(e.target.value) } } value={ numb.replaceAll(' ', '') } maxLength="11" />
                                    </div>
                                </div>
                                <div className="div_data_popup">
                                    <div>Tipo</div>
                                    <div>
                                        <select className="select_type" onChange={ (e)=>{ setType(e.target.value) } } value={ type }>
                                            <option value="">#</option>
                                            <option value="20">20</option>
                                            <option value="40">40</option>
                                        </select>
                                    </div>
                                    <div>Categoria</div>
                                    <div>
                                        <select onChange={ (e)=>{ setCategory(e.target.value) } } value={ category }>
                                            <option value="">#</option>
                                            <option value="Importação">Importação</option>
                                            <option value="Exportação">Exportação</option>
                                        </select>
                                    </div>
                                    <div>Status</div>
                                    <div>
                                        <select onChange={ (e)=>{ setStatus(e.target.value) } } value={ status }>
                                            <option value="">#</option>
                                            <option value="Cheio">Cheio</option>
                                            <option value="Vazio">Vazio</option>
                                        </select>
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