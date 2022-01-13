import React, { useState } from 'react';
import cx from 'classnames';

const tabs = ['File List', 'Overrides', 'Overridden By', 'Metadata'];

export default function InfoPane() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabClickHandler = (tab: number) => {
    if (selectedTab === tab) {
      return;
    }

    setSelectedTab(tab);
  };

  return (
    <React.Fragment>
      <div className="tabs bg-base-300">
        {tabs.map((value, index) => (
          <div
            key={'tab-' + value}
            onClick={() => tabClickHandler(index)}
            className={cx(
              'tab bg-base-200 tab-xs sm:tab-xs md:tab-sm lg:tab-md xl:tab-lg tab-lifted',
              {
                'tab-active': selectedTab === index,
              },
            )}>
            {value}
          </div>
        ))}
      </div>
      <div className="bg-base-100 rounded-b-lg flex-auto">
        {/* TODO: Display tab content here */}
      </div>
    </React.Fragment>
  );
}
