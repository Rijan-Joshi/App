//Imports

import { schema as messageValidator } from "@/lib/validators/messageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/db";


//Handling the POST Request for message
export const POST = async(req: NextRequest) => {

    //Check if the user is authenticated, give error if not
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    if (!user || !user.id){
        return new Response("UNAUTHORIZED", {status: 401})
    }

    //If authenticated, check if the user has a file with the FileId after validating the request, give error if not
    
    //Validating the request data
    const body = await req.json()
    const validatedBody  = messageValidator.safeParse(body)
    if (!validatedBody.success){
        return new Response("Invalid Input", {status: 400})
    }

    const {fileId, message} = validatedBody.data;

    //Validation of the existence of the file with the FileId
    const file = await db.file.findFirst({
        where:{
            id: fileId
        }
    })

    if (!file){
        return new Response("FILE NOT FOUND", {status: 404})
    }

    //If the file Exist, create the message and give it a role too
    

}