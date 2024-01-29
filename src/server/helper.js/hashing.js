import bcrypt from "bcrypt"

export const authHashing = async (plainText) => {
  const hash = await bcrypt.hash(plainText, 12)
  return hash
}