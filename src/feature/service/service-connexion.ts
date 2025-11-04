
export async function Connexion(email: string, motPasse: string) {
  const response = await fetch("http://192.168.1.41:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, motPasse }),
  });

  return response.json();
}


export const auth = { Connexion };
  