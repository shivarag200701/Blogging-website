import { arrayBufferToHex } from "./helper";

async function passwordHasher(password: string) {
  try {
    // A helper function to encode strings as Uint8Array
    const enc = new TextEncoder();
    //Generate salt
    const salt = crypto.getRandomValues(new Uint8Array(16));
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

    return {
      hashedPassword: arrayBufferToHex(derivedBits),
      salt: arrayBufferToHex(salt.buffer),
    };
  } catch (err) {
    console.error("Failed to hash password", err);
    return null;
  }
}

export default passwordHasher;
