import { EntitySchema } from "typeorm";

const editora = new EntitySchema({
    name: "Editora",
    tableName:"editora",
    columns: {
        codigo_editora: {primary: true, type: "int", generated: "increment"},
        nome_editora: {type: "varchar", length: 100, nullable: false},
        cnpj: {type: "varchar",length: 45 ,nullable: false},
        email: {type: "varchar", length: 100, nullable: false},
         
    }
});

export default editora