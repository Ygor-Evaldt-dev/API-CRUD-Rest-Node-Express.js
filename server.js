// importa os itens essenciais necessários
const http = require('http');
const express = require('express');
var cors = require('cors');
// importa `items` do diretorio `routes` 
const itemsRouter = require('./routes/items');

// cria novo app
const app = express();
app.use(express.json());

// use-o antes de todas as definições de rota
// permitindo que o URL abaixo acesse esses endpoints de APIs
// você pode substituir este URL (http://localhost:8100) pelo seu
// URL do aplicativo de onde você está chamando essas APIs
app.use(cors({ origin: 'http://localhost:8100' }));

/* este URL '/items' tem dois pontos finais:
→ localhost:3000/items/ (retorna um array de objetos)
→ localhost:3000/items/:id (isso retorna um único objeto)
*/
app.use('/items', itemsRouter);

// URL padrão para API
app.use('/', function (req, res) {
    res.send('node-ex-api works');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug(`Server listening on port ${port}`);