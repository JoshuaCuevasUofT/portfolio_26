<script src="https://cdnjs.cloudflare.com/ajax/libs/zoom.js/2.3.1/zoom.min.js"></script>

# Event Driven Backtesting Framework Project 2024

### Structural Flowchart 
<img src="Event Driven Backtesting Flow Chart.png?raw=true" class="zoom"/>
(JS Zoom script isn't compatible with github, please try right click -> open image in new tab)

### Motivations
This project was completed during the intermediate stage of an interview process for asset allocation research for a major Canadian bank.

Before this I was experienced in *using* backtesting frameworks especially through Pinescript and TradingView. Additionally I had expereince *creating* vector based backtesting frameworks. Thirdly, I had experience using broker API calls to create trading bots based on (admitadly discretionary and simple) event driven strategies.

During this project I had to combine all three of my experiences in order to create a scalable system for any future independant trading and research.

## Project Goals
The aim of this coding project is to whip up a versatile event-driven back-testing framework. This bad boy can put different trading or allocation strategies through the wringer. Whether it's fundamental, macro, or technical signals, this framework's got you covered.

### Short Term Project Goals:
Two strategies were conducted on a preset data set through an event handler and our framework:

1. Conduct a back-test on a trend-following strategy for the S&P 500 ETF (Ticker: SPY)

2. Implement a back-test for a systematic derivative portfolio strategy based on the S&P 500 ETF (Ticker: SPY)
    - Holding 95% strike OTM put options for SPY shares.
    - Selling 105% strike OTM call options for SPY shares.
    - Differing contract maturities

### Output requirements
- Illustrate the net asset value of the portfolio through a time series chart.
- Thoroughly record all transactions executed while adhering to the strategies.

## Software Principles and Scalability:
A large part about quant finance research is being up to date. There are infinite insights in data and the finance industry is widely known to be the most competitive industry when it comes to profitable insights. It's *imperitive* to be able to scale up 99% of the components within the framework. This means an incredible attention to detail when it comes to the modularity of the framework and software structure. 

In this project I ensured the scalability of:
0. Data Collection (Event handler, API data collection/uniformity)
1. Indicators
2. Signals
3. Event Creation (strategy scripting, notably similar to the tradingview formula with their pinescript scripting)
4. Order Creation and details
5. Execution module (API order maker)

I've provided a flowchart to illustrate the modularity and interations between classes in this project. See first image.

# Outputs and findings

### Technical Crossover Portfolio Value
<img src="tco portfolio value.png?raw=true" class="zoom"/>

### Technical Crossover Equity Curve
<img src="tco equity curve.png?raw=true" class="zoom"/>

### Technical Crossover Signal Plot and Highlights
<img src="tco signal highlights.png?raw=true" class="zoom"/>

### Techical Crossover Trade Log
<img src="tco trade logs.PNG?raw=true" class="zoom"/>

### Buy Put options Strategy Portfolio Value
<img src="sell call options portfolio value.png?raw=true" class="zoom"/>

### MultiAsset Portfolio Value
<img src="multi asset portfolio value.png?raw=true" class="zoom"/>

### MultiAsset Trade Logs
<img src="multi asset trade logs.PNG?raw=true" class="zoom"/>


# Final Thoughts

### 1) Strategy 1:
A simple techincal crossover using moving averages. This one is a classic and employed by retail traders everywhere. The idea being that we can find reversals in the momentum of the asset price. The issue is that it is in fact only technical analysis, and very simple technical analysis at that. Over a long enough holding period and high enough time frame I'm sure this method works, of course we see it happen all the time in business cycles, but in a short period, it's not really worth much! The bonus would have introduced transaction costs which I'm sure would have hindered this strategy heavily. The BIGGEST reason we did well with this strategy is because we were only allowed to creat LONG positions in an asset that we knew would appreciate over the long term. This one of many potential problems when backtesting called look ahead bias.

### 2)  Strategy 2:
This strategy is not one that I was very familiar with. I spent a good amount of time reading websites and learning the language of OTM, ITM, strike price, call option, put option, option premiums, expiration dates. It also made for good math practice when creating functions for the calculations of returns, option premiums, and even rebalancing our portfolio. In fact I spent about an hour stuck debugging code only to do the algebra with a pencil and pen only to realize my rebalancing function had a plus that should have been a minus. This strategy performed way to well to be realistic in any way. likely due to my lack of understanding when it comes to derivatives, I likely botched the closing returns. Additionally, it's worth mentioning I used a much simpler black-scholes model to calculate my option premiums. On my own curiosity, I ended up backtesting this strategy with only the call options, and only the put options. Here I realized that put options made very little difference in our portfolio value, but the premium we made selling call options was huge. Here I'd like to point out the large assumptions we have to make to even consider backtesting while "selling" an asset. For example, if I wanted to backtest selling a 120 OTM contract every month, I'd likely make huge gains. But realistically who would buy a 120 call option that expires within a month? These assumptions combined with the lack of transaction costs means this backtest can't be trusted.

### 3) Other comments:
Keeping to the project scope, I did not implement other performance metrics other than simple returns and cumulative returns. This is a large issue for this backtest because we have no way of assessing risk. That said even if we did have a way of assessing risk, I've backtested a few strategies I scripted myself on TradingView using a multitude of performance metrics like max draw down, sharpe ratios, sortino ratios, profit factors etc. Additionally large amounts of robustness checking across parameters, brokers, and time frames. A good amount of the structure of this code base was inspired from TradingView's structure of backtesting, including the idea to be able to scipt strategies simply and import them onto an existing price time series. Well in this case a series of individual events. I should mention that despite all my efforts to create a perfect backtested strategy and avoiding all possible sins of backtesting (Luo et al. 2014), the few strategies that met strong criterias across all performance metrics and robustness testing still failed to be productive in following year. There's a large issue in multiple testing, selection bias and backtest overfitting that I haven't been able to figure out yet. As far as I know backtest overfitting is an issue that hasn't been solved. As far as quantitative reasearch goes, I put feature importance higher up than backtesting by a fair margin. As you might guess I'm pretty pessimitic about backtesting, I think it's fun to see huge gains, but this project was enjoyable because ALL of my previous backtesting framework experience has been in vector based backtesting. Creating this framework might mean that if I do figure out a profitable strategy I could eventually hook this up to some websockets and use my code for something else besides research for once! 

# Code Base 2024 Febuary

<img src="codebase feb2024.PNG?raw=true" class="zoom"/>

# Code Sample MultiAsset Rebalancing Strategy

```python
class MultiAsset_Options_Rebalancing(BaseStrategy):
    """A strategy for multi-asset rebalancing using options.
    
    Attributes:
        entry_binary (pd.Series): Binary series indicating whether a buy signal is generated (True)
            or not (False).
        existing_order (Order): The existing order for the strategy, if any.
        current_index (int): The current index of the security data.

        call_strategy (BaseStrategy): The strategy for selling out-of-the-money call options.
        put_strategy (BaseStrategy): The strategy for buying out-of-the-money put options.
        entry_binary2 (pd.Series): Binary series indicating whether a buy signal is generated for the second strategy(True)

        
    Methods:
        _strategy_logic(): Generates signals based on the SMA crossover.
        get_entry_binary(): Returns the entry binary series.
        process_new_data(new_data): Processes new data and executes orders based on the strategy logic.
        rebalance(new_data): Rebalances the portfolio based on new data.
        
        get_data(): Returns the security data.
        get_execution_api(): Returns the execution API.
        plot_strategy(): Plots the strategy on a price chart.
    
    """
    
    def __init__(self) -> None:
        super().__init__()
        self.call_strategy = Sell_OTM_Call_Options_105_1M()
        self.put_strategy = Buy_OTM_Put_Options_95_3M()
        self.entry_binary2 = pd.Series(dtype=bool)
        self.current_index = 0
        self.existing_order = None
        self.entry_binary = pd.Series(dtype=bool)
        
    def _strategy_logic(self):
        """Generate signals for multi-asset rebalancing."""
        
        if not np.isnan(self.security_data.iloc[-1]['OTM105call_Premium']):
            self.entry_binary.loc[self.current_index] = True
        else:
            self.entry_binary.loc[self.current_index] = False
            
        if not np.isnan(self.security_data.iloc[-1]['OTM95put_Premium']):
            self.entry_binary2.loc[self.current_index] = True
        else:
            self.entry_binary2.loc[self.current_index] = False
        self.current_index += 1

    def _optimize_portfolio(self, premium_to_buy_put_options=0, premium_to_sell_call_options=0, underlying_asset_price=0, available_capital=0):
        """
        Optimize the portfolio by calculating the position size based on the given parameters.

        Parameters:
        premium_to_buy_put_options (float): The premium to buy put options.
        premium_to_sell_call_options (float): The premium to sell call options.
        underlying_asset_price (float): The price of the underlying asset.
        available_capital (float): The available capital for investment.

        Returns:
        float: The position size for the optimized portfolio.
        """
        if np.isnan(premium_to_sell_call_options):
            premium_to_sell_call_options = 0
        if np.isnan(premium_to_buy_put_options):
            premium_to_buy_put_options = 0
            
        M = underlying_asset_price - premium_to_sell_call_options + premium_to_buy_put_options
        
        return (available_capital/M).item()
    
    def process_new_data(self, new_data):
        """Process new data and trigger rebalancing if necessary."""
        
        self.security_data = pd.concat([self.security_data, new_data])
        self._strategy_logic()
        
        if self.entry_binary.iloc[-1] or self.entry_binary2.iloc[-1]:
            self.rebalance(new_data)
            
            
    def rebalance(self, new_data):
        """Rebalance the portfolio based on new data and an optimization algorithm."""
        
        call_premium = new_data['OTM105call_Premium'].values[0]
        put_premium = new_data['OTM95put_Premium'].values[0]
        available_capital = self.execution_module.get_portfolio_value()
        
        maximial_SPY_shares = self._optimize_portfolio(premium_to_buy_put_options=put_premium, premium_to_sell_call_options=call_premium, underlying_asset_price=new_data['Price'], available_capital=available_capital)
        
        print("Maximial SPY Shares:", maximial_SPY_shares)
        
        if self.existing_order is not None:
            self.existing_order.set_close_order(new_data['Price'].values[0])
            self.execution_module.execute_order(self.existing_order)
            
        Order = order.StockOrder('MultiAsset_Options_Rebalancing', 'Buy', 'SPY', new_data['Price'].values[0], new_data['timestamp'].values[0], quantity=maximial_SPY_shares)
        
        self.execution_module.execute_order(Order)
        if Order.is_executed():
            self.existing_order = Order
            
        self.call_strategy.change_order_percent_portfolio(None)
        self.call_strategy.change_order_quantity(maximial_SPY_shares)
        self.call_strategy.process_new_data(new_data)
        
        if self.entry_binary2.iloc[-1]:
            self.put_strategy.change_order_percent_portfolio(None)
            self.put_strategy.change_order_quantity(maximial_SPY_shares)
            self.put_strategy.process_new_data(new_data)
            
        return maximial_SPY_shares
```
