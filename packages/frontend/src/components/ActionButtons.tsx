import React from 'react';

import { refreshModList } from '../redux/slices/mods';
import { useAppDispatch } from '../utils/hooks';
import SettingsModal from './modals/SettingsModal';
import PrimaryButton from './PrimaryButton';

const dummyHandler = (name: string) => () => {
  console.log(`${name} button clicked!`);
};

const ActionButtons = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="action-buttons__container">
      <div className="action-buttons__grid">
        <SettingsModal />
        <PrimaryButton text="refresh" onClickHandler={() => dispatch(refreshModList())} />
        <PrimaryButton text="inject" onClickHandler={dummyHandler('Inject')} />
        <PrimaryButton text="play" onClickHandler={dummyHandler('Play')} />
      </div>
    </div>
  );
};

export default ActionButtons;
