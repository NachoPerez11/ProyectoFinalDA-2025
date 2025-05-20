export class UserMockup {
    static users = [
        {
            id: 1,
            username: 'admin',
            password: '1234',
            name: 'Admin',
            email: 'admin@gmail.com',
        },
        {
            id: 2,
            username: 'operator',
            password: '12345',
            name: 'Operator',
            email: 'operator@gmail.com',
        },
    ];

    static async getSingleOrNullByUsername(username) {
        return this.users.find(u => u.username === username) || null;
    }
}