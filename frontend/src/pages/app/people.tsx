'use client';

import React, { useState } from 'react';
import {
    ModuleRegistry,
    AllCommunityModule,
    themeQuartz,
    colorSchemeLight,
    colorSchemeDarkBlue
} from 'ag-grid-community';
import { useTheme } from 'next-themes';
import { UsersGrid } from '@/components/users/UsersGrid';
import { UserCard } from '@/components/users/UserCard';
import { testUsers } from '@/lib/constants/people_test';
import { User } from '@/lib/types/user';
import { SecondaryButton } from '@/components/base/Buttons';
import { LayoutList, Grid } from 'lucide-react';
import { PrimaryInput } from "@/components/base/Inputs";

// Register required modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function PeoplePage() {
    const [users] = useState<User[]>(testUsers);
    const [isGridView, setIsGridView] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { theme } = useTheme();
    const myTheme = theme === 'light' ? themeQuartz.withPart(colorSchemeLight) : themeQuartz.withPart(colorSchemeDarkBlue);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-[calc(100vh-6rem)] p-8 md:p-12">
            <div className="mb-4 flex justify-between items-center">
                <div className="relative w-64">
                    <PrimaryInput
                        type="text"
                        placeholder="Search users..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <SecondaryButton
                    onClick={() => setIsGridView(!isGridView)}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {isGridView ? (
                        <LayoutList className="h-4 w-4" />
                    ) : (
                        <Grid className="h-4 w-4" />
                    )}
                </SecondaryButton>
            </div>
            
            <div className="h-[calc(100%-4rem)]">
                {isGridView ? (
                    <UsersGrid users={filteredUsers} theme={myTheme} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUsers.map(user => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
