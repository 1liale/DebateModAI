export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: 'student' | 'instructor';
    dateJoined: string;
    avatarUrl?: string;
    status: 'active' | 'inactive';
}