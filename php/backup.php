<?php
$string = file_get_contents("php://input");

//Recojo la fecha actual y la transformo en un formato mas legible.
//Ese formato será el que de nombre al fichero backup
$tiempo = time();
$fecha = getdate($tiempo);
$fechFormat = $fecha['mday']."-".$fecha['mon']."-".$fecha['year'];
$stringFecha = $fechFormat.".txt";

$file= fopen("../php/$stringFecha", "a+") or die("Error");
fwrite($file, $string);

fclose($file);
?>