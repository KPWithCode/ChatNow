import { knexPool as knex } from './index';
import { Query } from './index'
// Query(`SELECT * FROM Tokens WHERE id = ${id} AND token = ?`, [token]);
const findOne = async (id: number, token: string) => knex('Tokens').where({ id, token });
// id instead of userid

// knex('Tokens').insert(userid)
// 
const insert = async (userid: number) => Query(`INSERT INTO Tokens (userid) VALUES (${userid})`);
// knex('Tokens').update(token).where('id', id)
// 
const update = async (id: number, token: string) => Query(`UPDATE Tokens SET token = "${token}" WHERE id = ?`, [id]);
// knex('Tokens').update(id, token)

export default {
    findOne,
    insert,
    update
}