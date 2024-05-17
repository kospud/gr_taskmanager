import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

interface progressProps {
  doneTasks: number
  sumTasks: number
}

export default function LinearWithValueLabel({ doneTasks, sumTasks }: progressProps) {


  const progressValue = Math.round(doneTasks / sumTasks * 100);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {

    setProgress(progressValue)

  }, [])

  return (
    <Box sx={{ width: '50%' }}>
      <LinearProgressWithLabel color='inherit' value={progress} sx={{ height: '50px', fontSize: '24', borderRadius: '10px' }} />
    </Box>
  );
}