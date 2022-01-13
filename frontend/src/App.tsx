import React from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import classNames from 'classnames';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import InfoPane from './components/InfoPane';
import ItemList, { ItemProps } from './components/ItemList';
import PrimaryButton from './components/PrimaryButton';
import { isTauriContext } from './utils/tauri';
import './App.css';

const dummyDebugData: ItemProps[] = [
  { content: 'This is a dummy mod', id: 'mod-0' },
  { content: 'This is another dummy mod', id: 'mod-1' },
  { content: 'This is a third dummy mod', id: 'mod-2' },
  { content: 'This is a fourth, selected dummy mod', id: 'mod-3' },
  { content: 'This is a fifth dummy mod', id: 'mod-4' },
];

interface AppState {
  loadErr?: Error;
  cards: ItemProps[];
  isLoading: boolean;
}

const dummyHandler = (name: string) => () => {
  console.log(`${name} button clicked!`);
};

function reorder<T>(list: Array<T>, sourceIndex: number, destinationIndex: number) {
  const clone = Array.from(list);
  const [removed] = clone.splice(sourceIndex, 1);
  clone.splice(destinationIndex, 0, removed);

  return clone;
}

//TODO: Work out how to turn this into a functional component using hooks

//* At very small window sizes, dragging to the bottom of the list will glitch out.
//* However, in the react storybooks for react-beautiful-dnd, the same glitching doesn't happen...
//? What is different between this code and the code used for the storybooks
//? that would cause this glitching behaviour?
export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loadErr: undefined,
      cards: [],
      isLoading: false,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleMoveCard = this.handleMoveCard.bind(this);
  }

  handleRefresh() {
    // Discards refresh events while a refresh is already happening
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true });

    // Mock data enables working in isolation of tauri, which is useful
    // for when working on getting styling right, or on logic that doesn't require tauri events
    if (!isTauriContext) {
      this.setState({ cards: dummyDebugData, isLoading: false });
      return;
    }

    invoke<ItemProps[]>('get_mod_list')
      .then((data) => this.setState({ cards: data, isLoading: false }))
      .catch((error) => this.setState({ loadErr: error, isLoading: false }));
  }

  handleMoveCard(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const reordered = reorder(
      this.state.cards,
      result.source.index,
      result.destination.index,
    );
    this.setState({ cards: reordered });

    //TODO: sync modlist order with tauri backend
  }

  componentDidMount() {
    if (!isTauriContext) {
      console.info('Tauri context not detected!');
      console.info('Dummy data will be used, which locks off some functionality!');
    }
    this.handleRefresh();
  }

  render() {
    const { isLoading, loadErr, cards } = this.state;

    // See https://stackoverflow.com/a/47377149 for an explaination of this black magic...
    // I don't understand how, but it made the cards in the itemlist stop shrinking to all fit in the
    // itemlist, and instead properly overflow
    return (
      <div className="relative h-screen">
        <div className="grid grid-cols-2 grid-rows-1 grid-flow-col gap-2 m-2 absolute top-0 left-0 right-0 bottom-0">
          <DragDropContext onDragEnd={this.handleMoveCard}>
            <Droppable
              droppableId="modList"
              getContainerForClone={() => (
                <div className="h-10 m-1 leading-10 outline-dashed outline-red-600 outline-4 shrink-0"></div>
              )}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={classNames(
                    'soft-corners bg-base-200 flex-vert justify-start h-full min-h-max overflow-y-auto',
                    {
                      'outline outline-2 outline-green-500': snapshot.isDraggingOver,
                    },
                  )}>
                  {isLoading || loadErr ? (
                    <div>{loadErr ? `Error: ${loadErr.message}` : 'Loading...'}</div>
                  ) : (
                    <ItemList mods={cards} />
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex-vert gap-2">
            <div className="flex-vert flex-auto rounded-b-lg">
              <InfoPane />
            </div>
            <div className="bg-base-300 grow-0 shrink-0 min-h-max grid grid-flow-row grid-cols-4 gap-2">
              <PrimaryButton text="settings" onClickHandler={dummyHandler('Settings')} />
              <PrimaryButton text="refresh" onClickHandler={this.handleRefresh} />
              <PrimaryButton text="inject" onClickHandler={dummyHandler('Inject')} />
              <PrimaryButton text="play" onClickHandler={dummyHandler('Play')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
