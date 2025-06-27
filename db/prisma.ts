// Importa a configuração da Neon, que será usada para configurar o WebSocket.
import { neonConfig } from "@neondatabase/serverless";

// Importa o adaptador Prisma para integração com o Neon.
import { PrismaNeon } from "@prisma/adapter-neon";

// Importa o cliente Prisma para interagir com o banco de dados.
import { PrismaClient } from "@prisma/client";

// Importa a biblioteca 'ws' (WebSocket) necessária para comunicação com o Neon via WebSocket.
import ws from "ws";

// Define o construtor de WebSocket usado pelo Neon para que ele funcione em ambientes como Node.js.
neonConfig.webSocketConstructor = ws;

// Pega a string de conexão com o banco de dados a partir da variável de ambiente.
const connectionString = process.env.DATABASE_URL!;

// Cria uma instância do adaptador PrismaNeon usando a connection string.
// Esse adaptador permite que o Prisma se comunique com o banco Neon via WebSocket.
const adapter = new PrismaNeon({ connectionString });

// Exporta uma instância do Prisma Client usando o adaptador do Neon.
// Adicionalmente, estende o resultado para os objetos `product`, convertendo os campos `price` e `rating` em strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        // Converte o campo price (geralmente decimal) para string ao retornar nos resultados.
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        // Converte o campo rating (por exemplo: float ou decimal) para string ao retornar nos resultados.
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
