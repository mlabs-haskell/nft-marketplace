/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { faqContent } from 'context/FaqContext';
import styles from './index.module.scss';
import AccordionItem from '../../../molecules/AccordionItem';

const Accordion = () => {
  const location = useLocation().hash.slice(1);
  const [currentItemId, setCurrentItemId] = useState(faqContent[0]?.id);

  return (
    <div className={styles.accordionWrapper}>
      {Boolean(faqContent?.length) &&
        faqContent.map((item) => (
          <AccordionItem
            key={uuidv4()}
            title={item.title}
            text={item.text}
            isActive={currentItemId === item.id || location === item.section}
            id={item.id}
            onItemClick={setCurrentItemId}
            section={item.section}
          />
        ))}
    </div>
  );
};

export default Accordion;
