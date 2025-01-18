const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Sửa điều kiện lọc để chỉ lấy balance có amount > 0, tránh các giá trị <= 0
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => balance.amount > 0) //  chỉ lấy balance có amount > 0
      .map((balance: WalletBalance) => ({
        ...balance,
        priority: getPriority(balance.blockchain), //  tính priority một lần và gán vào balance
      }))
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        return rhs.priority - lhs.priority; //  so sánh trực tiếp priority thay vì gọi getPriority nhiều lần
      });
  }, [balances]); //  chỉ thêm 'balances' vào dependency array vì prices không ảnh hưởng đến sortedBalances

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  }));

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
