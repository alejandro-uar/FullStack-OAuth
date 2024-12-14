export default function Home() {
  return (
    <main>
      <a href={`http://localhost:3000/api/auth/google?redirectUrl=http://localhost:3001/dashboard`}>
        Iniciar sesion con google
      </a>
    </main>
  );
}
