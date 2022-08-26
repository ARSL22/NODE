//1ª Fase -Construçao de app padrao, com hello Anarita para aparecer no navegador.
//Inclui uma biblioteca
const http = require('http'); 
const url = require('url');//1º Pegar a pergunta no URL colocamos aqui porque convem deixar as funçoes parecidas juntas.
const queryString = require('query-string');

const hostname = '127.0.0.1';//Definiçao de endereço:define o IP e a porta de onde vai rodar
const port = 3000;//Localhost

//Implementaçao da regra de negocio
const server = http.createServer((req, res) => {


    //2ª Fase :
    //1º Pegar a pergunta no URL
//Colocou-se primeiro isto -console.log(req.url);
const params = queryString.parse(url.parse(req.url, true).search);

    //2º Verificar que pergunta é para dar uma resposta
    let resposta;
    if(params.pergunta == 'melhor-filme'){
        resposta = 'stars wars';
    }
    else if (params.pergunta == 'melhor-tecnologia-backend'){
        resposta = 'node.js';
}
else {
    resposta = 'nao sei, desculpe =(';
}
    //3º Retornar a resposta escolhida

res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});
// Bloco de Execuçao real no navegador.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//localhost:3000/?pergunta=melhor-filme