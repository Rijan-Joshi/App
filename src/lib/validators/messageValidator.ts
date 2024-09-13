import {z} from 'zod';

export const schema = z.object({
    fileId: z.string(),
    message: z.string()
});