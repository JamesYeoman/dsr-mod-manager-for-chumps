import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { invoke } from '@tauri-apps/api/tauri';
import { isTauriContext } from './utils/tauri';

const dummyDebugData: ItemCardProps[] = [
  { content: 'This is a dummy mod' },
  { content: 'This is another dummy mod' },
  { content: 'This is a third dummy mod' },
  { content: 'This is a fourth, selected dummy mod', selected: true },
  { content: 'This is a fifth dummy mod' },
];

export interface ItemCardProps {
  content: string;
  selected?: boolean;
}

export default function ItemList() {
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadErr, setLoadErr] = useState<Error>();
  const [cards, setCards] = useState<ItemCardProps[]>([]);

  //todo: set up event listener for refreshing

  useEffect(() => {
    // Prevents refresh race condition
    if (!shouldRefresh) {
      return;
    }
    setShouldRefresh(false);

    // Discards refresh events while a refresh is already happening
    if (loading) {
      return;
    }
    setLoading(true);

    // Mock data enables working in isolation of tauri, which is useful
    // for when working on getting styling right, or on logic that doesn't require tauri events
    if (!isTauriContext) {
      setCards(dummyDebugData);
      setLoading(false);
      return;
    }

    invoke<ItemCardProps[]>('get_mod_list')
      .then(setCards)
      .catch(setLoadErr)
      .finally(() => setLoading(false));
  }, [shouldRefresh]);

  return (
    // Using a fragment so that React can correctly handle updates when loading and loaderr change
    <React.Fragment>
      {loading || loadErr ? (
        <div>{loadErr ? `Error: ${loadErr.message}` : 'Loading...'}</div>
      ) : (
        cards.map(({ content, selected }: ItemCardProps, index: number) => (
          <div
            key={`mod-card-${index + 1}`}
            className={cx(
              'soft-corners bg-base-100 m-1 h-10 text-center shrink-0 leading-10 text-xl',
              {
                'bg-mod-card-selected text-black font-bold': selected,
              },
            )}>
            {content}
          </div>
        ))
      )}
    </React.Fragment>
  );
}
