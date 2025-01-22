import { User } from "@/lib/types/user";

export const testUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        username: 'john',
        email: 'john@example.com',
        location: 'San Francisco, CA',
        photoUrl: '/images/cat-idle1.png',
        role: 'instructor',
        status: 'active',
        experience: 'advanced',
        interests: ['programming', 'teaching', 'web development'],
        onboardingComplete: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Jane Smith',
        username: 'jane',
        email: 'jane@example.com',
        location: 'New York, NY',
        photoUrl: '/images/cat-idle1.png',
        role: 'learner',
        status: 'active',
        experience: 'intermediate',
        interests: ['machine learning', 'data science'],
        onboardingComplete: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
    },
    {
        id: '3',
        name: 'Bob Wilson',
        username: 'bob',
        email: 'bob@example.com',
        location: 'Chicago, IL',
        photoUrl: '/images/cat-idle1.png',
        role: 'learner',
        status: 'inactive',
        experience: 'beginner',
        interests: ['web design', 'UI/UX'],
        onboardingComplete: false,
        createdAt: new Date('2024-02-15'),
        updatedAt: new Date('2024-02-15')
    },
];