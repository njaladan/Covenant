App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      //App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      App.web3Provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/GjyHpPqLZffsizIx6ieH');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Lottery.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var LotteryArtifact = data;
      App.contracts.Lottery = TruffleContract(LotteryArtifact);

      // Set the provider for our contract.
      App.contracts.Lottery.setProvider(App.web3Provider);
      return App.getTicketPrice(), App.getTicketMapping(), App.getLotteryAddress();
    });
    return App.bindEvents();
  },

  // the following is probably the ugliest code i've ever written; be warned.

  bindEvents: function() {
    $(document).on('click', '#buyTicket1', App.handleBuyTicket1);


  },

  handleBuyTicket1: function send() {
    App.contracts.Lottery.deployed().then(function(instance) {
      lottery = instance;
      lottery = instance;
var fName = document.getElementById("f1").value;
console.log("fName=",fName);
var lName = document.getElementById("f2").value;
console.log("lName=",lName);
var fName = document.getElementById("f3").value;
console.log("f3=",fName);
var lName = document.getElementById("f4").value;
console.log("f4=",lName);
var lName = document.getElementById("f5").value;
console.log("f5=",lName);
var fName = document.getElementById("f6").value;
console.log("f6=",fName);
var lName = document.getElementById("f7").value;
console.log("f7=",lName);
var lName = document.getElementById("f8").value;
console.log("f8=",lName);
var lName = document.getElementById("f9").value;
console.log("f9=",lName);
var fName = document.getElementById("f10").value;
console.log("f10=",fName);
var lName = document.getElementById("f11").value;
console.log("f11=",lName);
var fName = document.getElementById("f12").value;
console.log("f6=",fName);
var lName = document.getElementById("f13").value;
console.log("f7=",lName);
var lName = document.getElementById("f14").value;
console.log("f8=",lName);
var lName = document.getElementById("f15").value;
console.log("f9=",lName);
var fName = document.getElementById("f16").value;
console.log("f10=",fName);

      var lotteryContractAddress = lottery.address;
      lottery.ticketPrice().then(function(ticketPrice){
        var ticketPrice = ticketPrice;
        console.log(ticketPrice);

        lottery.buyTicket(1, {
          from: web3.eth.coinbase,
          to: lotteryContractAddress,
          value: 5000000000000000,
          gas: 70000

        });
      })
    })
  },


  getTicketPrice: function(){
    console.log('Getting ticket price...');
    App.contracts.Lottery.deployed().then(function(instance) {
        lottery = instance;
        return lottery.ticketPrice();
    }).then(function(result){
      EthPrice = Math.round(1000*result/500000000000000000)/1000; // Result is returned in wei (10^18 per 1 ETH), so divide by 10^18. Also using a technique to "multiply and divide" by 1000 for rounding up to 3 decimals.
      $('#EthPrice').text(EthPrice.toString(10));
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getLotteryAddress: function(){
    console.log('Getting lottery address...');
    App.contracts.Lottery.deployed().then(function(instance) {
        lottery = instance;
        return lottery.address;
    }).then(function(result){
      $('#lotteryAddress').text(result);
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getTicketMapping: function(){
    console.log('Getting ticket mapping...');
    App.contracts.Lottery.deployed().then(function(instance) {
        lottery = instance;
        console.log(lottery.getTicketsPurchased())
        return lottery.getTicketsPurchased();
    }).then(function(result){
      var i;
      var button;
      for(i = 0; i< result.length; i++){
        if(result[i]=="0x0000000000000000000000000000000000000000"){
          result[i]=0;
        } else {
          result[i]=1;
          $("#buyTicket" + String(i)).prop('disabled', true);
        }
      }
      console.log(result);
      }).catch(function(err) {
          console.log(err.message);
        });
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
