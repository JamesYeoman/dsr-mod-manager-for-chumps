import cx from 'classnames';
import React, { ReactNode, useCallback, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { match, __ } from 'ts-pattern';

import './InfoPane.css';
import FilesTab from './info_pane/FilesTab';

const tabsObj = {
  files: 'File List',
  overwrite: 'Overrides',
  overwritten: 'Overridden By',
  meta: 'Metadata',
};

type TabsType = keyof typeof tabsObj;
const tabsKeys = Object.keys(tabsObj) as Array<TabsType>;

export default function InfoPane() {
  const [selectedTab, setSelectedTab] = useState<TabsType>('files');

  const tabClickHandler = useCallback(
    (tab: TabsType) => {
      if (selectedTab === tab) {
        return;
      }

      setSelectedTab(tab);
    },
    [selectedTab],
  );

  return (
    <div className="mod-info">
      <div className="tabs-container">
        {tabsKeys.map((value) => (
          <div
            key={'tab-' + value}
            onClick={() => tabClickHandler(value)}
            className={cx({ 'tab-active': selectedTab === value })}
          >
            {tabsObj[value]}
          </div>
        ))}
      </div>
      <div className="mod-info__content">
        {match<TabsType, ReactNode>(selectedTab)
          .with('files', () => <FilesTab />)
          .with(__, () => "Sorry, but this tab isn't implemented yet")
          .exhaustive()}
      </div>
    </div>
  );
}
