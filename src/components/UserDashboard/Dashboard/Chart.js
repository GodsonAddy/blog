import React from 'react';
import { useTheme } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import {Box, Typography, Paper} from '@mui/material';
import '../index.css';

// Generate Sales Data


let body = [
  {
    'Month': 'Jan',
    'amount': 8000
  },
  {
    'Month': 'Feb',
    'amount': 1000
  },
  {
    'Month': 'Mar',
    'amount': 7000
  },
  {
    'Month': 'Apr',
    'amount': 5000
  },
  {
    'Month': 'May',
    'amount': 20000
  },
  {
    'Month': 'Jun',
    'amount': 10000
  },
  {
    'Month': 'Jul',
    'amount': 3000
  }
]



const Chart = () => {
  const theme = useTheme();

  return (
    <Box component={Paper} variant='elevated' className='container' sx={{backgroundColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'tertiary.main',
      opacity: [0.9, 0.8, 0.7],
    }}} >
      <Typography color='inherit'>Site Visitors</Typography>
  
      <ResponsiveContainer width="99%" aspect={3}>
        <BarChart
          data={body}
          
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
        }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Month"
            
          />
          <YAxis
            
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.h6,
              }}
            >
              Views
            </Label>
          </YAxis>
          <Tooltip />
          
          <Bar
            
            dataKey="amount"
            fill="#413ea0"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
      </Box>
    
  );
}


export default Chart;