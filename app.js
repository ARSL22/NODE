//2ª Fase - Com javascript
//Inclui uma biblioteca tem de incluir estes tres para conseguir entrar na pagina
const http = require('http'); 
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

//Definiçao de endereço:define o IP e a porta de onde vai rodar
const hostname = '127.0.0.1';
const port = 3000;//Localhost

//Implementaçao da regra de negocio
const server = http.createServer((req, res) => {

    var resposta;
    const urlparse = url.parse(req.url, true);

//Criar um Usuario
    //receber informaçoes do usuario
    const params = queryString.parse(urlparse.search);
//testar : 
console.log(params);
//criar um usuario - atualizar um usuario
if(urlparse.pathname == '/criar-atualizar-usuario'){

//salvar as informaçoes
fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err){
    if(err) throw err;
    console.log('Saved!');

    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
    resposta = 'Usuario criado/atualizado com sucesso';
});


}


// Selecionar usuario(pesquisar ou encontrar)
else if(url.parse.pathname == '/selecionar-ususario'){

    fs.readFile('users/' + params.id + '.txt',function(err, data) {
    resposta = data;

    /// primeiro: Console.log(data);---para testa a ver o que se passa.se aparecer no terminal ele deu buffer!o que fazer?
    
     res.statusCode= 200;
      res.setHeader('Content-Type', 'text/plain'); //mudar o tex/plain para applications/json e muda o cenario.
    res.end(resposta);
    });
}
      ///Console.log(resposta); vamos fazer este console para ver se por fora esta tudo bem
//E deu indefinido!!por causa de ser assincrono. por isso colocamos o res.status e o que esta em baixo em cada sitio.


//Remover usuario

else if(url.parse.pathname == '/remover-ususario'){

    fs.unlink('users/' + params.id + '.txt',function(err) {
    
      console.log('File deleted!');
    
    resposta= "Usuario removido.";
     res.statusCode= 200;
      res.setHeader('Content-Type', 'text/plain'); //mantemos text plain porque json não aceita.
      res.end(resposta);
    
    });

    
    //Deu erro e o arquivo foi removido.Ele avisa que nao e um json.
/*res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end("Hello World");*/

};

});

// Bloco de Execuçao real no navegador.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

});

//localhost:3000/criar-usuario?nome=erik&idade=80&id=1
//localhost:3000/criar-usuario?nome=erik&idade=80&id=1
//localhost:3000/selecionar-usuario?id=2
//localhost:3000/remover-usuario?id=1