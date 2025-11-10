import axios from "axios";
import FormData from "form-data";

const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export async function pinToIPFS(fileBuffer, fileName, JWT) {
  if (!JWT) throw new Error("PINATA_JWT not set");
  const formData = new FormData();
  formData.append("file", fileBuffer, { filename: fileName });

  const res = await axios.post(PINATA_URL, formData, {
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${JWT}`,
      ...formData.getHeaders(),
    },
  });

  return res.data;
}
