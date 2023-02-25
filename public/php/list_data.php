<?php

if($_POST['show_data'] == 'show_data'){
    include_once('connection.php');
    
    $conectar = new DB;
    $conectar = $conectar->conectar();
    $conectar->set_charset('utf8');

    // qtd - importação
    $importacao=mysqli_query($conectar, "SELECT id FROM conteiner WHERE category='Importação'");

    // qtd - exportação
    $exportacao=mysqli_query($conectar, "SELECT id FROM conteiner WHERE category='Exportação'");

    $result = '
    {
        "conteiner": [';
            $count = 0;
            $inf=mysqli_query($conectar, "SELECT id, client, numb, type, status, category FROM conteiner ORDER BY client ASC");
            while($show_inf=mysqli_fetch_object($inf)){
                $result .='
                {
                    "id": ' . $show_inf->id . ',
                    "client": "' . $show_inf->client . '",
                    "numb": "' . $show_inf->numb . '",
                    "type": "' . $show_inf->type . '",
                    "status": "' . $show_inf->status . '",
                    "category": "' . $show_inf->category . '"
                }';
                $count = $count + 1;
                $count == mysqli_num_rows($inf) ? $result .= "" : $result .=',';
            }
            $result .='
        ],
        "movement":[';
            $count = 0;
            $inf=mysqli_query($conectar, "SELECT id, id_given, type, start, end FROM movement ORDER BY start DESC");
            while($show_inf=mysqli_fetch_object($inf)){
                // name conteiner
                $nameInf=mysqli_query($conectar, "SELECT numb FROM conteiner WHERE id='" . $show_inf->id_given . "'");
                $show_name_inf=mysqli_fetch_object($nameInf);

                $result .='
                {
                    "id": ' . $show_inf->id . ',
                    "id_given": "' . $show_inf->id_given . '",
                    "numb": "' . $show_name_inf->numb . '",
                    "type": "' . $show_inf->type . '",
                    "start": "' . $show_inf->start . '",
                    "start_br": "' . date('d/m/Y H:i:s', strtotime($show_inf->start)) . '",
                    "end": "' . $show_inf->end . '",
                    "end_br": "' . date('d/m/Y H:i:s', strtotime($show_inf->end)) . '"
                }';
                $count = $count + 1;
                $count == mysqli_num_rows($inf) ? $result .= "" : $result .=',';
            }
            $result .='
        ],
        "reports":[
            {
                "qtd_importacao": "' .mysqli_num_rows($importacao) . '",
                "qtd_exportação": "' .mysqli_num_rows($exportacao) . '"
            }';
            $count = 0;
            $inf=mysqli_query($conectar, "SELECT id_given FROM movement GROUP BY id_given");
            while($show_inf=mysqli_fetch_object($inf)){
                // name conteiner
                $nameInf=mysqli_query($conectar, "SELECT client FROM conteiner WHERE id='" . $show_inf->id_given . "'");
                $show_name_inf=mysqli_fetch_object($nameInf);

                // qtd movement - Embarque
                $type_1=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Embarque'");
                // qtd movement - Descarga
                $type_2=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Descarga'");
                // qtd movement - Gate in
                $type_3=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Gate in'");
                // qtd movement - Gate out
                $type_4=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Gate out'");
                // qtd movement - Reposicionamento
                $type_5=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Reposicionamento'");
                // qtd movement - Pesagem
                $type_6=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Pesagem'");
                // qtd movement - Scanner
                $type_7=mysqli_query($conectar, "SELECT id FROM movement WHERE id_given='" . $show_inf->id_given . "' AND type='Scanner'");
                
                $result .=',
                {
                    "client": "' . $show_name_inf->client . '",
                    "type_movement": [
                        {
                            "type" : "Embarque",
                            "qtd"  : "' . mysqli_num_rows($type_1) . '" 
                        },
                        {
                            "type" : "Descarga",
                            "qtd"  : "' . mysqli_num_rows($type_2) . '" 
                        },
                        {
                            "type" : "Gate in",
                            "qtd"  : "' . mysqli_num_rows($type_3) . '" 
                        },
                        {
                            "type" : "Gate out",
                            "qtd"  : "' . mysqli_num_rows($type_4) . '" 
                        },
                        {
                            "type" : "Reposicionamento",
                            "qtd"  : "' . mysqli_num_rows($type_5) . '" 
                        },
                        {
                            "type" : "Pesagem",
                            "qtd"  : "' . mysqli_num_rows($type_6) . '" 
                        },
                        {
                            "type" : "Scanner",
                            "qtd"  : "' . mysqli_num_rows($type_7) . '" 
                        }
                    ]
                }';
            }
            $result .='
        ]
    }';
    echo $result;
}

?>