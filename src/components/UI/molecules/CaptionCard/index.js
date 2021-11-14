import React from 'react';
import Box from '../../atoms/Box'
import styles from './index.module.scss'

function CaptionCard({title, name, className}) {
    return (
        <Box boxClass= {styles.card}>
            <h3>{title}</h3>
            <p> <span>{name}</span></p>
        </Box>
    )
}

export default CaptionCard
