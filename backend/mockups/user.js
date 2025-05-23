export class UserMockup {
    static users = [
        {
            id: 1,
            username: 'admin',
            password: '1234',
            hashedPassword: '$2b$04$E81DdX24/SZw2PgaU48fnuPLnlytZHZMEk9/wAz42XyOVusDE/E/e',
            name: 'Admin',
            email: 'admin@gmail.com',
        },
        {
            id: 2,
            username: 'operator',
            password: '12345',
            hashedPassword:'$2b$04$E81DdX24/SZw2PgaU48fnuPLnlytZHZMEk9/wAz42XyOVusDE/E/e',
            name: 'Operator',
            email: 'operator@gmail.com',
        },
    ];

    static async getSingleOrNullByUsername(username) {
        return this.users.find(u => u.username === username) || null;
    }
}