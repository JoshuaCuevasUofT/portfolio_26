import { type Project } from '../types/project';

// Static project data (extracted previously from markdown)
const eventDrivenBacktest: Project = {
  id: 'event-driven-backtesting-framework',
  title: 'Event Driven Backtesting Framework',
  shortDescription: 'Event-driven backtesting framework for quantitative research and trading strategy evaluation.',
  detailedDescription: `**Background**\n\nThis project implements an event-driven backtesting framework for evaluating quantitative trading strategies. Unlike vectorized backtesting, event-driven systems process market data as a stream of events (ticks, bars, signals) allowing more realistic modeling of execution, latency, and market impact.\n\n**Motivations**\n\nTraditional backtesting often suffers from look‑ahead bias and simplified assumptions about order fills. An event‑driven architecture addresses these limitations by:\n- Processing data in chronological order, exactly as a live system would\n- Simulating order matching with configurable latency and slippage models\n- Allowing strategy logic to react to intra‑bar price movements\n- Supporting both historical and real‑time data feeds with the same engine\n\n**Architecture**\n\nThe core components are:\n\n1. **Event Loop** – Dispatches market data, signals, and fill events to registered handlers.\n2. **Data Handler** – Abstracts the data source (CSV, database, live feed) and emits bar/tick events.\n3. **Portfolio** – Tracks positions, cash, and calculates performance metrics (Sharpe, drawdown, etc.).\n4. **Execution Handler** – Models order‑to‑fill latency, partial fills, and transaction costs.\n5. **Strategy** – User‑defined class that receives market events and submits orders.\n\n**Example Strategy: Moving‑Average Crossover**\n\n`,
  tags: ['Quantitative Research', 'Data Engineering'],
  images: [],
  codeSnippets: [
    `class MovingAverageCrossover(Strategy):
    def __init__(self, short_window=10, long_window=30):
        self.short_window = short_window
        self.long_window = long_window
        self.short_ma = deque(maxlen=short_window)
        self.long_ma = deque(maxlen=long_window)
        self.in_position = False

    def on_bar(self, event):
        # Update moving averages
        self.short_ma.append(event.close)
        self.long_ma.append(event.close)

        if len(self.short_ma) < self.short_window or len(self.long_ma) < self.long_window:
            return

        short_avg = sum(self.short_ma) / self.short_window
        long_avg = sum(self.long_ma) / self.long_window

        # Buy signal: short MA crosses above long MA
        if not self.in_position and short_avg > long_avg:
            order = OrderEvent(
                symbol=event.symbol,
                order_type='MARKET',
                quantity=100,
                side='BUY'
            )
            self.submit_order(order)
            self.in_position = True

        # Sell signal: short MA crosses below long MA
        elif self.in_position and short_avg < long_avg:
            order = OrderEvent(
                symbol=event.symbol,
                order_type='MARKET',
                quantity=100,
                side='SELL'
            )
            self.submit_order(order)
            self.in_position = False`
  ],
  date: '2024-02-01',
};

// Export array of all projects (chronologically ordered by date)
export const projects: Project[] = [
  eventDrivenBacktest,
  // Additional projects will be added here
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

// Export individual projects for easy access
export { eventDrivenBacktest };

// Export helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => project.tags.includes(tag as any));
}

// Export all unique tags
export const allTags = Array.from(
  new Set(projects.flatMap(project => project.tags))
);
