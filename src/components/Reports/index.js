import { useState, useEffect } from "react";

import { GetShowData, RegisterShowData } from "interface/data";

export default function Reports(){

    const [ showData, setShowData ] = useState(GetShowData('reports'));

    useEffect(()=>{
        RegisterShowData('reports', setShowData);
    }, []);

    return(
        <div className="Reports">
            <div className="show_numb_im_ex">
                <div className="">
                    Importação: { showData[0].qtd_importacao }
                </div>
                <div className="">
                    Exportação: { showData[0].qtd_exportação }
                </div>
            </div>
            
            <div className="show_data_client">
                {
                    showData.map((key, index)=>{
                        if(index == 0){
                        }else {
                            return(
                                <div className="show_report_client" key={ index }>
                                    <div className="title_client">{ key.client }</div>
                                    <div className="">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th align="right">Qtd</th>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                {
                                                    key.type_movement.map((key_1, index_1)=>{
                                                        return(
                                                            <tr className="" key={ index_1 }>
                                                                <td>{ key_1.type }</td>
                                                                <td>{ key_1.qtd }</td>
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
                    })
                }
            </div>
        </div>
    )
}