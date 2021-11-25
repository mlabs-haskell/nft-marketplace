/* eslint-disable @typescript-eslint/restrict-template-expressions */
import classNames from 'classnames';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props {
  title: string;
  name: string;
  className?: string;
  imagePath?: string | undefined;
}

const CaptionCard = ({ title, name, imagePath, className }: Props) => (
  <Box
    boxClass={classNames(className, styles.container)}
    style={{ backgroundImage: `url(${imagePath})` }}
  >
    <h4 className={styles.title}>{title}</h4>
    <p>
      <span>{name}</span>
    </p>
  </Box>
);

export default CaptionCard;
