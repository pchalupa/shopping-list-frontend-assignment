import { type ShoppingList } from '.';

export const user = {
    a: { id: 'a', name: 'Petr Novák' },
    b: { id: 'b', name: 'Tomáš Novák' },
    c: { id: 'c', name: 'Marta Nováková' },
};

export const mock: ShoppingList[] = [
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
        createdAt: '',
        updatedAt: undefined,
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
        createdAt: '',
        updatedAt: undefined,
        archivedAt: undefined,
        deletedAt: undefined,
    },
    {
        id: 'c',
        name: 'Dárky',
        owner: user.b,
        members: [user.c],
        items: [{ id: 'a', name: 'Lego', solvedAt: undefined, deletedAt: undefined }],
        createdAt: '',
        updatedAt: undefined,
        archivedAt: undefined,
        deletedAt: undefined,
    },
];
