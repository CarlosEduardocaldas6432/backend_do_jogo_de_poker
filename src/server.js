
const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")
const Baralho = require("./Baralho")
dotenv.config()
const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

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




// ws = cliente que conectou
wss.on("connection", (ws) => {
   
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




 const usuario_id = crypto.randomUUID()
 
 let jogadores =wss.clients
 let jogadoresa_rray =[]


 jogadores.forEach(obj => {
  jogadoresa_rray.push(obj);
});
 
 ws.usuario_id = usuario_id


    ws.on("error", console.error)

    // data = o dado que o cliente enviou
    ws.on("message",(data) =>{

      ws.carta_puxada_1 = carta_puxada_1
      ws.carta_puxada_2 = carta_puxada_2
      ws.carta_puxada_3 = carta_puxada_3
      ws.carta_puxada_4 = carta_puxada_4
      ws.carta_puxada_5 = carta_puxada_5



        // JSON.stringify() = serve para pode envia variaveis mais complicadas
       // wss.clients.forEach((client) => client.send(JSON.stringify(todasCartas)))
        // wss.clients = o array de clientes que estão conectados
        // e o forEach esta percorrendo o array
        
      //  wss.clients.forEach((client) => client.send(data.toString()))
        ws.send(JSON.stringify(ws))
        
        
        //ws.send(JSON.stringify(jogadoresa_rray))
        ws.send(JSON.stringify(jogadoresa_rray, getCircularReplacer()))
    })
    
    //vai aparecer sempre que um cliente conecta
    console.log("client connected")
})