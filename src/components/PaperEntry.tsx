import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

import { SearchRecord } from 'src/types/common';

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        backgroundColor: '#F5F5F5',
    },
    cardTitle: {
        marginBottom: theme.spacing(1),
    },

    // Type indicator
    confPaper: {
        height: 32,
        width: 32,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#006186',
        marginRight: theme.spacing(2),
    },
    unknownPaper: {
        height: 32,
        width: 32,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#222222',
        marginRight: theme.spacing(2),
    },
}));

export type PaperEntryProps = {
    record: SearchRecord;
};

export default function PaperEntry({ record }: PaperEntryProps) {
    const classes = useStyles();
    const judgeType = () => {
        switch (record.type) {
            case 'Conference and Workshop Papers':
                return classes.confPaper;
                break;
            default:

        }
    };

    const handleCardClick = () => {
        window.open(record.url);
    };
    return (
        <Card elevation={3} className={classes.card}>
            <CardActionArea onClick={handleCardClick}>
                <CardContent>
                    <Grid container justifyContent='flex-start' alignItems='center'>
                        <Grid item>
                            <div className={judgeType()} />
                        </Grid>
                        <Grid item>
                            <Typography className={classes.cardTitle} variant='h5'>{record.title}</Typography>
                            <Typography variant='body1'>{record.authors.join(', ')}</Typography>
                            <Typography variant='body1'>{record.venue + ', ' + record.year}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}