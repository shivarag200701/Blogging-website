import { arrayBufferToHex } from "./helper";

export default async function verifyPassword(
  password: string,
  hashedPassword: string,
  storedSalt: string
) {
  try {
    const enc = new TextEncoder();
    console.log("here");

    //convert salt from hex to Unit8Array
    const saltMatch = storedSalt.match(/.{1,2}/g);
    const salt = saltMatch
      ? Uint8Array.from(saltMatch.map((byte) => parseInt(byte, 16)))
      : null;
    if (!salt) {
      throw new Error("cannot convert salt to Uint8Array");
    }
    const iterations = 80000;

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const newHash = arrayBufferToHex(derivedBits);
    console.log("check", newHash == hashedPassword);

    return newHash == hashedPassword;
  } catch (err) {
    console.error("verify password error", err);
  }
}
