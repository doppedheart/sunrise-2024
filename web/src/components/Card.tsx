import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Task from "@/model/Task";
import { CardHeader } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function OutlinedCard({task,disable,handleCompleteTask}: {readonly task: Task,readonly disable?: boolean,handleCompleteTask: (title: string) => void}) {
  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined" sx={{ minHeight: 200 }}>
        <CardHeader title={`Task ${task.id}`} action={
            disable === undefined ? null : 
            <Button 
                size="small" 
                variant="contained"  
                disabled={disable} 
                onClick={() => {
                    handleCompleteTask(task.title)}
                }>
                <CheckIcon/> Done
            </Button>} 
        />
        <CardContent >
          <Typography sx={{ fontSize: 16 }} fontWeight={"medium"} gutterBottom>
            {task.title}
          </Typography>
          <Typography sx={{ fontSize: 14,color: 'text.secondary' }}  gutterBottom>
            {task.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
