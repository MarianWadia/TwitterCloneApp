import { PrismaClient } from "@prisma/client"

declare global {
    // global variable prisma of type PrismaClient or undefined if not available
    var prisma : PrismaClient | undefined
}

// globalThis is a standardized way to access global object in various JavaScript environments
//  including web browsers, Node.js, and other JavaScript runtime environments

const client = globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client

// This code sets up a prisma client ensuring its a global variable and reuses the same client instance
// in non-production environments while exporting it for use in other parts of the application
// This approach can help manage database connections and improve performance.
