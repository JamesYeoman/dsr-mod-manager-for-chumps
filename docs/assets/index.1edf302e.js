var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { r as react, j as jsxs, R as React, a as jsx, c as classNames, P as PublicDraggable, i, D as DragDropContext, C as ConnectedDroppable, b as ReactDOM } from "./vendor.bbaf6c22.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
const tabs = ["File List", "Overrides", "Overridden By", "Metadata"];
function InfoPane() {
  const [selectedTab, setSelectedTab] = react.exports.useState(0);
  const tabClickHandler = (tab) => {
    if (selectedTab === tab) {
      return;
    }
    setSelectedTab(tab);
  };
  return /* @__PURE__ */ jsxs(React.Fragment, {
    children: [/* @__PURE__ */ jsx("div", {
      className: "tabs bg-base-300",
      children: tabs.map((value, index2) => /* @__PURE__ */ jsx("div", {
        onClick: () => tabClickHandler(index2),
        className: classNames("tab bg-base-200 tab-xs sm:tab-xs md:tab-sm lg:tab-md xl:tab-lg tab-lifted", {
          "tab-active": selectedTab === index2
        }),
        children: value
      }, "tab-" + value))
    }), /* @__PURE__ */ jsx("div", {
      className: "bg-base-100 rounded-b-lg flex-auto"
    })]
  });
}
function ItemCard({
  content,
  id,
  selected,
  index: index2
}) {
  const dispatch = react.exports.useContext(SelectDispatch);
  return /* @__PURE__ */ jsx(PublicDraggable, {
    draggableId: id,
    index: index2,
    children: (provided) => /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues(__spreadValues({
      ref: provided.innerRef
    }, provided.draggableProps), provided.dragHandleProps), {
      id,
      tabIndex: 1,
      onDoubleClick: () => dispatch({
        type: "selected",
        id
      }),
      className: classNames("soft-corners bg-base-100 m-1 h-10 shrink-0 leading-10 outline-none select-none card-text", {
        "bg-mod-card-selected text-black": selected
      }),
      children: content
    }))
  }, id);
}
function reducer(state, action) {
  if (action.type !== "selected") {
    throw new Error("Invalid action type!");
  }
  return {
    id: action.id
  };
}
const dummyDispatch = (value) => {
};
const SelectDispatch = React.createContext(dummyDispatch);
function ItemList({
  mods
}) {
  const [selected, dispatch] = react.exports.useReducer(reducer, {
    id: ""
  });
  return /* @__PURE__ */ jsx(SelectDispatch.Provider, {
    value: dispatch,
    children: mods.map(({
      id,
      content
    }, index2) => /* @__PURE__ */ jsx(ItemCard, {
      content,
      id,
      selected: selected.id === id,
      index: index2
    }, id))
  });
}
const PrimaryButton = ({
  text,
  onClickHandler
}) => /* @__PURE__ */ jsx("button", {
  className: "btn btn-primary",
  tabIndex: 0,
  onClick: onClickHandler,
  children: text
});
const isTauriContext = window.rpc && "notify" in window.rpc;
var App$1 = "";
const dummyDebugData = [{
  content: "This is a dummy mod",
  id: "mod-0"
}, {
  content: "This is another dummy mod",
  id: "mod-1"
}, {
  content: "This is a third dummy mod",
  id: "mod-2"
}, {
  content: "This is a fourth, selected dummy mod",
  id: "mod-3"
}, {
  content: "This is a fifth dummy mod",
  id: "mod-4"
}];
const dummyHandler = (name) => () => {
  console.log(`${name} button clicked!`);
};
function reorder(list, sourceIndex, destinationIndex) {
  const clone = Array.from(list);
  const [removed] = clone.splice(sourceIndex, 1);
  clone.splice(destinationIndex, 0, removed);
  return clone;
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadErr: void 0,
      cards: [],
      isLoading: false
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleMoveCard = this.handleMoveCard.bind(this);
  }
  handleRefresh() {
    if (this.state.isLoading) {
      return;
    }
    this.setState({
      isLoading: true
    });
    if (!isTauriContext) {
      this.setState({
        cards: dummyDebugData,
        isLoading: false
      });
      return;
    }
    i("get_mod_list").then((data) => this.setState({
      cards: data,
      isLoading: false
    })).catch((error) => this.setState({
      loadErr: error,
      isLoading: false
    }));
  }
  handleMoveCard(result) {
    if (!result.destination) {
      return;
    }
    const reordered = reorder(this.state.cards, result.source.index, result.destination.index);
    this.setState({
      cards: reordered
    });
  }
  componentDidMount() {
    if (!isTauriContext) {
      console.info("Tauri context not detected!");
      console.info("Dummy data will be used, which locks off some functionality!");
    }
    this.handleRefresh();
  }
  render() {
    const {
      isLoading,
      loadErr,
      cards
    } = this.state;
    return /* @__PURE__ */ jsx("div", {
      className: "relative h-screen",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-2 grid-rows-1 grid-flow-col gap-2 m-2 absolute top-0 left-0 right-0 bottom-0",
        children: [/* @__PURE__ */ jsx(DragDropContext, {
          onDragEnd: this.handleMoveCard,
          children: /* @__PURE__ */ jsx(ConnectedDroppable, {
            droppableId: "modList",
            getContainerForClone: () => /* @__PURE__ */ jsx("div", {
              className: "h-10 m-1 leading-10 outline-dashed outline-red-600 outline-4 shrink-0"
            }),
            children: (provided, snapshot) => /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({}, provided.droppableProps), {
              ref: provided.innerRef,
              className: classNames("soft-corners bg-base-200 flex-vert justify-start h-full min-h-max overflow-y-auto", {
                "outline outline-2 outline-green-500": snapshot.isDraggingOver
              }),
              children: isLoading || loadErr ? /* @__PURE__ */ jsx("div", {
                children: loadErr ? `Error: ${loadErr.message}` : "Loading..."
              }) : /* @__PURE__ */ jsx(ItemList, {
                mods: cards
              })
            }))
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex-vert gap-2",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex-vert flex-auto rounded-b-lg",
            children: /* @__PURE__ */ jsx(InfoPane, {})
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-base-300 grow-0 shrink-0 min-h-max grid grid-flow-row grid-cols-4 gap-2",
            children: [/* @__PURE__ */ jsx(PrimaryButton, {
              text: "settings",
              onClickHandler: dummyHandler("Settings")
            }), /* @__PURE__ */ jsx(PrimaryButton, {
              text: "refresh",
              onClickHandler: this.handleRefresh
            }), /* @__PURE__ */ jsx(PrimaryButton, {
              text: "inject",
              onClickHandler: dummyHandler("Inject")
            }), /* @__PURE__ */ jsx(PrimaryButton, {
              text: "play",
              onClickHandler: dummyHandler("Play")
            })]
          })]
        })]
      })
    });
  }
}
var index = "";
ReactDOM.render(/* @__PURE__ */ jsx(React.StrictMode, {
  children: /* @__PURE__ */ jsx(App, {})
}), document.getElementById("root"));
