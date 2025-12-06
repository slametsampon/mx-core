// apps/backend/src/db/postgresStore.ts

import { sql } from '@vercel/postgres';
import type { DataStore } from '../dataStore/types.js';

export const postgresStore: DataStore = {
  async findAll(model) {
    const query = `SELECT * FROM ${model}`;
    const { rows } = await sql.query(query);
    return rows;
  },

  async findById(model, id) {
    const query = `SELECT * FROM ${model} WHERE id = $1 LIMIT 1`;
    const { rows } = await sql.query(query, [id]);
    return rows[0] ?? null;
  },

  async create(model, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const cols = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO ${model} (${cols})
      VALUES (${placeholders})
      RETURNING *
    `;

    const { rows } = await sql.query(query, values);
    return rows[0];
  },

  async update(model, id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const assignments = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');

    const query = `
      UPDATE ${model}
      SET ${assignments}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    const params = [...values, id];
    const { rows } = await sql.query(query, params);
    return rows[0];
  },

  async delete(model, id) {
    const query = `DELETE FROM ${model} WHERE id = $1`;
    const result = await sql.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
