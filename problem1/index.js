const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_b = (n) => (n * (n + 1)) / 2;

const sum_to_n_c = (n) => (n <= 1 ? n : n + sum_to_n_c(n - 1));
