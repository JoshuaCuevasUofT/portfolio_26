import { type Project, type Tag } from '../types/project';

function getImagePath(path: string): string {
  // Remove leading slash if present to avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

// Static project data (extracted previously from markdown)
const eventDrivenBacktest: Project = {
  id: 'event-driven-backtesting-framework',
  title: 'Event Driven Backtesting Framework',
  shortDescription: 'Event-driven backtesting framework for quantitative research and trading strategy evaluation.',
  detailedDescription: `**Background**\n\nThis project implements an event-driven backtesting framework for evaluating quantitative trading strategies. Unlike vectorized backtesting, event-driven systems process market data as a stream of events (ticks, bars, signals) allowing more realistic modeling of execution, latency, and market impact.\n\n**Motivations**\n\nTraditional backtesting often suffers from look‑ahead bias and simplified assumptions about order fills. An event‑driven architecture addresses these limitations by:\n- Processing data in chronological order, exactly as a live system would\n- Simulating order matching with configurable latency and slippage models\n- Allowing strategy logic to react to intra‑bar price movements\n- Supporting both historical and real‑time data feeds with the same engine\n\n**Architecture**\n\nThe core components are:\n\n1. **Event Loop** – Dispatches market data, signals, and fill events to registered handlers.\n2. **Data Handler** – Abstracts the data source (CSV, database, live feed) and emits bar/tick events.\n3. **Portfolio** – Tracks positions, cash, and calculates performance metrics (Sharpe, drawdown, etc.).\n4. **Execution Handler** – Models order‑to‑fill latency, partial fills, and transaction costs.\n5. **Strategy** – User‑defined class that receives market events and submits orders.\n\n**Example Strategy: Moving‑Average Crossover**\n\n`,
  tags: ['Quantitative Research', 'Data Engineering'],
  images: [
    getImagePath('/images/projects/event_driven_backtest/Event Driven Backtesting Flow Chart.png')
  ],
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

// Urban Pulse: Tip Analysis
const urbanPulseTipAnalysis: Project = {
  id: 'urban-pulse-tip-analysis',
  title: 'Urban Pulse: Analyzing Tip Amounts and Drop-off Distance',
  shortDescription: 'Exploratory data analysis of NYC taxi data to uncover patterns in tip amounts, drop-off locations, and vendor relationships.',
  detailedDescription: `**Project Overview**

This exploratory data analysis project examines New York City taxi data from the NYC Taxi and Limousine Commission (NYC TLC) to uncover patterns in tip amounts, drop-off locations, and vendor relationships. The analysis focuses on visualizing the "pulse" of the city through comprehensive data exploration and statistical visualization.

**Key Insights**

1. **Tip Distribution by Vendor**: Analysis revealed no significant aberrations in tip distribution between the two vendors in the dataset, with Vendor 2 having a slightly higher share of rides that proportionally maintained across all tip amounts.

2. **Passenger Count Impact**: Tip amounts showed minimal variation based on passenger count, with an expected dip for four‑passenger rides due to their lower frequency in the dataset.

3. **Weekly Patterns**: Unexpectedly, Wednesday through Saturday recorded the highest daily ride numbers, while Sunday and Monday had the fewest.

4. **Drop‑off Location Analysis**: The distribution of drop‑off locations followed a pattern similar to a cumulative density function of a normal distribution, suggesting even spread across the geographic area despite missing coordinate data.

5. **Traffic Concentration**: Among 200+ drop‑off locations, a small subset attracted the majority of traffic—likely popular tourist destinations (Empire State Building, Times Square), airports, and transit hubs.

**Methodology**
- Data cleaning and structuring of NYC TLC taxi trip records
- Comprehensive visualization using Matplotlib and Seaborn
- Statistical analysis of tip distributions and trip patterns
- Tableau dashboards for interactive data exploration

**Technical Approach**
- Outlier detection using box plots for trip distance and duration
- Histogram analysis of tip amounts by vendor and passenger count
- Mean trip distance analysis by drop‑off location
- Visualization of ride frequency distribution across locations`,
  tags: ['Data Analysis', 'Data Science (ML)'],
  images: [
    getImagePath('/images/projects/urban_pulse_tip_analysis/5.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/6.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/7.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/8.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/cumul.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/output.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/output2.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/output3.png'),
    getImagePath('/images/projects/urban_pulse_tip_analysis/output4.png')
  ],
  codeSnippets: [
    `# Create box plot of trip_distance
plt.figure(figsize=(7,2))
plt.title('trip_distance')
sns.boxplot(data=None, x=df['trip_distance'], fliersize=1)

# Create histogram of trip_distance
plt.figure(figsize=(10,5))
sns.histplot(df['trip_distance'], bins=range(0,26,1))
plt.title('Trip distance histogram')`,
    `# Create histogram of tip_amount by vendor
plt.figure(figsize=(12,7))
ax = sns.histplot(data=df, x='tip_amount', bins=range(0,21,1),
                  hue='VendorID',
                  multiple='stack',
                  palette='pastel')
ax.set_xticks(range(0,21,1))
ax.set_xticklabels(range(0,21,1))
plt.title('Tip amount by vendor histogram')`,
    `# Create bar plot for mean tips by passenger count
data = mean_tips_by_passenger_count.tail(-1)
pal = sns.color_palette("Greens_d", len(data))
rank = data['tip_amount'].argsort().argsort()
plt.figure(figsize=(12,7))
ax = sns.barplot(x=data.index,
                 y=data['tip_amount'],
                 palette=np.array(pal[::-1])[rank])
ax.axhline(df['tip_amount'].mean(), ls='--', color='red', label='global mean')
ax.legend()
plt.title('Mean tip amount by passenger count', fontsize=16)`
  ],
  links: [
    { title: 'Tableau Dashboard: Tip Analysis', url: 'https://public.tableau.com/views/YourTableauVizURL' }
  ],
  date: '2023-11-15',
};

// Urban Pulse: Features & Regression
const urbanPulseFeaturesRegression: Project = {
  id: 'urban-pulse-features-regression',
  title: 'Urban Pulse: Features, Imputations, Correlations and Regression Models',
  shortDescription: 'A/B testing and feature engineering to predict NYC taxi fare amounts using multiple linear regression with comprehensive model evaluation.',
  detailedDescription: `**Project Overview**

This project builds a predictive model for NYC taxi fare amounts through rigorous A/B testing, feature engineering, and multiple linear regression. The goal was to identify factors influencing fare amounts and provide actionable insights for taxi drivers to increase revenue.

**Key Findings**

1. **Payment Type Impact**: A/B testing revealed a statistically significant difference (p < 8.79e-127) in average fare amounts between credit card and cash users, suggesting that encouraging credit card payments could boost driver revenue.

2. **Feature Engineering**: Created innovative features including:
   - Mean distance between pickup/dropoff location pairs
   - Mean duration for common routes
   - Rush hour indicators based on time-of-day patterns
   - Day/month categorical variables for temporal patterns

3. **Model Performance**: The final linear regression model achieved:
   - R²: 0.8379 (both training and test sets)
   - RMSE: $4.22 on training, $4.22 on test data
   - MAE: $2.33 on training, $2.33 on test data

4. **Key Predictor**: Standardized mean_distance emerged as the strongest predictor, with each standard deviation increase associated with a $7.13 fare increase.

**Methodology**
- Hypothesis testing (A/B tests) for payment type impact
- Comprehensive EDA with outlier detection and imputation
- Feature engineering using domain knowledge of NYC taxi operations
- Multiple linear regression with rigorous model evaluation
- Residual analysis to validate model assumptions

**Technical Implementation**
- Data cleaning and outlier imputation using IQR-based capping
- Creation of pickup_dropoff composite key for route-based features
- Time-based feature extraction (day, month, rush hour)
- Model training with train-test split and feature standardization
- Comprehensive visualization of residuals and prediction accuracy`,
  tags: ['Data Analysis', 'Data Science (ML)'],
  images: [
    getImagePath('/images/projects/urban_pulse_features_regression/1.PNG'),
    getImagePath('/images/projects/urban_pulse_features_regression/2.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/3.PNG'),
    getImagePath('/images/projects/urban_pulse_features_regression/4.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/5.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/6.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/7.PNG'),
    getImagePath('/images/projects/urban_pulse_features_regression/8.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/9.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/10.png'),
    getImagePath('/images/projects/urban_pulse_features_regression/11.PNG'),
    getImagePath('/images/projects/urban_pulse_features_regression/cumul.png')
  ],
  codeSnippets: [
    `# A/B test for fare amount by payment type
credit_card = taxi_data[taxi_data['payment_type'] == 1]['fare_amount']
cash = taxi_data[taxi_data['payment_type'] == 2]['fare_amount']
stats.ttest_ind(a=credit_card, b=cash, equal_var=False)

# Result: TtestResult(statistic=24.0016, pvalue=8.7866e-127, df=69652.62)`,
    `def outlier_imputer(column_list, iqr_factor):
    '''
    Impute upper-limit values based on interquartile range.
    '''
    for col in column_list:
        # Reassign minimum to zero
        df.loc[df[col] < 0, col] = 0

        # Calculate upper threshold
        q1 = df[col].quantile(0.25)
        q3 = df[col].quantile(0.75)
        iqr = q3 - q1
        upper_threshold = q3 + (iqr_factor * iqr)

        # Reassign values > threshold to threshold
        df.loc[df[col] > upper_threshold, col] = upper_threshold`,
    `# Feature engineering: mean distance by pickup-dropoff pair
df['pickup_dropoff'] = df['PULocationID'].astype(str) + ' ' + df['DOLocationID'].astype(str)
grouped = df.groupby('pickup_dropoff').mean(numeric_only=True)[['trip_distance']]
grouped_dict = grouped.to_dict()
grouped_dict = grouped_dict['trip_distance']
df['mean_distance'] = df['pickup_dropoff']
df['mean_distance'] = df['mean_distance'].map(grouped_dict)`
  ],
  links: [
    { title: 'Tableau Dashboard: Features & Regression', url: 'https://public.tableau.com/views/YourTableauVizURL' }
  ],
  date: '2023-12-01',
};

// STA302 Final Project
const sta302FinalProject: Project = {
  id: 'sta302-final-project',
  title: 'Regression Analysis of Student Success Factors: STA302 Final Project',
  shortDescription: 'Statistical analysis examining how study hours, COVID-related thoughts, and office hours impact term test performance in STA302 Methods of Data Analysis.',
  detailedDescription: `**Project Overview**

This capstone project for STA302 Methods of Data Analysis investigates the relationship between various study habits and academic performance. Using regression analysis, we quantified the impact of study hours, COVID‑related thoughts, miscellaneous activities, and office hours attendance on term test results.

**Key Findings**

1. **Positive Correlations**:
   - Study hours showed a strong positive correlation with test performance
   - Office hours attendance significantly improved academic outcomes

2. **Negative Impact**:
   - Time spent thinking about COVID‑19 had a measurable negative effect on test scores
   - This highlighted the importance of mental health support during challenging times

3. **Practical Recommendations**:
   - Students should prioritize consistent study hours and attend office hours
   - Institutions should provide better mental health support systems
   - The analysis provides evidence‑based guidance for optimizing study strategies

**Methodology**
- Data collection through student surveys on study habits
- Data cleaning and validation using Python (Pandas, NumPy)
- Exploratory data analysis to understand variable distributions
- Regression model building with StatsModels
- Model evaluation using R‑squared, p‑values, and diagnostic testing

**Technical Implementation**
- Multiple linear regression to isolate individual factor impacts
- Diagnostic testing to ensure model assumptions were met
- Visualization of relationships using Matplotlib and Seaborn
- Statistical inference to draw actionable conclusions

**Impact**
The project provided actionable insights for both professors and students. Professors can use the findings to guide evidence‑based teaching recommendations, while students can prioritize their time more effectively to improve academic performance. The research also highlighted the significant impact of external stressors (like COVID‑19) on academic success, suggesting a need for better institutional support systems.`,
  tags: ['Data Analysis', 'Data Science (ML)'],
  images: [
    getImagePath('/images/projects/sta302_final_project/school project.png')
  ],
  codeSnippets: [
    `# Example regression analysis code
import statsmodels.api as sm
import pandas as pd

# Prepare data
X = df[['study_hours', 'covid_thoughts', 'office_hours']]
X = sm.add_constant(X)  # Add intercept
y = df['test_score']

# Fit model
model = sm.OLS(y, X).fit()
print(model.summary())

# Interpretation of coefficients
print(f"Each additional study hour increases test score by {model.params['study_hours']:.2f} points")
print(f"Each hour of COVID-related thoughts decreases score by {abs(model.params['covid_thoughts']):.2f} points")`
  ],
  links: [
    { title: 'Project Report (PDF)', url: 'pdf/STA302-Final-Project.pdf' },
    { title: 'R Code Repository', url: 'images/misc/Final-Project-v2.R' }
  ],
  date: '2022-04-15',
};

// Tableau Visualizations
const tableauVisualizations: Project = {
  id: 'tableau-visualizations',
  title: 'Tableau Visualizations: Data Storytelling Dashboards',
  shortDescription: 'A collection of interactive Tableau dashboards for data storytelling, including bike sharing analysis, lightning strike visualizations, and market insights.',
  detailedDescription: `**Project Overview**

This collection showcases interactive Tableau dashboards designed for effective data storytelling across diverse domains. Each visualization transforms complex datasets into intuitive, interactive narratives that reveal patterns, trends, and actionable insights.

**Featured Dashboards**

1. **Seoul Bike Efficient Bike Maintenance Timing**
   - Analyzes Seoul bike sharing patterns to identify optimal maintenance windows
   - Visualizes average rentals per hour across weekdays in 2018
   - Helps bike sharing companies minimize service disruption during low‑usage periods

2. **Visualizing Lightning Strikes Over Time**
   - Interactive heatmap of lightning strike frequency and geographic distribution
   - Temporal analysis showing seasonal and daily patterns
   - Box plots and histograms for statistical distribution analysis

3. **Interactive Lightning Strikes Over Time**
   - Enhanced dashboard with filtering capabilities and detailed tooltips
   - Comparative analysis across different geographic regions
   - Time‑series visualization of strike intensity and frequency

**Technical Approach**
- Data preparation and cleaning for visualization‑ready formats
- Calculated fields for derived metrics and aggregations
- Parameter controls for interactive filtering and exploration
- Dashboard design principles for optimal user experience
- Performance optimization for large‑scale geographic data

**Design Principles**
- Intuitive color schemes that highlight patterns without overwhelming
- Consistent layout across dashboards for user familiarity
- Responsive design considerations for different screen sizes
- Balanced information density to avoid cognitive overload
- Clear navigation and filtering controls for exploratory analysis

**Impact**
These visualizations demonstrate the power of Tableau for transforming raw data into compelling narratives. Each dashboard serves as both an analytical tool and a communication medium, making complex data accessible to stakeholders with varying technical backgrounds. The interactive elements encourage exploration and discovery, leading to deeper insights than static reports could provide.`,
  tags: ['Dashboards'],
  images: [
    getImagePath('/images/projects/tableau_visualizations/bikes.png'),
    getImagePath('/images/projects/tableau_visualizations/lightning.png'),
    getImagePath('/images/projects/tableau_visualizations/lightning visuals2.png')
  ],
  links: [
    { title: 'Seoul Bike Dashboard', url: 'https://public.tableau.com/views/SeoulBikeEfficientBikeMaintananceTiming/Sheet12?:language=en-US&:display_count=n&:origin=viz_share_link' },
    { title: 'Lightning Strikes Visualization', url: 'https://public.tableau.com/views/Long-LatmapsHeatmapsBoxplotsHistograms/Sheet1?:language=en-US&:display_count=n&:origin=viz_share_link' },
    { title: 'Interactive Lightning Dashboard', url: 'https://public.tableau.com/views/InteractiveLightningStrikesOverTime/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link' }
  ],
  date: '2023-10-01',
};

// Export array of all projects (chronologically ordered by date)
export const projects: Project[] = [
  eventDrivenBacktest,
  urbanPulseTipAnalysis,
  urbanPulseFeaturesRegression,
  sta302FinalProject,
  tableauVisualizations,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

// Export individual projects for easy access
export { eventDrivenBacktest, urbanPulseTipAnalysis, urbanPulseFeaturesRegression, sta302FinalProject, tableauVisualizations };

// Export helper functions
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByTag(tag: string): Project[] {
  return projects.filter(project => project.tags.includes(tag as Tag));
}

// Export all unique tags
export const allTags = Array.from(
  new Set(projects.flatMap(project => project.tags))
);
