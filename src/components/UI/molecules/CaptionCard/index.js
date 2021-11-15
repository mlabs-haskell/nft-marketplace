import React from 'react';
import Box from '../../atoms/Box'

function CaptionCard({title, name, className}) {
    return (
        <Box boxClass= {className}>
            <h3>{title}</h3>
            <p> <span>{name}</span></p>
        </Box>
    )
}

export default CaptionCard
