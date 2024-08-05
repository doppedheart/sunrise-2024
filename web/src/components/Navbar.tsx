import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export function Navbar(){
    const router = useRouter();
    return <nav className="py-4 px-12 text-2xl bg-white flex justify-between">
      <h3 className="" onClick={()=>router.push("/")}>Task Board</h3>
      <Button size="medium" variant="contained">Create Task</Button>
    </nav>
  }