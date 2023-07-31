import { Inter } from "next/font/google";
import Column from "../components/Column";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Column state={"Planning"} />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}
