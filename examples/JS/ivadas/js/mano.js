var parodykKaMoki = function(tekstas){
  return new Date()+' Tekstas yra ' + tekstas;
}

function testVariable(){
  testas = 'Tikriausiai jau nebesinga';
}

function isNumber(skaicius){
  if(!isNaN(skaicius)){
    return true;
  }
  else{
    return false;
  }
}

function navigate(){
  if(confirm("Ar tikrai?")){
    window.location.assign("https://www.w3schools.com");
  }
  else{
    alert('O gaila...');
  }
}
