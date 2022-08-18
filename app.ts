import User from "./models/User";

import readLineSync from "readline-sync";

import Message from "./models/Message";

async function app() {
  let optionMenu: string = "0";

  enum menu {
    Cadastro = "1",
    Mensagem = "2",
    Historico = "3",
    Sair = "4",
  }

  console.log("E ai coxa-branca escolha uma opção \n");

  while (optionMenu !== menu.Sair) {
    console.log("1 - Cadastrar Usuário");
    console.log("2 - Enviar Mensagem");
    console.log("3 - Ver histórico de mensagens");
    console.log("4 - Sair");

    optionMenu = readLineSync.question("");

    switch (optionMenu) { 
      case menu.Cadastro:
        console.log("Digite um nome: ");
        let name = readLineSync.question();

        console.log("Digite um código: ");
        let code: string | number = readLineSync.question();
        code = parseInt(code);

        if (isNaN(code)) {
          console.log("Código invalido");
          break;
        }

        let validatedUser = User.valideUser(code);

        if (validatedUser === false) {
          console.log("Usuário existente");
          break;
        }

        let user = new User(name, code);
        User.save(user);
        console.log(User.allUsers);
        break;

      case menu.Mensagem:
        await Message.createMessage();

        break;

      case menu.Historico:
        Message.seeHistory();
        break;

      case menu.Sair:
        console.log("Até mais");
        break;

      default:
        console.log("Por favor digite somente alguma das opções abaixo \n");
    }
  }
}

app();
