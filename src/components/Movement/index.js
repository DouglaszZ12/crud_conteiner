import { useState, useEffect } from "react";

import { GetShowData, RegisterShowData } from "interface/data";
import { SetModalData, SetModalState } from "interface/popup";
import { Reg_Deleter } from "services";

export default function Movement(){

    const [ showData, setShowData ] = useState(GetShowData('movement'));

    useEffect(()=>{
        RegisterShowData('movement', setShowData);
    }, []);

    function EditRegisterData(id){
        SetModalState('popUpMovement', true);
        SetModalData('popUpMovement', { "id": id });
    }

    function DeleteData(id){
        Reg_Deleter('edit_or_register_movement', id);
    }

    return(
        <div className="Movement">
            <div className="div_new_data">
                <div className="button_new" onClick={ ()=>{ EditRegisterData(0) } }>
                    Novo cadastro
                </div>
            </div>
            <div className="">
                <table>
                    <tbody>
                        <tr>
                            <th width="20" align="center">#</th>
                            <th>Contêiner</th>
                            <th>Tipo de movimentação</th>
                            <th width="160">Início</th>
                            <th width="160">Término</th>
                            <th width="20" align="center">#</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            showData.map((key, index)=>{
                                return(
                                    <tr key={ index }>
                                        <td>{ index + 1 }</td>
                                        <td>{ key.numb }</td>
                                        <td>{ key.type }</td>
                                        <td>{ key.start_br }</td>
                                        <td>{ key.end_br }</td>
                                        <td>
                                            <div className="opt_alt">
                                                <div className="delete" onClick={ ()=>{ DeleteData(key.id) } }>
                                                    <svg className="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" />
                                                    </svg>
                                                </div> 
                                                <div className="delete" onClick={ ()=>{ EditRegisterData(key.id) } }>
                                                    <svg className="icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                                    </svg>
                                                </div> 
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}