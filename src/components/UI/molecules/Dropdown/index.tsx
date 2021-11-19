import {useState} from 'react';
import classNames from 'classnames';
import arrow from '../../../../assets/svg/dropdown.svg';
import Box from '../../atoms/Box';
import styles from './index.module.scss'

interface Props {
    options: string[],
}

function Dropdown({options}: Props) {
    const [option, setOption] = useState(false);
    const [activeOption, setActiveOption] = useState(0);
    const [value, setValue] = useState(options[0]);

    const toggle = (id: number) => {
        const val = id === activeOption ? 1 : id;
        setActiveOption(val);
      };
    return (
        <div
            onClick={() => setOption(!option)}
            className={classNames([styles.container])}
        >
            <p>{value}</p>
            {option ?
            <Box boxClass={styles.option}>
            <ul onClick={() => setOption(!option)} role="presentation">
                {options.map((option, index) => (
                    <li
                        onClick={() => {
                            toggle(index);
                            setValue(option);
                        }}
                    >{option}</li>
                ))}
            </ul>
            </Box>
            : ''}
            <img src={arrow} alt="arrow-down"/>
        </div>
    )
}

export default Dropdown
