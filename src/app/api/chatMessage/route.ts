//Imports
import { schema as messageValidator } from "@/lib/validators/messageValidator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import { db } from "@/db";

/**
 * Handles the POST request for submitting a user message associated with a specific file.
 * 
 * Steps:
 * 1. Checks if the user is authenticated.
 * 2. Validates the input (fileId and message).
 * 3. Verifies if the user has access to the file with the given fileId.
 * 4. If all checks pass, saves the user's message to the database.
 * 
 * @param req - The Next.js request object containing the request body and headers.
 * @returns {Promise<Response>} - The response with the appropriate HTTP status code.
 * 
 * Status Codes:
 * - 401: UNAUTHORIZED, if the user is not authenticated.
 * - 400: Invalid Input, if the message or fileId doesn't pass validation.
 * - 404: FILE NOT FOUND, if the fileId does not correspond to an existing file in the database.
 * - 201: Success, if the message is successfully created.
 */
export const POST = async (req: NextRequest): Promise<Response> => {

  // Check if the user is authenticated, give an error if not
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return new Response("UNAUTHORIZED", { status: 401 });
  }

  // Validate the request data using the message schema
  const body = await req.json();
  const validatedBody = messageValidator.safeParse(body);
  
  if (!validatedBody.success) {
    return new Response("Invalid Input", { status: 400 });
  }

  const { fileId, message } = validatedBody.data;

  // Validate if the file with the given fileId exists
  const file = await db.file.findFirst({
    where: {
      id: fileId
    }
  });

  if (!file) {
    return new Response("FILE NOT FOUND", { status: 404 });
  }

  // If the file exists, create the message and associate it with the user and the file
  await db.message.create({
    data: {
      content: message,
      role: 'USER',
      userId: user.id,
      fileId
    }
  });

  // Return a success response with status 201 (Created)
  return new Response("Message created successfully", { status: 201 });
};
