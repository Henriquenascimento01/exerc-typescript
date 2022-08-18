import User from "./User";
import readLineSync from "readline-sync";
import Api from "./Api";

export default class Message {
  sender: User;
  recipient: User;
  subject: string;
  message: string;

  constructor(sender: User, recipient: User, subject: string, message: string) {
    this.sender = sender;
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
  }

  static allMessages: Message[] = [];

  static save(message: Message) {
    Message.allMessages.push(message);
  }

  static seeHistory() {
    console.log("Escolha de qual usuário deseja ver o histórico de mensagem: ");
    console.log(User.allUsers);

    let chosenUsercode = parseInt(readLineSync.question());
    let existingUser = User.allUsers.find(
      (user) => user.code === chosenUsercode
    );
    if (existingUser === undefined) {
      console.log("Usuário inexistente");
      return;
    }

    let filteredMessages = Message.allMessages.filter(
      (message) =>
        message.sender === existingUser || message.recipient === existingUser
    );

    if (filteredMessages.length === 0) {
      console.log("Este usuario não possui mensagens");
    } else {
      filteredMessages.forEach((message) => {
        let status: string = "";
        if (message.sender === existingUser) {
          status = "Enviada";
        } else {
          status = "Recebida";
        }
        console.log(`${message.subject} - ${status}`);
        console.log(
          `Enviado por: ${message.sender.name} | Recebida por: ${message.recipient.name}`
        );
        console.log(message.message);

        console.log();
        console.log("--------------");
      });
    }
  }

  static async createMessage() {
    console.log(
      "Deseja enviar uma mensagem apimentada ? Digite 1 para SIM e 2 para NAO"
    );

    let chilliMessage = parseInt(readLineSync.question());

    console.log("Escolha o código do usuario remetente: ");

    console.log(User.allUsers);
    let chosenSenderUsercode: number = parseInt(readLineSync.question());
    let senderUser = User.allUsers.find(
      (user) => user.code === chosenSenderUsercode
    );

    if (senderUser === undefined) {
      console.log("Nenhum usuário cadastrado");
      return;
    }
    console.log(senderUser);

    console.log("Escolha o código do usuario destinatário: ");

    console.log(User.allUsers);
    let chosenRecipientUsercode: number = parseInt(readLineSync.question());

    if (chosenRecipientUsercode === chosenSenderUsercode) {
      console.log("Não é possivel enviar uma mensagem para o mesmo usuário");
      return;
    }

    let recipientUser = User.allUsers.find(
      (user) => user.code === chosenRecipientUsercode
    );

    if (recipientUser === undefined) {
      console.log("Nenhum usuário cadastrado");
      return;
    }

    console.log(recipientUser);

    let messageSubject: string = "";

    while (messageSubject === "") {
      console.log("Digite um assunto: ");
      messageSubject = readLineSync.question();

      if (messageSubject.length === 0) {
        console.log("O campo assunto é obrigatório");
      }
    }
    let contentMessage: string = "";
    while (contentMessage === "") {
      console.log("Digite uma mensagem: ");
      contentMessage = readLineSync.question();
      if (contentMessage.length === 0) {
        console.log("O campo mensagem é obrigatório");
      }
    }

    if (chilliMessage === 1) {
      let contentMessageChilli = await Api.generateRandonMessage(
        recipientUser.name,
        senderUser.name
      );
      contentMessage += `, ${contentMessageChilli}`;
      console.log(contentMessage);
    }

    console.log("Mensagem enviada");

    let message = new Message(
      senderUser,
      recipientUser,
      messageSubject,
      contentMessage
    );
    Message.save(message);

    console.log(Message.allMessages);
  }
}

