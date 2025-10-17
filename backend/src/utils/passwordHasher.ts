async function passwordHasher(password: string) {
  try {
    const array = new TextEncoder().encode(password);
    const arrayBuffer = await crypto.subtle.digest(
      {
        name: "SHA-256",
      },
      array
    );
    const uint8Array = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder("utf-8");
    const hashedPassword = decoder.decode(uint8Array);

    return hashedPassword;
  } catch (err) {
    console.error("Failed to hash password");
  }
}

export default passwordHasher;
