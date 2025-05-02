"use server"

type Res = 
| {success: true}

export async function signinUserAction(values: unknown): Promise<Res> {
    // the auth logic will be done in the authjs config files 

    return { success: true };
};