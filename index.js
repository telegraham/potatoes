class PotatoBox {

  constructor(gardenSelector) {
    this.element = $(gardenSelector);

    var that = this;
    this.element[0].onclick = function(e){
      that.parent.handleClick(e)
    }
  }

  // incrementAndRender(){
    // this.state.numberOfPotatoes += this.props.potatoesToIncrementBy;
    // this.render();
  // }

  render(){
    console.log("render")
    let allThePotatoes = "";
    for (let i = this.parent.state.numberOfPotatoes - 1; i >= 0; i--) {
      allThePotatoes += "🥔";
    }
    this.element.text(allThePotatoes);
  }

}

class PotatoCounter {

  constructor(titleSelector) {
    this.element = $(titleSelector);
  }

  render(){
    this.element.html("Potato count is at <span class='potato-count'>"
        + this.parent.state.numberOfPotatoes + "</span>");
  }
}

class PotatoParent {

  constructor(props = {}) {

    this.props = Object.assign({
      initialNumberOfpotatoes: 200,
      potatoesToIncrementBy: 1
    }, props);

    this.state = {
      numberOfPotatoes: this.props.initialNumberOfpotatoes
    };

    this.responsibilities = []
  }

  register(child){
    this.responsibilities.push(child)
    child.parent = this;
  }

  handleClick(e){
    this.state.numberOfPotatoes += this.props.potatoesToIncrementBy;
    this.renderChildren();
  }

  renderChildren() {
    this.responsibilities.forEach(function(responsibility){
      responsibility.render();
    })
  }

}

$(function(){
  let bestPotatoParentEver = new PotatoParent();

  let bestPotatoBoxEver = new PotatoBox(".potatoes");
  let bestPotatoCounterEver = new PotatoCounter(".potato-counter");

  bestPotatoParentEver.register(bestPotatoBoxEver)
  bestPotatoParentEver.register(bestPotatoCounterEver)


  bestPotatoParentEver.renderChildren();

})













// var setNumberOfPotatoes;


// $(function() {

//   var numberOfPotatoes = 0;
//   setNumberOfPotatoes = function(param){
//     numberOfPotatoes = param;
//   }

//   var allThePotatoes = "";

//   for (var i = numberOfPotatoes - 1; i >= 0; i--) {
//     allThePotatoes += "🥔";
//   }

//   $potatoBox.text(allThePotatoes)

//   $(".potatoes").on("click", function(){
//     numberOfPotatoes++
//     var $potatoBox = $(this);

//     $(".potato-count").text(numberOfPotatoes);
//   })
// })



