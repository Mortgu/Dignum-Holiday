import { z } from "zod";

export const userFormSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters!",
    }),
    lastName: z.string(),
    email: z.email(),

    workingHours: z.coerce.number().int().min(1),
    salary: z.coerce.number().min(0),
    vacationEntitlement: z.coerce.number().int().min(0),
    password: z.string(),
});