const astrologicalSign = {
    sign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
    color: ['Yellow', 'Beige', 'Orange', 'Red', 'Violet', 'Blue', 'Green', 'Grey', 'Brown', 'White', 'Black'],
    number: () => {
        let sieve = [], i, j, primes = [];
        for (i = 2; i <= 100; ++i) {
            if (!sieve[i]) {
                primes.push(i);
                for (j = i << 1; j <= 100; j += i) {
                    sieve[j] = true;
                }
            }
        }
        return primes;
    },
    getRandSign() {
        const randNum = Math.floor(Math.random() * this.sign.length);
        return this.sign[randNum];
    },
    getRandColor() {
        const randNum = Math.floor(Math.random() * this.color.length);
        return this.color[randNum];
    },
    getRandNumber() {
        const randNum = Math.floor(Math.random() * this.number().length);
        return this.number()[randNum];
    }
}

const yourSign = astrologicalSign;
console.log('You mostly resemble a ' + yourSign.getRandSign().toLowerCase());
console.log('Your lucky color is ' + yourSign.getRandColor().toLowerCase());
console.log('Your lucky number is ' + yourSign.getRandNumber());