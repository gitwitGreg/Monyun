import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import {QueryClientProvider, QueryClient } from '@tanstack/react-query'

export default function Home() {

  return (

    <main className="flex min-h-screen flex-col">

        <NavBar />   
         
        <Dashboard/>     

    </main>

  );
}
