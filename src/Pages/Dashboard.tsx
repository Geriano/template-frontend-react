import axios from "axios";
import { useEffect, useState } from "react";
import route from "../route";
import ReactECharts from 'echarts-for-react';
import Card from "../Components/Card";
import { EChartsOption } from "echarts";

export default function Dashboard() {
  const [urls, setUrls] = useState([] as string[])
  const [times, setTimes] = useState([] as number[])

  const fetch = () => axios.get(route('superuser.request'))
                            .then(response => {
                              const { urls, times } = response.data as {
                                urls: string[],
                                times: number[],
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

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      valueFormatter: value => `${value}ms`
    },
    title: {
      left: 'center',
      text: 'Request time'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: urls,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLabel: {
        formatter: '{value}ms',
      },
    },
    series: [
      {
        name: 'Time',
        type: 'line',
        data: times.map(time => time.toFixed(2)),
      }
    ]
  }

  return (
    <Card>
      <div className="p-4">
        <ReactECharts 
          option={option}
        />
      </div>
    </Card>
  )
}