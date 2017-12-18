<?php
  // apsirašome prisijungim parametrus
  $servername = "localhost";
  $db = "calendar";
  $username = "root";
  $password = "";

  // kuriame prisijungimą
  $conn = new mysqli($servername, $username, $password, $db);

  if($conn->connect_error){
    die("Connection error. ".$conn->connect_error);
  }

  if($stmt = $conn->prepare("INSERT INTO events (event, date, created) VALUES (?, ?, now())")){
    $stmt->bind_param("ss", $event, $date);

    // if(!isset($_POST["event"])){
    //
    // }

    $event = $_POST["event"];
    $date = $_POST["eventdate"];

    if($stmt->execute()){
      header("Location: /calendar.html");
    }
    else{ // problemos su lenteles laukais
      echo "Įvyko klaida";
    }

  }
  else{ // bloga uzklausa
    echo "Blogai parašyta užklausa";
  }
 ?>
