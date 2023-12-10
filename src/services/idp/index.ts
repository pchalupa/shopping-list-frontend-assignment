import { user } from '@mocks/data';

export function getCurrentUser() {
    return user.a;
}

export function decodeToken(token: string) {
    return Object.values(user).find(({ token: userToken }) => token === userToken);
}
