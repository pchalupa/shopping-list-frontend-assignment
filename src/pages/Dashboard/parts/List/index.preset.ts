export enum Filter {
    Active,
    Archived,
}

export const criteria = [
    { translationKey: 'active', value: Filter.Active },
    { translationKey: 'archived', value: Filter.Archived },
];
