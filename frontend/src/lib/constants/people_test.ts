import { User } from "@/lib/types/user";

export const testUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        role: 'instructor',
        dateJoined: '2024-01-15',
        status: 'active',
        avatarUrl: '/images/cat-idle1.png'
    },
    {
        id: '2',
        name: 'Jane Smith',
        username: 'jane',
        email: 'jane@example.com',
        role: 'student',
        dateJoined: '2024-02-01',
        status: 'active',
        avatarUrl: '/images/cat-idle1.png'
    },
    {
        id: '3',
        name: 'Bob Wilson',
        username: 'bob',
        email: 'bob@example.com',
        role: 'student',
        dateJoined: '2024-02-15',
        status: 'inactive',
        avatarUrl: '/images/cat-idle1.png'
    },
];