import type { FolderLocation } from '../../utils/interfaces';

import React, { useState, useCallback } from 'react';

import {
  pickGameLocation,
  pickModsLocation,
  settingsCancel,
  settingsSave,
} from '../../redux/slices/settings';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import FolderInput from '../form/FolderInput';
import PrimaryButton from '../PrimaryButton';
import BaseModal from './components/BaseModal';

const calcFolderVal = (f: FolderLocation) => (f.new.length > 0 ? f.new : f.old);

const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const gameLocation = useAppSelector((state) => state.settings.gameLocation);
  const modsLocation = useAppSelector((state) => state.settings.modsLocation);

  const onAccept = useCallback(() => {
    setIsOpen(false);
    dispatch(settingsSave());
  }, [setIsOpen, dispatch, settingsSave]);

  const onReject = useCallback(() => {
    setIsOpen(false);
    dispatch(settingsCancel());
  }, [setIsOpen, dispatch, settingsCancel]);

  const actionProps = { onAccept, onReject };

  const title = 'Settings';

  return (
    <React.Fragment>
      <PrimaryButton text="settings" onClickHandler={() => setIsOpen(true)} />
      {/* <BaseModal isOpen={isOpen} title="Settings" actionProps={{ onAccept, onReject }}> */}
      <BaseModal {...{ isOpen, title, actionProps }}>
        <FolderInput
          label="Game folder"
          value={calcFolderVal(gameLocation)}
          onBrowse={() => dispatch(pickGameLocation())}
        />
        <FolderInput
          label="Mods folder"
          value={calcFolderVal(modsLocation)}
          onBrowse={() => dispatch(pickModsLocation())}
        />
      </BaseModal>
    </React.Fragment>
  );
};

export default SettingsModal;
