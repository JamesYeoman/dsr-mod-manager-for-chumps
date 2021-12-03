import React, { useEffect, useState } from 'react';
import ItemCard, { ItemCardProps } from './ItemCard';
import '../styles/components/ItemList.scss';
// import { invoke } from '@tauri-apps/api/tauri';

export default function ItemList() {
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadErr, setLoadErr] = useState<Error>();
  const [cards, setCards] = useState<ItemCardProps[]>([]);

  //todo: set up event listener for refreshing

  useEffect(() => {
    // Essentially a lock mechanism so multiple clicks on refresh
    // get discarded and hopefully prevent breaking
    if (!shouldRefresh) {
      return;
    }
    setShouldRefresh(false);

    if (loading) {
      // Abort in order to avoid potential race condition if refresh button is spammed.
      return;
    }
    setLoading(true);

    // invoke<ItemCardProps[]>('get_mod_list')
    //   .then(setCards)
    //   .catch(setLoadErr)
    //   .finally(() => setLoading(false));
  }, [shouldRefresh]);

  return (
    <div className="item-list">
      {loading ? (
        <div>Loading...</div>
      ) : loadErr ? (
        <div>Error: {loadErr.message}</div>
      ) : (
        cards.map((cardProps: ItemCardProps, index: number) => (
          <ItemCard {...cardProps} key={`card-${index + 1}`} />
        ))
      )}
    </div>
  );
}
