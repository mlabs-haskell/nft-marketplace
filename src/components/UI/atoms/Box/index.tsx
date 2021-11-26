import classNames from 'classnames';
import styles from './index.module.scss';

interface BoxProps {
  boxClass?: string | string[];
  children?: any;
  style?: React.CSSProperties;
  onClick?: any;
}

const Box = ({ children, boxClass, onClick, ...props }: BoxProps) => (
  <div
    className={classNames([styles.container, boxClass])}
    {...props}
    onClick={onClick}
    role="presentation"
  >
    {children}
  </div>
);

export default Box;
