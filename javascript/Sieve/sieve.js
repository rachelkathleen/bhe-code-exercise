const sieveOfEratosthenes = (limit) => {
  const sieve = Array(limit).fill(true);
  sieve[0] = sieve[1] = false; // 0 and 1 are not prime numbers

  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j < limit; j += i) {
        sieve[j] = false;
      }
    }
  }

  return sieve
    .map((isPrime, index) => (isPrime ? index : null))
    .filter((number) => number !== null);
};

// Approach fails for last two test cases because memory runs out
// const nthPrime = (n) => {

//   // Estimate the upper limit using the prime number theorem
//   const upperLimit =
//     n < 6 ? 15 : Math.ceil(n * (Math.log(n) + Math.log(Math.log(n))));
//   const primes = sieveOfEratosthenes(upperLimit * 2);

//   if (n >= primes.length) {
//     throw new Error(
//       `Unable to find the ${n}th prime number within the calculated limit.`
//     );
//   }

//   return primes[n];
// };

// module.exports = { nthPrime };

const segmentedSieve = (n) => {
  if (n === 0) {
    // The first prime number is 2
    return 2;
  } else if (n < 0) {
    throw new Error("n must be a non-negative integer");
  }
  const upperLimit =
    n < 6 ? 15 : Math.ceil(n * (Math.log(n) + Math.log(Math.log(n))) * 2);
  const segmentSize = Math.floor(Math.sqrt(upperLimit));
  const smallPrimes = sieveOfEratosthenes(segmentSize);
  let primes = [...smallPrimes];

  let low = segmentSize;
  let high = 2 * segmentSize;

  while (primes.length <= n) {
    const sieve = Array(high - low).fill(true);

    for (const prime of smallPrimes) {
      let start = Math.max(prime * prime, Math.ceil(low / prime) * prime);

      for (let j = start; j < high; j += prime) {
        sieve[j - low] = false;
      }
    }

    for (let i = low; i < high; i++) {
      if (sieve[i - low]) {
        primes.push(i);
        if (primes.length > n) {
          return primes[n];
        }
      }
    }

    low += segmentSize;
    high += segmentSize;
  }

  return primes[n];
};

module.exports = { segmentedSieve };
