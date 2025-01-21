export abstract class BaseNotification{ //classe abstrata - não pode ser instanciada

    notifications: Array<{message: string}>; //criando uma array de notificações

    constructor(){
        this.notifications = new Array<{message: string}>();  //inicializando a array de notificações
    }

    AddNotification(message: string): void{ //adicionando uma notificação
        this.notifications.push({message: message});  //adicionando uma notificação
    }

    isTrue(value, message){ //verificando se o valor é verdadeiro
        if(value) //se o valor for verdadeiro
            this.notifications.push({message: message}); //adicionando uma notificação
    }

    isRequired(value, message){     //verificando se o valor é requerido
        if(!value || value.length <= 0) //se não tiver valor ou o valor for menor ou igual a zero
            this.notifications.push({message: message}); //adicionando uma notificação
    }

    hasMinLen(value, min, message){ //verificando se o valor tem o tamanho mínimo
        if(!value || value.length < min) //se não tiver valor ou o valor for menor que o mínimo
            this.notifications.push({message: message}); //adicionando uma notificação
    }

    hasMaxLen(value, max, message){ //verificando se o valor tem o tamanho máximo
        if(!value || value.length > max) //se não tiver valor ou o valor for maior que o máximo
            this.notifications.push({message: message}); //adicionando uma notificação
    }

    isFixedLen(value, len, message){ //verificando se o valor tem o tamanho fixo
        if(value.length != len) //se o valor não tiver o tamanho fixo
            this.notifications.push({message: message}); //adicionando uma notificação
    }

    isEmail(value, message){ //verificando se o valor é um email
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/); //expressão regular para verificar se é um email
        if(!reg.test(value)) //se não for um email
            this.notifications.push({message: message}); //adicionando uma notificação
    }

    get allNotifications(): Array<{message: string}>{ //pegando todas as notificações
        return this.notifications; //retornando todas as notificações
    }

    valid(): boolean{ //verificando se é válido
        return this.notifications.length == 0; //retornando se a quantidade de notificações é igual a zero
    }
}