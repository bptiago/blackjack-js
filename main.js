class Blackjack {
    constructor(list) {
      this.initialList = list;
      this.div = document.querySelector('.result');
      this.divDealer = document.querySelector('.dealer-hand');
      this.button = document.querySelector('.btn-call');
      this.buttonReset = document.querySelector('.btn-reset');
      this.buttonHold = document.querySelector('.btn-hold');
      this.pushedValuesPlayer = [];
      this.pushedValuesDealer = [];
      this.events();
    }
  
    events() {
      this.dealerCall();
      this.button.addEventListener('click', () => {
        this.getNum(this.pushedValuesPlayer);
        this.checkSum(this.pushedValuesPlayer, this.div, 'Sua mão: ', 'Player');
      });
      this.buttonReset.addEventListener('click', () => {
        this.resetSumPlayer();
        this.resetSumDealer();
        this.dealerCall();
      })
      this.buttonHold.addEventListener('click', () => {
        while (this.doSum(this.pushedValuesDealer) < 18) {
          this.dealerCall();
        }
        this.checkSum(this.pushedValuesDealer, this.divDealer, 'Mão do dealer: ', 'Dealer');
        //fazer um meio de checar as duas mão e retornar uma mensagem de vitória ou não
        this.checkHands();
      })
    };
  
    dealerCall() {
      this.getNum(this.pushedValuesDealer);
      this.displayMessage(this.divDealer, `Mão do dealer: ${this.doSum(this.pushedValuesDealer)}`);
    }
  
    randomNum() {
      return Math.floor(Math.random() * 10)
    }
  
    selectOne() {
      return this.initialList[this.randomNum()];
    }
  
    displayMessage(element, value) {
      element.innerText = value;
    }
  
    doSum(arr) {
      const sum = arr.reduce((acumulator, i) => acumulator += i, 0);
      return sum;
    }
  
    checkSum(arr, element, message, person) {
      if (this.doSum(arr) > 21) {
        this.displayMessage(element, `${person} perdeu. Passou de 21!`)
      } else {
        this.displayMessage(element, `${message} ${this.doSum(arr)}`);
      }
    }
  
    resetSumPlayer() {
      this.pushedValuesPlayer = [];
      this.displayMessage(this.div, 'Sua mão: 0');
    }
  
    resetSumDealer() {
      this.pushedValuesDealer = [];
      this.displayMessage(this.divDealer, 'Mão do dealer: 0');
    }
  
    getNum(arr) {
      const firstPull = this.selectOne();
      arr.push(firstPull);
    }
  }
  
  const newGame = new Blackjack([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);