import moment from "moment";

export interface Insight {
  id: string;
  created_at: string;
  type: InsightType;
  severity: Severity;
}

export type InsightType = 'bearing' | 'gear' | 'motor';

export type Severity = 'healthy' | 'alarm' | 'critical';

export const severityOptions: Severity[] = ['healthy', 'alarm', 'critical'];

export const typeOptions: InsightType[] = ['bearing', 'gear', 'motor'];

export const availableDatesMockOptions = [
  '2023-07-01T10:00:00Z',
  '2023-07-02T10:00:00Z',
  '2023-07-03T10:00:00Z',
  '2023-07-04T10:00:00Z',
  '2023-07-05T10:00:00Z',
  '2023-07-06T10:00:00Z',
  '2023-07-07T10:00:00Z',
];

const mockInsights: Insight[] = [
  {
    id: '9',
    created_at: '2023-07-09T18:00:00Z',
    type: 'motor',
    severity: 'critical',
  },
  {
    id: '10',
    created_at: '2023-07-10T19:00:00Z',
    type: 'bearing',
    severity: 'healthy',
  },
  {
    id: '1',
    created_at: '2023-07-01T10:00:00Z',
    type: 'bearing',
    severity: 'healthy',
  },
  {
    id: '11',
    created_at: '2023-07-01T10:00:00Z',
    type: 'bearing',
    severity: 'alarm',
  },
  {
    id: '5',
    created_at: '2023-07-05T14:00:00Z',
    type: 'gear',
    severity: 'alarm',
  },
  {
    id: '6',
    created_at: '2023-07-06T15:00:00Z',
    type: 'motor',
    severity: 'critical',
  },
  {
    id: '7',
    created_at: '2023-07-07T16:00:00Z',
    type: 'bearing',
    severity: 'healthy',
  },
  {
    id: '18',
    created_at: '2023-07-07T16:00:00Z',
    type: 'bearing',
    severity: 'healthy',
  },
  {
    id: '8',
    created_at: '2023-07-08T17:00:00Z',
    type: 'gear',
    severity: 'alarm',
  },
  {
    id: '2',
    created_at: '2023-07-02T11:00:00Z',
    type: 'gear',
    severity: 'alarm',
  },
  {
    id: '22',
    created_at: '2023-07-02T11:00:00Z',
    type: 'gear',
    severity: 'healthy',
  },
  {
    id: '3',
    created_at: '2023-07-03T12:00:00Z',
    type: 'motor',
    severity: 'critical',
  },
  {
    id: '4',
    created_at: '2023-07-04T13:00:00Z',
    type: 'bearing',
    severity: 'healthy',
  },
];

const getSeverityValue = (severity: Severity): number => {
  switch (severity) {
    case 'healthy':
      return 3;
    case 'alarm':
      return 2;
    case 'critical':
      return 1;
    default:
      return 0;
  }
};

const initializeData = () => {
  const initialData = {
    insights: mockInsights
  };
  localStorage.setItem('data', JSON.stringify(initialData));
};

const getData = () => {
  const data = localStorage.getItem('data');
  if (!data) {
    initializeData();
    return { insights: mockInsights };
  }
  return JSON.parse(data);
};

const saveData = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

export const fetchInsightsMock = async (from_date: string): Promise<Insight[]> => {
  const data = getData();
  const insights: Insight[] = data.insights;


  return insights.filter((insight) => {
    return moment(insight.created_at).toDate() >= moment(from_date).toDate();
  })
};

export const addInsightMock = async (created_at: string, type: string, severity: string): Promise<{ insight_id: string }> => {
  const data = getData();
  const insights: Insight[] = data.insights;

  const newInsightId = (crypto.randomUUID()).toString();
  const newInsight: Insight = {
    id: newInsightId,
    created_at,
    type: type as 'bearing' | 'gear' | 'motor',
    severity: severity as 'healthy' | 'alarm' | 'critical'
  };

  insights.push(newInsight);
  saveData({ insights });

  return { insight_id: newInsightId };
};

export const sortInsights = (insights: Insight[]): Insight[] => {
  const insightsCopy = [...insights];

  return insightsCopy.sort((a, b) => {
    const dateComparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return getSeverityValue(b.severity) - getSeverityValue(a.severity);
  });
};
