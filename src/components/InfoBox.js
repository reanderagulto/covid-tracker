import React from 'react'
import { 
    Card,
    CardContent, 
    Typography
} from '@material-ui/core'

function InfoBox( { title, cases, total } ) {
  return (
    <Card className='infoBox'>
        <CardContent>
            {/* Title */}
            <Typography className='infoBox_title' color="textSecondary">
                { title }
            </Typography>
            <h2 className='infoBox__cases'>{ cases }</h2>
            <Typography className='infoBox_total'  color="textSecondary">
                { total } Total
            </Typography>
            {/* No of Cases */}
            {/* Total */}
        </CardContent>
    </Card>
  )
}

export default InfoBox