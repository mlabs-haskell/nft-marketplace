import React from 'react';
import Box from '../../atoms/Box'

interface Props {
    title: string,
    name: string,
    className?: string,
}

function CaptionCard({title, name, className}: Props) {
    return (
        <Box boxClass= {className}>
            <h3>{title}</h3>
            <p> <span>{name}</span></p>
        </Box>
    )
}

export default CaptionCard
