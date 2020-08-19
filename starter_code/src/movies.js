/* eslint no-restricted-globals: 'off' */

// Iteration 1: Ordering by year - Order by year, ascending (in growing order)

const orderByYear = (arr) => {
  return [...arr].sort((a, b) => {
    return a.year === b.year ? a.title.localeCompare(b.title) : a.year - b.year;
  });
};

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct

const howManyMovies = (arr) => {
  return [...arr].filter(
    (movieInfo) =>
      movieInfo.genre.includes("Drama") &&
      movieInfo.director === "Steven Spielberg"
  ).length;
};

// Iteration 3: Alphabetic Order - Order by title and print the first 20 titles

const orderAlphabetically = (arr) => {
  return arr
    .map((element) => element.title)
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 20);
};

// Iteration 4: All rates average - Get the average of all rates with 2 decimals

const ratesAverage = (arr) => {
  return arr.length === 0
    ? 0
    : Number(
        (
          arr
            .filter((element) => element.rate)
            .reduce((acc, cur) => acc + cur.rate, 0) / arr.length
        ).toFixed(2)
      );
};

// Iteration 5: Drama movies - Get the average of Drama Movies

const dramaMoviesRate = (arr) => {
  return ratesAverage(arr.filter((element) => element.genre.includes("Drama")));
};
// Iteration 6: Time Format - Turn duration of the movies from hours to minutes

const turnHoursToMinutes = (arr) => {
  return arr.map((movie) => {
    movie.duration = convertHour(movie.duration);
    return movie;
  });

};

function convertHour(str) {
  if (typeof str === 'number') return str
  return str
    .split(" ")
    .map((elem) => {
      if (elem.includes("h")) return elem.split("h")[0] * 60;
      if (elem.includes("min")) return Number(elem.split("min")[0]);
    })
    .reduce((acc, cv) => acc + cv, 0);
}

// BONUS Iteration: Best yearly rate average - Best yearly rate average

const bestYearAvg = (arr) => {
  if (arr.length === 0) return null;

  if (arr.length === 1) {
    return `The best year was ${arr[0].year} with an average rate of ${arr[0].rate}`;
  }

  if (arr.length > 1) {
    let obj = {
      year: [],
      rate: []
    }
    arr.map(movie => {
      // array com lista de notas de cada ano
      let yearRate = []
      for (let i = 0; i < arr.length; i++){
        if (movie.year === arr[i].year) yearRate.push(arr[i].rate)
      }
      // média de cada ano
      let average = yearRate.reduce((acc, cv) => acc + cv, 0)/yearRate.length
      // adicionando no obj a lista de anos com suas respectivas médias
      obj.year.push(movie.year)
      obj.rate.push(average)
      return movie
    })

    // melhor média
    let bestRate = Math.max(...obj.rate)
    let indexOfBestRate = obj.rate.indexOf(bestRate)
    
    // anos com a mesma melhor média
    let bestYears = []
    obj.rate.map((rating, idx) => {
      if (rating === bestRate) return bestYears.push(obj.year[idx])
      return
    })

    return `The best year was ${Math.min(...bestYears)} with an average rate of ${obj.rate[indexOfBestRate]}`;
  }
};
