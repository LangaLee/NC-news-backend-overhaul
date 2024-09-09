import { likesDataType } from "../../TS types";
import client from "./prismaClient";

export async function fetchLikes(user_id: number) {
  try {
    const user = await client.users.findUnique({ where: { user_id: user_id } });
    const likes = await client.userLikes.findMany({
      where: { user_id: user_id },
    });
    if (!user) {
      return Promise.reject({ msg: "User does not exist", status: 404 });
    }
    const likesToReturn: likesDataType = likes.map((like) => {
      const { user_id, article_id, value } = like;
      return { user_id, article_id, value };
    });
    return likesToReturn;
  } finally {
    client.$disconnect();
  }
}
