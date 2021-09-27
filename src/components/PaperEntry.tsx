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

export type PaperEntryProps = {
    record: SearchRecord;
};

export default function PaperEntry({ record }: PaperEntryProps) {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant='h5'>{record.title}</Typography>
                    <Typography variant='subtitle1'>{record.authors.join(', ')}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}