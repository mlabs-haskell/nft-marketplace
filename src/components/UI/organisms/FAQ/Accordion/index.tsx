/* eslint-disable */
import { useState } from 'react';
import styles from './index.module.scss';
import AccordionItem from '../../../molecules/AccordionItem'

const mock = [{
  title: 'How do I find my funds on Polygon?',
  text: `
Polygon is a blockchain that provides scalable, secure and instant transactions with Ethereum currencies like ETH, USDC and DAI. Currencies must first be "bridged" from Ethereum's mainnet to Polygon. Think of Polygon as a sibling to Ethereum, the currencies are similar, but the two blockchains have slight differences.

### This guide explains how to navigate the Polygon blockchain, including:

+ How to see your funds on Polygon
+ How to use Polygonscan to see your transaction history on Polygon
+ How to add Polygon ETH on MetaMask 

![image info](https://picsum.photos/500/300)
  `,
  id: "1",
},{
  title: 'How do I find my funds on Polygon? 2',
  text: `Polygon is a blockchain that provides scalable, secure and instant transactions with Ethereum currencies like ETH, USDC and DAI. Currencies must first be "bridged" from Ethereum's mainnet to Polygon. Think of Polygon as a sibling to Ethereum, the currencies are similar, but the two blockchains have slight differences.`,
  id: "2",
},{
  title: 'How do I find my funds on Polygon? 3',
  text: `Polygon is a blockchain that provides scalable, secure and instant transactions with Ethereum currencies like ETH, USDC and DAI. Currencies must first be "bridged" from Ethereum's mainnet to Polygon. Think of Polygon as a sibling to Ethereum, the currencies are similar, but the two blockchains have slight differences.`,
  id: "3",
}]


const Accordion = () => {
  const [currentItemId, setCurrentItemId] = useState(mock[0]?.id)

  return (
    <div className={styles.accordionWrapper}>
      {Boolean(mock?.length) && mock.map(item => (
        <AccordionItem
          title={item.title}
          text={item.text}
          isActive={currentItemId === item.id}
          id={item.id}
          onItemClick={setCurrentItemId}
        />
      ))}
    </div>
  )
}

export default Accordion;