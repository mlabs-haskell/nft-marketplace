import { useState } from 'react';
import classNames from 'classnames';
import arrow from '../../../../assets/svg/dropdown.svg';
import Box from '../../atoms/Box';
import styles from './index.module.scss';
import Info from '../../atoms/Info';

interface Props {
  options: string[];
  dropdownClass?: string;
  infoText?: string;
  handleParentFunction?: (item: string) => void;
}

const Dropdown = ({
  options,
  dropdownClass,
  infoText,
  handleParentFunction = () => {},
}: Props) => {
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
      onClick={() => setOption(!option)}
      role="presentation"
    >
      <div className={styles.left}>
        {infoText && (
          <span>
            <Info infoText={infoText} />
          </span>
        )}
        <p>{value}</p>
      </div>
      {option ? (
        <Box boxClass={styles.option}>
          <ul onClick={() => setOption(!option)} role="presentation">
            {options.map((item, index) => (
              <li
                key={item[index]}
                onClick={() => {
                  toggle(index);
                  setValue(item);
                  handleParentFunction(item);
                }}
                role="presentation"
              >
                {item}
              </li>
            ))}
          </ul>
        </Box>
      ) : (
        ''
      )}
      <img src={arrow} alt="arrow-down" />
    </div>
  );
};

export default Dropdown;
