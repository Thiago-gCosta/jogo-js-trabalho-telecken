//variaveis//
let contador0;
let contador1;
let contador2;
let contador3;
let contador4;
let contador5;
let Decider;
let vetorMapa = [];
let vetorProcedural = [];
let vetorTextura = ["x"," "];
let Height=window.innerHeight;
let p1X;
let p1Y;
localStorage.getItem(p1X)!=undefined? ( p1X = localStorage.getItem(p1X)) : ( p1X = 0);
localStorage.getItem(p1Y)!=undefined? ( p1Y = localStorage.getItem(p1Y)) : ( p1Y = 0);
let Width=window.innerWidth;
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
let Y = Height*2/TamY;
let X = Width*2/TamX;
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
//--//
Geracao();
//geração do mapa//
function Geracao(){
 for(contador0=0;contador0<Y;contador0++){
    vetorMapa.push([]);
    for(contador1=0;contador1<X;contador1++){
        Decider = Math.floor(Math.random() * 100);
        Decider < 49 ? (Decider = 0) : (Decider = 1);
        vetorMapa[contador0][contador1]=vetorTextura[Decider];
    }
 }
 Procedural()
}
//--//

//Parte Procedural//
function Procedural(){
  for(A=0;A<Y/Chek;ChekY+=Chek,ChekX=Chek,XY+=Chek,XX=0,A++){
    vetorProcedural.push([]);
    for(B=0,Full=0,Empty=0;B<X/Chek;B++,ChekX+=Chek,XX+=Chek){
      for(N=0+XY;N<ChekY;N++){
        for(M=0+XX;M<ChekX;M++){
          if(vetorMapa[N][M]==" "){
            Empty++;
          }else{
            Full++;
          }
        }
      }
      vetorProcedural[A][B]=Empty>=Full?(" "):(vetorTextura[0]);
    }
  } 
  vetorProcedural[p1Y][p1X] = "p";
  Maker();
}
//--//
function Maker(){
  for(contador2=0;contador2!=vetorProcedural.length;contador2++){
    for(contador3=0;contador3!=vetorProcedural[1].length;contador3++){
      HTml(contador2,contador3,vetorProcedural[contador2][contador3] != "x" ? ("white"):("black"));
    }
  }
}

//Virar html//
function HTml(posY,posX,back){
  let sla = document.createElement("div");
  sla.classList.add("cenario");
  sla.style.left = posX*5 + "vw";
  sla.style.top =  posY*5 + "vh";
  sla.style.background = back;
  fundo.appendChild(sla);
}

//--//
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp" :
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
//events//

function Move(MX, MY) {
  if (vetorProcedural[p1Y + MY][p1X + MX] == " ") {
    vetorProcedural[p1Y][p1X] = " ";
    p1X += MX;
    p1Y += MY;
    vetorProcedural[p1Y][p1X] = "p";
    p1.style.left = p1X*5 + "vw";
    p1.style.top = p1Y*5 + "vh";
    console.log(vetorProcedural.join("\n",","));
  }
  localStorage.setItem(p1X, p1X);
  localStorage.setItem(p1Y, p1Y);
  if (vetorProcedural[p1Y + MY][p1X + MX] == null){
     window.location.reload(true);
  }

}

