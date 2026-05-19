import * as z from "zod";

const FavoriteIDSchema = z.object({
    id: z.string({error: "Id is requiered"})
        .uuid({error: "ID need to be a UUID valid"})
})