const express = require("express");
const connection = require("./controller/connection")

const app = express();
app.use(express.json());



connection.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: " + err.stack);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso.");
});


// Criando o Get
app.get("/cartao", (req, res) => {
  connection.query("SELECT * FROM cartao", (err, results) => {
    if (err) {
      console.error("Erro ao consultar dados: " + err.stack);
      res.status(500).send("Erro ao consultar dados.");
      return;
    }
    res.send(results);
  });
});

//Criando o Post
app.post("/cartao", (req, res) => {
  const numero = req.body.numero;
  const nomeUsuario = req.body.nomeUsuario;
  const codigoSeguranca = req.body.codigoSeguranca;
  const dataValidade = req.body.dataValidade;

  connection.query(
    "INSERT INTO cartao (numero, nomeUsuario, codigoSeguranca, dataValidade) VALUES (?, ?, ?, ?)",
    [numero, nomeUsuario, codigoSeguranca, dataValidade],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir dados: " + err.stack);
        res.status(500).send("Erro ao inserir dados.");
        return;
      }
      res.send("Cartão adicionado com sucesso.");
    }
  );
});


// Atualizando os dados
app.put("/cartao/:id", (req, res) => {
  const id = req.params.id;
  const numero = req.body.numero;
  const nomeUsuario = req.body.nomeUsuario;
  const codigoSeguranca = req.body.codigoSeguranca;
  const dataValidade = req.body.dataValidade;

  connection.query(
    "UPDATE cartao SET nomeUsuario = ?, numero = ?, codigoSeguranca = ?, dataValidade = ? WHERE id = ?",
    [nomeUsuario, numero, codigoSeguranca, dataValidade, id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar dados: " + err.stack);
        res.status(500).send("Erro ao atualizar dados.");
        return;
      }
      res.send("Cartão atualizado com sucesso.");
    }
  );
});

//DELETANDO DO BANCO DE DADOS

app.delete("/cartao/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM cartao WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Erro ao excluir dados: " + err.stack);
        res.status(500).send("Erro ao excluir dados.");
        return;
      }
      res.send("Cartão excluído com sucesso.");
    }
  );
});


app.listen(3000, () => {
  console.log("API iniciada na porta 3000");
});