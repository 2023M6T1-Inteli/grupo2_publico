import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
} from 'recharts';
import { useParams } from 'react-router-dom';
import { Container, FileName, PageTitle, TableLabel, Title } from './Styles';
import Table from '../../components/Table/Table';

interface Pattern {
  id: number;
  timesUsed: number;
  rolls: number[];
  waste: number;
}

interface Demand {
  rollWidth: number;
  quantity: number;
}

interface Scenario {
  id: number;
  name: string;
  patterns: Pattern[];
  demands: Demand[];
}

export default function ProjectDetails() {
  // The id of the project is in the URL
  const { projectId } = useParams();

  const [scenario, setScenario] = useState<Scenario | null>(null);

  // Use the id to fetch the project from the API
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/scenarios/${projectId}`)
      .then((response) => {
        setScenario(response.data);
      })
      .catch((error) => {
        console.error('Something went wrong!', error);
      });
  }, [projectId]);

  // Generate the Rolls table data from the scenario
  const tableData = scenario?.demands.map((demand) => {
    const produced = scenario.patterns.reduce((acc, pattern) => {
      const rollCount = pattern.rolls.filter(
        (roll) => roll === demand.rollWidth
      ).length;
      return acc + rollCount * pattern.timesUsed;
    }, 0);
    const excess = produced - demand.quantity;

    return {
      size: demand.rollWidth,
      demand: demand.quantity,
      produced,
      excess,
    };
  });

  // Generate the Patterns table data from the scenario
  const patternsTableData = scenario?.patterns.map((pattern) => {
    const result = {
      timesUsed: pattern.timesUsed,
      waste: pattern.waste,
    };
    // add rolls
    pattern.rolls.map((roll, index: number) => {
      result[`roll${index + 1}`] = roll;
    });

    return result;
  });

  // Transform the patterns data to be used in the bar chart
  const chartData = scenario?.patterns.map(
    (pattern: Pattern, index: number) => {
      const obj = { name: pattern.timesUsed };

      pattern.rolls.forEach((roll, i: number) => {
        obj[`Rolo ${i + 1}`] = roll;
      });

      obj.Perda = pattern.waste;

      return obj;
    }
  );

  // Find the maximum number of rolls in any pattern
  const maxRolls = scenario?.patterns.reduce(
    (max, p) => Math.max(max, p.rolls.length),
    0
  );

  // Show a loading message if the data is not loaded yet
  if (!chartData) return <div>Loading...</div>;

  // Custom tooltip for the bar chart
  // Custom tooltip for the bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            border: '1px solid black',
            backgroundColor: 'white',
            padding: '10px',
          }}
        >
          <p
            className="label"
            style={{ color: 'black', fontWeight: 'bold' }}
          >{`${label}`}</p>
          <p
            className="label"
            style={{ color: payload[0].color }}
          >{`Demanda Atendida: ${payload[0].value}`}</p>
          <p
            className="label"
            style={{ color: payload[1].color }}
          >{`Excedente : ${payload[1].value}`}</p>
          <p className="intro" style={{ color: 'black' }}>{`Total Produzido: ${
            payload[0].value + payload[1].value
          }`}</p>
        </div>
      );
    }

    return null;
  };

  // Custom legend for the bar chart
  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {entry.value === 'demand' ? 'Demanda Atendida' : 'Excedente'}
          </li>
        ))}
      </ul>
    );
  };

  // Custom headers for the rolls produced table
  const columnsRolls = [
    { Header: 'Tamanho (em mm)', accessor: 'size' },
    { Header: 'Demanda', accessor: 'demand' },
    { Header: 'Produzidos', accessor: 'produced' },
    { Header: 'Excedente', accessor: 'excess' },
  ];

  // Custom headers for the patterns table
  const columnsPatterns = [{ Header: 'Tiradas', accessor: 'timesUsed' }];
  // Add a column for each roll in the pattern
  Array.from({ length: maxRolls }).forEach((_, i) => {
    columnsPatterns.push({
      Header: `Rolo ${i + 1}`,
      accessor: `roll${i + 1}`,
    });
  });
  // Add a column for the waste
  columnsPatterns.push({ Header: 'Perda', accessor: 'waste' });

  // PieChart - Generate the total roll width used and total waste from the scenario
  let totalProduced = 0;
  let totalDemand = 0;
  let totalWaste = 0;
  let totalExcess = 0;

  if (scenario) {
    scenario.patterns.forEach((pattern) => {
      totalProduced +=
        pattern.rolls.reduce((a, b) => a + b, 0) * pattern.timesUsed;
      totalWaste += pattern.waste * pattern.timesUsed;
    });

    scenario.demands.forEach((demand) => {
      totalDemand += demand.quantity * demand.rollWidth;
    });
    totalExcess = totalProduced - totalDemand;
  }
  const pieData = [
    { name: 'Demanda Atendida', value: totalDemand },
    { name: 'Perdas', value: totalWaste },
    { name: 'Excedente', value: totalExcess },
  ];
  const filteredPieData = pieData.filter((data) => data.value > 0);

  const COLORS = ['#82ba7f', '#f5a3a3', '#8884d8']; // Green / Red / Blue

  return (
    <Container>
      <Title>{scenario?.name}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={filteredPieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, value, percent }) =>
              `${name}: ${value}mm (${(percent * 100).toFixed(0)}%)`
            }
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer height={250} width={'100%'}>
        <BarChart
          width={800}
          height={500}
          layout="vertical"
          data={chartData}
          margin={{ left: 50, right: 50 }}
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis hide type="number" />
          <YAxis type="category" dataKey="name">
            <Label value="Tiradas (Qtde)" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          {Array.from({ length: maxRolls }).map((_, i) => (
            <Bar key={i} dataKey={`Rolo ${i + 1}`} fill={COLORS[0]} stackId="a">
              <LabelList
                dataKey={`Rolo ${i + 1}`}
                position="insideTop"
                fill="#000"
              />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} stroke="#000" />
              ))}
            </Bar>
          ))}

          <Bar dataKey="Perda" fill={COLORS[1]} stackId="a">
            <LabelList dataKey="Perda" position="insideTop" fill="#000" />
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} stroke="#000" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Table data={patternsTableData} columns={columnsPatterns} />
      <PageTitle>Insights de produção:</PageTitle>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart data={tableData}>
          <CartesianGrid stroke="#f3f3f3" />
          <XAxis dataKey="size" type="category">
            <Label
              value="Tamanho da bobina (em mm)"
              offset={-20}
              position="insideBottom"
            />
          </XAxis>
          <YAxis type="number" allowDecimals={false}>
            <Label
              value="Quantidade produzida"
              angle={-90}
              position="insideLeft"
            />
          </YAxis>
          <Tooltip content={CustomTooltip} />
          <Legend
            width={200}
            wrapperStyle={{
              right: '0',
              backgroundColor: '#f5f5f5',
              border: '1px solid #d5d5d5',
              borderRadius: 3,
              lineHeight: '40px',
            }}
            content={renderLegend}
          />
          <Bar dataKey="demand" stackId="a" fill={COLORS[0]} />
          <Bar dataKey="excess" stackId="a" fill={COLORS[2]} />
        </ComposedChart>
      </ResponsiveContainer>
      <TableLabel> Bobinas produzidas: </TableLabel>
      {tableData && <Table data={tableData} columns={columnsRolls} />}
    </Container>
  );
}
