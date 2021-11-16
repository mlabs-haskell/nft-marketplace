import React from 'react';
import ItemDetails from '../../components/UI/molecules/ItemDetails';
import ItemPhotoCard from '../../components/UI/molecules/ItemPhotoCard';

const ItemPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <ItemPhotoCard imgUrl="" likeCount="167" />
      <ItemDetails
        title="SPIRIT SEED - SYNTHETIC"
        subTitle="Not for sale.100 editions"
        tessellationClass="N/A"
        seedValue="Synthetic"
        description="Syntertic Seeds cannot be bought on the primary marktet and can only be earned or gifted. Synthetic Seeds do not belong to any Tessellation Class, cannot be incubated and are not eligible to be ..."
        creatorValue="10% royalties"
        ownersData="Defacer#od"
        bidsData=""
        historyData=""
      />
    </div>
  );
};

export default ItemPage;
