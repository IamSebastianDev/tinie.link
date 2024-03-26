/** @format */

export const CreateUrlService = () => {
    return {
        create: async (url: string) => {
            return {
                short_url: url,
            };
        },
    };
};
