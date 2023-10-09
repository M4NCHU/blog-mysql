import Portfolio from "@/components/Portfolio/Portfolio";
import { getAuthSession } from "@/lib/auth";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default async function Home() {
  const session = await getAuthSession();

  return <Portfolio />;
}
