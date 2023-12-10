import { getCurrentUser } from '@services/idp';

export enum ErrorCode {
    NotFound = 'E01',
    Conflict = 'E02',
    BadRequest = 'E03',
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

export async function getShoppingLists(): Promise<ShoppingList[]> {
    const response = await fetcher({ url: '/shopping-lists', method: 'GET' });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList[] = await response.json();

    return data;
}

export async function getShoppingList(id: string): Promise<ShoppingList> {
    const response = await fetcher({ url: `/shopping-lists/${id}`, method: 'GET' });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    if (!data) throw new Error(ErrorCode.NotFound);

    return data;
}

export async function addShoppingList({ name }: Pick<ShoppingList, 'name'>): Promise<ShoppingList> {
    const response = await fetcher({ url: `/shopping-lists`, method: 'POST', body: { name } });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function updateShoppingListName(id: string, name: string): Promise<ShoppingList> {
    const response = await fetcher({ url: `/shopping-lists/${id}`, method: 'PUT', body: { name } });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function removeShoppingList(id: string): Promise<void> {
    const response = await fetcher({ url: `/shopping-lists/${id}`, method: 'DELETE' });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
}

export async function archiveShoppingList(id: string) {
    const archivedAt = new Date();
    const response = await fetcher({ url: `/shopping-lists/${id}`, method: 'PUT', body: { archivedAt: archivedAt.getTime() } });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function addShoppingListItem(listId: string, item: { name: string }): Promise<ShoppingList> {
    const response = await fetcher({ url: `/shopping-lists/${listId}/items`, method: 'POST', body: { name: item.name } });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function solveShoppingListItem(shoppingListId: string, itemId: string): Promise<ShoppingList> {
    const solvedAt = new Date();
    const response = await fetcher({
        url: `/shopping-lists/${shoppingListId}/items/${itemId}`,
        method: 'PUT',
        body: { solvedAt: solvedAt.getTime() },
    });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function removeShoppingListItem(shoppingListId: string, itemId: string): Promise<ShoppingList> {
    const response = await fetcher({
        url: `/shopping-lists/${shoppingListId}/items/${itemId}`,
        method: 'DELETE',
    });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function addShoppingListMember(listId: string, member: { name: string }) {
    const response = await fetcher({ url: `/shopping-lists/${listId}/members`, method: 'POST', body: member });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

export async function removeShoppingListMember(listId: string, memberId: string) {
    const response = await fetcher({ url: `/shopping-lists/${listId}/members/${memberId}`, method: 'DELETE' });

    if (!response.ok) throw new Error(ErrorCode.BadRequest);
    const data: ShoppingList = await response.json();

    return data;
}

async function fetcher(options: { url: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: Record<string, unknown> }) {
    const { token } = getCurrentUser();
    const headers = new Headers({ authorization: token });
    const body = JSON.stringify(options.body);
    const response = await fetch(`${import.meta.env.VITE_API_URL}${options.url}`, { method: options.method, headers, body });

    return response;
}
