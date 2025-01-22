export type Role = 'learner' | 'instructor';
export type Experience = 'beginner' | 'intermediate' | 'advanced';
export type Status = 'active' | 'inactive';
export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    location: string;
    photoUrl?: string;
    role: Role;
    status: Status;
    experience: Experience;
    interests: string[]
    onboardingComplete: boolean;
    createdAt: string;
    updatedAt: string;
} 