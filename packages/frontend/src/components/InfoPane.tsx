import type { ReactNode } from 'react';

import React, { useCallback, useState } from 'react';
import { match, __ } from 'ts-pattern';

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

  const tabProps = useCallback(
    (value: TabsType) => ({
      onClick: () => tabClickHandler(value),
      className: selectedTab === value ? 'tab-active' : undefined,
    }),
    [tabClickHandler, selectedTab],
  );

  return (
    <div className="mod-info">
      <div className="mod-info__tabs-container">
        {tabsKeys.map((value) => (
          <div key={'tab-' + value} {...tabProps(value)}>
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
