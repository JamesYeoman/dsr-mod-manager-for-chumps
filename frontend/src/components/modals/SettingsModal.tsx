import React from 'react';
import ModalBtn from '../buttons/ModalBtn';

import './settingsModal.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import FolderInput from '../form/FolderInput';
import { FolderLocation } from '../../utils/interfaces';
import { pickGameLocation, pickModsLocation } from '../../redux/slices/settings';

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
            <div className="divider"></div>
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
            <label htmlFor="settings-modal" className="btn btn-primary modal-button">
              Save
            </label>
            <label htmlFor="settings-modal" className="btn modal-button">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingsModal;
