import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/lib/types/user';

export function UserCard({ user }: { user: User }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            
            <Avatar className="h-16 w-16 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 space-y-2">
                <Badge variant={user.role === 'instructor' ? 'secondary' : 'default'}>
                    {user.role.toUpperCase()}
                </Badge>
                <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                    {user.status.toUpperCase()}
                </Badge>
            </div>
        </div>
    );
}