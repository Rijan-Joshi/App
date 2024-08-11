import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {router, publicProcedure} from "./trpc";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    authCallback: publicProcedure.query(()=> {
        const {getUser} = getKindeServerSession()
        const user = getUser()

        if(!user.id || !user.email)
            throw new TRPCError("Unauthorized")

        // If the user is authorized in the database
        return {success: true}
    })
})

export type AppRouter = typeof appRouter