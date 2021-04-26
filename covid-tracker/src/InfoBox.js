import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core"

function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary">{title}</Typography>
                <h2 className="infoBox__cases">{cases}</h2>
                <Typography className="infoBox__deaths" color="textSecondary">{total} Total</Typography>
            </CardContent>
            
        </Card>
    )
}

export default InfoBox
