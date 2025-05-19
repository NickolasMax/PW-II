import { EntitySchema } from "typeorm";

const categoria = new EntitySchema({
    name: "Categoria",
    tableName:"categoria",
    columns: {
        codigo_categoria: {primary: true, type: "int", generated: "increment"},
        nome_categoria: {type: "varchar", length: 45, nullable: false},
         
    }
});

export default categoria