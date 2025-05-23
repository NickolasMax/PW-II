import express, { request, response } from "express";
import user from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";


const route = express.Router();
const userRepository = AppDataSource.getRepository(user);

route.get("/",async (request, response) => {
   const users = await userRepository.findBy({deletedAt:
    IsNull()});
    return response.status(200).send({"response": users});
})

route.get("/:nameFound",async(request, response)=>{
    const {nameFound} = request.params;
    const userFound = await userRepository.findBy({name: Like
        (`%${nameFound}%`)});
    return response.status(200).send({"response": userFound});
})

route.post("/",async (request,response) => {
    const {name,id,email,password,typeUser} = request.body;

    
    if(name.length < 1){
        return response.status(400).send({"response":"Campo 'name' deve ter pelo menos uma carectere."});
    }
      if(id.length < 1){
        return response.status(400).send({"response":"Campo 'id' deve ter pelo menos uma carectere."});
    }
    if(!email.includes('@')){
        return response.status(400).send({"response":"formato incorreto."})
    }
    if(password.length < 6){
        return response.status(400).send({"response":"A senha deve ter no minimo 6 caractere."})
    }
    if(typeUser !== "admin" && typeUser !== "comum"){
        return response.status(400).send({"response":"Usuario invalido."})
    }
    const newUser = userRepository.create({name,email,password,typeUser});
    await  userRepository.save(newUser)
    
    return response.status(201).send({"response":"Usuário cadastrado com sucesso"})
    
    
    
});
route.put('/',async(request, response)=> {
    const{id, name, email, password, typeuser} = request.body;

    if(typeof id != "number"){
        return response.status(400).send({"response":"Campo 'id' deve ser numerico"})
    }
    
    if(name.length < 1){
        return response.status(400).send({"response":"Campo 'name' deve ter pelo menos uma carectere."});
    }
    if(!email.includes('@')){
        return response.status(400).send({"response":"formato incorreto."})
    }
    if(password.length < 6){
        return response.status(400).send({"response":"A senha deve ter no minimo 6 caractere."})
    }
    if(typeuser !== 'admin' && typeuser !== 'comum'){
        return response.status(400).send({"response":"Usuario invalido."})
    }
    await userRepository.update({id},{name, email, password, typeuser});

    return response.status(200).send({"message":"Usuario atualizado com sucesso!"});

});

route.delete('/:id',async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)){
        response.status(400).send({"response":"O 'id' precisa ser numerico"});
    }
    await userRepository.update({id},
    {deletedAt: () => "CURRENT_TIMESTAMP"});

    return response.status(200).send({"response":"usuario deletado com sucesso"});

});

export default route