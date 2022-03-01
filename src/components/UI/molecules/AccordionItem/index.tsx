import Markdown from 'markdown-to-jsx';
import styles from './index.module.scss';
import minusIcon from '../../../../assets/svg/minus-icon.svg';
import plusIcon from '../../../../assets/svg/plus-icon.svg';

interface Props {
  title: string;
  text: string;
  isActive: boolean;
  id: string;
  section: string;
  onItemClick: (id: string) => void;
}

const AccordionItem = ({
  title,
  text,
  isActive,
  id,
  onItemClick,
  section,
}: Props) => {
  const onHeaderClick = () => {
    if (isActive) {
      onItemClick('');
    } else {
      onItemClick(id);
    }
  };

  return (
    <section
      className={`${styles.accordionItem} ${
        isActive ? styles.accordionItemActive : ''
      }`}
      id={section}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onHeaderClick}
        className={styles.accordionHeader}
      >
        <span className={styles.button}>
          <img src={isActive ? minusIcon : plusIcon} alt="plus" />
        </span>
        {title}
      </div>
      {isActive && (
        <div className={styles.accordionBody}>
          <Markdown>{text}</Markdown>
        </div>
      )}
    </section>
  );
};

export default AccordionItem;
