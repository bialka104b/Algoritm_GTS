const tab = [
  // Wiek,   Wada_wzroku, Astygmatyzm, Lzawienie, SOCZEWKI
  ["mlody",     "krotkowidz", "nie", "normalne",    "miekkie"],
  ["mlody",     "dalekowidz", "tak", "normalne",    "twarde"],
  ["mlody",     "dalekowidz", "nie", "zmniejszone", "brak"],
  ["mlody",     "krotkowidz", "tak", "zmniejszone", "brak"],
  ["prestarczy", "krotkowidz", "tak", "zmniejszone", "brak"],
  ["prestarczy", "krotkowidz", "nie", "normalne",   "miekkie"],
  ["mlody",     "krotkowidz", "tak", "normalne",    "twarde"],
  ["starczy",   "dalekowidz", "tak", "zmniejszone", "brak"],
  ["prestarczy", "dalekowidz", "nie", "zmniejszone", "brak"]
]
function obliczG(Ep, Eb, E) {
  let G = Math.round(((Ep+Eb)/E)*1000000)/1000000;
  return G;
}
function obliczA(Ep, Eb) {
  let A = Math.round((Ep/(Ep+Eb))*1000000)/1000000;
  return A;
}
function obliczH( Epositive, Enegative, all) {
  let pierwiastekA = Math.round((Math.sqrt(obliczA(Epositive, Enegative)))*10000)/10000
  let H = Math.round((obliczG(Epositive, Enegative, all)+pierwiastekA)*10000)/10000;
  return H;
}

const iloscWierszy = tab.length;

function jakiWiek(tablica_0){//funkcja do filtracji tablicy
  if (tablica_0 == "mlody") { return true;}
  if (tablica_0 == "starczy") { return true;}
  if (tablica_0 == "prestarczy") { return true;}
}
function jakaWada(tablica_0){//funkcja do filtracji tablicy
  if (tablica_0 == "krotkowidz") { return true;}
  if (tablica_0 == "dalekowidz") { return true;}
}
function czyAstygmatyzm(tablica_0){//funkcja do filtracji tablicy
  if (tablica_0 == "nie") { return true;}
  if (tablica_0 == "tak") { return true;}
}
function jakieLzawienie(tablica_0){//funkcja do filtracji tablicy
  if (tablica_0 == "normalne") { return true;}
  if (tablica_0 == "zmniejszone") { return true;}
}

var naszHdoPorownywan = normalneMiekkie(tab);
var naszwybor = [];

function mlodyMiekkie(tab) {
  var zliczWiek = [];
  let zliczSoczewki = [];
  let zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(jakiWiek);
    if (filtrated == "mlody"){
      zliczWiek.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }

  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci = ["mlody", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA == 1){
    naszwybor = tablicaWartosci;
    console.log("nasza reguła to: Jeśli Wiek=mlody To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic tablice  dla tej opcji czyli np [mlody, E, Ep, Eb, A, H, miekkie]
  } else {
    //wywołaj funkcje ktora spełni krotkowidzMiekkie i sprawdzi A
    krotkowidzMiekkie(tab);
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci;
    }
    // console.log("naszHdoPorownywan mlody", naszHdoPorownywan);
    // console.log("tablica wartosci", tablicaWartosci);
    return naszwybor;
  }
}

function krotkowidzMiekkie(tab){
  var zliczWada = [];
  let zliczSoczewki = [];
  let zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(jakaWada);
    if (filtrated == "krotkowidz"){
      zliczWada.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }
  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci = ["krotkowidz", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA(Ep, Eb) == 1){
    naszwybor = tablicaWartosci;
    console.log("nasza reguła to: Jeśli Wada=Krótkowidz To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic  dla tej opcji czyli np [krotkowidz, E, Ep, Eb, A, H, miekkie]
  } else {
    //wywołaj funkcje ktora spełni nieMiekkie i sprawdzi A
    nieMiekkie(tab);
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci;
    }
  }
  // console.log("naszHdoPorownywan krotkowidz", naszHdoPorownywan);
  // console.log("tablicaWartosci",tablicaWartosci);
  return obliczParH;
}

function nieMiekkie(tab){
  var zliczAstygmatyzm = [];
  let zliczSoczewki = [];
  let zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(czyAstygmatyzm);
    if (filtrated == "nie"){
      zliczAstygmatyzm.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }
  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci1 = ["nie", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA(Ep, Eb) == 1){
    naszwybor = tablicaWartosci;
    console.log("nasza reguła to: Jeśli Astygmatyzm=nie To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic  dla tej opcji czyli np  [nie, E, Ep, Eb, A, H, miekkie]
  } else {
    //wywołaj funkcje ktora spełni normalneMiekkie i sprawdzi A
    normalneMiekkie(tab);
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci1;
    }
  }
  // console.log("naszHdoPorownywan nie", naszHdoPorownywan);
  // console.log("tablicaWartosci1",tablicaWartosci1);
  return obliczParH;
}

function normalneMiekkie(tab){
  var zliczLzawienie = [];
  let zliczSoczewki = [];
  let zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(jakieLzawienie);
    if (filtrated == "normalne"){
      zliczLzawienie.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }
  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci = ["normalne", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA(Ep, Eb) == 1){
    naszwybor = tablicaWartosci;
    console.log("nasza reguła to: Jeśli Łzawienie=normalne To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic  dla tej opcji czyli np  [normalne, E, Ep, Eb, A, H, Miekkie]
  } else {
    //wywołaj funkcje ktora spełni normalneMiekkie i sprawdzi A
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci;
    }
  }
  // console.log("naszHdoPorownywan normalne", naszHdoPorownywan);
  // console.log("tablicaWartosci", tablicaWartosci);
  return obliczParH;
}

// ---------------------------------------------------------------------------------
//teraz by trzeba napisac funkcje która wykorzystuje tą rekurencje pomijając przypadek krotkowidz miekkie
function mlodyKrotkowidzMiekkie(tab) {
  var zliczWiek = [];
  let zliczSoczewki = [];
  var zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(jakiWiek);
    if (filtrated == "mlody" && tab[i][1] == "krotkowidz"){
      zliczWiek.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }

  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci = ["mlodyKrotko", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA == 1){
    naszwybor = tablicaWartosci;
    console.log("nasza reguła to: Jeśli Wada=Krótkowidz i Wiek=mlody To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic tablice  dla tej opcji czyli np [mlody, E, Ep, Eb, A, H, miekkie]
  } else {
    //wywołaj funkcje ktora spełni krotkowidzMiekkie i sprawdzi A
    nieKrotkowidzMiekkie(tab);
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci;
    }
    // console.log("naszHdoPorownywan mlody", naszHdoPorownywan);
    // console.log("tablica wartosci", tablicaWartosci);
    return naszwybor;
  }
}

function nieKrotkowidzMiekkie(tab){
  var zliczAstygmatyzm = [];
  let zliczSoczewki = [];
  let zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(czyAstygmatyzm);
    if (filtrated == "nie" && tab[i][1] == "krotkowidz"){
      zliczAstygmatyzm.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }
  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci1 = ["nieKrotkowidz", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA(Ep, Eb) == 1){
    naszwybor = tablicaWartosci1;
    console.log("nasza reguła to: Jeśli Wada=Krótkowidz i Astygmatyzm=nie To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic  dla tej opcji czyli np  [nie, E, Ep, Eb, A, H, miekkie]
  } else {
    //wywołaj funkcje ktora spełni normalneMiekkie i sprawdzi A
    normalneKrotkowidzMiekkie(tab);
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci1;
    }
  }
  // console.log("naszHdoPorownywan nie", naszHdoPorownywan);
  // console.log("tablicaWartosci1",tablicaWartosci1);
  return obliczParH;
}

function normalneKrotkowidzMiekkie(tab) {
  var zliczLzawienie = [];
  let zliczSoczewki = [];
  let zliczNotSoczewki = [];
  var Ep = 0, Eb = 0;
  for (var i = 0; i < iloscWierszy; i++) {
    var filtrated = tab[i].filter(jakieLzawienie);
    if (filtrated == "normalne"  && tab[i][1] == "krotkowidz"){
      zliczLzawienie.push(tab[i]);
      if(tab[i][tab[i].length - 1] == "miekkie") {
        zliczSoczewki.push(tab[i]);
        Ep = zliczSoczewki.length;
      }
      else{
        zliczNotSoczewki.push(tab[i]);
        Eb = zliczNotSoczewki.length;
      }
    }
  }
  let obliczParH = obliczH(Ep, Eb, tab.length);
  const tablicaWartosci = ["normalneKrotkowidz", tab.length, Ep, Eb, obliczA(Ep, Eb), obliczParH, "miekkie"];
  if (obliczA(Ep, Eb) == 1){
    naszwybor = tablicaWartosci;
    console.log("nasza reguła to: Jeśli Wada=Krótkowidz i Łzawienie=normalne To Soczewki=Miekkie")
    return naszwybor;//tu by mozna zwrocic  dla tej opcji czyli np  [normalne, E, Ep, Eb, A, H, Miekkie]
  } else {
    //wywołaj funkcje ktora spełni normalneMiekkie i sprawdzi A
    if (naszHdoPorownywan < obliczParH) {
      naszHdoPorownywan = obliczParH;
      naszwybor = tablicaWartosci;
    }
  }
  // console.log("naszHdoPorownywan normalne", naszHdoPorownywan);
  // console.log("tablicaWartosci", tablicaWartosci);
  return obliczParH;
}

mlodyKrotkowidzMiekkie(tab);

console.log("to zwraca funkcja mlody Miekkie", mlodyMiekkie(tab));
console.log("to zwraca funkcja mlody krotkowidzMiekkie", mlodyKrotkowidzMiekkie(tab));
