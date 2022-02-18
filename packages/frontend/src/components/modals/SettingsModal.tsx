import type { FolderLocation } from '../../utils/interfaces';

import React from 'react';

import {
  pickGameLocation,
  pickModsLocation,
  settingsCancel,
  settingsSave,
} from '../../redux/slices/settings';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import ModalBtn from '../buttons/ModalBtn';
import FolderInput from '../form/FolderInput';

import './settingsModal.css';

const calcFolderVal = (f: FolderLocation) => (f.new.length > 0 ? f.new : f.old);

const SettingsModal = () => {
  const dispatch = useAppDispatch();
  const gameLocation = useAppSelector((state) => state.settings.gameLocation);
  const modsLocation = useAppSelector((state) => state.settings.modsLocation);

  return (
    <React.Fragment>
      <ModalBtn modalIDPrefix="settings" buttonText="settings" />
      <div id="settings-modal" className="modal">
        <div className="modal-box max-w-[90%] lg:max-h-[90%] h-full flex flex-col justify-between">
          <div>
            <h1 className="text-center text-3xl font-bold p-2">Settings</h1>
            <div className="divider" />
            <FolderInput
              label="Game folder: "
              value={calcFolderVal(gameLocation)}
              onBrowse={() => dispatch(pickGameLocation())}
            />
            <FolderInput
              label="Mods folder: "
              value={calcFolderVal(modsLocation)}
              onBrowse={() => dispatch(pickModsLocation())}
            />
          </div>
          <div className="modal-action">
            <label
              htmlFor="settings-modal"
              className="btn btn-primary modal-button"
              onClick={() => dispatch(settingsSave())}
            >
              Save
            </label>
            <label
              htmlFor="settings-modal"
              className="btn modal-button"
              onClick={() => dispatch(settingsCancel())}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingsModal;
