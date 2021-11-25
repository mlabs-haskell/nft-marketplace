import classNames from 'classnames';
import styles from './index.module.scss';

interface Props {
  title: string;
  active?: boolean;
  onClick?: (e: any) => void;
}

const Tab = ({ title, active, onClick }: Props) => (
  <p
    onClick={onClick}
    role="presentation"
    className={classNames([
      `${active ? styles['active-tab'] : styles.inActive}`,
    ])}
  >
    {title}
  </p>
);

export default Tab;
