import { Request } from "express";
import { User } from "../entity/User";
import { BaseController } from "./BaseController";

export class UserController extends BaseController<User> {

    constructor() {
        super(User);
    }

    async save(request: Request) { //sobrecarga do método save
       let _user = <User>request.body;

       super.isRequired(_user.name, 'O nome do usuário é obrigatório');
       super.isRequired(_user.photo, 'A foto do usuário é obrigatória');
       super.isRequired(_user.email, 'O e-mail do usuário é obrigatório');
       super.isRequired(_user.password, 'A senha do usuário é obrigatório');

       return super.save(_user);
    }
}
