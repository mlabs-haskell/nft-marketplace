/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { faqContent } from 'context/FaqContext';
import styles from './index.module.scss';
import AccordionItem from '../../../molecules/AccordionItem';

const Accordion = () => {
  const history = useHistory();
  const location = useLocation().hash.slice(1);

  const goToSection = (section: string) => history.push(`/help#${section}`);

  return (
    <div className={styles.accordionWrapper}>
      {faqContent.map((item) => (
        <AccordionItem
          key={item.section}
          title={item.title}
          text={item.text}
          isActive={location === item.section}
          onItemClick={goToSection}
          section={item.section}
        />
      ))}
    </div>
  );
};

export default Accordion;
