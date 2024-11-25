//variaveis//
const som = document.querySelector('audio');
let contador0;
let contador1;
let contador2;
let contador3;
let contador4;
let contador5=100;
let Decider;
let vetorMapa = [];
let vetorProcedural = [];
let vetorTextura = ["x", " "];
let vetorMP=[];
let Height = window.innerHeight;
let p1X=0;
let p1Y=0;
let Width = window.innerWidth;
let TamY = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);
let TamX = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
TamX = (1 * TamX) / 100;
TamY = (1 * TamY) / 100;
let Y = (Height * 2) / TamY;
let X = (Width * 2) / TamX;
let Chek = 10;
let ChekX = Chek;
let ChekY = Chek;
let A;
let B;
let N;
let M;
let XX = 0;
let XY = 0;
let Empty;
let Full;
let sla;
let pontos = 0;
//--//

//geração do mapa//
function Geracao() {
  p1.style.visibility = "visible";
  botoes.style.visibility = "visible";
  jogar.style.visibility = "hidden";
  titulo.style.visibility = "hidden";
  for (contador0 = 0; contador0 < Y; contador0++) {
    vetorMapa.push([]);
    for (contador1 = 0; contador1 < X; contador1++) {
      Decider = Math.floor(Math.random() * 100);
      Decider < 49 ? (Decider = 0) : (Decider = 1);
      vetorMapa[contador0][contador1] = vetorTextura[Decider];
    }
  }
  Procedural();
}
//--//

//Parte Procedural//
function Procedural() {
  vetorProcedural=[];
  for (
    A = 0;
    A < Y / Chek;
    ChekY += Chek, ChekX = Chek, XY += Chek, XX = 0, A++
  ) {
    vetorProcedural.push([]);
    for (
      B = 0, Full = 0, Empty = 0;
      B < X / Chek;
      B++, ChekX += Chek, XX += Chek
    ) {
      for (N = 0 + XY; N < ChekY; N++) {
        for (M = 0 + XX; M < ChekX; M++) {
          if (vetorMapa[N][M] == " ") {
            Empty++;
          } else {
            Full++;
          }
        }
      }
      vetorProcedural[A][B] = Empty >= Full ? " " : vetorTextura[0];
    }
  } 
  vetorProcedural[p1Y][p1X] = "p";
  vetorMP[contador5]=vetorProcedural;
  colect.style.visibility = "visible";
  Maker();
}
//--//
function Maker() {
  for (contador2 = 0; contador2 != vetorProcedural.length; contador2++) {
    for (contador3 = 0; contador3 != vetorProcedural[1].length; contador3++) {
      HTml(
        contador2,
        contador3,
        vetorMP[contador5][contador2][contador3] != "x"
          ? "url('chao.jpg')"
          : "url('parede.jpg')"
      );
    }
  }
}

//Virar html//
function HTml(posY, posX, back) {
  let sla = document.createElement("div");
  sla.classList.add("cenario");
  sla.style.left = posX * 5 + "vw";
  sla.style.top = posY * 5 + "vh";
  sla.style.background = back;
  sla.style.backgroundSize = "auto";
  back == "url('parede.jpg')" ? (sla.style.border = "black solid 1px",sla.style.borderRadius ="5px") : 0;
  fundo.appendChild(sla);
  Bc();
}
//--//

//event listener//
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":  
      Move(0, -1);
      break;
    case "ArrowDown":
      Move(0, +1);
      break;
    case "ArrowLeft":
      Move(-1, 0);
      break;
    case "ArrowRight":
      Move(+1, 0);
      break;
    case "r":
      Geracao();
      break;
  }
});
//--//

//bicileta de creme//
function Bc(){
  let BCalet;
  BCalet = Math.floor(Math.random() * 100);
  if(BCalet<500){
    colect.style.left = Math.floor(Math.random() * 24) * 5 + "vw";
    colect.style.top = Math.floor(Math.random() * 24) * 5 + "vh";
    colect.style.background = "url('ponto.png')";
    colect.style.backgroundSize = "auto";
    colect.style.backgroundPosition = "center";
    colect.style.backgroundRepeat = "no-repeat";
  }else{
    colect.style.visibility = "hidden";
  }
}

//--//

//events//
function Move(MX, MY) {
  som.currentTime = 0.3;
  som.play();
  if (vetorMP[contador5][p1Y + MY][p1X + MX] == " ") {
    vetorMP[contador5][p1Y][p1X] = " "
    p1X += MX;
    p1Y += MY;
    vetorMP[contador5][p1Y][p1X] = "p";
    p1.style.left = p1X * 5 + "vw";
    p1.style.top = p1Y * 5 + "vh";
    console.log(vetorProcedural.join("\n", ","));
  }
  if (vetorMP[contador5][p1Y + MY][p1X + MX] == undefined){
    p1X + MX < 5 ? (p1X = vetorMP[contador5][1].length - 1) : p1X=0;
    p1.style.transition = "none";
    p1.style.left = p1X * 5 + "vw";
    p1.style.top = p1Y * 5 + "vh";
    reset();
    MX < 5 ? contador5-- : contador5++;
    vetorMP[contador5]==undefined?(Geracao()):(0)
    p1.style.transition = "all 0.3s";
  }
}
//--//

//timer//
function horarioAtual() {
  let hora = new Date().toLocaleTimeString();
  tempo.innerHTML = pontos;
  console.log(Number(hora.substring(hora.length - 2, hora.length)));
  if (Number(hora.substring(hora.length - 2, hora.length)) % 2 == 0) {
    p1.style.background = "url('magrao.png')";
  } else {
    p1.style.background = "url('magrao2.png')";
  }
  p1.style.backgroundSize = "auto";
  p1.style.backgroundPosition = "center";
  p1.style.backgroundRepeat = "no-repeat";

 if (Number(hora.substring(hora.length - 2, hora.length)) % 3 == 0) {
  en.style.visibility="visible";
  enemy(p1X,p1Y);
}
}
//--//

//Enemy//
function enemy(EX,EY){ 
  const valores = document.getElementById("en");
  const valores1 = (window.getComputedStyle(valores));
  const valores3 = document.getElementById("p1");
  const valores4 = window.getComputedStyle(valores3);
  const valores5 = document.getElementById("colect");
  const valores6 = window.getComputedStyle(valores5);
  en.style.left = EX * 5 + "vw";
  en.style.top = EY * 5 + "vh";
  console.log(valores1.getPropertyValue("left"));
  if (
    valores1.getPropertyValue("left") == valores4.getPropertyValue("left") &&
    valores1.getPropertyValue("top") == valores4.getPropertyValue("top")
  ) {
    fundo.style.visibility = "hidden";
    en.style.visibility = "hidden";
    p1.style.visibility = "hidden";
    gameOver.style.visibility = "visible";
  }
  if(valores4.getPropertyValue("left") == valores6.getPropertyValue("left") &&
    valores4.getPropertyValue("top") == valores6.getPropertyValue("top")){
      pontos++;
      colect.style.visibility="hidden"
    }
  if(pontos>6){
     fundo.style.visibility = "hidden";
     en.style.visibility = "hidden";
     p1.style.visibility = "hidden";
     gameWin.style.visibility = "visible";

  }
}
//--//

//RESET//
function reset(){
  vetorMapa = [];
  vetorProcedural = [];
  Height = window.innerHeight;
  p1X;
  p1Y;
  let Width = window.innerWidth;
  let TamY = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  let TamX = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  TamX = (1 * TamX) / 100;
  TamY = (1 * TamY) / 100;
  Y = (Height * 2) / TamY;
  X = (Width * 2) / TamX;
  Chek = 10;
  ChekX = Chek;
  ChekY = Chek;
  A = 0;
  B = 0;
  N = 0;
  M = 0;
  XX = 0;
  XY = 0;
  Empty = 0;
  Full = 0;
  sla = 0;
  //--//
}

//--//