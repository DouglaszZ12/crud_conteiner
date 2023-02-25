import { useState, useEffect } from "react"

import Reports from "components/Reports";
import Movement from "components/Movement";
import Register from "components/Register";
import PopUp_Register from "components/Register/newData";
import PopUp_Movement from "components/Movement/newData";

export default function App() {

    const [ page, setPage ] = useState('');

    useEffect(()=>{

    }, []);

    function ShowDataPage(){
        switch (page) {
            case 'register':
                return <Register />;

            case 'movement':
                return <Movement />;    

            case 'reports':
                return <Reports />;
        }
    }  

    return (
        <div className="container">
            <div className="title_project">Crud Contêiner</div>
            <div className="list_menu">
                <div className={ page == 'register' ? "name_menu active" : "name_menu" } onClick={ ()=>{ setPage('register') } }>
                    Cadastro
                </div>
                <div className={ page == 'movement' ? "name_menu active" : "name_menu" } onClick={ ()=>{ setPage('movement') } }>
                    Movimentação
                </div>
                <div className={ page == 'reports' ? "name_menu active" : "name_menu" } onClick={ ()=>{ setPage('reports') } }>
                    Relatório
                </div>
            </div>
            <div className="list_data">
                {
                    ShowDataPage()
                }
            </div>
            <PopUp_Register />
            <PopUp_Movement />
        </div>
    )
}