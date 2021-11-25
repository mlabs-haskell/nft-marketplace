/* eslint-disable */
import {useState} from 'react';
import classNames from 'classnames';
import arrow from '../../../../assets/svg/dropdown.svg';
import Box from '../../atoms/Box';
import styles from './index.module.scss'
import Info from '../../atoms/Info';

interface Props {
    options: string[],
    dropdownClass?: string,
    infoText?: string,
}

function Dropdown({options, dropdownClass, infoText}: Props) {
    const [option, setOption] = useState(false);
    const [activeOption, setActiveOption] = useState(0);
    const [value, setValue] = useState(options[0]);

    const toggle = (id: number) => {
        const val = id === activeOption ? 1 : id;
        setActiveOption(val);
      };
    return (
        <div
            className={classNames([styles.container, dropdownClass])}
        >
            <div className={styles.left}>
                {infoText && <span><Info infoText={infoText}/></span> }
                <p>{value}</p>
            </div>
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
            <img src={arrow} alt="arrow-down" 
                onClick={() => setOption(!option)}/>
        </div>
    )
}

export default Dropdown
