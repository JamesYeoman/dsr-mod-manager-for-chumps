import cx from 'classnames';
import React, { useCallback, useState } from 'react';

import './InfoPane.css';

const tabs = ['File List', 'Overrides', 'Overridden By', 'Metadata'];

export default function InfoPane() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabClickHandler = useCallback(
    (tab: number) => {
      if (selectedTab === tab) {
        return;
      }

      setSelectedTab(tab);
    },
    [selectedTab],
  );

  return (
    <div className="flex-vert flex-auto rounded-b-lg">
      <div className="tabs bg-base-300">
        {tabs.map((value, index) => (
          <div
            key={'tab-' + value.toLowerCase().replace(' ', '-')}
            onClick={() => tabClickHandler(index)}
            className={cx('infoTab', { 'tab-active': selectedTab === index })}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="bg-base-100 rounded-b-lg flex-auto">
        {/* TODO: Display tab content here */}
      </div>
    </div>
  );
}
