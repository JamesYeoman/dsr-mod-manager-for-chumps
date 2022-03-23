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
    <div className="flex-vert flex-auto rounded-b-lg">
      <div className="tabs bg-base-300">
        {tabsKeys.map((value) => (
          <div
            key={'tab-' + value}
            onClick={() => tabClickHandler(value)}
            className={cx('infoTab', { 'tab-active': selectedTab === value })}
          >
            {tabsObj[value]}
          </div>
        ))}
      </div>
      <div className="bg-base-100 rounded-b-lg flex-auto">
        {match<TabsType, ReactNode>(selectedTab)
          .with('files', () => <FilesTab />)
          .with(__, () => "Sorry, but this tab isn't implemented yet")
          .exhaustive()}
      </div>
    </div>
  );
}
