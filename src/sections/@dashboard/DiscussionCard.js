import {Card, Grid, CardContent, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';




export default function DiscussionCard({name, content}){

  return(
    <Grid item xs={12} sm={12} md={6}>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {name}
          </Typography>
          <Typography>
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )

}