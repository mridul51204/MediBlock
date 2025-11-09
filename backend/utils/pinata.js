import axios from "axios";
import FormData from "form-data";

const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";
const JWT = process.env.PINATA_JWT;

// Upload encrypted file buffer to IPFS
export async function pinToIPFS(fileBuffer, fileName) {
  const formData = new FormData();
  formData.append("file", fileBuffer, { filename: fileName });

  const res = await axios.post(PINATA_URL, formData, {
    maxBodyLength: "Infinity",
    headers: {
      Authorization: `Bearer ${JWT}`,
      ...formData.getHeaders(),
    },
  });

  return res.data; // contains IpfsHash (CID)
}
