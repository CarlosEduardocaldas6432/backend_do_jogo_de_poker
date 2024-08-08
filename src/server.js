
const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")
const Baralho = require("./Baralho")
dotenv.config()
const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

let usuario
let carta_puxada_1 ={};
let carta_puxada_2 ={};
let carta_puxada_3 ={};
let carta_puxada_4 ={};
let carta_puxada_5 ={};



function gerarCardAleatorio() {
    let num_aleatorio = Math.floor(Math.random() * 52);
    const card = Baralho[num_aleatorio];
  
    return card
  }


function gerar_cards_para_jogo(){

    carta_puxada_1 =gerarCardAleatorio();
    carta_puxada_2 =gerarCardAleatorio();
    carta_puxada_3 =gerarCardAleatorio();
    carta_puxada_4 =gerarCardAleatorio();
    carta_puxada_5 =gerarCardAleatorio();
   
  }

  gerar_cards_para_jogo()

  let todasCartas = [
     
    carta_puxada_1, carta_puxada_2, 
    carta_puxada_3, carta_puxada_4, 
    carta_puxada_5
];

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
      if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
              return;
          }
          seen.add(value);
      }
      return value;
  };
}


// ws = cliente que conectou
wss.on("connection", (ws) => {
   
const usuario_id = crypto.randomUUID()
 
 let jogadores =wss.clients
 let jogadores_rray =[]


 jogadores.forEach(obj => {
  jogadores_rray.push(obj);
});
 
 ws.usuario_id = usuario_id
 ws.on("error", console.error)


 ws.carta_puxada_1 = carta_puxada_1
 ws.carta_puxada_2 = carta_puxada_2
 ws.carta_puxada_3 = carta_puxada_3
 ws.carta_puxada_4 = carta_puxada_4
 ws.carta_puxada_5 = carta_puxada_5
 ws.usuario_nome =""
 ws.usuario_conectado = true
 ws.usuario_saldo = 10.000
 ws.usuario_aposta = 0
 ws.aposta_minima_da_mesa = 1
 ws.pot_da_mesa = 0
 ws.esta_jogando = true


 ws.send(JSON.stringify(ws,getCircularReplacer()))

 ws.send(JSON.stringify(jogadores_rray, getCircularReplacer()))

    // data = o dado que o cliente enviou
    ws.on("message",(data) =>{

      usuario = JSON.parse(data)
      
      if (usuario !== ws){
        
        ws.carta_puxada_1 = usuario.carta_puxada_1
        ws.carta_puxada_2 = usuario.carta_puxada_2
        ws.carta_puxada_3 = usuario.carta_puxada_3
        ws.carta_puxada_4 = usuario.carta_puxada_4
        ws.carta_puxada_5 = usuario.carta_puxada_5
        ws.usuario_nome = usuario.usuario_nome
        ws.usuario_conectado = usuario.usuario_conectado
        ws.usuario_saldo = usuario.usuario_saldo
        ws.usuario_aposta = usuario.usuario_aposta
        ws.aposta_minima_da_mesa = usuario.aposta_minima_da_mesa
        ws.pot_da_mesa = usuario.pot_da_mesa
        ws.esta_jogando = usuario.esta_jogando
      }

      setTimeout(() => {   
        ws.send(JSON.stringify(ws))
        ws.send(JSON.stringify(jogadores_rray, getCircularReplacer()))
      },1000);
      
      
      // JSON.stringify() = serve para pode envia variaveis mais complicadas
      // wss.clients.forEach((client) => client.send(JSON.stringify(todasCartas)))
      // wss.clients = o array de clientes que estão conectados
      // e o forEach esta percorrendo o array
        
      //  wss.clients.forEach((client) => client.send(data.toString()))
      
        
        
      
        
    })
    
    //vai aparecer sempre que um cliente conecta
    console.log("client connected")
})