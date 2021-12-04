/* eslint-disable @typescript-eslint/restrict-template-expressions */
import classNames from 'classnames';
import { ArtistsType } from 'types/artists';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props extends ArtistsType.Artist {
  className?: string;
}

const CaptionCard = ({ name, className }: Props) => (
  <Box
    boxClass={classNames(styles.container, className)}
    style={{ backgroundImage: `url(https://picsum.photos/500/500)` }}
  >
    <h4 className={styles.title}>{name}</h4>
  </Box>
);

export default CaptionCard;
