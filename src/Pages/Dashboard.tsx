import axios from "axios";
import { useEffect, useState } from "react";
import route from "../route";
import ReactECharts from 'echarts-for-react';
import Card from "../Components/Card";
import { EChartsOption } from "echarts";

export default function Dashboard() {
  const [urls, setUrls] = useState([] as string[])
  const [times, setTimes] = useState([] as number[][])

  const fetch = () => axios.get(route('superuser.request'))
                            .then(response => {
                              const { urls, times, counts } = response.data as {
                                urls: string[],
                                times: number[][],
                                counts: number[],
                              }

                              setUrls(urls)
                              setTimes(times)
                            })

  useEffect(() => {
    fetch()
    let interval: NodeJS.Timeout|null = null

    interval && clearInterval(interval)
    interval = setInterval(() => {
      fetch()
    }, 10000)

    return () => {
      interval && clearInterval(interval)
    }
  }, [])

  const max = Math.max(...times.map(time => Math.max(...time)))

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      valueFormatter: value => {
        return `${value}ms`
      }
    },
    title: {
      text: 'Request time'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        saveAsImage: {}
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 90,
        end: 100,
      },
      {
        start: 0,
        end: 1,
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
      max,
    },
    series: urls.map((name, i) => {
      return {
        name,
        type: 'line',
        data: times[i],
      }
    }),
  }

  return (
    <Card>
      <div className="p-4">
        <ReactECharts 
          option={option}
          style={{
            height: 'calc(100vh - 10rem)'
          }}
        />
      </div>
    </Card>
  )
}