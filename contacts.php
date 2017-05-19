<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="DECO1400project">
        <meta name="author" content="Xinyi">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link type="text/plain" rel="author" href="humans.txt"/>
        <title>story.io</title>
         <!-- Main CSS -->
        <link href="css/reset.css" rel="stylesheet" type="text/css">
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Cardo" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Josefin+Slab:300,400" rel="stylesheet">
        <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">    
    </head>
    <body id="contacts">
        <h4>Thank you for the response.</h4>
        <h6>We will get back to you shortly.</h6>
    </body>
    <?php
    $to = "email";
    $subject = "$_GET['Subject']";
    $txt = $_POST['message'];
    mail($to,$subject,$txt);
    ?>
</html>

