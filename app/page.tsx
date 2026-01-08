import Hero from "@/components/home/Hero";
import Favorites from "@/components/home/Favorites";
import OrderCTA from "@/components/home/OrderCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Favorites />
      <OrderCTA />
    </main>
  );
}
