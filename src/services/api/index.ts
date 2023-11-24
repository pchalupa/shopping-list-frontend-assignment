import { nanoid } from 'nanoid';

import { mock } from './index.mock';

export enum ErrorCode {
    NotFound = 'E01',
    Conflict = 'E02',
}

export type ShoppingList = {
    id: string;
    name: string;
    owner: { id: string; name: string };
    members: Array<{ id: string; name: string }>;
    items: Array<{ id: string; name: string; solvedAt?: number; deletedAt?: number }>;
    createdAt: number;
    updatedAt: number;
    archivedAt?: number;
    deletedAt?: number;
};

export async function getShoppingLists(userId: string): Promise<ShoppingList[]> {
    const result =
        mock.filter(({ owner, members, deletedAt }) => !deletedAt && (owner.id === userId || members.some(({ id }) => id === userId))) ?? [];

    return result;
}

export async function addShoppingList({ name, owner }: Pick<ShoppingList, 'name' | 'owner'>): Promise<ShoppingList> {
    const currentTime = Date.now();
    const list = {
        id: nanoid(),
        name,
        owner,
        members: [],
        items: [],
        createdAt: currentTime,
        updatedAt: currentTime,
    };

    mock.push(list);

    return list;
}

export async function getShoppingList(id: string): Promise<ShoppingList> {
    const result = mock.find(({ id: listId }) => listId === id);

    if (!result) throw new Error(ErrorCode.NotFound);

    return result;
}

export async function updateShoppingListName(id: string, name: string) {
    const listIndex = mock.findIndex(({ id: listId }) => listId === id);
    const updatedAt = new Date();

    mock[listIndex].name = name;
    mock[listIndex].updatedAt = updatedAt.getTime();

    return mock[listIndex];
}

export async function removeShoppingList(id: string) {
    const listIndex = mock.findIndex(({ id: listId }) => listId === id);
    const deletedAt = new Date();

    mock[listIndex].deletedAt = deletedAt.getTime();
}

export async function archiveShoppingList(id: string) {
    const listIndex = mock.findIndex(({ id: listId }) => listId === id);
    const archivedAt = new Date();

    if (listIndex < 0) throw new Error(ErrorCode.NotFound);

    mock[listIndex].archivedAt = archivedAt.getTime();

    return mock[listIndex];
}

export async function addShoppingListItem(shoppingListId: string, item: { name: string }) {
    const listIndex = mock.findIndex(({ id }) => id === shoppingListId);
    const updatedAt = new Date();

    if (listIndex < 0) throw new Error(ErrorCode.NotFound);

    mock[listIndex].items.push({ id: nanoid(), solvedAt: undefined, deletedAt: undefined, ...item });
    mock[listIndex].updatedAt = updatedAt.getTime();

    return mock[listIndex];
}

export async function solveShoppingListItem(shoppingListId: string, itemId: string) {
    const listIndex = mock.findIndex(({ id }) => id === shoppingListId);
    const updatedAt = new Date();

    if (listIndex < 0) throw new Error(ErrorCode.NotFound);

    const itemIndex = mock[listIndex].items.findIndex(({ id }) => id === itemId);

    if (itemIndex < 0) throw new Error(ErrorCode.NotFound);

    const solvedDate = new Date();

    mock[listIndex].items[itemIndex].solvedAt = solvedDate.getTime();
    mock[listIndex].updatedAt = updatedAt.getTime();

    return mock[listIndex];
}

export async function removeShoppingListItem(shoppingListId: string, itemId: string) {
    const listIndex = mock.findIndex(({ id }) => id === shoppingListId);
    const updatedAt = new Date();

    if (listIndex < 0) throw new Error(ErrorCode.NotFound);

    mock[listIndex].items = mock[listIndex].items.filter(({ id }) => id !== itemId);
    mock[listIndex].updatedAt = updatedAt.getTime();

    return mock[listIndex];
}

export async function addShoppingListMember(shoppingListId: string, member: { name: string }) {
    const listIndex = mock.findIndex(({ id }) => id === shoppingListId);
    const updatedAt = new Date();

    if (listIndex < 0) throw new Error(ErrorCode.NotFound);
    if (mock[listIndex].members.findIndex(({ name }) => name === member.name) >= 0) throw new Error(ErrorCode.Conflict);

    mock[listIndex].members.push({ id: nanoid(), ...member });
    mock[listIndex].updatedAt = updatedAt.getTime();

    return mock[listIndex];
}

export async function removeShoppingListMember(shoppingListId: string, memberId: string) {
    const listIndex = mock.findIndex(({ id }) => id === shoppingListId);
    const updatedAt = new Date();

    if (listIndex < 0) throw new Error(ErrorCode.NotFound);

    mock[listIndex].members = mock[listIndex].members.filter(({ id }) => id !== memberId);
    mock[listIndex].updatedAt = updatedAt.getTime();

    return mock[listIndex];
}
