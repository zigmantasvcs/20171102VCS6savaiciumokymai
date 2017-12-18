function init(){

  $("#calendar").append("<h1>"+getMonthLT()+"</h1>");

  var weekCount = getWeekCount();

  var arSkaiciuojamDienas = false;

  var currentDay = 0;

  for(var i=0;i<weekCount;i++){
    var weekBox = getWeekBox();

    for(var j=1;j<=7;j++){
      var dayBox = getDayBox();

      dayBox.hide();

      if(j == 1){
        dayBox.addClass("clear");
      }

      if(j == getWeekDayFirst()){
        arSkaiciuojamDienas = true;
      }

      if(currentDay == getLastMonthDayDate().getDate()){
        arSkaiciuojamDienas = false;
      }

      if(arSkaiciuojamDienas){
        currentDay++;

        if(j == 6 || j == 7){
          dayBox.addClass("weekend");
        }

        // pridedame klase enamajai dienai
        if(currentDay == new Date().getDate()){
          dayBox.addClass("currentDay");
        }

        var dienosElementas = getDiv();

        dienosElementas.addClass("dayStyle");
        dienosElementas.append(currentDay);

        dayBox.append(dienosElementas);
        dayBox.prop("id", "day"+currentDay);
      }

      weekBox.append(dayBox);
    }

    $("#calendar").append(weekBox);

    $(".day").each(function(index){
      $(this).delay(40*index).fadeIn(300);
    })
  }
  GetEvents();
}

function GetEvents(){

  var from = getMonthFirstDayDate(); // pvz. Fri Dec 01 2017 00:00:00 GMT+0200 (FLE Standard Time) bet netinkamu formatu
  var to = getLastMonthDayDate(); // pvz. Sun Dec 31 2017 00:00:00 GMT+0200 (FLE Standard Time) netinkamu formatu

  var fromString = getCorrectDateString(from); // pasiverčiame į 2017-12-01 formatą (yyyy-mm-dd)
  var toString = getCorrectDateString(to); // pasiverčiame į 2017-12-31 formatą (yyyy-mm-dd)

  // onjektas kuri postinsime i read.php, ten bus pasiekiama per $_POST["from"] ir $_POST["to"]
  var interval = { from: fromString, to: toString }
  $.ajax({
    type: "POST",
    url: "/api/calendar/read.php",
    dataType: "json",
    data: interval // obejktas kuri postiname i read php
  }).done(function(data){
    console.log(data);
    $.each(data, function(index, item){
      $("#day"+item.date.slice(-2)).append(item.event);
    })
  }).fail(function(response, ajaxOptions, thrownException){ // pridetas atvejis kai kas nors sufailina read.php, 6i dalis loge i6spausdins problma
    console.log(response.status);
    console.log(ajaxOptions);
    console.log(thrownException);
  });
}

function getCorrectDateString(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return year+"-"+formatDateNumber(month+1)+"-"+formatDateNumber(day);
}

function formatDateNumber(number){
  if(String(number).length == 1){
    return "0" + number;
  }
  if(String(number).length == 2){
    return number;
  }
}

function getDayBox(){
  var div = getDiv();
  div.prop("class", "day");
  return div;
}

function getWeekBox() {
  var div = getDiv();
  div.prop("class", "week");
  return div;
}

function getDiv(){
  return $("<div></div>");
}

function getMonthLT(){
  var months = [
    "Sausis",
    "Vasaris",
    "Kovas",
    "Balandis",
    "Gegužė",
    "Birželis",
    "Liepa",
    "Rugpjūtis",
    "Rugsėjis",
    "Spalis",
    "Lapkritis",
    "Gruodis"
  ];

  var currentMonth = getMonthNumber();
  return months[currentMonth];
}

function getMonthNumber(){
  var date = new Date();
  return date.getMonth();
}

function getLastMonthDayDate(){
  var date = new Date();
  var newDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return newDate;
}

// menesio pirmos dienos savaites diena
function getWeekDayFirst(){
  var currentMonthFirstDayDate = getMonthFirstDayDate();
  var weekDay = currentMonthFirstDayDate.getDay();

  if(weekDay == 0){
    weekDay = 7;
  }

  return weekDay;
}

function getMonthFirstDayDate(){
  var date = new Date();
  var newdate = new Date(date.getFullYear(), date.getMonth(), 1);
  return newdate;
}

function getWeekCount(){
  var lastMonthDay = getLastMonthDayDate();
  var magicNumber = lastMonthDay.getDate() + getWeekDayFirst();
  return Math.ceil(magicNumber / 7);
}
