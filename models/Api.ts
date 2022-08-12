import axios from "axios";
export default class Api {
  static foaas = axios.create({
    baseURL: "https://foaas.com",
  });

  static endpoints: string[] = ["/bday", "/blackadder", "/chainsaw", "/dalton"];

  static async generateRandonMessage(name: string, from: string) {
    let radomNumber =
      Math.floor(Math.random() * (Api.endpoints.length - 1 - 0 + 1)) + 0;
    let endpoint = `${Api.endpoints[radomNumber]}/${name}/${from}`;

    let result = await Api.foaas.get(endpoint);
    return `${result.data.message} ${result.data.subtitle}`;
  }
}


