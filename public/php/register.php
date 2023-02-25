<?php

if(!empty($_POST['edit_data'])){
    include_once('connection.php');
    
    $conectar = new DB;
    $conectar = $conectar->conectar();
    $conectar->set_charset('utf8');

}

// Register
if($_POST['edit_data'] == 'edit_or_register_conteiner'){

    if(!empty($_POST['type_data'])){
        // delete
        if($_POST['type_data'] == 'delete'){
            mysqli_query($conectar, "DELETE FROM conteiner WHERE id='" . $_POST['id'] . "'");
        }

        // edit or register
        if($_POST['type_data'] == 'register'){

            // new data
            if($_POST['id'] == 0){
                
                mysqli_query($conectar, "INSERT INTO conteiner (`client`, `numb`, `type`, `status`, `category`) VALUES ('" . $_POST['client'] . "', '" . $_POST['numb'] . "', '" . $_POST['type'] . "', '" . $_POST['status'] . "', '" . $_POST['category'] . "')");

            // edit
            }else {

                mysqli_query($conectar, "UPDATE conteiner SET client='" . $_POST['client'] . "', numb='" . $_POST['numb'] . "', type='" . $_POST['type'] . "', status='" . $_POST['status'] . "', category='" . $_POST['category'] . "' WHERE id='" . $_POST['id'] . "'");

            }

        }
    }
    $result ='';
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
        $count == mysqli_num_rows($inf) ? $result .="" : $result .=',';
    }
    echo "[" . $result . "]";
}

// Movement
if($_POST['edit_data'] == 'edit_or_register_movement'){

    if(!empty($_POST['type_data'])){
        // delete
        if($_POST['type_data'] == 'delete'){
            mysqli_query($conectar, "DELETE FROM movement WHERE id='" . $_POST['id'] . "'");
        }

        // edit or register
        if($_POST['type_data'] == 'register'){

            // new data
            if($_POST['id'] == 0){
                
                mysqli_query($conectar, "INSERT INTO movement (`id_given`, `type`, `start`, `end`) VALUES ('" . $_POST['client'] . "', '" . $_POST['type'] . "', '" . $_POST['start'] . "', '" . $_POST['end'] . "')");

            // edit
            }else {

                mysqli_query($conectar, "UPDATE movement SET id_given='" . $_POST['client'] . "', type='" . $_POST['type'] . "', start='" . $_POST['start'] . "', end='" . $_POST['end'] . "' WHERE id='" . $_POST['id'] . "'");

            }

        }
    }

    $result ='';
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
    echo "[" . $result . "]";
}

?>