<?php
class DB{
    public function conectar(){
        $servidor = "localhost";
        $usuario  = "root";
        $dbname   = "crud_conteiner";
        $senha    = "";
        $mysqli = mysqli_connect('' . $servidor . '', '' . $usuario . '', '' . $senha . '', '' . $dbname . '');
        return $mysqli;
    }
}
?>