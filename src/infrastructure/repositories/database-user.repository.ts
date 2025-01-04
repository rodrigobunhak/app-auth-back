import { Password } from "@/domain/entities/password.vo";
import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import { injectable } from "inversify";
import mysql, { RowDataPacket } from "mysql2/promise";

@injectable()
export class DatabaseUserRepository implements UserRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createPool({
      host: "db", // Endereço do seu servidor MySQL
      user: "root", // Seu usuário
      password: "root", // Sua senha
      database: "auth_db", // Nome do banco de dados
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async save(user: User): Promise<boolean> {
    try {
      const [result] = await this.connection.execute<mysql.ResultSetHeader>(
        "INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)",
        [user.id, user.email.value(), user.name, user.password.value()]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Error saving user");
    }
  }
  
  async findByEmail(email: string): Promise<User | null> {
    try {
      const [rows] = await this.connection.execute<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        const user = rows[0];
        return new User({
          id: user.id,
          name: user.name,
          email: user.email,
          password: new Password(user.password)
        });
      }
      return null;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user by email");
    }
  }

  async findAll(page: number, limit: number): Promise<{ users: User[]; total: number; }> {
    try {
      const offset = (page - 1) * limit;
      const query = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;
      const [usersRows] = await this.connection.execute<any[]>(query);
      const [countRows] = await this.connection.execute<any[]>(
        "SELECT COUNT(*) as total FROM users"
      );
      const total = countRows[0]?.total || 0;
      const users = usersRows.map((user) => new User({
        id: user.id,
        name: user.name,
        email: user.email,
        password: new Password(user.password)
      }));
      return { users, total };
    } catch (error) {
      console.error("Error finding all users:", error);
      throw new Error("Error finding all users");
    }
  }
}