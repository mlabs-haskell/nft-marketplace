import styles from './index.module.scss';
import Markdown from 'markdown-to-jsx';

interface Props {
  title: string
  text: string
  isActive: boolean
  id: string
  onItemClick: (id: string) => void
}

const AccordionItem = ({ title, text, isActive, id, onItemClick }: Props) => {

  const onHeaderClick = () => {
    if (isActive) {
      onItemClick('')
    } else {
      onItemClick(id)
    }
  }

  return (
    <section className={`${styles.accordionItem} ${isActive ? styles.accordionItemActive : ''}`}>
      <div onClick={onHeaderClick}
        className={styles.accordionHeader}>
        {title}
      </div>
      {isActive &&
        <div className={styles.accordionBody}>
          <Markdown>
            {text}
          </Markdown>
        </div>}
    </section>
  );
};

export default AccordionItem;
