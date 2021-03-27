import { firestore } from "./../../../store/constants";

import type { NextApiRequest, NextApiResponse } from "next";
import OneClick from "../../../types/oneClick";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;
  var result: any = {};
  const docs = await firestore.collection(`apps/${id}/pairs`).get();
  docs.docs.forEach((doc) => {
    const oneClick = doc.data() as OneClick;
    result[oneClick.key] = oneClick.value;
  });
  res.status(200).json(result);
}
