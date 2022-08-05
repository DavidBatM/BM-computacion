<?php
/* Aca conectamos el form de mi pagina de contacto con el server */
$nombre = $_POST['name'];
$mail = $_POST['email'];
$asunto = $_POST['subject'];
$mensaje = $_POST['textarea'];

/* Mostramos un texto plano */
$header .= "Content-Type: text/plain"

/* Como me va a llegar el mail a mi, con los \r\n se hace un salto de linea */
$mensaje = "Este mensaje fue enviado por " . $nombre . ",\r\n";
$mensaje .= "De: " . $mail . ",\r\n";
$mensaje .= "Asunto: " . $asunto . ",\r\n";
$mensaje.= "Mensaje: " . $_POST['textarea'] ",\r\n";
$mensaje.= "Enviado el: " . date('d/m/Y', time());

/* Mail donde va a llegar la info y el asunto*/
$destinatario = 'david_bat@live.com';
$asunto = 'Tienes un nuevo mensaje de BM computacion';

/* La funcion mail envia un correo electronico y el orden es:
A quien se lo envia? - El titulo del correo - El mensaje -Header para añadir */
mail($destinatario, $asunto, utf8_decode($mensaje), $header);
/* redireccionamos a otra pagina de agradecimiento */
header('location:exito.html');

/* En la pagina exito colocamos lo siguiente para que redireccione automaticamente a otra pagina
<scrip>
  setTimeout(fuction()){
    window.location.replace("http://heybtech.com");
  },2000);
  </script>

*/

?>
