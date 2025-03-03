// src/components/TokenomicsSection.tsx
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  Plugin
} from 'chart.js';
import FadeLeft from "../animations/FadeLeft";
import FadeRight from "../animations/FadeRight";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const centerTextPlugin: Plugin = {
  id: 'centerText',
  afterDraw: (chart) => {
    const { ctx, width, height } = chart;
    ctx.save();
    const text = '';
    const fontSize = Math.min(width, height) / 15;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

const TokenomicsSection: React.FC = () => {
  const tokenomicsData = {
    tokenName: "BlackRock Digital Asset Token",
    symbol: "BRDA",
    totalSupply: "1,000,000,000 BRDA",
    presale: "200,000,000 BRDA",
    price: "Ethereum (ERC-20)",
  };

  const distributionData = {
    labels: ['Presale', 'Liquidity', 'Team', 'Marketing', 'Reserve', 'Staking Rewards'],
    datasets: [
      {
        label: 'Token Distribution',
        data: [20, 30, 15, 15, 10, 20],
        backgroundColor: [
          '#FFEE58',
          '#FFD700',
          '#FFF176',
          '#FFEE58',
          '#FFD700',
          '#FFCA28',
        ],
        hoverBackgroundColor: [
          '#FFEE58',
          '#FFD700',
          '#FFF176',
          '#FFEE58',
          '#FFD700',
          '#FFCA28',
        ],
      },
    ],
  };

  const metricsData = {
    labels: ['Liquidity', 'Team', 'Marketing', 'Reserve', 'Staking Rewards'],
    datasets: [
      {
        label: 'Allocation (in millions)',
        data: [300, 150, 150, 100, 200],
        backgroundColor: [
          '#FFEE58',
          '#FFD700',
          '#FFF176',
          '#FFEE58',
          '#FFCA28',
        ],
        borderColor: [
          '#FFEE58',
          '#FFD700',
          '#FFF176',
          '#FFEE58',
          '#FFCA28',
        ],
        borderWidth: 1,
      },
    ],
  };

  const metricsOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}M`;
          },
        },
        backgroundColor: '#000000',
        titleColor: '#FFD700',
        bodyColor: '#FFFFFF',
      },
    },
    scales: {
      x: {
        ticks: { color: '#FFFFFF' },
        grid: { display: false, color: '#333333' },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 60, color: '#FFFFFF' },
        grid: { color: '#333333' },
      },
    },
  };

  const useOfFunds = [
    { category: "Development", percentage: "40%" },
    { category: "Marketing", percentage: "25%" },
    { category: "Operations", percentage: "15%" },
    { category: "Legal", percentage: "10%" },
    { category: "Reserve", percentage: "10%" },
  ];

  const vestingSchedule = [
    { category: "Team", duration: "12 months", percentage: "15%" },
    { category: "Advisors", duration: "6 months", percentage: "5%" },
    { category: "Partners", duration: "9 months", percentage: "5%" },
  ];

  return (
    <section id="tokenomics" className="py-12 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeLeft>
          <h2 className="text-gradient mb-12 text-center text-5xl font-bold leading-tight lg:mb-24 text-white">
            Tokenomics
          </h2>
        </FadeLeft>
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-12 lg:space-y-0 mb-12">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <FadeRight>
              <div className="w-full h-64 sm:h-80 lg:h-96 max-w-md">
                <Pie
                  data={distributionData}
                  options={{ plugins: { legend: { display: false } } }}
                />
              </div>
            </FadeRight>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <FadeLeft>
              <div className="w-full h-64 sm:h-80 lg:h-96 max-w-md">
                <Bar data={metricsData} options={metricsOptions} />
              </div>
            </FadeLeft>
          </div>
        </div>
        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-4 
          gap-8 
          items-stretch 
          auto-rows-fr
        ">
          <FadeRight>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 border-b border-gold pb-2">
                Token Details
              </h3>
              <ul className="space-y-2 flex-grow">
                <li className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{tokenomicsData.tokenName}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Symbol:</span>
                  <span>{tokenomicsData.symbol}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Total Supply:</span>
                  <span>{tokenomicsData.totalSupply}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Presale Allocation:</span>
                  <span>{tokenomicsData.presale}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Blockchain:</span>
                  <span>{tokenomicsData.price}</span>
                </li>
              </ul>
            </div>
          </FadeRight>
          <FadeRight>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 border-b border-gold pb-2">
                Use of Funds
              </h3>
              <ul className="space-y-2 flex-grow">
                {useOfFunds.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.category}</span>
                    <span>{item.percentage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeRight>
          <FadeLeft>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 border-b border-gold pb-2">
                Metrics
              </h3>
              <ul className="space-y-2 flex-grow">
                <li className="flex justify-between">
                  <span className="font-medium">Liquidity:</span>
                  <span>30%</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Team:</span>
                  <span>15%</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Marketing:</span>
                  <span>15%</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Reserve:</span>
                  <span>10%</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Staking Rewards:</span>
                  <span>20%</span>
                </li>
              </ul>
            </div>
          </FadeLeft>
          <FadeLeft>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 border-b border-gold pb-2">
                Vesting Schedule
              </h3>
              <div className="overflow-x-auto flex-grow">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Duration</th>
                      <th className="px-4 py-2 text-left">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vestingSchedule.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-white">{item.category}</td>
                        <td className="px-4 py-2 text-white">{item.duration}</td>
                        <td className="px-4 py-2 text-white">{item.percentage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeLeft>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
