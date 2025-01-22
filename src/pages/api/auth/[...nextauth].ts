import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize function called");

        // Senha fixa para o sistema interno
        const SYSTEM_PASSWORD = "12345"; // Substitua pela senha desejada

        if (!credentials?.password) {
          console.log("Password is missing");
          throw new Error("Password is required");
        }

        // Simula um usuário fixo
        if (credentials.password === SYSTEM_PASSWORD) {
          console.log("User authenticated");
          return { id: 1, name: "Admin", email: "admin@example.com" };
        }

        console.log("Invalid password");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 minutos
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "default-secret",
});
