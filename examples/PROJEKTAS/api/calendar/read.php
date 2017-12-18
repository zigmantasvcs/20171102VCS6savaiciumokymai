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

  // pasitikriname ar uzsetintas post kintamasis
  if(!isset($_POST["from"])){
      // graziname klaidos pranesima ne OK json formatu
    $event = new stdClass();
    $event->response = "NOK";
    echo json_encode($event);
    exit(0);
  }

// pasitikriname ar uzsetintas post kintamasis
  if(!isset($_POST["to"])){
      // graziname klaidos pranesima ne OK json formatu
    $event = new stdClass();
    $event->response = "NOK";
    echo json_encode($event);
    exit(0);
  }

  if($stmt = $conn->prepare("SELECT event, date FROM events WHERE date >=? AND date <=?")){ // pridejome filtrą, imame tik ivykius is intervalo
    $stmt->bind_param("ss", $from, $to);

    $from = $_POST["from"];
    $to = $_POST["to"];

    if($stmt->execute()){
      // paimame visus duomenis
      $result = $stmt->get_result();

      $events = array();

      while($row = $result->fetch_assoc()){
        $event = new stdClass();
        $event->event = $row["event"];
        $event->date = $row["date"];
        array_push($events, $event);
      }

      echo json_encode($events); // [{event:kaledos, date:2017-12-25}, {}, {}]
    }
    else{
      // graziname klaidos pranesima ne OK json formatu
      $event = new stdClass();
      $event->response = "NOK";
      echo json_encode($event);
    }

  }
  else{
      // graziname klaidos pranesima ne OK json formatu
    $event = new stdClass();
    $event->response = "NOK";
    echo json_encode($event);
  }

 ?>
