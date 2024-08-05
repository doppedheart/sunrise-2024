import { Button } from "@mui/material";

export function Navbar(){
    return <nav className="py-4 px-12 text-2xl bg-white flex justify-between">
      <h3>Task Board</h3>
      <Button size="medium" variant="contained">Create Task</Button>
    </nav>
  }