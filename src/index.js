import "./index.css";
import * as serviceWorker from "./serviceWorker";

import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

import Chart from "chart.js";

export function testTest(content) {
  document.getElementById('test').innerHTML = content;
}

class App extends React.Component {
  eventLogger = (e : MouseEvent, data : Object) => {
    //console.log("Event: ", e);
    //console.log("Data: ", data);
  };

  constructor(props) {
    super(props);
    this.state = {
      testValue: 0,
      getForms: this.getForms,
      mountGraph: this.mountGraph,
      graphFunc: this.graphFunc,
      isAdmin: false,
      changeAdmin: this.changeAdmin,
      str: "false",
      setLocalStorage: this.setLocalStorage,
      changeState: this.changeState,
      mountFunc: this.mountFunc,
      handleDrag: this.handleDrag,
      settingsOpen: false,
      testData: [
        {
          key: 0,
          settingsOpen: false,
          id: "wqedfas",
          type: "bar",
          data: [
            1,
            2,
            3,
            4,
            5,
            6
          ],
          labels: [
            1,
            2,
            3,
            4,
            5,
            6
          ],
          pos: {
            x: 0,
            y: 0
          },
          test: [
            {
              test: 'test',
              test2: [
                1, 2, 3, 4
              ],
              test3: {
                test: 'cool'
              }
            }
          ]

        }, {
          key: 1,
          settingsOpen: false,
          id: "asdadf",
          type: "line",
          data: [
            6,
            5,
            4,
            3,
            2,
            1
          ],
          labels: [
            6,
            5,
            4,
            3,
            2,
            1
          ],
          pos: {
            x: 0,
            y: 0
          }
        }
      ],
      callBackendAPI: this.callBackendAPI,
      senderApi: this.senderApi,
      addDataSet: this.addDataSet,
      labelInputMap: this.labelInputMap,
      nameGen: this.nameGen
    };
  }

  handleDelete = async (e, ui) => {
    let key = e.target.parentNode.accessKey;

    let tempMaster = [...this.state.testData];
    let int = parseInt(key, 10);
    let index = tempMaster.findIndex(x => {
      //console.log(x.key);

      return x.key === int;
    });
    console.log(index);

    console.log(e.target.parentNode.accessKey);
    tempMaster.splice(index, 1);
    console.log(tempMaster);
    let data = tempMaster;
    await this.senderApi(data);
    //localStorage.setItem("graphPos", JSON.stringify(data));
    this.mountFunc();
  };

  handleDrag = async (e, ui) => {
    let key = ui.node.accessKey;

    let tempMaster = [...this.state.testData];

    let int = parseInt(key, 10);
    let index = tempMaster.findIndex(x => {
      return x.key === int;
    });

    const {x, y} = this.state.testData[index].pos;

    tempMaster[index].pos = {
      x: x + ui.deltaX,
      y: y + ui.deltaY
    };

    await this.setState({testData: tempMaster});

    console.log(this.state.testData);
    console.log(this.state.testData[0].dataSets);

    console.log(JSON.stringify(this.state.testData[0].dataSets));

    if (localStorage.getItem("graphPos") === null) {
      let data = [
        {
          x: 0,
          y: 0
        }, {
          x: 58,
          y: 0
        }
      ];
      await this.senderApi(data);
      //localStorage.setItem("graphPos", JSON.stringify(data));
    } else {
      let data = this.state.testData;
      await this.senderApi(data);
      //localStorage.setItem("graphPos", JSON.stringify(data));
    }
  };

  setLocalStorage = async () => {
    if (localStorage.getItem("graphPos") === null) {
      let data = [
        {
          key: 0,
          settingsOpen: false,
          id: "wqedfas",
          type: "bar",
          data: [
            [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          ],
          labels: [
            1,
            2,
            3,
            4,
            5,
            6
          ],
          pos: {
            x: 0,
            y: 0
          },
          test: [
            {
              test: 'test',
              test2: [
                1, 2, 3, 4
              ],
              test3: {
                test: 'cool'
              }
            }
          ]
        }, {
          key: 1,
          settingsOpen: false,
          id: "asdadf",
          type: "line",
          data: [
            [
              6,
              5,
              4,
              3,
              2,
              1
            ]
          ],
          labels: [
            6,
            5,
            4,
            3,
            2,
            1
          ],
          pos: {
            x: 0,
            y: 0
          }
        }
      ];
      await this.setState({testData: data});
      //await this.senderApi(data);
      localStorage.setItem("graphPos", JSON.stringify(data));
    } else {
      let data = [
        {
          key: 0,
          settingsOpen: false,
          id: "wqedfas",
          type: "bar",
          data: [
            [
              1,
              2,
              3,
              4,
              5,
              6
            ]
          ],
          labels: [
            1,
            2,
            3,
            4,
            5,
            6
          ],
          pos: {
            x: 0,
            y: 0
          },
          label: ['Test2'],
          graphType: [
            'line', 'bar'
          ],
          title: this.nameGen()
        }, {
          key: 1,
          settingsOpen: false,
          id: "asdadf",
          type: "line",
          data: [
            [
              6,
              5,
              4,
              3,
              2,
              1
            ]
          ],
          labels: [
            6,
            5,
            4,
            3,
            2,
            1
          ],
          pos: {
            x: 0,
            y: 0
          },
          label: ['Test 2'],
          graphType: [
            'bar', 'line'
          ],
          title: this.nameGen()
        }
      ];
      //await this.senderApi(data);
      await this.setState({testData: data});
      localStorage.setItem("graphPos", JSON.stringify(data));
    }
  };
  mountGraph = () => {
    let emptySet = [...this.state.testData];
    console.log(emptySet);
    emptySet.map(data => {
      console.log(data);
      console.log(data.dataSets);
      let datasets = [];
      let colors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ]
      let bgColors = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ]
      //let dataSets = [...data.dataSets];
      var ctx = document.getElementById(data.id);
      //console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        let fDS = {
          label: data.label[i],
          data: data.data[i],
          type: data.graphType[i],
          backgroundColor: [
            colors[i],
            colors[i],
            colors[i],
            colors[i],
            colors[i],
            colors[i]
          ],
          borderColor: [
            bgColors[i],
            bgColors[i],
            bgColors[i],
            bgColors[i],
            bgColors[i],
            bgColors[i]
          ],
          borderWidth: 1
        }
        datasets.push(fDS);
      }
      console.log(datasets);
      var myChart = new Chart(ctx, {
        type: data.type,
        data: {
          labels: data.labels,
          datasets: datasets
          //datasets: dataSets
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
  };
  //TODO: Find a better way of doing this
  graphFunc = async () => {
    window.setTimeout(() => {
      this.mountGraph(1);
    }, 500);
  };
  changeState = async () => {
    if (localStorage.getItem("graphPos") === null) {
      //console.log("beans");
    } else {
      // let obj2 = await this.callBackendAPI();
      //let data = JSON.parse(localStorage.getItem("graphPos"));
      let data = await this.callBackendAPI();
      await this.setState({testData: data, hasData: true});
      //console.log("tdMain: ", this.state.testData);
      return true;
    }
  };

  mountFunc = async () => {
    await this.setState({renderBounds: false});
    //console.log(JSON.parse(localStorage.getItem("graphPos"))[1]);
    //await this.callBackendAPI();
    await this.changeState();
    if (this.state.hasData) {
      this.setState({renderBounds: true});
      this.graphFunc();
    }
  };

  componentDidMount() {
    // this.callBackendAPI();
    this.mountFunc();
  }

  getValue = value => {
    return value;
  };

  changeAdmin = async () => {
    await this.setState({
      isAdmin: !this.state.isAdmin
    });
    let asd = toString(this.state.isAdmin);
    await this.setState({str: asd});
    if (localStorage.getItem("graphPos") === null) {
      //console.log("beans");
    } else {
      let data = JSON.parse(localStorage.getItem("graphPos"));
      this.setState({pos0: data["0"], pos1: data["1"]});
    }
  };

  addGraph = async () => {
    let tempMaster = [...this.state.testData];
    let num = Math.floor(Math.random() * 2147483646 + 1);
    let tempKey = tempMaster[tempMaster.length - 1].key + 1;
    console.log(tempKey);
    tempMaster.push({
      key: tempKey,
      settingsOpen: false,
      id: num,
      type: "bar",
      data: [
        [
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1),
          Math.floor(Math.random() * 1000 + 1)
        ]
      ],
      labels: [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      pos: {
        x: 0,
        y: 0
      },
      label: [this.nameGen()],
      title: this.nameGen()
    });
    let data = tempMaster;
    await this.senderApi(data);
    //localStorage.setItem("graphPos", JSON.stringify(data));

    this.mountFunc();
  };

  removegraph = async () => {
    let data = JSON.parse(localStorage.getItem("graphPos"));
    data.pop();
    //console.log(data);
    await this.senderApi(data);
    //localStorage.setItem("graphPos", JSON.stringify(data));
    this.mountFunc();
  };

  handleSettings = value => {
    let key = value;

    let tempMaster = [...this.state.testData];
    let int = parseInt(key, 10);
    let index = tempMaster.findIndex(x => {
      //console.log(x.key);

      return x.key === int;
    });
    console.log(index);
    console.log(tempMaster[index].settingsOpen);
    tempMaster[index].settingsOpen = !tempMaster[index].settingsOpen;

    this.setState({testData: tempMaster});
  };

  handleGraphChange = async (event, value) => {
    event.preventDefault();
    let key = value;
    let tempMaster = [...this.state.testData];
    let int = parseInt(key, 10);
    let index = tempMaster.findIndex(x => {
      return x.key === int;
    });
    tempMaster[index].type = event.target.value;
    await this.setState({testData: tempMaster});
    console.log(this.state.testData);
    let data = tempMaster;

    await this.senderApi(data);
    // localStorage.setItem("graphPos", JSON.stringify(data));

    this.mountFunc();
  };

  labelInputMap = data => {
    let i = -1;
    let newData = {
      ...data
    };
    return data.label.map(data => {
      i++;
      console.log(newData.key);
      console.log(i);
      return (<div key={i}>
        <form onSubmit={event => {
            event.preventDefault();
            this.changeGraphLabels(event, newData.key, data);
          }}>
          <input name="label" type="text" value={this.state.test}/>
          <input type="submit" value={'Change Label!'}/>
        </form>
      </div>);
    });
  }

  loadSettings = async (data, pos) => {
    let tempMaster = [...this.state.testData];
    console.log(data);
    let int = parseInt(data.key, 10);
    let index = tempMaster.findIndex(x => {
      return x.key === int;
    });
    let labelIndex = tempMaster[index].label.findIndex(x => {
      return x === pos;
    });
    console.log(index, labelIndex);
    tempMaster[index].graphSettings = true;
    tempMaster[index].graphSettingsKey = labelIndex;
    await this.setState({testData: tempMaster});
    await this.senderApi(this.state.testData);
    this.mountFunc();
  }

  closeSettings = async data => {
    let tempMaster = [...this.state.testData];
    console.log(data);
    let int = parseInt(data.key, 10);
    let index = tempMaster.findIndex(x => {
      return x.key === int;
    });
    tempMaster[index].graphSettings = false;
    await this.setState({testData: tempMaster});
    await this.senderApi(this.state.testData);
    this.mountFunc();
  }

  mapDataSets = data => {
    let newData = {
      ...data
    };
    return data.label.map(label => {
      return (<div>
        <p>{label}</p>
        <button onClick={() => this.loadSettings(newData, label)}>Settings</button>
      </div>)
    })
  }

  test = cools => {
    const dragHandlers = {
      onStart: this.onStart,
      onStop: this.onStop
    };
    console.log(cools[1].type);
    return cools.map(data => {
      return (<Draggable handle=".dragger" grid={[10, 10]} bounds="body" defaultPosition={data.pos} onDrag={this.handleDrag} id={data.key} {...dragHandlers} key={data.key}>
        <div className="box" id="2" accessKey={data.key} key={data.key}>
          {
            this.state.isAdmin
              ? (<React.Fragment>
                <div className="settingsPannel">
                  <button onClick={this.handleDelete}>Delete</button>
                  <button onClick={() => {
                      this.handleSettings(data.key);
                    }}>
                    Settings
                  </button>
                  {
                    data.settingsOpen
                      ? (<div className='settingsContainer'>
                        <div>
                          <form onSubmit={this.handleGraphChange}>
                            <select onChange={event => this.handleGraphChange(event, data.key)}>
                              {
                                data.type == "line"
                                  ? (<React.Fragment>
                                    <option value="bar">Bar</option>
                                    <option value="line" selected="selected" defaultValue="defaultValue">
                                      Line
                                    </option>
                                  </React.Fragment>)
                                  : (<React.Fragment>
                                    <option value="bar" defaultValue="defaultValue">
                                      Bar
                                    </option>
                                    <option value="line">Line</option>
                                  </React.Fragment>)
                              }
                            </select>
                          </form>
                          <form onSubmit={event => {
                              event.preventDefault();
                              this.changeGraphTitle(event, data.key);
                            }}>
                            <input name="title" type="text" placeholder={data.title}/>
                            <input type="submit" value="Change Title!"/>
                          </form>
                          {this.mapDataSets(data)}
                          <button onClick={() => this.addDataSet(data.key)}>Add Data Set</button>
                        </div>
                        {
                          data.graphSettings
                            ? (<div className="graphSettings">
                              <button onClick={() => this.closeSettings(data)}>Close</button>
                              <h3>{data.label[data.graphSettingsKey]}</h3>
                              <form onSubmit={event => {
                                  event.preventDefault();
                                  this.changeGraphLabels(event, data.key, data.label[data.graphSettingsKey]);
                                }}>
                                <input name="label" type="text" value={this.state.test}/>
                                <select name='graphType'>
                                  {
                                    data.graphType[data.graphSettingsKey] == "line"
                                      ? (<React.Fragment>
                                        <option value="bar">Bar</option>
                                        <option value="line" selected="selected" defaultValue="defaultValue">
                                          Line
                                        </option>
                                      </React.Fragment>)
                                      : (<React.Fragment>
                                        <option value="bar" defaultValue="defaultValue">
                                          Bar
                                        </option>
                                        <option value="line">Line</option>
                                      </React.Fragment>)
                                  }
                                </select>
                                <input type="submit" value={'Commit Settngs'}/>
                              </form>
                            </div>)
                            : null
                        }
                      </div>)
                      : null
                  }
                </div>
                <div className="dragger"/>
              </React.Fragment>)
              : null
          }
          <h3 className="graphTitle">{data.title}</h3>
          <canvas id={data.id}/>
        </div>
      </Draggable>);
    });
  };

  changeGraphTitle = async (event, key) => {
    event.preventDefault();
    if (event.target.title.value == '') {
      alert('Plese enter a Value');
    } else {
      let tempMaster = [...this.state.testData];
      console.log(tempMaster);
      let int = parseInt(key, 10);
      let index = tempMaster.findIndex(x => {
        return x.key === int;
      });
      console.log(index);
      console.log(tempMaster[index].title);
      tempMaster[index].title = event.target.title.value;
      console.log(tempMaster[index].title);
      await this.setState({testData: tempMaster});
      await this.senderApi(this.state.testData);
      // localStorage.setItem("graphPos", JSON.stringify(this.state.testData));
      this.mountFunc();
    }
  };

  changeGraphLabels = async (event, key, pos) => {
    event.preventDefault();
    console.log(event.target.label.value);
    if (event.target.title.value == '') {
      alert('Plese enter a Value');
    } else {
      let tempMaster = [...this.state.testData];
      console.log(tempMaster);
      let int = parseInt(key, 10);
      let index = tempMaster.findIndex(x => {
        return x.key === int;
      });
      let labelIndex = tempMaster[index].label.findIndex(x => {
        return x === pos;
      });
      console.log(event.target.graphType.value);
      console.log(labelIndex);
      console.log(index, pos);
      console.log(tempMaster[index]);
      tempMaster[index].label[labelIndex] = event.target.label.value;
      tempMaster[index].graphType[labelIndex] = event.target.graphType.value;
      console.log(tempMaster[index].label);
      await this.setState({testData: tempMaster});
      await this.senderApi(this.state.testData);
      // localStorage.setItem("graphPos", JSON.stringify(this.state.testData));
      this.mountFunc();
    }
  };

  callBackendAPI = async () => {
    const response = await fetch('/test');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    console.log(body.data);
    let obj = JSON.parse(body.data);
    let obj2 = JSON.parse(obj.viewInfo);
    console.log(obj2);
    localStorage.setItem("graphPos", JSON.stringify(obj2));
    await this.setState({tempMaster: obj2})
    return obj2;
  };

  senderApi = async (data) => {
    data = JSON.stringify(data);
    //let data = localStorage.getItem("graphPos");
    console.log('==========Sender=========');
    console.log(data);
    console.log('=========================');
    const response = await fetch('/api/fetchData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: data})
    });
    const body = await response.text();
    console.log(body);
    let bod = JSON.parse(body);

    await this.callBackendAPI();
    return bod;
  }

  nameGen = () => {
    let rand = [
      'bride',
      'highlight',
      'equinox',
      'aunt',
      'herd',
      'fax',
      'manager',
      'punish',
      'suitcase',
      'therapist',
      'dentist',
      'inspector',
      'will',
      'incapable',
      'problem',
      'veteran',
      'expansion',
      'fate',
      'modest',
      'avant - garde',
      'product',
      'pioneer',
      'morale',
      'password',
      'glory',
      'muggy',
      'lamp',
      'exceed',
      'script',
      'boot',
      'habit',
      'base',
      'ward',
      'litigation',
      'handicap',
      'leash',
      'cream',
      'charge',
      'cellar',
      'cruelty',
      'architecture',
      'accurate',
      'artist',
      'stamp',
      'scandal',
      'matrix',
      'clerk',
      'bag',
      'narrow',
      'earwax',
      'verdict',
      'bin',
      'chauvinist',
      'abridge',
      'volunteer',
      'even',
      'landowner',
      'edition',
      'item',
      'fluctuation',
      'salt',
      'strange',
      'habitat',
      'blue jean',
      'decorative',
      'bond',
      'compound',
      'mill',
      'contract',
      'estimate',
      'hostility',
      'feign',
      'pin',
      'nature',
      'crew',
      'miner',
      'review',
      'convention',
      'commission'
    ];
    let name = rand[Math.floor(Math.random() * 78 + 1)] + ' ' + rand[Math.floor(Math.random() * 78 + 1)];
    console.log(name);
    return name;
  }

  addDataSet = async (key) => {
    let int = parseInt(key, 10);
    let tempMaster = [...this.state.testData];
    let name = this.nameGen();
    console.log(tempMaster);
    let index = tempMaster.findIndex(x => {
      return x.key === int;
    });
    tempMaster[index].data.push([
      Math.floor(Math.random() * 1000 + 1),
      Math.floor(Math.random() * 1000 + 1),
      Math.floor(Math.random() * 1000 + 1),
      Math.floor(Math.random() * 1000 + 1),
      Math.floor(Math.random() * 1000 + 1),
      Math.floor(Math.random() * 1000 + 1)
    ]);
    tempMaster[index].label.push(name);
    tempMaster[index].graphType.push('line');
    await this.senderApi(tempMaster);
    this.mountFunc();
  }

  render() {
    const dragHandlers = {
      onStart: this.onStart,
      onStop: this.onStop
    };

    return (<div>
      {
        this.state.renderBounds
          ? (<div className="Bounds">{this.test(this.state.testData)}</div>)
          : null
      }
      <div className="settings">
        <button id="adminBtn" onClick={this.changeAdmin}>
          Change Admin State
        </button>
        <button id="adminBtn" onClick={this.setLocalStorage}>
          reset Local Storage
        </button>
        <button id="adminBtn" onClick={this.addGraph}>
          Add Graph
        </button>
        <button id="adminBtn" onClick={this.removegraph}>
          Remove Graph
        </button>
        <h3>isAdmin: {
            this.state.isAdmin
              ? "true"
              : "false"
          }</h3>
        <h3 id="test"></h3>
        <button onClick={() => this.callBackendAPI()}>Pull Me</button>
        <button onClick={() => this.senderApi(this.state.testData)}>Save Work</button>
      </div>
    </div>);
  }
}

ReactDOM.render(<App/>, document.body);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
