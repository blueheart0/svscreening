import axios from "axios";
import produce from "immer";
import moment from "moment";
import React, { useEffect, useReducer } from "react";
import { MonthlyBar, TotalBar, TotalDonut } from "./component";

const STATUS = {
  READY: "Ready",
  IN_PROGRESS: "In-Progress",
  FINISHED: "Finished",
};

const _makeAverage = (arr) => {
  return Math.round(
    arr.reduce((acc, cur) => {
      acc = acc + cur;
      return acc;
    }, 0) / arr.length
  );
};

const intializer = (props) => {
  return {
    data: [],
    summary: {
      total: 0,
      finished: 0,
      inProgress: 0,
      ready: 0,
    },
    result: {
      pedestrian: [],
      rider: [],
      truck: [],
      cyclist: [],
      forklift: [],
      car: [],
    },
    date: new Map(),
  };
};

const reducer = produce((draft, action) => {
  switch (action?.type) {
    case "setData":
      draft.data = [...action.target];
      draft.summary = draft.data.reduce(
        (acc, cur) => {
          switch (cur?.status) {
            case STATUS.READY:
              acc.ready = acc.ready + 1;
              break;
            case STATUS.IN_PROGRESS:
              acc.inProgress = acc.inProgress + 1;
              break;
            case STATUS.FINISHED:
              acc.finished = acc.finished + 1;
              break;
          }
          if (cur?.status) {
            acc.total = acc.total + 1;
          }
          return acc;
        },
        {
          total: 0,
          finished: 0,
          inProgress: 0,
          ready: 0,
        }
      );
      draft.result = draft.data.reduce(
        (acc, cur) => {
          if (!cur?.result) {
            return acc;
          }
          Object.keys(cur.result).forEach((item) => {
            acc[item].push(cur.result[item]);
          });
          return acc;
        },
        {
          pedestrian: [],
          rider: [],
          truck: [],
          cyclist: [],
          forklift: [],
          car: [],
        }
      );
      draft.date = draft.data.reduce((acc, cur) => {
        let _date = moment(cur?.endDate, "MM/DD/YYYY");
        if (!acc.has(_date.year())) {
          acc.set(_date.year(), new Map());
        }
        if (!acc.get(_date.year()).has(_date.month())) {
          acc.get(_date.year()).set(_date.month(), {
            date: _date.month(),
            summary: {
              total: 0,
              finished: 0,
              inProgress: 0,
              ready: 0,
            },
          });
        }
        let _data = acc.get(_date.year()).get(_date.month());
        switch (cur?.status) {
          case STATUS.READY:
            _data.summary.ready = _data.summary.ready + 1;
            break;
          case STATUS.IN_PROGRESS:
            _data.summary.inProgress = _data.summary.inProgress + 1;
            break;
          case STATUS.FINISHED:
            _data.summary.finished = _data.summary.finished + 1;
            break;
        }
        if (cur?.status) {
          _data.summary.total = _data.summary.total + 1;
        }
        acc.get(_date.year()).set(_date.month(), _data);
        return acc;
      }, new Map());

      break;
  }
});

const Charts = (props) => {
  const [state, dispatchState] = useReducer(reducer, props, intializer);
  useEffect(() => {
    async function _get() {
      let _res = await axios("assets/jsons/projects_data.json");
      if (_res?.data) {
        dispatchState({ type: "setData", target: _res.data });
      }
    }

    _get();
  }, []);

  return (
    <div>
      <div>{"chart"}</div>
      <TotalDonut
        data={[
          state.summary?.ready,
          state.summary?.inProgress,
          state.summary?.finished,
        ]}
      />
      <TotalBar data={state.result} />
      <MonthlyBar data={state.date.get(2021)} />
    </div>
  );
};
export default Charts;

// this.state = {
//
//   series: [{
//     name: 'PRODUCT A',
//     data: [44, 55, 41, 67, 22, 43, 21, 49]
//   }, {
//     name: 'PRODUCT B',
//     data: [13, 23, 20, 8, 13, 27, 33, 12]
//   }, {
//     name: 'PRODUCT C',
//     data: [11, 17, 15, 15, 21, 14, 15, 13]
//   }],
//   options: {
//     chart: {
//       type: 'bar',
//       height: 350,
//       stacked: true,
//       stackType: '100%'
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom',
//           offsetX: -10,
//           offsetY: 0
//         }
//       }
//     }],
//     xaxis: {
//       categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
//         '2012 Q3', '2012 Q4'
//       ],
//     },
//     fill: {
//       opacity: 1
//     },
//     legend: {
//       position: 'right',
//       offsetX: 0,
//       offsetY: 50
//     },
//   },
//
//
// };
// }
