import classNames from 'classnames';
import React from 'react';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props {
    title: string,
    name: string,
    className?: string,
}

function CaptionCard({title, name, className}: Props) {
    return (
        <Box boxClass= {classNames(className, styles.container)}>
            <h4 className={styles.title}>{title}</h4>
            <p> <span>{name}</span></p>
        </Box>
    )
}

export default CaptionCard
