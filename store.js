import React from 'react';

const State = {
  hmd: 'BTC',
  index: 0
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function nextHmd(index) {
  let hmdIndex = index;
  let hmds = [{ hmd: 'BTC',
                   index: 0
                 },
                 {
                   hmd: 'DASH',
                   index: 1
                 },
                 { hmd: 'XMR',
                   index: 2
                 },
                 { hmd: 'ZEN',
                   index: 3
                 },
                 { hmd: 'BTC',
                   index: 4
                },
                {  hmd: 'BTC',
                   index: 5
                },
                {  hmd: 'BTC',
                   index: 6
                },
                {  hmd: 'BTC',
                   index: 7
                },
                {  hmd: 'BTC',
                   index: 8
                },
                {  hmd: 'BTC',
                   index: 9
                }
              ];


  if (index < 8) {
    hmdIndex = hmdIndex + 1;
  } else {
    hmdIndex = 0;
  }

  State.hmd = hmds[hmdIndex].hmd;
  State.index = hmds[hmdIndex].index;
  updateComponents();
}
export function prevHmd(index) {
  let hmdIndex = index;
  let hmds = [{ hmd: 'BTC',
                   index: 0
                 },
                 {
                   hmd: 'DASH',
                   index: 1
                 },
                 { hmd: 'XMR',
                   index: 2
                 },
                 { hmd: 'ZEN',
                   index: 3
                 },
                 { hmd: 'BTC',
                   index: 4
                },
                {  hmd: 'BTC',
                   index: 5
                },
                {  hmd: 'BTC',
                   index: 6
                },
                {  hmd: 'BTC',
                   index: 7
                },
                {  hmd: 'BTC',
                   index: 8
                },
                {  hmd: 'BTC',
                   index: 9
                }
              ];


  if (index <= 8) {
    hmdIndex = hmdIndex - 1;
  } else {
    hmdIndex = 0;
  }

  State.hmd = hmds[hmdIndex].hmd;
  State.index = hmds[hmdIndex].index;
  updateComponents();
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      hmd: State.hmd,
      index: State.index
    };

    _listener = () => {
      this.setState({
        hmd: State.hmd,
        index: State.index
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          hmd={this.state.hmd}
          index={this.state.index}
        />
      );
    }
  };
}
