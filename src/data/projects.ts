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

const projectWRDSIIDReplication: Project = {
  id: 'wrds-iid-variable-replication',
  title: 'WRDS IID Variable Replication: Microstructure Feature Engineering from Panel Data',
  shortDescription: 'Replicated 500+ microstructure features from WRDS research using pandas on financial panel data, including Lee–Ready tick tests and market hour summaries.',
  detailedDescription: `**Project Overview**
This project replicated key signals and variables from a recent WRDS IID research paper, targeting microstructure financial panel data. The effort produced a reusable library of approximately 500 validated features for quantitative strategy research.

**Methodology**
Microstructure data was extracted using Compute Canada clusters (Compustat) and Polygon real-time broker feeds. WRDS DTAQ IID manual formulas were cross-referenced with a dataframe of DTAQ results. Mathematical programming in NumPy and pandas implemented the replication, with each feature validated against Wharton’s benchmark outputs.

**Key Findings**
The library includes Lee and Ready (1991) tick test trade classifications, trading and exchange flags, order type aggregates, special order summaries, and market hour summaries. Thoughtful handling of zero denominators (e.g., \`c/log(a+b)\` when a+b=1) was implemented, extending beyond published WRDS documentation.

**Technical Implementation**
Modular feature functions compute once per dataset, with results cached for reuse to reduce overhead. Parallelization, vectorization, and strong mathematical programming minimized memory and computation costs. Floating-point errors were mitigated by cross-validation against NYSE microstructure data manuals.

**Impact**
Strategists now access a robust, production-ready library of 500+ microstructure signals, accelerating research in quantitative finance and algorithmic trading applications.`,
  tags: ['Data Analysis', 'Quantitative Research', 'Data Engineering'],
  images: [getImagePath("/images/projects/wrds_replication/signalreplication_acc.png")],
  codeSnippets: [
    `def lee_ready_tick_test(trades):
    """
    Replicate Lee-Ready (1991) trade classification.
    Returns: 1 (buy), -1 (sell), 0 (uncertain)
    """
    trades['tick'] = trades['price'].diff()
    trades['quote_mid'] = (trades['bid'] + trades['ask']) / 2
    condition = (
        (trades['tick'] > 0) |
        ((trades['tick'] == 0) & (trades['price'] > trades['quote_mid']))
    )
    trades['classification'] = np.where(condition, 1,
                                        np.where(trades['tick'] < 0, -1, 0))
    return trades.groupby('date')['classification'].agg(['sum', 'count'])`
  ],
  links: [
    { title: 'GitHub Repository', url: 'https://github.com/quantfinancelab/ProjectAlpha/tree/refactor_summary_wrds2' }
    ],  // TODO: add links
  date: '2023-11-11',   // TODO: add date
};

const projectAlphaMCPT: Project = {
  id: 'within-cv-y-permutation-mcpt',
  title: 'Within-CV Y-Permutation for Model Validation: MCPT Implementation',
  shortDescription: 'A Python module implementing a within‑cross‑validation y‑permutation (MCPT) algorithm to validate whether a model detects real signal rather than patterns by chance.',
  detailedDescription: `**Project Overview**
This project developed a within‑CV y‑permutation (Monte Carlo Permutation Test) module that preserves the independence of training and testing splits during permutation testing. Standard MCPT algorithms shuffle labels across the entire dataset, causing label leakage between folds and producing artificially optimistic null distributions. The within‑CV approach shuffles y labels separately for each CV split, maintaining the original split structure and class balance.

**Methodology**
Two computational variations were implemented: n‑computation (fit classifier once per CV split, then permute labels) for speed, and n×p‑computation (fit per split per permutation) for robustness. The module supports stratified K‑Fold cross‑validation to ensure each fold maintains the same class proportion as the full dataset. A critical bug where \`n_jobs > 1\` caused duplicate shuffled datasets was fixed by moving shuffling outside the parallel context to preserve random state across processes.

**Technical Implementation**
The module was built in Python using Polars DataFrames for efficient data handling and scikit‑learn's model selection tools. The algorithm accepts scoring metrics, number of permutations, random seed, and parallelization parameters. For grouped data, shuffling occurs within each group; otherwise a simple shuffle is applied. The function returns a tuple containing the baseline score and a Polars Series of permutation scores. The implementation includes a demo notebook replicating scikit‑learn's visual outputs and p‑values.

**Key Findings**
Standard y‑permutation leaks information across train/test splits, producing a null distribution that is artificially optimistic. Within‑CV y‑permutation provides an honest baseline for detecting true signal versus overfitting. Statistical tests (Shapiro‑Wilk, Kolmogorov‑Smirnov, Anderson‑Darling) confirmed that permutation score distributions are normal regardless of visual appearance, with sample size and random seed influencing visual normality. Stratified K‑Fold CV eliminates the need for specialized shuffling because labels are already evenly distributed.

**Impact**
This module enables more rigorous model validation in machine learning pipelines by ensuring permutation tests respect CV split boundaries. The ability to append new CV splits to an existing LazyFrame after initial p‑value calculation adds flexibility for iterative analysis.`,
  tags: ['Data Science (ML)', 'Quantitative Research', 'Data Analysis'],
  images: [
    getImagePath("public\\images\\projects\\permutation_test_dev\\Pasted image 20260509133917.png"),
    getImagePath("public\\images\\projects\\permutation_test_dev\\Pasted image 20260509133027.png"),
    getImagePath("public\\images\\projects\\permutation_test_dev\\Pasted image 20260509133114.png"),
    getImagePath("public\\images\\projects\\permutation_test_dev\\Pasted image 20260509133240.png"),
    getImagePath("public\\images\\projects\\permutation_test_dev\\Pasted image 20260509133408.png"),
    getImagePath("public\\images\\projects\\permutation_test_dev\\Pasted image 20260509133850.png"),
  ],  // TODO: add images
  codeSnippets: [
    `from within_cv_y_perm import within_cv_y_permutation
import polars as pl
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold

# Initialize classifier and CV splitter
clf = RandomForestClassifier(random_state=42)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Run within-CV y-permutation test
baseline_score, perm_scores = within_cv_y_permutation(
    X=X_data,
    y=y_labels,
    model=clf,
    cv=cv,
    scoring='accuracy',
    n_permutations=100,
    random_state=42,
    n_jobs=4
)

# perm_scores is a Polars Series of null distribution scores
print(f"Baseline accuracy: {baseline_score:.3f}")
print(f"Permutation p-value: {(perm_scores >= baseline_score).mean():.3f}")
`,
    `# Within-CV shuffle logic preserving split independence
def shuffle_y_within_split(y, groups=None, random_state=None):
    """Shuffle y labels within each CV split, not across the entire dataset."""
    rng = np.random.RandomState(random_state)
    y_shuffled = y.copy()

    if groups is not None:
        # Shuffle within each group to preserve stratification
        for group_id in np.unique(groups):
            mask = groups == group_id
            y_shuffled[mask] = rng.permutation(y_shuffled[mask])
    else:
        # Simple shuffle without cross-split leakage
        y_shuffled = rng.permutation(y_shuffled)

    return y_shuffled
`
  ],
  links: [
    {title:"Github Repo", url:"https://github.com/quantfinancelab/ProjectAlpha/pull/47"},
    {title:"Paper", url:"https://www.jmlr.org/papers/volume11/ojala10a/ojala10a.pdf"}
  ],  // TODO: add links
  date: '2024-02-11',   // TODO: add date
};

const monteCarloPermutationTestTimeSeriesAnalysis: Project = {
  id: 'monte-carlo-permutation-test-time-series-analysis',
  title: 'Monte Carlo Permutation Test for Binary Time Series Classification: Evaluating Type I Error and Local Power Under Feature Correlation and Non-Stationarity',
  shortDescription: 'A modular research pipeline simulating 25,000+ GLARMA(1,1) observations to evaluate permutation test reliability, comparing custom implementation against scikit-learn across autocorrelated and non-stationary conditions.',
  detailedDescription: `**Project Overview**
This empirical study assessed how autocorrelation and non-stationarity in time series features affect the Monte Carlo permutation test's performance in terms of Type I error control and local power. The research pipeline simulated binomial GARMA(1,1) processes with a logit link, generating synthetic data with controlled AR and MA parameters across 500 replicates with 500 permutations each. A custom permutation test implementation was built from the ground up based on the original methodological paper.

**Methodology**
The simulation generated ARMA processes using statsmodels, then injected correlated noise via a covariance matrix with decay structure \`Corr[i, j] = rho^|i - j|\`. A linear predictor was constructed by multiplying ARMA processes with beta weights (0 for null, 0.2, 0.4, 0.8 for power analysis), transformed via logistic function, and sampled to produce binary responses. The custom permutation test implementation was validated against scikit-learn's built-in permutation test functionality.

**Key Findings**
The existing scikit-learn implementation failed to control Type I error across all beta=0 scenarios, including pure noise, autocorrelated features, and multiple correlated features. In contrast, the custom implementation—built from the original paper's specification—successfully controlled Type I error across all null scenarios. For local power analysis, the custom test demonstrated appropriate sensitivity when beta > 0. However, the statistical test began to lose validity under non-stationary conditions (AR component ≥ 1.0), where rejection rates deviated from expected levels.

**Technical Implementation**
The pipeline was implemented in Python using joblib.Parallel with delayed for high-level parallelization across replicates. Custom permutation test modules replaced scikit-learn's implementation, providing granular control over CV splits, score aggregation, and p-value calculation. Models included XGBoost and logistic regression from scikit-learn, with ARMA processes generated via statsmodels. The implementation avoided oversubscription by moving all parallelization to the highest level of the experimental design.

**Impact**
The study revealed that scikit-learn's permutation test implementation exhibited systematic Type I error inflation in time series contexts. The custom implementation resolved these issues for stationary data but identified fundamental limitations of permutation testing under non-stationarity. These findings inform appropriate usage of permutation tests for financial and temporal datasets where stationarity assumptions may be violated.`,
  tags: ['Quantitative Research', 'Data Science (ML)', 'Data Analysis'],
  images: [
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509141221.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509141040.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509141027.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133417.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133408.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133353.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133347.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133240.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133125.png"),
    getImagePath("public\\images\\projects\\empirical_study_mcpt\\Pasted image 20260509133114.png"),
  ],
  codeSnippets: [
    `
    import polars as pl

    # Randomness Control
    RANDOM_SEED = 42
    np.random.seed(RANDOM_SEED)
    master_random_state = check_random_state(RANDOM_SEED)

    # Simulation Parameters
    N_OBSERVATIONS  = 25_000 # Time series length (50000)
    MAX_W_MEAN_DEVIATION = 1000 # NOTE figure out what we want here
    MAX_Y_MEAN_DEVIATION = 0.45 # NOTE both max deviations are arbitrary, set using discretion in functionality tests.
    ### if y mean deviates MAX_Y_MEAN_DEVIATION more/less than 0.5
    ### (perfect class balance), we will not use it

    # Resampling Parameters
    N_REPLICATES = 500        # Number of experimental replicates (500)
    N_CV_SPLITS = 5         # Cross-validation folds (5)
    N_PERMUTATIONS = 500     # Permutation tests (150)
    N_PARAMETER_SETS = 100   # Hyperparameter configurations (100)

    # Statistical Testing
    SIGNIFICANCE_LEVEL = 0.05

    # Model and Scorer Parameters
    CLASSIFIER_MODEL = "xgboost" # some shit, rf, xgboost, logistic_regression
    CLASSIFIER_SCORER = "neg_log_loss" # some list of scorers, f1_weighted, neg_log_loss

    # Scenarios for Single predictor GARMA

    garma_comp_type1_error = [
        # type 1 error analysis
        {"beta": 0.0, "phi": 0.0, "theta": 0.000}, # arma = noise
        {"beta": 0.0, "phi": 0.0, "theta": 0.001}, # arma = noise
        {"beta": 0.0, "phi": 0.0, "theta": 0.002}, # arma = noise
        {"beta": 0.0, "phi": 0.2, "theta": 0.4},
        {"beta": 0.0, "phi": 0.4, "theta": 0.4},
        {"beta": 0.0, "phi": 0.6, "theta": 0.4},
        {"beta": 0.0, "phi": 1.0, "theta": 0.4},
    ]

    garma_comp_local_power = [
        # local power analysis
        {"beta": 0.0, "phi": 0.4, "theta": 0.4},
        {"beta": 0.05, "phi": 0.4, "theta": 0.4},
        {"beta": 0.2, "phi": 0.4, "theta": 0.4},
        {"beta": 0.4, "phi": 0.4, "theta": 0.4},
        {"beta": 0.8, "phi": 0.4, "theta": 0.4},

        # Non stationary scenarios
        {"beta": 0.2, "phi": 1.0, "theta": 0.4},
        {"beta": 0.4, "phi": 1.0, "theta": 0.4},
        {"beta": 0.6, "phi": 1.0, "theta": 0.4},
        {"beta": 0.8, "phi": 1.0, "theta": 0.4},
    ]

    GARMA_COMPONENT_LIST_SINGLE = []
    for comp in garma_comp_type1_error + garma_comp_local_power:
        if comp not in GARMA_COMPONENT_LIST_SINGLE:
            GARMA_COMPONENT_LIST_SINGLE.append(comp)

    `,
    `
    def multi_pred_main_logic_loop(scenario_id, garma_multi_pred_config, replicate_id, random_seed) -> dict:
    within_process_random_state = np.random.RandomState(random_seed)

    purged_kfold = PurgedKFold(n_splits=N_CV_SPLITS, purge_gap = 100)

    # (1) Simulate Scenario
    multi_pred_garma = simulate_garma_binary_multi_predictor(
        n_obs = N_OBSERVATIONS,
        multi_predictor_scenario = garma_multi_pred_config,
        random_state = within_process_random_state,
    ).with_columns(
        pl.lit(scenario_id).alias("scenario_id"),
        pl.lit(replicate_id).alias("replicate_id")
    )

    predictors = [col for col in multi_pred_garma.columns if col.startswith("predictor")]

    X = multi_pred_garma.select(predictors)
    y = multi_pred_garma["y"]
    w = multi_pred_garma["W_t"]

    # Check for W properties and class balance in y in cross validation
    if not has_valid_properties_and_balance(
        w = w,
        y = y,
        cv = purged_kfold,
        max_w_mean_deviation = MAX_W_MEAN_DEVIATION,
        max_y_mean_deviation = MAX_Y_MEAN_DEVIATION
        ):
        permutation_results_df = pl.DataFrame({
            # results
            "mean_cv_score_baseline": None, # float
            "mean_cv_scores_permutations": pl.Series([None] * N_PERMUTATIONS, dtype=pl.Float64),  # list[float]
            "pvalue": None, # float

            # replicate metadata
            "replicate_id": replicate_id, # int
            "has_failed_properties": True, # bool
            "best_model_oos_score": None, # float
            "best_model_is_score": None, # float

            # scenario meta data
            "scenario_id": scenario_id, # int
        }).with_row_index(name = "permutation_idx")

        # timeseries/scenario metadata
        timeseries_meta_data_df = get_meta_data_columns_multi_pred_ts_scenario(scenario_time_series=multi_pred_garma)
        permutation_results_df = permutation_results_df.with_columns(
            [pl.lit(timeseries_meta_data_df[col].item()).alias(col) for col in timeseries_meta_data_df.columns]
        )

        # in-replicate model metadata
        for hyper_parameter_name in PARAM_GRID.keys():
            permutation_results_df = permutation_results_df.with_columns(
                pl.lit(None).alias(hyper_parameter_name)
            )

        return {
            "permutation_results": permutation_results_df,
            "simulated_timeseries": multi_pred_garma,
            "raw": None
            }

    # (2) randomized for each replicate
    random_param_set_df = get_random_param_sets(
        param_grid = PARAM_GRID,
        number_of_random_sets = N_PARAMETER_SETS,
        random_state = within_process_random_state,
    )

    # (3) outer loop, iterate through parameter sets
    parameter_set_results = []
    for param_set_row in random_param_set_df.iter_rows(named=True):
        random_param_set_estimator = make_estimator(
            estimator_string=CLASSIFIER_MODEL,
            param_set=param_set_row,
            random_state=within_process_random_state
            )

        parameter_set_results.append(
            score_param_set(
                cv = purged_kfold,
                scorer_type=CLASSIFIER_SCORER,
                estimator = random_param_set_estimator,
                param_set = param_set_row,
                X = X,
                y = y,
            )
        )

    # (4) operations to obtain best model params
    all_param_set_results: pl.DataFrame = pl.concat(parameter_set_results)

    # (4a) get the mean oos_score for each parameter set
    ### NOTE we group by these instead of parameter_set id to retain the values of the hyper parameters
    param_oos_scores = all_param_set_results.group_by(PARAM_GRID.keys()).agg(
        pl.mean("oos_score").alias("mean_oos_score"),
        pl.mean("is_score").alias("mean_is_score"),
    )

    best_param_set_row = (
        param_oos_scores.filter(
            pl.col("mean_oos_score") == pl.col("mean_oos_score").max()
        )
    # in case of tie, take the first row
    ).head(1) # retain score data


    best_param_set = (best_param_set_row
        # drop scores from hyper parameter data
        .drop(['mean_oos_score', 'mean_is_score'])
        # convert each row to dict, since we have one row, we take the first
        .to_dicts()[0]
    )

    # call function dynamic unpacking to get best_estimator
    best_estimator = make_estimator(
        estimator_string = CLASSIFIER_MODEL,
        param_set = best_param_set,
        random_state = within_process_random_state,
    )

    # (5) Evaluate using MCPT-Yperm, shuffle/random state will be different for each scenario, for each replicate
    yperm_results = score_model_mcpt(
        X,
        y,
        cv = purged_kfold,
        scorer_type=CLASSIFIER_SCORER,
        estimator = best_estimator,
        number_of_permutations = N_PERMUTATIONS,
        random_state = within_process_random_state,
    )

    # (6) aggregate to get Baseline CV score, Average Permutation CV scores
    mean_cv_score_baseline: float = yperm_results["baseline_score"].mean()
    mean_cv_scores_permutations: pl.Series = ( # NOTE again 2026, it makes no sense to average this at all
        yperm_results.group_by("permutation_idx")
        .agg(pl.col("permutation_scores").mean())
        ["permutation_scores"]
        )

    actual_total_permutations=N_PERMUTATIONS * N_CV_SPLITS
    p_value = (
            (yperm_results["permutation_scores"] > yperm_results["baseline_score"]).sum() + 1.0
        ) / (actual_total_permutations + 1)

    # (7) Store results in a dictionary
    # Note: dataframe will be will automatically be exploded on mean_cv_scores_permutations (list[float])
    permutation_results_df = pl.DataFrame({
        # results
        "mean_cv_score_baseline": mean_cv_score_baseline, # float
        "mean_cv_scores_permutations": mean_cv_scores_permutations,  # list[float]
        "pvalue": p_value, # float

        # replicate metadata
        "replicate_id": replicate_id, # int
        "has_failed_properties": False, # bool
        "best_model_oos_score": best_param_set_row["mean_oos_score"].item(), # float
        "best_model_is_score": best_param_set_row["mean_is_score"].item(), # float

        # scenario metadata
        "scenario_id": scenario_id, # int
    }).with_row_index(name = "permutation_idx")

    # timeseries/scenario metadata
    timeseries_meta_data_df = get_meta_data_columns_multi_pred_ts_scenario(scenario_time_series=multi_pred_garma)
    permutation_results_df = permutation_results_df.with_columns(
        [pl.lit(timeseries_meta_data_df[col].item()).alias(col) for col in timeseries_meta_data_df.columns]
    )

    # in-replicate model metadata
    for hyper_parameter_name, hyper_param_value in best_param_set.items():
        permutation_results_df = permutation_results_df.with_columns(
            pl.lit(hyper_param_value).alias(hyper_parameter_name)
        )

    ### MAIN RAW YPERM RESULTS DATAFRAME, contains all the info
    yperm_results_df = yperm_results.with_columns(
        pl.lit(replicate_id).alias("replicate_id"),
        pl.lit(scenario_id).alias("scenario_id"),
        **{hyper_parameter_name: pl.lit(hyper_param_value) for hyper_parameter_name, hyper_param_value in best_param_set.items()}
    )
    yperm_results_df = yperm_results_df.with_columns(
        [pl.lit(timeseries_meta_data_df[col].item()).alias(col) for col in timeseries_meta_data_df.columns]
    )

    return {
        "permutation_results": permutation_results_df,
        "simulated_timeseries": multi_pred_garma,
        "raw": yperm_results_df,
        }
    `,
    `
    scenario_replicate_multi_pred_combos = product(enumerate(GARMA_COMPONENT_LIST_MULTI), range(N_REPLICATES))
    multi_pred_all_results_scenario_replicate = Parallel(n_jobs = -1, backend = "loky")(
        delayed(multi_pred_main_logic_loop)(
            scenario_id = scenario_id,
            garma_multi_pred_config = garma_multi_pred_config,
            replicate_id = replicate_id,
            random_seed = master_random_state.randint(0, 2**31 - 1),
            )
        for ((scenario_id, garma_multi_pred_config), replicate_id) in scenario_replicate_multi_pred_combos
    )

    all_permutation_multi_pred_results: pl.DataFrame = pl.concat(
        [result["permutation_results"] for result in multi_pred_all_results_scenario_replicate]
    ) # TODO rename this to result dictionary

    # Store all time series replicates and scenarios for future reference
    all_replicate_multi_pred_ts: pl.DataFrame = pl.concat(
        [result["simulated_timeseries"] for result in multi_pred_all_results_scenario_replicate]
    )

    # store raw
    all_raw_multi_pred_results: pl.DataFrame = pl.concat(
        [result_dictionary["raw"] for result_dictionary in multi_pred_all_results_scenario_replicate
        if result_dictionary is not None and result_dictionary.get("raw") is not None]
    )

    all_raw_multi_pred_results.write_parquet("all_raw_multi_pred_results.parquet")
    `,

  ],
  links: [{title: "Paper", url:"http://www.jmlr.org/papers/volume11/ojala10a/ojala10a.pdf"}],  // TODO: add links
  date: '2025-03-20',   // TODO: add date
};

////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// EXPORTS //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

// Export array of all projects (chronologically ordered by date)
export const projects: Project[] = [
  eventDrivenBacktest,
  urbanPulseTipAnalysis,
  urbanPulseFeaturesRegression,
  sta302FinalProject,
  tableauVisualizations,
  projectWRDSIIDReplication,
  projectAlphaMCPT,
  monteCarloPermutationTestTimeSeriesAnalysis,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Most recent first

// Export individual projects for easy access
export {
    eventDrivenBacktest, monteCarloPermutationTestTimeSeriesAnalysis, projectAlphaMCPT,
    projectWRDSIIDReplication,
    sta302FinalProject,
    tableauVisualizations,
    urbanPulseFeaturesRegression,
    urbanPulseTipAnalysis
};

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
