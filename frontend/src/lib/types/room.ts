export interface Room {
    id: string;
    slug: string;
    users: string[]; // user ids
    topicId: string;
    createdAt: Date;
    updatedAt: Date;
}