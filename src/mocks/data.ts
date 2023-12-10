import { type ShoppingList } from '../services/api';

export const user = {
    a: { id: 'a', name: 'Petr Novák', token: 'token-c' },
    b: { id: 'b', name: 'Tomáš Novák', token: 'token-a' },
    c: { id: 'c', name: 'Marta Nováková', token: 'token-b' },
};

export const data: ShoppingList[] = [
    {
        id: 'a',
        name: 'Drogerie',
        owner: user.a,
        members: [user.c],
        items: [
            { id: 'a', name: 'Sprchový gel', solvedAt: undefined, deletedAt: undefined },
            { id: 'b', name: 'Zubní pasta', solvedAt: undefined, deletedAt: undefined },
            { id: 'c', name: 'Pleny', solvedAt: undefined, deletedAt: undefined },
        ],
        createdAt: 1700571083516,
        updatedAt: 1700571083516,
        archivedAt: undefined,
        deletedAt: undefined,
    },
    {
        id: 'b',
        name: 'Potraviny',
        owner: user.b,
        members: [user.a, user.c],
        items: [
            { id: 'a', name: 'Rohlíky', solvedAt: undefined, deletedAt: undefined },
            { id: 'b', name: 'Máslo', solvedAt: undefined, deletedAt: undefined },
            { id: 'c', name: 'Maso', solvedAt: undefined, deletedAt: undefined },
        ],
        createdAt: 1700571145229,
        updatedAt: 1700571145229,
        archivedAt: undefined,
        deletedAt: undefined,
    },
    {
        id: 'c',
        name: 'Dárky',
        owner: user.b,
        members: [user.c],
        items: [{ id: 'a', name: 'Lego', solvedAt: undefined, deletedAt: undefined }],
        createdAt: 1700571231335,
        updatedAt: 1700571231335,
        archivedAt: undefined,
        deletedAt: undefined,
    },
];
