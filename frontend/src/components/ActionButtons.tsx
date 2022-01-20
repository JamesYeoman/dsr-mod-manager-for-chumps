import { refreshModList } from '../redux/slices/mods';
import { useAppDispatch } from '../utils/hooks';
import PrimaryButton from './PrimaryButton';

const dummyHandler = (name: string) => () => {
  console.log(`${name} button clicked!`);
};

const ActionButtons = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-base-300 grow-0 shrink-0 min-h-max grid grid-flow-row grid-cols-4 gap-2">
      <PrimaryButton text="settings" onClickHandler={dummyHandler('Settings')} />
      <PrimaryButton text="refresh" onClickHandler={() => dispatch(refreshModList())} />
      <PrimaryButton text="inject" onClickHandler={dummyHandler('Inject')} />
      <PrimaryButton text="play" onClickHandler={dummyHandler('Play')} />
    </div>
  );
};

export default ActionButtons;
