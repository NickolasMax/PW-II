import express, { request, response } from "express";
import user from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";

const routes = express.Router();
const userRepository = AppDataSource.getRepository(user);


routes.get("/", (request, response) => {    
    response.status(200).send("Deu Infra!!!")
});

routes.put("/", async (request, response) => {
    const {id} = request.params;

    if (isNaN(id)){
        return response.status(400).send({"response":"O id precisa ser númerico"});
    }

    await userRepository.update({id}), ({deleteAt: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({"response":"editora removida com sucesso."});
})

routes.delete('/:id', async (request, response) =>{
    const {id}  = request.params;

    if (isNaN(id)){
        return response.status(400).send({"response":"O id precisa ser númerico"});
    }

    await userRepository.update({id}), ({deleteAt: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({"responde":"editora removida com sucesso."})
});

routes.post("/", async (request,response) =>{

    const {name, email, password,typeUser} = request.body;

    if(name.length < 1){
        return response.status(400).send({"response":"Campo name deve ter pelo menos 1 caractere."});
    }
    if(!email.includes("@") || !email.includes(".") || email.length < 5){
        return response.status(400).send({"response":"Formato de email invalido"});
    }
    if(password.length < 6){
        return response.status(400).send({"response":"Senha deve ter no mínimo 6 caracteres"});
    }
    if(typeUser !== "admin" && typeUser !== "comum"){
        return response.status(400).send({"response":"O campo deve ser preenchido como 'admin' ou 'comum'"});
    }

    const newUser = userRepository.create ({ name, email, password, typeUser});
    await userRepository.save(newUser);

    return response.status(201).send({"response":"Usuario cadastrado com sucesso"});
    
});

export default routes;