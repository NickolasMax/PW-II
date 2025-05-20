const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Db1747693980054 {
    name = 'Db1747693980054'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`password\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`typeUser\` enum ('admin', 'comum') NOT NULL, \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleteAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`editora\` (\`codigo_editora\` int NOT NULL AUTO_INCREMENT, \`nome_editora\` varchar(100) NOT NULL, \`cnpj\` varchar(45) NOT NULL, \`email\` varchar(100) NOT NULL, PRIMARY KEY (\`codigo_editora\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`codigo_categoria\` int NOT NULL AUTO_INCREMENT, \`nome_categoria\` varchar(45) NOT NULL, PRIMARY KEY (\`codigo_categoria\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`autor\` (\`codigo_autor\` int NOT NULL AUTO_INCREMENT, \`nome_autor\` varchar(45) NOT NULL, \`nasc_autor\` date NOT NULL, \`nacionalidade\` varchar(45) NOT NULL, PRIMARY KEY (\`codigo_autor\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`autor\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
        await queryRunner.query(`DROP TABLE \`editora\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
