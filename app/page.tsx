import NavBar from "./components/NavBar";
import {QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function Home() {

  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col">

        <QueryClientProvider client={queryClient}>
          <NavBar />         
        </QueryClientProvider>

    </main>
  );
}
