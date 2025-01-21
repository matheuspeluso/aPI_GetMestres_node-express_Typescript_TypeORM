import { Request } from 'express';
import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { BaseNotification } from '../entity/BaseNotification';

export abstract class BaseController<T> extends BaseNotification { 

    private _repository: Repository<T>; // cria uma variável do tipo Repository

    constructor(entity: any) { // construtor
        super(); // chama o construtor da classe BaseNotification
        this._repository = AppDataSource.getRepository<T>(entity); // pega o repositório do banco de dados
    }

    async all() { // busca todos os registros
        return this._repository.find(); // retorna todos os registros
    }

    async one(request: Request) { // busca um registro
        return this._repository.findOne(request.params.uid); // busca um registro pelo uid
    }

    async save(model: any) {

        if (model.uid) { // verifica se o model tem um uid
            let _modelInDB = await this._repository.findOne(model.uid); // busca o model no banco de dados
            if (_modelInDB) {   // se encontrou o model no banco de dados
                Object.assign(_modelInDB, model);  // atualiza o model com os novos dados
                model = _modelInDB; // atualiza a variável model
            }


            if (this.valid()) // verifica se o model é válido
                return this._repository.save(model); // salva o model

            else { // se o model não é válido
                return { // retorna um objeto com os erros
                    status: 400, // status 400 - Bad Request
                    errors: this.allNotifications // retorna todos os erros
                }
            }
        }
    }

    async remove(request: Request) { // remove um registro
        let uid = request.params.uid; // pega o uid do registro

        let model: any; // cria uma variável model
        model = await this._repository.find(uid); // busca o registro no banco de dados
        if (model) { // se encontrou o registro
            model.deleted = true; // marca o registro como deletado
        }
        return await this._repository.save(model); // salva o registro
    }

}
