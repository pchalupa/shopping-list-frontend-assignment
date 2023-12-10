import { HttpResponse, type PathParams, delay, http } from 'msw';
import { nanoid } from 'nanoid';

import { type ShoppingList } from '@services/api';
import { decodeToken } from '@services/idp';

import { data } from './data';

export const handlers = [
    http.get(`${import.meta.env.VITE_API_URL}/shopping-lists`, async ({ request }) => {
        const user = decodeToken(request.headers.get('Authorization')!);
        const result =
            data.filter(({ owner, members, deletedAt }) => !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id))) ?? [];

        await delay('real');

        return HttpResponse.json(result);
    }),

    http.get<{ id: string }>(`${import.meta.env.VITE_API_URL}/shopping-lists/:id`, async ({ params, request }) => {
        const user = decodeToken(request.headers.get('Authorization')!);
        const result = data.find(
            ({ id, owner, members, deletedAt }) =>
                id === params.id && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
        );

        await delay('real');

        return HttpResponse.json(result);
    }),

    http.post<PathParams<never>, { name: string }>(`${import.meta.env.VITE_API_URL}/shopping-lists`, async ({ request }) => {
        const { name } = await request.json();
        const user = decodeToken(request.headers.get('Authorization')!)!;
        const currentTime = Date.now();
        const list: ShoppingList = {
            id: nanoid(),
            name,
            owner: { id: user.id, name: user.name },
            members: [],
            items: [],
            createdAt: currentTime,
            updatedAt: currentTime,
        };

        data.push(list);

        await delay('real');

        return HttpResponse.json(list);
    }),

    http.put<{ id: string }, { name?: string; archivedAt?: number }>(
        `${import.meta.env.VITE_API_URL}/shopping-lists/:id`,
        async ({ params, request }) => {
            const user = decodeToken(request.headers.get('Authorization')!);
            const { name, archivedAt } = await request.json();
            const result = data.find(
                ({ id, owner, members, deletedAt }) =>
                    id === params.id && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
            );

            await delay('real');

            if (result) {
                const updatedAt = new Date();

                result.updatedAt = updatedAt.getTime();
                if (name) result.name = name;
                if (archivedAt) result.archivedAt = archivedAt;

                return HttpResponse.json(result);
            }

            return HttpResponse.text('not found', { status: 404 });
        },
    ),

    http.delete<{ id: string }>(`${import.meta.env.VITE_API_URL}/shopping-lists/:id`, async ({ params, request }) => {
        const user = decodeToken(request.headers.get('Authorization')!);
        const listIndex = data.findIndex(({ id: listId }) => listId === params.id);
        const deletedAt = new Date();

        data[listIndex].deletedAt = deletedAt.getTime();

        const result = data.find(
            ({ id, owner, members, deletedAt }) =>
                id === params.id && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
        );

        await delay('real');

        return HttpResponse.json(result);
    }),

    http.post<{ listId: string }, { name: string }>(`${import.meta.env.VITE_API_URL}/shopping-lists/:listId/items`, async ({ request, params }) => {
        const user = decodeToken(request.headers.get('Authorization')!);
        const { name } = await request.json();
        const updatedAt = new Date();
        const result = data.find(
            ({ id, owner, members, deletedAt }) =>
                id === params.listId && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
        );

        await delay('real');

        if (result) {
            result.updatedAt = updatedAt.getTime();

            result.items.push({ id: nanoid(), name, solvedAt: undefined, deletedAt: undefined });

            return HttpResponse.json(result);
        }

        return HttpResponse.text('not found', { status: 404 });
    }),

    http.put<{ listId: string; itemId: string }, { name?: string; solvedAt?: number }>(
        `${import.meta.env.VITE_API_URL}/shopping-lists/:listId/items/:itemId`,
        async ({ request, params }) => {
            const { name, solvedAt } = await request.json();
            const user = decodeToken(request.headers.get('Authorization')!);
            const updatedAt = new Date();
            const result = data.find(
                ({ id, owner, members, deletedAt }) =>
                    id === params.listId && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
            );

            await delay('real');

            if (result) {
                result.updatedAt = updatedAt.getTime();

                const itemIndex = result.items.findIndex(({ id }) => id === params.itemId);

                if (name) result.items[itemIndex].name = name;
                if (solvedAt) result.items[itemIndex].solvedAt = solvedAt;

                return HttpResponse.json(result);
            }

            return HttpResponse.text('not found', { status: 404 });
        },
    ),

    http.delete<{ listId: string; itemId: string }>(
        `${import.meta.env.VITE_API_URL}/shopping-lists/:listId/items/:itemId`,
        async ({ request, params }) => {
            const user = decodeToken(request.headers.get('Authorization')!);
            const updatedAt = new Date();
            const result = data.find(
                ({ id, owner, members, deletedAt }) =>
                    id === params.listId && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
            );

            await delay('real');

            if (result) {
                result.updatedAt = updatedAt.getTime();

                result.items = result.items.filter(({ id }) => id !== params.itemId);

                return HttpResponse.json(result);
            }

            return HttpResponse.text('not found', { status: 404 });
        },
    ),

    http.post<{ listId: string }, { name: string }>(`${import.meta.env.VITE_API_URL}/shopping-lists/:listId/members`, async ({ request, params }) => {
        const { name } = await request.json();
        const user = decodeToken(request.headers.get('Authorization')!);
        const updatedAt = new Date();
        const result = data.find(
            ({ id, owner, members, deletedAt }) =>
                id === params.listId && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
        );

        await delay('real');

        if (result) {
            result.updatedAt = updatedAt.getTime();

            result.members.push({ id: nanoid(), name });

            return HttpResponse.json(result);
        }

        return HttpResponse.text('not found', { status: 404 });
    }),

    http.delete<{ listId: string; memberId: string }>(
        `${import.meta.env.VITE_API_URL}/shopping-lists/:listId/members/:memberId`,
        async ({ request, params }) => {
            const user = decodeToken(request.headers.get('Authorization')!);
            const updatedAt = new Date();
            const result = data.find(
                ({ id, owner, members, deletedAt }) =>
                    id === params.listId && !deletedAt && (owner.id === user?.id || members.some(({ id }) => id === user?.id)),
            );

            await delay('real');

            if (result) {
                result.updatedAt = updatedAt.getTime();

                result.members = result.members.filter(({ id }) => id !== params.memberId);

                return HttpResponse.json(result);
            }

            return HttpResponse.text('not found', { status: 404 });
        },
    ),
];
