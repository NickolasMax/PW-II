import { EntitySchema } from "typeorm";

const autor = new EntitySchema({
    name: "Autor",
    tableName:"autor",
    columns: {
        codigo_autor: {primary: true, type: "int", generated: "increment"},
        nome_autor: {type: "varchar", length: 45, nullable: false},
        nasc_autor: {type: "date"},
        nacionalidade: {type: "varchar", length: 45, nullable: false},
        
    }
});

export default autor