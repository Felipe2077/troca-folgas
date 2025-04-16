// apps/backend/src/lib/hash.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Fator de custo do hashing (padrão recomendado)

/**
 * Gera o hash de uma senha em texto plano.
 * @param plainPassword A senha a ser hasheada.
 * @returns Uma Promise que resolve com a string do hash da senha.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
}

/**
 * Compara uma senha em texto plano com um hash armazenado.
 * @param plainPassword A senha digitada pelo usuário.
 * @param hash A hash armazenada no banco de dados.
 * @returns Uma Promise que resolve com true se a senha corresponder ao hash, false caso contrário.
 */
export async function comparePassword(
  plainPassword: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}
